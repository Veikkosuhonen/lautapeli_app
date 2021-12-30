import React, { useState } from "react"

const InputField = ({
    type,
    placeholder,
    name,
    value,
    onChange,
    autoComplete,
    validation,
    onValidationError
}) => {
    const [touched, setTouched] = useState(false)

    let className = "p-1 text-slate-300 w-full rounded bg-slate-700 border focus:outline-none focus:outline-indigo-400 hover:outline-dashed hover:outline-indigo-600 outline-offset-2 border-slate-600"
    if (touched && typeof(validation) === "function") {
        const error = validation(value)
        if (error) {
            className += " outline outline-1 outline-rose-500 focus:outline-rose-500"
            typeof(validation) === "function" && onValidationError(error)
        }
    }

    return (
        <input 
        className={className}
        name={name || placeholder}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={event => { onChange(event); setTouched(true) }}
        autoComplete={autoComplete}
        />
    )
}

export default InputField