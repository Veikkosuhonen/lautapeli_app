import React, { useRef } from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route,
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
import Admin from './Admin';
import Navbar from './components/Navbar';
import Notifications from './components/Notifications';

let notificationId = 0

const App = () => {

    const [notifications, setNotifications] = useState([])
    const [boardgames, setBoardgames] = useState([])
    const [selectedBg, setSelectedBg] = useState(null)
    const [user, setUser] = useState(null)

    useEffect(() => {
        const userJSON = window.localStorage.getItem("lautapeliAppUser")
        if (userJSON && userJSON !== "undefined") {
            const user = JSON.parse(userJSON)
            api.setToken(user.token)
            bgService.getAll().then(bgs => {
                setBoardgames(bgs)
            })
            setUser(user)
        }
    }, [])

    const showError = (message) => {
        const notification = { message, id: notificationId++ }
        console.log(notificationId)
        setNotifications(notifications.concat(notification))
        setTimeout(() => {
            setNotifications(notifications.filter(n => n.id !== notification.id))
        }, 5000)
    }

    const selectedBgRef = useRef()

    const selectBg = (id) => {
        bgService.getOne(id).then(bg => {
            setSelectedBg(bg)
            selectedBgRef.current.setVisible(true)
        }).catch(error => {
            showError(error.message)
        })
    }

    const openAddFormRef = useRef()

    const openAddForm = () => {
        openAddFormRef.current.setVisible(true)
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
            showError(error.message)
        })
    }

    const handleLogin = async (credentials) => {
        console.log("Logging in...")
        loginService.login(credentials).then(user => {
            api.setToken(user.token)
            bgService.getAll().then(bgs => {
                setBoardgames(bgs)
            })
            setUser(user)
            window.localStorage.setItem(
                "lautapeliAppUser", JSON.stringify(user)
            )
        }).catch(error => {
            console.log(JSON.stringify(error))
            showError(error.message)
        })  
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
        registerService.register(credentials).then(data => {
            console.log(JSON.stringify(data))
        }).catch(error => {
            showError(error.message)
        })
    }

    return (
        <Router>
            <Navbar user={user} handleLogout={handleLogout}/>
            <Notifications notifications={notifications}/>
            <Routes>
                <Route path="/" element={
                    <Main 
                    user={user} 
                    boardgames={boardgames}
                    selectedBg={selectedBg}
                    selectBg={selectBg}
                    addBg={addBg}
                    addPlaySession={addPlaySession}
                    showNotification={showError}
                    selectedBgRef={selectedBgRef}
                    addBgRef={openAddFormRef}
                    onOpenAddForm={openAddForm}
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
                <Route path="/admin" element={
                    <Admin showError={showError} user={user}/>
                }></Route>
            </Routes>
        </Router>
    )
}

export default App