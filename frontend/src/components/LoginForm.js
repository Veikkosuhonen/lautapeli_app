import React from "react"

const LoginForm = ({
    handleSubmit,
    handleUsernameChange,
    handlePasswordChange,
    username,
    password
}) => (
    <div class="p-2">
        <h2 class="text-xl text-slate-300 my-4">Login</h2>
        <form onSubmit={handleSubmit} class="grid-cols-1 space-y-4 text-slate-400">
            <div class="flex flex-row space-x-1">
                <div class="basis-1/6">Username</div>
                <input 
                class="p-1 rounded bg-slate-800 border border-slate-700 focus:outline-none focus:outline-indigo-400 hover:outline-dashed hover:outline-indigo-600 outline-offset-2 "
                type="text"
                value={username}
                name="Username"
                onChange={handleUsernameChange}
                />
            </div>
            <div class="flex flex-row space-x-1">
                <div class="basis-1/6">Password</div>
                <input 
                class= "p-1 rounded bg-slate-800 border border-slate-700 focus:outline-none focus:outline-indigo-400 hover:outline-dashed hover:outline-indigo-600 outline-offset-2"
                type="password"
                value={password}
                name="Password"
                onChange={handlePasswordChange}
                />
            </div>
            <button type="submit" class="text-white bg-indigo-500 hover:bg-indigo-400 hover:shadow-md hover:shadow-indigo-300/40 px-4 py-1 rounded-md"
            >Login</button>
        </form>
    </div>
)

export default LoginForm