import React from "react"
import { NavLink } from "react-router-dom"
import { SecondaryButton } from "./Buttons"

const NavbarLink = ({ path, children }) => {
    return (
        <NavLink className={({ isActive }) => isActive ? "underline decoration-indigo-600" : "hover:underline decoration-dashed decoration-indigo-600"}
        to={path}
        >{children}</NavLink>
    )
}

const Navbar = ({
    user,
    handleLogout
}) => {
    return (
        <div className="backdrop-blur-sm bg-slate-700/30 border-b border-slate-700 
        sticky top-0 w-full p-4">
            <div className="flex flex-row items-end space-x-4">
                <div className="mr-auto">
                    <NavbarLink path="/">
                        <h1 className="text-2xl text-slate-300 font-thin">Lautapelit</h1>
                    </NavbarLink>
                </div>
                { user && 
                <>
                    <h2 className="text-l text-slate-500 font-thin">logged in as</h2>
                    <NavbarLink path="/">
                        <h2 className="text-xl text-slate-300 font-thin">{user.name}</h2>
                    </NavbarLink>
                </>
                }
                { user && 
                <div className="">
                    <SecondaryButton onClick={handleLogout} text="Logout"/>
                </div>
                }
                { !user && 
                    <NavbarLink path="/login">
                        <h2 className="text-xl text-slate-400 font-thin">login</h2>
                    </NavbarLink>
                }
                { !user && 
                    <NavbarLink path="/register">
                        <h2 className="text-xl text-slate-400 font-thin">register</h2>
                    </NavbarLink>
                }
            </div>
        </div>
    )
}

export default Navbar