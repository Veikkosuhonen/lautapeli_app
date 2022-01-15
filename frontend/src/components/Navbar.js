import React from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { Disclosure } from "@headlessui/react"
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import { SecondaryButton } from "./util/Buttons"
import { PuzzleIcon } from "@heroicons/react/solid"
import User from "./User"

const NavbarLink = ({ path, children }) => {
    return (
        <NavLink 
            className={({ isActive }) => isActive ? "underline decoration-dashed decoration-indigo-600" : "hover:underline underline-offset-2 decoration-dashed decoration-indigo-400"}
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
        <Disclosure as="nav" className="bg-sky-700">
            {({ open }) => (<>
            <div className="max-w-auto mx-auto px-2 sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-between h-16">
                    { /* Mobile only */ }
                    <div className="flex items-center sm:hidden">
                        <Disclosure.Button className="text-slate-200">
                            { open ? (
                                <XIcon className="block h-8 w-8"/>
                                ) : (
                                <MenuIcon className="block h-8 w-8"/>
                            )}
                        </Disclosure.Button>
                    </div>

                    <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                        <PuzzleIcon className="w-7 h-7 text-orange-500 mr-2" />
                    </div>

                    <div className="hidden sm:block sm:ml-6 overflow-hidden p-1">
                        <div className="flex items-center space-x-4">
                            { user && 
                            <NavbarLink path="/boardgames">
                                <h1 className="text-slate-200 font-normal text-lg">Boardgames</h1>
                            </NavbarLink>
                            }
                            { user && user.isAdmin && 
                            <NavbarLink path="/admin">
                                <h1 className="text-slate-200 font-normal text-lg">Admin</h1>
                            </NavbarLink>
                            }
                            { !user && 
                            <NavbarLink path="/login">
                                <h1 className="text-slate-200 font-normal text-lg">Login</h1>
                            </NavbarLink>
                            }
                            { !user && 
                            <NavbarLink path="/register">
                                <h1 className="text-slate-200 font-normal text-lg">Register</h1>
                            </NavbarLink>
                            }
                            { user && 
                            <div className="flex flex-row items-center space-x-2">
                                <User user={user} />
                                <SecondaryButton content="logout" onClick={onLogout}/>
                            </div>
                            }
                        </div>
                    </div>
                </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
                <div className="px-4 py-2 flex flex-col space-y-2">
                    { user && 
                    <NavbarLink path="/boardgames">
                        <h1 className="text-slate-200 font-normal text-lg py-2">Boardgames</h1>
                    </NavbarLink>
                    }
                    { user && user.isAdmin && 
                    <NavbarLink path="/admin">
                        <h1 className="text-slate-200 font-normal text-lg py-2">Admin</h1>
                    </NavbarLink>
                    }
                    { !user && 
                    <NavbarLink path="/login">
                        <h1 className="text-slate-200 font-normal text-lg py-2">Login</h1>
                    </NavbarLink>
                    }
                    { !user && 
                    <NavbarLink path="/register">
                        <h1 className="text-slate-200 font-normal text-lg py-2">Register</h1>
                    </NavbarLink>
                    }
                    { user && 
                    <div className="flex flex-row items-center space-x-2 pt-4 pb-2">
                        <User user={user} />
                        <SecondaryButton content="logout" onClick={onLogout}/>
                    </div>
                    }
                </div>
            </Disclosure.Panel>
            </>)}
        </Disclosure>
    )
}

export default Navbar