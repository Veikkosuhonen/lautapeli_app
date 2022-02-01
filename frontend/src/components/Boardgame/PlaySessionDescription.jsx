import { Transition } from "@headlessui/react"
import { XIcon } from "@heroicons/react/solid"
import React, { useState, useImperativeHandle } from "react"
import styles from "../../util/styles"
import Surface from "../util/Surface"

const PlaySessionDescription = React.forwardRef((
    props, ref
) => {

    const [isOpen, setIsOpen] = useState(false)

    const toggleOpen = () => {
        setIsOpen(!isOpen)
    }

    useImperativeHandle(ref, () => ({ toggleOpen }))

    return (
        <div className="px-0 py-2 sm:px-2 sm:py-0">
            <Transition
                className="w-full"
                show={isOpen}
                enter="transition transform ease-out duration-300"
                enterFrom="scale-00"
                enterTo="scale-100"
                leave="transition-none"
                leaveFrom="scale-100"
                leaveTo="scale-0"
            >
                <Surface className="w-full">
                    <div className="flex flex-row justify-between items-center pb-2">
                        <span className="text-slate-300">Notes</span>
                        <button onClick={() => setIsOpen(false)}><XIcon className="text-slate-400 w-4 h-4"/></button>
                    </div>
                    <textarea 
                        className={styles.inputField}
                        value={props.value}
                        onChange={(event) => props.onChange(event.target.value)}
                        placeholder="so... what happened?"
                    />
                </Surface>
            </Transition>
        </div>
    )
})

export default PlaySessionDescription