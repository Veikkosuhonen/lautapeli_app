import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import HeroSection from "../components/HeroSection"
import RegisterForm from "../components/RegisterForm"
import api from "../services/api"

import toaster from "../util/toaster"

const Register = ({
    user
}) => {
    const navigate = useNavigate()
    
    useEffect(() => {
        if (user) {
            navigate("/")
        }
    })

    const handleRegister = (credentials) => {
        const response = api.post("/register", credentials)

        toaster.registerMessage(response)

        response.then(data => {
            navigate("/login")
        }).catch(error => {
            console.log(error.message)
        })
    }

    return (
        <>
            <HeroSection />
            <RegisterForm handleSubmit={handleRegister}/>
        </>
    )
}

export default Register