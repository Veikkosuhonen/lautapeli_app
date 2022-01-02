import React from "react"
import { NavLink, useNavigate } from "react-router-dom"
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

    const navigate = useNavigate()

    const onLogout = () => {
        navigate("/login")
        handleLogout()
    }

    return (
        <div className="backdrop-blur bg-slate-700/40 border-b border-slate-700 
        sticky top-0 w-full p-4">
            <div className="flex flex-row items-end space-x-4">
                <div className="mr-auto">
                    <NavbarLink path="/">
                        <h1 className="text-2xl text-slate-300 font-thin">Lautapelit</h1>
                    </NavbarLink>
                </div>
                { user && user.isAdmin && 
                    <NavbarLink path="/admin">
                        <h2 className="text-xl text-slate-300 font-thin mr-4">Admin view</h2>
                    </NavbarLink> 
                }
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
                    <SecondaryButton onClick={onLogout} text="Logout"/>
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