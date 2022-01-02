import React, { useState } from "react"
import { PrimaryButton } from "./Buttons"
import InputField from "./InputField"
import { validation } from "../util/validation"

const BoardgameForm = ({ 
    addBg,
}) => {
    const [newBg, setNewBg] = useState("")
    const [valid, setValid] = useState(false)

    const submitHandler = (event) => {
        event.preventDefault()
        addBg(newBg)
        setNewBg("")
    }

    const validateName = validation(
        (name) => name !== "",
        setValid,
        "Name must not be empty"
    )

    return (
        <form onSubmit={submitHandler}>
            <div className="flex flex-col space-y-4 m-4">
                <h3 className="font-light text-xl text-slate-400">Add a new boardgame</h3>
                <InputField 
                placeholder="Boardgame name"
                value={newBg} onChange={event => {setNewBg(event.target.value)}}
                validation={validateName}/>
                <PrimaryButton type="submit" text="add boardgame" disabled={!valid}/>
            </div>
        </form>
    )
}

export default BoardgameForm