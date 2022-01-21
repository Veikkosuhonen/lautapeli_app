import React from "react"

import { useState, useEffect } from "react"

import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import loginService from "./services/loginService"
import api from "./services/api"

import Routes from "./routes/Routes"
import { QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"
import useBoardgames from "./hooks/useBoardgames"
import useUsers from "./hooks/useUsers"
import useActivities from "./hooks/useActivities"
import queryClient from "./services/queryClient"
import useAddBoardgame from "./hooks/useAddBoardgame"

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <Main/>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    )
}

const Main = () => {

    const boardgames = useBoardgames()
    const addBoardgameMutation = useAddBoardgame()
    const users = useUsers()
    const activities = useActivities()
    const [user, setUser] = useState(null)

    useEffect(() => {
        const userJSON = window.localStorage.getItem("lautapeliAppUser")
        if (userJSON && userJSON !== "undefined") {
            const user = JSON.parse(userJSON)
            api.setToken(user.token)
            setUser(user)
        }
    }, [])

    const addBoardgame = (boardgame) => {
        const response = addBoardgameMutation.mutateAsync(boardgame)

        toast.promise(response, {
            pending: "Adding boardgame",
            success: "Success",
            error: { render({data}) { return data.message }}
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
    }

    return (
        <Routes 
            user={user}
            activities={activities}
            boardgames={boardgames}
            users={users}
            addBoardgame={addBoardgame}
            addActivity={() => { }}
            handleLogin={handleLogin}
            handleLogout={handleLogout}
        /> 
    )
}

export default App