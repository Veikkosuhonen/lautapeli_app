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
        <div class="flex justify-end space-x-4">
            <p class="text-xl text-slate-200">
                Logged in as {user.name} 
            </p>
            <button class="bg-teal-700 hover:bg-teal-600 rounded p-1" onClick={handleLogout}>Logout</button>
        </div>
    )

    const bgForm = () => (
        <form onSubmit={addBg} class="grid-rows-1 p-2 space-x-4 text-slate-400">
            <input class="p-1 rounded bg-slate-800 border border-slate-700 focus:outline-none focus:outline-indigo-400 hover:outline-dashed hover:outline-indigo-600 outline-offset-2"
            value={newBg} onChange={event => {setNewBg(event.target.value)}}/>
            <button class="text-slate-900 bg-orange-500 hover:bg-orange-400 hover:shadow-md hover:shadow-orange-400/40 px-4 py-1 rounded-md"
            type="submit">add</button>
        </form>
    )

    return (
        <div class="grid grid-cols-1 space-y-2 divide-y divide-slate-700">
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