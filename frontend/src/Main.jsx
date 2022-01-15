import React from "react"
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";

import { useState, useEffect } from "react"

import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import bgService from "./services/boardgameService"
import loginService from "./services/loginService"
import userService from "./services/userService";
import activityService from "./services/activityService"
import api from "./services/api"

import Home from "./routes/Home"
import Register from "./routes/Register";
import Login from "./routes/Login";
import Admin from "./routes/Admin";
import Boardgame from "./routes/Boardgame";
import Boardgames from "./routes/Boardgames";
import NewBoardgame from "./routes/NewBoardgame";
import Layout from "./components/Layout";

const Main = () => {

    const [boardgames, setBoardgames] = useState([])
    const [activities, setActivities] = useState([])
    const [users, setUsers] = useState([])
    const [user, setUser] = useState(null)

    const loadData = () => {
        bgService.getAll().then(bgs => {
            setBoardgames(bgs)
        })
        userService.getAll().then(usrs => {
            setUsers(usrs)
        })
        activityService.getAll().then(activities => {
            setActivities(activities.sort((a, b) => new Date(b.date) - new Date(a.date)))
        })
    }

    useEffect(() => {
        const userJSON = window.localStorage.getItem("lautapeliAppUser")
        if (userJSON && userJSON !== "undefined") {
            const user = JSON.parse(userJSON)
            api.setToken(user.token)
            loadData()
            setUser(user)
        }
    }, [])

    const addBg = (bg) => {
        const response = bgService.post(bg)

        toast.promise(response, {
            pending: "Adding boardgame",
            success: "Success",
            error: { render({data}) { return data.message }}
        })

        response.then(data => {
            // console.log("Received response to post: " + JSON.stringify(bg))
            setBoardgames(boardgames.concat(data.boardgame))
            addActivity(data.activity)
        }).catch(error => {
            console.log(error)
        })
    }

    const addActivity = (activity) => {
        setActivities([activity].concat(activities))
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
            loadData()
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
        setActivities([])
    }

    return (
        <Router>
            <Routes>
                <Route path="/" element={
                    <Layout user={user} handleLogout={handleLogout} />
                }>
                    <Route path="/" element={
                        <Home />
                    } />
                    <Route path="boardgames" element={
                        <Boardgames boardgames={boardgames} activities={activities} />
                    } >
                        <Route path="new" element={
                            <NewBoardgame addBoardgame={addBg} boardgames={boardgames} />
                        } />
                    </Route>
                    <Route path="boardgames/:boardgameId" element={
                        <Boardgame user={user} users={users} addActivity={addActivity}/>
                    } />
                    <Route path="login" element={
                        <Login user={user} handleLogin={handleLogin}/>
                    } />
                    <Route path="register" element={
                        <Register user={user} />
                    } />
                    <Route path="admin" element={
                        <Admin showError={toast} user={user}/>
                    } />
                    <Route path="*" element={
                        <p className="text-rose-500 text-2xl font-sans">Hmm yes the screen is made of screen</p>
                    } />
                </Route>
            </Routes>
        </Router>
    )
}

export default Main