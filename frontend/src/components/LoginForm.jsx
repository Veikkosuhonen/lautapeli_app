import React from "react"
import { useState } from "react"
import { PrimaryButton } from "./util/Buttons"
import Surface from "./util/Surface"
import InputField from "./util/InputField"
import { NavLink } from "react-router-dom"
const LoginForm = ({
    handleLogin,
}) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const submitHandler = (event) => {
        event.preventDefault()
        handleLogin({ username, password })
    }

    return (
        <div className="flex flex-row justify-center py-2 px-6 w-full">
            <Surface className="w-4/5 sm:w-full sm:basis-1/2 md:basis-2/5 lg:basis:1/4">
                <form 
                    onSubmit={submitHandler}
                    className="flex flex-col gap-4 p-2 py-4"
                >
                    <div className="flex flex-row pb-4 gap-x-2 items-center">
                        <h1 className="text-lg text-slate-100 font-medium mr-auto">Login</h1>
                        <span className="hidden md:block text-slate-300">or</span>
                        <NavLink to="/register">
                            <span className="text-indigo-400 font-medium whitespace-nowrap hover:text-indigo-300">create a new account</span>
                        </NavLink>
                    </div>
                    <div className="flex flex-row">
                        <InputField type="text" placeholder="username" value={username} onChange={(event) => {setUsername(event.target.value)}} />
                    </div>
                    <div className="flex flex-row mb-4">
                        <InputField type="password" placeholder="password" autoComplete="current-password"
                        value={password} onChange={(event) => {setPassword(event.target.value)}} />
                    </div>
                    <PrimaryButton type="submit" content="Login" />

                    
                </form>
            </Surface>
        </div>
    )
}

export default LoginForm