import React from "react"

import { useState, useEffect } from "react"

import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import bgService from "./services/boardgameService"
import loginService from "./services/loginService"
import userService from "./services/userService";
import activityService from "./services/activityService"
import api from "./services/api"

import Routes from "./routes/Routes"
import { QueryClientProvider, QueryClient } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"
import useBoardgames from "./hooks/useBoardgames"

const queryClient = new QueryClient()

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <Main/>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    )
}

const Main = () => {

    //const queryClient = useQueryClient()

    const boardgames = useBoardgames()
    const [activities, setActivities] = useState([])
    const [users, setUsers] = useState([])
    const [user, setUser] = useState(null)

    const loadData = () => {
        //bgService.getAll().then(bgs => {
        //    setBoardgames(bgs)
        //}).catch(error => { toast(error.message || "Error: " + error.status) })
        userService.getAll().then(usrs => {
            setUsers(usrs)
        }).catch(error => { toast(error.message || "Error: " + error.status) })
        activityService.getAll().then(activities => {
            setActivities(activities.sort((a, b) => new Date(b.date) - new Date(a.date)))
        }).catch(error => { toast(error.message || "Error: " + error.status) })
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

    const addBoardgame = (bg) => {
        const response = bgService.post(bg)

        toast.promise(response, {
            pending: "Adding boardgame",
            success: "Success",
            error: { render({data}) { return data.message }}
        })

        response.then(data => {
            // console.log("Received response to post: " + JSON.stringify(bg))
            //setBoardgames(boardgames.concat(data.boardgame))
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
        //setBoardgames([])
        setActivities([])
    }

    return (
        <Routes 
            user={user}
            activities={activities}
            boardgames={boardgames}
            users={users}
            addBoardgame={addBoardgame}
            addActivity={addActivity}
            handleLogin={handleLogin}
            handleLogout={handleLogout}
        /> 
    )
}

export default App