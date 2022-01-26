import { Menu, Transition } from '@headlessui/react'
import { Fragment } from "react"
import { DotsHorizontalIcon } from '@heroicons/react/outline'

const OptionsDropDown = ({
    children
}) => {

    return (
        <div>
            <Menu as="div" className="relative">
                <Menu.Button>
                    <div className="p-1">
                        <DotsHorizontalIcon className="text-slate-500 hover:text-slate-200 w-5 h-5 md:w-7 md:h-7" />
                    </div>
                </Menu.Button>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="origin-top-right absolute right-0 mt-0 shadow-md p-2 bg-slate-800 rounded-md">
                        <Menu.Item>{children}</Menu.Item>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    )
}

export default OptionsDropDown