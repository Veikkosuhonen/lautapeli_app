import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import RegisterForm from "./components/RegisterForm"

const Register = ({
    user,
    handleRegister
}) => {
    const navigate = useNavigate()
    
    useEffect(() => {
        if (user) {
            navigate("/")
        }
    })

    return (
        <RegisterForm handleSubmit={handleRegister}/>
    )
}

export default Register