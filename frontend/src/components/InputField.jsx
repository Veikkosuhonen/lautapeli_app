import React, { useState } from "react"
import { usePopperTooltip } from "react-popper-tooltip"
import 'react-popper-tooltip/dist/styles.css';

const InputField = ({
    type,
    placeholder,
    name,
    value,
    onChange,
    autoComplete,
    validation,
}) => {
    const [popoverVisible, setPopoverVisible] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    const {
        getArrowProps,
        getTooltipProps,
        setTooltipRef,
        setTriggerRef,
        visible,
    } = usePopperTooltip({
        trigger: null,
        placement: "bottom",
        closeOnOutsideClick: false,
        visible: popoverVisible,
        onVisibleChange: setPopoverVisible,
    });

    let className = "p-1 text-slate-300 w-full rounded bg-slate-700 border focus:outline-none focus:outline-indigo-400 hover:outline-dashed hover:outline-indigo-600 outline-offset-2 border-slate-600"
    if (errorMessage) {
        className += " outline outline-rose-500 focus:outline-rose-500"
    }

    const checkValidation = (value) => {
        if (typeof(validation) === "function") {
            const error = validation(value)
            if (error) {
                setErrorMessage(error)
                setPopoverVisible(true)
                setTimeout(() => {setPopoverVisible(false)}, 4000)
            } else {
                setErrorMessage("")
                setPopoverVisible(false)
            }
        }
    }

    return (
        <>
            <input 
            ref={setTriggerRef}
            className={className}
            name={name || placeholder}
            type={type}
            value={value}
            placeholder={placeholder}
            onChange={event => { onChange(event); checkValidation(event.target.value)}}
            autoComplete={autoComplete}
            />
            { visible && (
                <div
                ref={setTooltipRef}
                {...getTooltipProps({ className: 'tooltip-container' })}>
                    {errorMessage}
                    <div {...getArrowProps({ className: 'tooltip-arrow' })} />
                </div>
            )}
        </>
    )
}

export default InputField