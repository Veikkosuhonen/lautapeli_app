import React from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    NavLink,
} from "react-router-dom";

import { useState, useEffect } from 'react'

import bgService from './services/boardgameService'
import playSessionService from './services/playSessionService'
import loginService from './services/loginService'
import api from './services/api'

import registerService from './services/registerService'

import Main from './Main';
import Register from './Register';
import Login from './Login';
import Navbar from './components/Navbar';

const App = () => {

    const [boardgames, setBoardgames] = useState([])
    const [selectedBg, setSelectedBg] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)
    const [user, setUser] = useState(null)

    useEffect(() => {
        const userJSON = window.localStorage.getItem("lautapeliAppUser")
        if (userJSON) {
            const user = JSON.parse(userJSON)
            api.setToken(user.token)
            bgService.getAll().then(bgs => {
                setBoardgames(bgs)
            })
            setUser(user)
        }
    }, [])

    const showError = (message) => {
        setErrorMessage(message)
        setTimeout(() => {
            setErrorMessage(null)
        }, 5000)
    }

    const selectBg = (id) => {
        bgService.getOne(id).then(bg => {
            setSelectedBg(bg)
            console.log("Selected " + bg)
        }).catch(error => {
            console.log(error)
        })
    }

    const postBg = (name) => {
        const bg = { name: name }
        bgService.post(bg).then(bg => {
            console.log("Received response to post: " + JSON.stringify(bg))
            setBoardgames(boardgames.concat(bg))
        }).catch(_error => {
            showError(`"${name}" already exists!`)
        })
    }

    const addBg = (newBg) => {
        console.log("Adding " + newBg)
        postBg(newBg)
    }

    const addPlaySession = (playSession) => {
        console.log("Adding " + playSession)
        playSessionService.post(playSession).then(ps => {
            setSelectedBg({
                ...selectedBg, 
                playSessions: selectedBg.playSessions.concat(ps)
            })
        }).catch(error => {
            console.log(error)
        })
    }

    const handleLogin = async (credentials) => {
        console.log("Logging in...")
        try {
            const user = await loginService.login(credentials)

            window.localStorage.setItem(
                "lautapeliAppUser", JSON.stringify(user)
            )
            api.setToken(user.token)
            bgService.getAll().then(bgs => {
                setBoardgames(bgs)
            })
            setUser(user)
            setErrorMessage(null)
        } catch (error) {
            showError("Invalid username or password")
        }
    }

    const handleLogout = (_event) => {
        console.log("...logging out")
        window.localStorage.removeItem("lautapeliAppUser")
        api.setToken(null)
        setUser(null)
        setBoardgames([])
    }

    const handleRegister = (credentials) => {
        console.log("Registering " + JSON.stringify(credentials))
        registerService.register(credentials).then((data) => {
            console.log(JSON.stringify(data))
        }).catch((error) => {
            console.log(error)
        })
    }

    return (
        <Router>
            <Navbar user={user} handleLogout={handleLogout}/>
            <Routes>
                <Route path="/" element={
                    <Main 
                    user={user} 
                    errorMessage={errorMessage} 
                    boardgames={boardgames}
                    selectedBg={selectedBg}
                    selectBg={selectBg}
                    addBg={addBg}
                    addPlaySession={addPlaySession}
                    />
                } />
                <Route path="/login" element={
                    <Login user={user} handleLogin={handleLogin}/>
                } />
                <Route path="/register" element={
                    <Register 
                    handleRegister={handleRegister}
                    user={user}
                    />
                } />
            </Routes>
        </Router>
    )
}

export default App