import React, { useEffect } from "react"

import { useNavigate } from "react-router-dom"

const Home = ({
    user,
}) => {

    const navigate = useNavigate()
    useEffect(() => {
        if (user) {
            navigate("/boardgames")
        }
    }, [user, navigate])

    return (
        <div className="grid grid-cols-1 space-y-2">
            <span className="text-slate-100 text-2xl">Welcome</span>
        </div>
    )
}

export default Home