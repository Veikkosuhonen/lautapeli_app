import React from "react"
import { useState } from "react"
import { PrimaryButton } from "./util/Buttons"
import Surface from "./util/Surface"
import InputField from "./util/InputField"

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
            <Surface>
            <form 
                onSubmit={submitHandler}
                className="flex flex-col gap-2 m-1">
                    <div className="flex flex-row mb-4">
                        <h1 className="text-lg text-slate-100 font-medium">Login</h1>
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