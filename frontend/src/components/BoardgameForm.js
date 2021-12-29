import React, { useState } from "react"
import { PrimaryButton } from "./Buttons"


const BoardgameForm = ({ 
    addBg,
}) => {
    const [newBg, setNewBg] = useState("")

    const submitHandler = (event) => {
        event.preventDefault()
        addBg(newBg)
        setNewBg("")
    }

    return (
        <form onSubmit={submitHandler} className="grid-rows-1 p-2 space-x-4 text-slate-200">
            <input 
            className="p-1 rounded placeholder-slate-500 bg-slate-700 border border-slate-600 focus:outline-none focus:outline-indigo-400 hover:outline-dashed hover:outline-indigo-600 outline-offset-2"
            placeholder="Boardgame name"
            value={newBg} onChange={event => {setNewBg(event.target.value)}}/>
            <PrimaryButton type="submit" text="add boardgame"/>
        </form>
    )
}

export default BoardgameForm