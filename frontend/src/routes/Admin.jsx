import React, { useState } from "react";
import { PrimaryButton, SecondaryButton } from "../components/util/Buttons";
import Surface from "../components/util/Surface";
import HeroSection from "../components/HeroSection"
import useUsers from "../hooks/useUsers";
import toaster from "../util/toaster";
import useUpdateUser from "../hooks/useUpdateUser";
import useCodes from "../hooks/useCodes";
import useGenerateCode from "../hooks/useGenerateCode";

const Admin = () => {

    const { codes } = useCodes()
    const [usersVisible, setUsersVisible] = useState(false)
    const { users } = useUsers()

    const updateUser = useUpdateUser()
    const generateCode = useGenerateCode()

    const toggleDisabled = (user) => {
        if (!window.confirm("Are you sure you want to set disabled on user '" + user.name + "' to '" + !user.disabled + "'?"))
            return
        const response = updateUser({ ...user, disabled: !user.disabled })
        toaster.userDisableMessage(response)
    }

    const genCode = () => {
        const response = generateCode()
        toaster.generateCodeMessage(response)
    }

    const expirationTime = 3600 * 48
    const expirationStatus = (date) => {
        const diff = (date - Date.now()) / 1000
        if (diff + expirationTime < 0) {
            return "expired"
        } else {
            return "expires in " + ~~((expirationTime + diff)/60) + " minutes"
        }
    }

    return (
        <>
        <HeroSection><h1>Admin view</h1></HeroSection>
        <div className="p-2">
            <div className="grid md:grid-cols-3 sm:grid-cols-1 gap-4">
                <Surface>
                    <div className="flex flex-col space-y-2 p-2">
                        <h2 className="text-slate-300 text-xl">Codes</h2>
                        <PrimaryButton 
                        content="Generate new code"
                        onClick={genCode}
                        />
                        {codes?.map( code =>
                            <div key={code.code} className="flex flex-row space-x-2 items-center">
                                <p className="text-slate-200">{code.code}</p>
                                <div className="text-xs text-slate-400">{expirationStatus(code.date)}</div>
                            </div>
                        )}
                    </div>
                </Surface>
                <Surface className="md:col-span-2 xl:col-span-1 overflow-auto">
                    <div className="flex flex-col space-y-2 p-0 sm:p-2">
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
        </>
    )
}

export default Admin