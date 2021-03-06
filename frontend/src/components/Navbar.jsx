import React from "react"
import { NavLink } from "react-router-dom"
import { Disclosure, Transition } from "@headlessui/react"
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import classNames from "classnames"

const NavbarLink = ({ path, children }) => {
    return (
        <NavLink 
            className={({ isActive }) => classNames({
                "px-5 py-1": true,
                "cursor-default bg-transparent text-slate-300": isActive,
                "bg-sky-800/20 hover:bg-sky-600/20 sm:shadow-lg hover:shadow-xl hover:z-10": !isActive
            })}
            to={path}
        >
            <div className="font-medium text-lg whitespace-nowrap">
                {children}
            </div>
        </NavLink>
    )
}

const Navbar = ({
    user
}) => {

    return (
        <Disclosure as="nav" className="bg-slate-900">
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
                        <div className="flex divide-x-2 bg-sky-900/50 divide-slate-900 text-slate-200 rounded-lg overflow-hidden">
                            <div className="w-5"/>
                            <NavbarLink path="/">
                                <h1 className="font-medium text-lg">Home</h1>
                            </NavbarLink>
                        </div>
                    </div>

                    <div className="hidden sm:block sm:ml-6 overflow-hidden p-1">
                        <div className="flex items-center divide-x-2 bg-sky-900/50 divide-slate-900 text-slate-200 rounded-lg shadow-lg overflow-hidden">
                            { user && 
                            <NavbarLink path="/shelf">
                                Shelf
                            </NavbarLink>
                            }
                            { user && 
                            <NavbarLink path="/playsessions">
                                Game log
                            </NavbarLink>
                            }
                            { user && user.isAdmin && 
                            <NavbarLink path="/admin">
                                Admin
                            </NavbarLink>
                            }
                            { !user && 
                            <NavbarLink path="/login">
                                Login
                            </NavbarLink>
                            }
                            { !user && 
                            <NavbarLink path="/register">
                                Register
                            </NavbarLink>
                            }
                            { user && <>
                            <NavbarLink path="/myprofile">
                                <div className="flex flex-row gap-2 items-center">
                                    <span className="text-sm hidden lg:block">Logged in as</span>
                                    <h1 className="font-medium text-lg font-mono">{user.name}</h1>
                                </div>
                            </NavbarLink>
                            <NavbarLink path="/logout">
                                Logout
                            </NavbarLink>
                            </>}
                        </div>
                    </div>
                </div>
            </div>
            
            <Transition 
                enter="transition duration-200 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-150 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
            >
                <Disclosure.Panel className="sm:hidden px-4">
                    <div className="flex flex-col items-stretch w-2/3 divide-y-2 bg-sky-900/50 divide-slate-900 text-slate-200 rounded-lg shadow-lg overflow-hidden">
                        { user && 
                        <NavbarLink path="/shelf">
                            Shelf
                        </NavbarLink>
                        }
                        { user && 
                        <NavbarLink path="/playsessions">
                            Game log
                        </NavbarLink>
                        }
                        { user && user.isAdmin && 
                        <NavbarLink path="/admin">
                            Admin
                        </NavbarLink>
                        }
                        { !user && 
                        <NavbarLink path="/login">
                            Login
                        </NavbarLink>
                        }
                        { !user && 
                        <NavbarLink path="/register">
                            Register
                        </NavbarLink>
                        }
                        { user && <>
                        <NavbarLink path="/myprofile">
                            <h1 className="font-medium text-lg font-mono">{user.name}</h1>
                        </NavbarLink>
                        <NavbarLink path="/logout">
                            Logout
                        </NavbarLink>
                        </>}
                    </div>
                </Disclosure.Panel>
            </Transition>
            </>)}
        </Disclosure>
    )
}

export default Navbar