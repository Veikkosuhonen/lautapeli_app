import React from "react"
import { NavLink } from "react-router-dom"
import { Disclosure } from "@headlessui/react"
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import { PuzzleIcon } from "@heroicons/react/solid"
import User from "./User"

const NavbarLink = ({ path, children }) => {
    return (
        <NavLink 
            className={({ isActive }) => isActive ? "px-2 py-1 rounded-md shadow-inner bg-sky-900/40 cursor-default" : "px-2 py-1 rounded-lg shadow-md bg-sky-300/10 hover:shadow-lg hover:bg-sky-300/20"}
            to={path}
        >{children}</NavLink>
    )
}

const Navbar = ({
    user
}) => {

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
                        <NavbarLink path="/">
                            <PuzzleIcon className="w-8 h-8 text-orange-400 m-1 mx-3" />
                        </NavbarLink>
                    </div>

                    <div className="hidden sm:block sm:ml-6 overflow-hidden p-1">
                        <div className="flex items-center space-x-4 text-slate-200">
                            { user && 
                            <NavbarLink path="/boardgames">
                                <h1 className="font-medium text-lg">Boardgames</h1>
                            </NavbarLink>
                            }
                            { user && 
                            <NavbarLink path="/playsessions">
                                <h1 className="font-medium text-lg">Playsessions</h1>
                            </NavbarLink>
                            }
                            { user && user.isAdmin && 
                            <NavbarLink path="/admin">
                                <h1 className="font-medium text-lg">Admin</h1>
                            </NavbarLink>
                            }
                            { !user && 
                            <NavbarLink path="/login">
                                <h1 className="font-medium text-lg">Login</h1>
                            </NavbarLink>
                            }
                            { !user && 
                            <NavbarLink path="/register">
                                <h1 className="font-medium text-lg">Register</h1>
                            </NavbarLink>
                            }
                            { user && 
                            <div className="flex flex-row items-center space-x-2">
                                <User user={user} />
                                <NavbarLink path="/logout">
                                    <h1 className="font-medium text-md">Logout</h1>
                                </NavbarLink>
                            </div>
                            }
                        </div>
                    </div>
                </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
                <div className="px-4 py-2 flex flex-col space-y-2 text-slate-200">
                    { user && 
                    <NavbarLink path="/boardgames">
                        <h1 className="font-normal text-lg py-2">Boardgames</h1>
                    </NavbarLink>
                    }
                    { user && user.isAdmin && 
                    <NavbarLink path="/admin">
                        <h1 className="font-normal text-lg py-2">Admin</h1>
                    </NavbarLink>
                    }
                    { !user && 
                    <NavbarLink path="/login">
                        <h1 className="font-normal text-lg py-2">Login</h1>
                    </NavbarLink>
                    }
                    { !user && 
                    <NavbarLink path="/register">
                        <h1 className="font-normal text-lg py-2">Register</h1>
                    </NavbarLink>
                    }
                    { user && 
                    <div className="flex flex-row items-center space-x-2 pt-4 pb-2">
                        <User user={user} />
                        <NavbarLink path="/logout">
                            <h1 className="font-medium text-md">Logout</h1>
                        </NavbarLink>
                    </div>
                    }
                </div>
            </Disclosure.Panel>
            </>)}
        </Disclosure>
    )
}

export default Navbar