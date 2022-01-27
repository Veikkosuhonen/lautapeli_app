import React from "react"

const PrimaryButton = ({
    content,
    type,
    onClick,
    disabled,
}) => (
    <button
    disabled={disabled}
    className="font-medium text-slate-800 
    bg-orange-500 disabled:bg-orange-500/60 shadow-md hover:shadow-xl shadow-orange-500/50 disabled:shadow-none
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
    className="font text-orange-400 border-2 border-orange-500
    hover:bg-orange-500 hover:text-slate-700 hover:shadow-lg
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