import React from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { Disclosure } from "@headlessui/react"
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import { SecondaryButton } from "./Buttons"

const NavbarLink = ({ path, children }) => {
    return (
        <NavLink className={({ isActive }) => isActive ? "underline decoration-dashed decoration-indigo-600" : "hover:underline decoration-dashed decoration-indigo-400"}
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
        <Disclosure as="nav" className="backdrop-blur backdrop-brightness-75 bg-slate-700/50 mb-4">
            {({ open }) => (<>
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-between h-16">
                    { /* Mobile only */ }
                    <div className="flex items-center sm:hidden">
                        <Disclosure.Button className="text-slate-400">
                            { open ? (
                                <XIcon className="block h-10 w-10"/>
                                ) : (
                                <MenuIcon className="block h-10 w-10"/>
                            )}
                        </Disclosure.Button>
                    </div>

                    <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                        <h1 className="text-slate-500 font-normal text-4xl">Lautapelit</h1>
                    </div>

                    <div className="hidden sm:block sm:ml-6">
                        <div className="flex space-x-4">
                            { user && 
                            <NavbarLink path="/">
                                <h1 className="text-slate-300 font-normal text-xl">Home</h1>
                            </NavbarLink>
                            }
                            { user && user.isAdmin && 
                            <NavbarLink path="/admin">
                                <h1 className="text-slate-300 font-normal text-xl">Admin</h1>
                            </NavbarLink>
                            }
                            { !user && 
                            <NavbarLink path="/login">
                                <h1 className="text-slate-300 font-normal text-xl">Login</h1>
                            </NavbarLink>
                            }
                            { !user && 
                            <NavbarLink path="/register">
                                <h1 className="text-slate-300 font-normal text-xl">Register</h1>
                            </NavbarLink>
                            }
                            { user && 
                                <SecondaryButton content="logout" onClick={onLogout}/>
                            }
                        </div>
                    </div>
                </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
                <div className="px-4 py-4 space-y-2 flex flex-col">
                    { user && 
                    <NavbarLink path="/">
                        <h1 className="text-slate-300 font-normal text-xl">Home</h1>
                    </NavbarLink>
                    }
                    { user && user.isAdmin && 
                    <NavbarLink path="/admin">
                        <h1 className="text-slate-300 font-normal text-xl">Admin</h1>
                    </NavbarLink>
                    }
                    { !user && 
                    <NavbarLink path="/login">
                        <h1 className="text-slate-300 font-normal text-xl">Login</h1>
                    </NavbarLink>
                    }
                    { !user && 
                    <NavbarLink path="/register">
                        <h1 className="text-slate-300 font-normal text-xl">Register</h1>
                    </NavbarLink>
                    }
                    { user && 
                        <SecondaryButton content="logout" onClick={onLogout}/>
                    }
                </div>
            </Disclosure.Panel>
            </>)}
        </Disclosure>
    )
}

export default Navbar