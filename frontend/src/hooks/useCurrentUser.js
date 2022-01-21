import { useEffect, useState } from "react"
import api from "../services/api"
import loginService from "../services/loginService"
import toaster from "../util/toaster"

const useCurrentUser = () => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const userJSON = window.localStorage.getItem("lautapeliAppUser")
        if (userJSON && userJSON !== "undefined") {
            const user = JSON.parse(userJSON)
            api.setToken(user.token)
            setUser(user)
        }
    }, [])

    const login = (credentials) => {
        console.log("Logging in...")
        const response = loginService.login(credentials)
        
        toaster.loginMessage(response)

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

    const logout = () => {
        console.log("...logging out")
        window.localStorage.removeItem("lautapeliAppUser")
        api.setToken(null)
        setUser(null)
    }

    return { user, login, logout}
}

export default useCurrentUser;