import React, { useState } from "react"
import { PrimaryButton } from "./Buttons"
import InputField from "./InputField"
import { validation } from "../util/validation"
import PopupWindow from "./PopupWindow"

const BoardgameForm = ({ 
    addBg,
    popupWindowRef
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
        <PopupWindow ref={popupWindowRef} title="Add a new boardgame">
            <form onSubmit={submitHandler}>
                <div className="flex flex-col space-y-4 m-4">
                    <InputField 
                    placeholder="Boardgame name"
                    value={newBg} onChange={event => {setNewBg(event.target.value)}}
                    validation={validateName}/>
                    <PrimaryButton type="submit" content="add boardgame" disabled={!valid}/>
                </div>
            </form>
        </PopupWindow>
    )
}

export default BoardgameForm