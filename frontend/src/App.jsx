import React from 'react'
import { useState, useEffect } from 'react'
import bgService from './services/bgService'
import playSessionService from './services/playSessionService'
import loginService from './services/loginService'

import Boardgames from './components/Boardgames'
import SelectedBoardgame from './components/SelectedBoardgame'
import ErrorNotification from "./components/ErrorNotification"
import LoginForm from './components/LoginForm'

const App = () => {

    const [boardgames, setBoardgames] = useState([])
    const [newBg, setNewBg] = useState("")
    const [selectedBg, setSelectedBg] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [user, setUser] = useState(null)

    useEffect(() => {
        console.log("Getting stuff from server")
        bgService.getAll().then(bgs => {
            console.log("Received response")
            setBoardgames(bgs)
        }).catch(error => {
            console.log(error)
        })
    }, [])

    useEffect(() => {
        const userJSON = window.localStorage.getItem("lautapeliAppUser")
        if (userJSON) {
            const user = JSON.parse(userJSON)
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

    const addBg = (event) => {
        event.preventDefault()
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
        setUser(null)
    }

    const userInfo = () => (
        <div>
            <p>Logged in as {user.name} <button onClick={handleLogout}>Logout</button></p>
        </div>
    )

    const bgForm = () => (
        <form onSubmit={addBg}>
            <input value={newBg} onChange={event => {setNewBg(event.target.value)}}/>
            <button type="submit">add</button>
        </form>
    )

    return (
        <div>
            {user && userInfo()}
            <ErrorNotification message={errorMessage} />
            <Boardgames boardgames={boardgames} onSelect={selectBg} />
            {user && <SelectedBoardgame bg={selectedBg} addPlaySession={addPlaySession}/>}
            {user && bgForm()}
            {!user && 
            <LoginForm 
                username={username}
                password={password}
                handleUsernameChange={({ target }) => setUsername(target.value)}
                handlePasswordChange={({ target }) => setPassword(target.value)}
                handleSubmit={handleLogin}
            />}
        </div>
    )
}

export default App