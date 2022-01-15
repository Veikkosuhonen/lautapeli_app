import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import HeroSection from "../components/HeroSection"
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
        <>
            <HeroSection />
            <LoginForm handleLogin={handleLogin}/>
        </>
    )
}

export default Login