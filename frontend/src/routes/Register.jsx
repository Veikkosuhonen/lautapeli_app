import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import HeroSection from "../components/HeroSection"
import RegisterForm from "../components/RegisterForm"

import registerService from '../services/registerService'
import { toast } from "react-toastify"

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
        console.log("Registering " + JSON.stringify(credentials))
        const response = registerService.register(credentials)

        toast.promise(response, {
            pending: "Checking credentials",
            success: { render({data}) { return `Welcome, ${data.name}! You can now log in`} },
            error: { render({data}) { return data.message }}
        })

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