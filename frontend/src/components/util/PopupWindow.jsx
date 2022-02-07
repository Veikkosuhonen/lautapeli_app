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
        <Transition
            className="fixed w-full bottom-0 right-0 backdrop-blur-lg backdrop-brightness-50 shadow-lg z-10 h-2/3"
            show={isOpen}
            enter="transition transform ease-out duration-100"
            enterFrom="translate-y-full"
            enterTo="translate-y-0"
            leave="transition transform ease-in duration-100"
            leaveFrom="translate-y-0"
            leaveTo="translate-y-full"
        >
            <button type="button" onClick={() => setIsOpen(false)}
                className="fixed right-2 pt-2"
            >
                <XIcon className="w-6 h-6 sm:w-8 sm:h-8 text-slate-500 hover:text-slate-300"/>
            </button>
            <div className="rounded-t-lg border-t-2 border-t-slate-600 h-full">
                <div className="h-full overflow-y-auto py-8">
                    {props.children}
                </div>
            </div>
        </Transition>
    )
})

export default PopupWindow