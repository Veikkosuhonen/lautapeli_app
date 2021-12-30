import React, { useState } from "react"
import { PrimaryButton } from "./Buttons"
import Surface from "./Surface"

const InputField = ({
    type,
    placeholder,
    value,
    onChange
}) => (
    <input 
    className="p-1 
    text-slate-300
    rounded bg-slate-700 border border-slate-600 focus:outline-none focus:outline-indigo-400 hover:outline-dashed hover:outline-indigo-600 outline-offset-2 "
    type={type}
    value={value}
    placeholder={placeholder}
    onChange={onChange}
    />
)

const RegisterForm = ({
    handleSubmit
}) => {
    const [username, setUsername] = useState(""),
        [name, setName] = useState(""),
        [password, setPassword] = useState(""),
        [passwordConfirm, setPasswordConfirm] = useState(""),
        [code, setCode] = useState("")

    const submitHandler = (event) => {
        event.preventDefault()
        handleSubmit({
            username, name, password, code
        })
    }

    return (
        <div className="flex flex-col sm:p-2 md:w-full lg:w-1/3">
            <Surface>
                <form 
                onSubmit={submitHandler}
                className="flex flex-col gap-2">
                    <div className="flex flex-row">
                        <h1 className="text-lg text-slate-100 font-medium">Register</h1>
                    </div>
                    <div className="flex flex-row">
                        <InputField type="text" placeholder="username" value={username} onChange={(event) => {setUsername(event.target.value)}} />
                    </div>
                    <div className="flex flex-row mb-2">
                        <InputField type="text" placeholder="name" value={name} onChange={(event) => {setName(event.target.value)}} />
                    </div>
                    <div className="flex flex-row">
                        <InputField type="password" placeholder="password" value={password} onChange={(event) => {setPassword(event.target.value)}} />
                    </div>
                    <div className="flex flex-row mb-2">
                        <InputField type="password" placeholder="confirm password" value={passwordConfirm} onChange={(event) => {setPasswordConfirm(event.target.value)}} />
                    </div>
                    <div className="flex flex-row">
                        <InputField type="number" placeholder="code" value={code} onChange={(event) => {setCode(event.target.value)}} />
                    </div>
                    <PrimaryButton type="submit" text="Register"/>
                </form>
            </Surface>
        </div>
    )
}

export default RegisterForm