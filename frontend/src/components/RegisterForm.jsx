import React, { useState } from "react"
import { PrimaryButton } from "./util/Buttons"
import Surface from "./util/Surface"
import InputField from "./util/InputField"
import { validation } from "../util/validation"
import { NavLink } from "react-router-dom"

const RegisterForm = ({
    handleSubmit
}) => {
    const [username, setUsername] = useState(""),
        [name, setName] = useState(""),
        [password, setPassword] = useState(""),
        [passwordConfirm, setPasswordConfirm] = useState(""),
        [code, setCode] = useState(""),
        
        [validUsername, setValidUsername] = useState(false),
        [validName, setValidName] = useState(false),
        [validPwd, setValidPwd] = useState(false),
        [validPwdConfirm, setValidPwdConfirm] = useState(false),
        [validCode, setValidCode] = useState(false)

    const isValid = () => {
        return validUsername && validName && validPwd && validPwdConfirm && validCode
    }

    const submitHandler = (event) => {
        event.preventDefault()
        if (isValid()) {
            handleSubmit({
                username, name, password, code
            })
        }
    }

    const validateUsername = validation(
        setValidUsername,
        (username) => username && username.length > 2 && username.length <= 20,
        "Should be between 3 and 20 characters"
    )

    const validateName = validation(
        setValidName,
        (username) => username && username.length > 2 && username.length <= 20,
        "Should be between 3 and 20 characters"
    )
    
    const validatePassword = validation(
        setValidPwd,
        (password) => password && password.length > 5 && password.length <= 40,
        "Should be between 3 and 20 characters"
    )

    const validatePasswordConfirm = validation(
        setValidPwdConfirm,
        (passwordConfirm) => passwordConfirm === password,
        "Passwords do not match!"
    )

    const validateCode = validation(
        setValidCode,
        (code) => code !== "",
        "Must not be empty"
    )

    return (
        <div className="flex flex-row justify-center py-2 px-6 w-full">
            <Surface className="w-4/5 sm:w-full sm:basis-2/3 md:basis-1/2 lg:basis:2/5">
                <form 
                onSubmit={submitHandler}
                className="flex flex-col gap-4 p-2">
                    <div className="flex flex-row pb-4 gap-x-2 items-end">
                        <h1 className="text-lg text-slate-100 font-medium mr-auto">Register</h1>
                        <span className="text-slate-200">Or</span>
                        <NavLink to="/login">
                            <span className="hidden sm:block text-indigo-400 font-medium hover:text-indigo-300">login with an existing account</span>
                            <span className="block sm:hidden text-indigo-400 font-medium hover:text-indigo-300">login</span>
                        </NavLink>
                    </div>
                    <div className="flex flex-row">
                        <InputField type="text" placeholder="username" value={username} 
                        onChange={(event) => {setUsername(event.target.value)}} 
                        autoComplete="off"
                        validation={validateUsername}/>
                    </div>
                    <div className="flex flex-row mb-4">
                        <InputField type="text" placeholder="name" value={name} 
                        onChange={(event) => {setName(event.target.value)}}
                        autoComplete="off"
                        validation={validateName}/>
                    </div>
                    <div className="flex flex-row">
                        <InputField type="password" placeholder="password" autoComplete="new-password" 
                        value={password} 
                        onChange={(event) => {setPassword(event.target.value)}}
                        validation={validatePassword}/>
                    </div>
                    <div className="flex flex-row mb-4">
                        <InputField type="password" placeholder="confirm password" value={passwordConfirm} 
                        onChange={(event) => {setPasswordConfirm(event.target.value)}}
                        validation={validatePasswordConfirm} />
                    </div>
                    <div className="flex flex-row mb-4">
                        <InputField type="number" placeholder="code" value={code} 
                        onChange={(event) => {setCode(event.target.value)}}
                        autoComplete="off"
                        validation={validateCode} />
                    </div>
                    <PrimaryButton type="submit" content="Register" disabled={!isValid()}/>
                </form>
            </Surface>
        </div>
    )
}

export default RegisterForm