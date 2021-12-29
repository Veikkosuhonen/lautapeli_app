import React from "react"

const PrimaryButton = ({
    text,
    type,
    onClick
}) => (
    <button
    className="text-slate-700 bg-orange-500 hover:bg-orange-400 hover:shadow-md hover:shadow-orange-400/40 px-4 py-1 rounded-md"
    type={type}
    onClick={onClick}
    >{text}</button>
)

const SecondaryButton = ({
    text,
    type,
    onClick
}) => (
    <button
    className="text-slate-700 bg-teal-500 hover:bg-teal-400 hover:shadow-md hover:shadow-teal-400/40 px-4 py-1 rounded-md"
    type={type}
    onClick={onClick}
    >{text}</button>
)

export {
    PrimaryButton,
    SecondaryButton
}