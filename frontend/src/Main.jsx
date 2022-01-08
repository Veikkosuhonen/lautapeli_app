import React from "react"
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";

import { useState, useEffect } from "react"

import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import bgService from "./services/boardgameService"
import playSessionService from "./services/playSessionService"
import loginService from "./services/loginService"
import registerService from "./services/registerService"
import userService from "./services/userService";
import api from "./services/api"

import Home from "./routes/Home";
import Register from "./routes/Register";
import Login from "./routes/Login";
import Admin from "./routes/Admin";
import Navbar from "./components/Navbar";
import Boardgame from "./routes/Boardgame";
import Boardgames from "./routes/Boardgames";
import NewBoardgame from "./routes/NewBoardgame";

const Main = () => {

    const [boardgames, setBoardgames] = useState([])
    const [users, setUsers] = useState([])
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
            userService.getAll().then(usrs => {
                setUsers(usrs)
            })
            setUser(user)
        }
    }, [])

    const showError = (message) => {
        toast(message)
    }

    const postBg = (name) => {
        const bg = { name: name }

        const response = bgService.post(bg)

        toast.promise(response, {
            pending: "Adding boardgame",
            success: "Success",
            error: { render({data}) { return data.message }}
        })

        response.then(bg => {
            console.log("Received response to post: " + JSON.stringify(bg))
            setBoardgames(boardgames.concat(bg))
        }).catch(_error => {
            console.log(`"${name}" already exists!`)
        })
    }

    const addBg = (newBg) => {
        console.log("Adding " + newBg)
        postBg(newBg)
    }

    const addPlaySession = (playSession) => {
        console.log("Adding " + JSON.stringify(playSession))
        const response = playSessionService.post(playSession)

        toast.promise(response, {
            pending: "Adding playsession",
            success: "Success",
            error: { render({data}) { return data.message }}
        })

        response.then(ps => {
            setSelectedBg({
                ...selectedBg, 
                playSessions: selectedBg.playSessions.concat(ps)
            })
        }).catch(error => {
            console.log(error.message)
        })
    }

    const handleLogin = async (credentials) => {
        console.log("Logging in...")
        const response = loginService.login(credentials)

        toast.promise(response, {
            pending: "Checking credentials",
            success: { render({data}) { return `Welcome back, ${data.name}!`} },
            error: { render({data}) { return data.message }}
        })

        response.then(user => {
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
            //showError(error.message)
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
        const response = registerService.register(credentials)

        toast.promise(response, {
            pending: "Checking credentials",
            success: { render({data}) { return `Welcome, ${data.name}!`} },
            error: { render({data}) { return data.message }}
        })

        response.then(data => {
            console.log(JSON.stringify(data))
        }).catch(error => {
            console.log(error.message)
        })
    }

    return (
        <Router>
            <Navbar user={user} handleLogout={handleLogout}/>
            <ToastContainer 
                position="top-center"
            />
            <Routes>
                <Route path="/" element={
                    <Home user={user}/>
                } />
                <Route path="boardgames" element={
                    <Boardgames boardgames={boardgames}/>
                } >
                    <Route path="new" element={
                        <NewBoardgame addBoardgame={addBg} boardgames={boardgames}/>
                    } />
                </Route>
                <Route path="boardgames/:boardgameId" element={
                    <Boardgame user={user} users={users} addPlaySession={addPlaySession}/>
                } />
                <Route path="login" element={
                    <Login user={user} handleLogin={handleLogin}/>
                } />
                <Route path="register" element={
                    <Register 
                        handleRegister={handleRegister}
                        user={user}
                    />
                } />
                <Route path="admin" element={
                    <Admin showError={showError} user={user}/>
                } />
                <Route path="*" element={
                    <p className="text-rose-500 text-2xl font-sans">Hmm yes the screen is made of screen</p>
                } />
            </Routes>
        </Router>
    )
}

export default Main