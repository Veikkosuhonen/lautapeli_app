import React from 'react'
import { useState, useEffect } from 'react'
import bgService from './services/boardgameService'
import playSessionService from './services/playSessionService'
import loginService from './services/loginService'
import api from './services/api'

import Boardgames from './components/Boardgames'
import SelectedBoardgame from './components/SelectedBoardgame'
import ErrorNotification from "./components/ErrorNotification"
import LoginForm from './components/LoginForm'
import BoardgameForm from './components/BoardgameForm'
import { SecondaryButton } from './components/Buttons'
import Admin from './Admin'
import RegisterForm from './components/RegisterForm'
import registerService from './services/registerService'

const App = () => {

    const [boardgames, setBoardgames] = useState([])
    const [selectedBg, setSelectedBg] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
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

    const handleLogin = async (event) => {
        event.preventDefault()
        console.log("Logging in...")
        try {
            const user = await loginService.login({ username, password })

            window.localStorage.setItem(
                "lautapeliAppUser", JSON.stringify(user)
            )
            api.setToken(user.token)
            bgService.getAll().then(bgs => {
                setBoardgames(bgs)
            })
            setUser(user)
            setUsername("")
            setPassword("")
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
    }

    const handleRegister = (credentials) => {
        console.log("Registering " + JSON.stringify(credentials))
        registerService.register(credentials).then((data) => {
            console.log(JSON.stringify(data))
        }).catch((error) => {
            console.log(error)
        })
    }

    const userInfo = () => (
        <div className="flex justify-end space-x-4">
            <p className="text-xl text-slate-200">
                Logged in as {user.name} 
            </p>
            <SecondaryButton onClick={handleLogout} text="logout" />
        </div>
    )

    return (
        <div className="grid grid-cols-1 space-y-2 divide-y divide-slate-600">
            {user && userInfo()}
            <ErrorNotification message={errorMessage} />
            {user && <Boardgames boardgames={boardgames} onSelect={selectBg} />}
            {user && <SelectedBoardgame bg={selectedBg} addPlaySession={addPlaySession}/>}
            {user && <BoardgameForm addBg={addBg} />}
            {user && user.isAdmin && <Admin />}
            {!user && 
            <LoginForm 
                username={username}
                password={password}
                handleUsernameChange={({ target }) => setUsername(target.value)}
                handlePasswordChange={({ target }) => setPassword(target.value)}
                handleSubmit={handleLogin}
            />}
            {!user && 
            <RegisterForm handleSubmit={handleRegister}/>
            }
        </div>
    )
}

export default App