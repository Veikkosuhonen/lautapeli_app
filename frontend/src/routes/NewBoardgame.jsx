import React, { useState } from "react"
import { multiValidation } from "../util/validation"
import InputField from "../components/util/InputField"
import { PrimaryButton } from "../components/util/Buttons"
import Surface from "../components/util/Surface"


export default function NewBoardgame({
    addBoardgame, boardgames
}) {
    const [name, setName] = useState("")
    const [valid, setValid] = useState(false)

    const submitHandler = (event) => {
        event.preventDefault()
        addBoardgame(name)
        setName("")
    }

    const validateName = multiValidation(
        setValid,
        {
            condition: (name) => name !== "",
            message: "Name must not be empty"
        },
        {
            condition: (name) => !boardgames.some(board => board.name === name),
            message: "Boardgame already exists"
        }
    )

    return (
        <div className="p-2">
            <Surface className="px-4 py-6 sm:px-6">
                <div className="flex flex-col space-y-4 justify-center max-w-lg">
                    <h2 className="text-slate-400 text-lg text-center">New boardgame</h2>
                    <form onSubmit={submitHandler}>
                        <div className="flex flex-col space-y-4">
                            <InputField 
                                placeholder="Boardgame name"
                                value={name} 
                                onChange={event => {setName(event.target.value)}}
                                validation={validateName}
                            />
                            <PrimaryButton type="submit" content="add boardgame" disabled={!valid}/>
                        </div>
                    </form>
                </div>
            </Surface>
        </div>
    )
};
