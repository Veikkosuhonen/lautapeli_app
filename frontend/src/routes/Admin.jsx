import React, { useEffect, useState } from "react";
import { PrimaryButton, SecondaryButton } from "../components/Buttons";
import Surface from "../components/Surface";
import adminService from "../services/adminService";
import userService from "../services/userService"

const Admin = ({ user, showError }) => {
    const [codes, setCodes] = useState([])
    const [usersVisible, setUsersVisible] = useState(false)
    const [users, setUsers] = useState([])

    useEffect(() => {
        if (!user) return // user credentials not yet loaded
        adminService.getCodes().then(codes => {
            setCodes(codes.sort((c1, c2) => c2.date - c1.date))
        }).catch(error => {
            showError(error.message)
            setCodes([])
        })
    }, [user, showError])

    useEffect(() => {
        if (!user) return // user credentials not yet loaded
        userService.getAll().then(users => {
            setUsers(users)
        }).catch(error => {
            showError(error.message)
            setUsers([])
        })
    }, [user, showError])

    const toggleDisabled = (user) => {
        if (!window.confirm("Are you sure you want to set disabled on user '" + user.name + "' to '" + !user.disabled + "'?"))
            return
        userService.put(user.id, { disabled: !user.disabled }).then(data => {
            console.log("Ok, user's disabled status set to " + data.disabled)
            setUsers(users.map(u => u.id === user.id
                ? {
                    ...u,
                    disabled: data.disabled
                }: u
            ))
        }).catch(error => {
            showError(error.message)
        })
    }

    const genCode = () => {
        adminService.genCode().then(code => {
            setCodes(codes.concat(code).sort((c1, c2) => c2.date - c1.date))
        }).catch(error => {
            showError(error.message)
        })
    }

    const expirationStatus = (date) => {
        const diff = (date - Date.now()) / 1000
        if (diff + 120 < 0) {
            return "expired"
        } else {
            return "expires in " + (120 + diff) + " seconds"
        }
    }

    return (
        <div className="p-2">
            <h1 className="text-slate-100 text-2xl mb-4">Admin view</h1>
            <div className="grid md:grid-cols-3 sm:grid-cols-1 gap-x-4">
                <Surface>
                    <div className="flex flex-col space-y-2 bg-slate-800 p-2">
                        <h2 className="text-slate-300 text-xl">Codes</h2>
                        <PrimaryButton 
                        content="Generate new code"
                        onClick={genCode}
                        />
                        {codes.map( code =>
                            <div key={code.code} className="flex flex-row space-x-2 items-center">
                                <p className="text-slate-200">{code.code}</p>
                                <div className="text-xs text-slate-400">{expirationStatus(code.date)}</div>
                            </div>
                        )}
                    </div>
                </Surface>
                <Surface className="md:col-span-2 xl:col-span-1 overflow-auto">
                    <div className="flex flex-col space-y-2 bg-slate-800 p-0 sm:p-2">
                        <h2 className="text-slate-300 text-xl">Users</h2>
                        <SecondaryButton content={ usersVisible ? "hide users" : "show users"}
                        onClick={() => { setUsersVisible(!usersVisible)} } 
                        />
                        { usersVisible && 
                        <table className="divide-y divide-slate-600">
                            <thead>
                                <tr>
                                    <th scope="col" className="uppercase text-slate-600 text-xs font-medium px-4 py-2 text-left">Id</th>
                                    <th scope="col" className="uppercase text-slate-600 text-xs font-medium px-4 py-2 text-left">Name</th>
                                    <th scope="col" className="uppercase text-slate-600 text-xs font-medium px-4 py-2 text-left">Username</th>
                                    <th scope="col" className="uppercase text-slate-600 text-xs font-medium px-4 py-2 text-left">Disabled</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700">
                                {users.map( user => 
                                    <tr key={user.id} 
                                    className="hover:cursor-pointer hover:outline-dashed hover:outline-indigo-600"
                                    onClick={() => { toggleDisabled(user)}}
                                    >
                                        <td className="px-4 py-2 text-slate-400">{user.id}</td>
                                        <td className="px-4 py-2 text-slate-400">{user.name}</td>
                                        <td className="px-4 py-2 text-slate-400">{user.username}</td>
                                        <td className="px-4 py-2 text-slate-400">{user.disabled ? "true" : "false"}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        }
                    </div>
                </Surface>
            </div>
        </div>
    )
}

export default Admin