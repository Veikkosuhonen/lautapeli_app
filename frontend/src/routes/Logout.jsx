import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const Logout = ({
    handleLogout
}) => {
    const navigate = useNavigate()

    useEffect(() => {
        handleLogout()
        navigate("/")
    })
    
    return (
        <div>
            
        </div>
    )
}

export default Logout