import React from "react"

const PrimaryButton = ({
    content,
    type,
    onClick,
    disabled
}) => (
    <button
    disabled={disabled}
    className="font-medium text-slate-800 
    bg-orange-500 hover:bg-orange-400 disabled:bg-orange-500/60 hover:shadow-md disabled:shadow-none hover:shadow-orange-400/40
    px-4 py-1 rounded-lg
    transition duration-100"
    type={type || "button"}
    onClick={onClick}
    >{content}</button>
)

const SecondaryButton = ({
    content,
    type,
    onClick
}) => (
    <button
    className="text-teal-500 outline outline-1 
    hover:outline-2 outline-teal-500 hover:shadow-md hover:shadow-teal-500/40
    px-4 py-1 rounded-lg
    transition duration-100"
    type={type || "button"}
    onClick={onClick}
    >{content}</button>
)

export {
    PrimaryButton,
    SecondaryButton
}