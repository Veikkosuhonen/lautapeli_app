import { useState } from "react"
import { PencilIcon, CheckIcon, XIcon } from "@heroicons/react/outline"
import EditableParagraph from "../util/EditableParagraph"

const EditableDescription = ({
    newDescription, setNewDescription, oldDescription, handleUpdate
}) => {

    const [editing, setEditing] = useState(false)

    const descriptionEdited = oldDescription !== undefined && newDescription !== oldDescription

    return (
        <div className="flex flex-row w-full items-start gap-4 basis-1/3">
            <EditableParagraph 
                value={newDescription} 
                setValue={setNewDescription}
                disabled={!editing}
                placeholder={"No description available"}
                className={"flex-grow"}
                id="description"
            />
            { !editing ? 
            <button onClick={() => { setEditing(true) }} className="text-slate-400 hover:text-slate-200  p-2">
                <PencilIcon className="w-6 h-6"/>
            </button> 
            : <>
                <button 
                    disabled={!descriptionEdited}
                    onClick={() => { setEditing(false); handleUpdate() }}
                    className="text-slate-400 hover:text-slate-200  disabled:text-slate-600 p-2"
                >
                    <CheckIcon className="w-7 h-7"/>
                </button>
                <button 
                    onClick={() => { setEditing(false); setNewDescription(oldDescription) }}
                    className="text-slate-400 hover:text-slate-200 p-2"
                >
                    <XIcon className="w-7 h-7"/>
                </button>
            </>
            }
        </div>
    )
}

export default EditableDescription