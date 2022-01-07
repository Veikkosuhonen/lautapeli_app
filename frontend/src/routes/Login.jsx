import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import LoginForm from "../components/LoginForm"

const Login = ({
    user,
    handleLogin
}) => {
    const navigate = useNavigate()

    useEffect(() => {
        if (user) {
            navigate("/")
        }
    })
    
    return (
        <LoginForm handleLogin={handleLogin}/>
    )
}

export default Login