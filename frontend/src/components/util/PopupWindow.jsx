import { Transition } from "@headlessui/react"
import { XIcon } from "@heroicons/react/outline"
import React, { useImperativeHandle, useState } from "react"

const PopupWindow = React.forwardRef((props, ref) => {

    const [isOpen, setIsOpen] = useState(false)

    const setOpen = (open) => {
        setIsOpen(open)
    }

    useImperativeHandle(ref, () => ({ setOpen }))

    return (
        <div className={"fixed w-full top-1/3 backdrop-blur-lg backdrop-brightness-50 shadow-lg " + (isOpen ? "h-full" : "")}>
            <Transition
                show={isOpen}
                enter="transition ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition ease-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="flex flex-row h-full items-start rounded-t-lg border-t-2 p-6 border-t-slate-600">
                    {props.children}
                    <button type="button" onClick={() => setIsOpen(false)}><XIcon className="w-6 h-6 sm:w-10 sm:h-10 text-slate-300"/></button>
                </div>
            </Transition>
        </div>
    )
})

export default PopupWindow