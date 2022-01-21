import React, { useState } from "react"
import { multiValidation } from "../util/validation"
import InputField from "../components/util/InputField"
import { PrimaryButton } from "../components/util/Buttons"
import Surface from "../components/util/Surface"
import { NavLink } from "react-router-dom"
import { XIcon } from "@heroicons/react/solid"
import EditableParagraph from "../components/util/EditableParagraph"


export default function NewBoardgame({
    addBoardgame, boardgames
}) {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [valid, setValid] = useState(false)

    const submitHandler = (event) => {
        event.preventDefault()
        addBoardgame({ name, description })
        setName("")
    }

    const validateName = multiValidation(
        setValid,
        {
            condition: (name) => name !== "",
            message: "Name must not be empty"
        },
        {
            condition: (name) => !boardgames.data.some(board => board.name === name),
            message: "Boardgame already exists"
        }
    )

    return (
        <Surface className="py-6 px-6 mb-4">
            <div className="flex flex-col space-y-4 justify-center">
                <div className="flex flex-row">
                    <h2 className="text-slate-200 text-base text-center mr-auto items-center">New boardgame</h2>
                    <NavLink to="/boardgames">
                        <XIcon className="text-slate-400 w-6 h-6 hover:text-slate-200"/>
                    </NavLink>
                </div>
                <form onSubmit={submitHandler}>
                    <div className="flex flex-col gap-4">
                        <InputField 
                            placeholder="Boardgame name"
                            value={name} 
                            onChange={event => {setName(event.target.value)}}
                            validation={validateName}
                            autoComplete="off"
                        />
                        <EditableParagraph 
                            value={description} 
                            setValue={setDescription} 
                            placeholder="description (optional)"
                            className="sm:text-base"
                        />
                        <PrimaryButton type="submit" content="add boardgame" disabled={!valid}/>
                    </div>
                </form>
            </div>
        </Surface>
    )
};
