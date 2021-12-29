import React from "react"

const LoginForm = ({
    handleSubmit,
    handleUsernameChange,
    handlePasswordChange,
    username,
    password
}) => (
    <div className="p-2">
        <h2 className="text-xl text-slate-200 my-4">Login</h2>
        <form onSubmit={handleSubmit} className="grid-cols-1 space-y-4 text-slate-400">
            <div className="flex flex-row space-x-1">
                <div className="basis-1/6">Username</div>
                <input 
                className="p-1 rounded bg-slate-700 border border-slate-600 focus:outline-none focus:outline-indigo-400 hover:outline-dashed hover:outline-indigo-600 outline-offset-2 "
                type="text"
                value={username}
                name="Username"
                onChange={handleUsernameChange}
                />
            </div>
            <div className="flex flex-row space-x-1">
                <div className="basis-1/6">Password</div>
                <input 
                className= "p-1 rounded bg-slate-700 border border-slate-600 focus:outline-none focus:outline-indigo-400 hover:outline-dashed hover:outline-indigo-600 outline-offset-2"
                type="password"
                value={password}
                name="Password"
                onChange={handlePasswordChange}
                />
            </div>
            <button type="submit" className="text-white bg-indigo-500 hover:bg-indigo-400 hover:shadow-md hover:shadow-indigo-300/40 px-4 py-1 rounded-md"
            >Login</button>
        </form>
    </div>
)

export default LoginForm