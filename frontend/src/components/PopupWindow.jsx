import React, { useImperativeHandle, useState } from "react";
import Background from "./Background";
import Surface from "./Surface";
import { XIcon } from "@heroicons/react/solid";

const PopupWindow = React.forwardRef((props, ref) => {
    const [open, setOpen] = useState(false)

    const setVisible = (visible) => {
        setOpen(visible)
    }

    useImperativeHandle(ref, () => {
        return {
            setVisible
        }
    })

    return open ? (
        <Background>
            <div className="md:w-2/3 lg:w-1/2 mx-auto">
                <Surface>
                    <div className="grid grid-cols-1 grid-rows-1 gap-4">
                        <div className="grid grid-cols-2">
                            <h1 className="text-slate-300 text-lg font-light">
                                {props.title}
                            </h1>
                            <button className="text-slate-500 justify-self-end"
                            onClick={() => {setVisible(false)}}><XIcon className="h-5 w-5 text-slate-500"/></button>
                        </div>
                        {props.children}
                    </div>
                </Surface>
            </div>
        </Background>
    ) : (<></>)
})

export default PopupWindow