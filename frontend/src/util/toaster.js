import { toast } from "react-toastify"

const promise = (request, pending, success) => {
    toast.promise(request, {
        pending,
        success,
        error: { render({data}) { return data.message }}
    })
}

const loginMessage = (request) => {
    promise(request, 
        "Checking credentials", 
        { render({data}) { return `Welcome back, ${data.name}!`} },
    )
}

const registerMessage = (request) => {
    promise(request, 
        "Checking credentials",
        { render({data}) { return `Welcome, ${data.name}! You can now log in`} }
    )
}

const boardgameAddMessage = (request) => {
    promise(request, 
        "Adding boardgame",
        "Success",
    )
}

const playSessionAddMessage = (request) => {
    promise(request, 
        "Adding playsession...",
        "Success"
    )
}

const playSessionEditMessage = (request) => {
    promise(request, 
        "Editing playsession...",
        "Success"
    )
}

const descriptionUpdateMessage = (request) => {
    promise(request, 
        "Updating...",
        "Description updated",
    )
}

const deleteBoardgameMessage = (request) => {
    promise(request,
        "Deleting...",
        "Success"    
    )
}

const deletePlaySessionMessage = (request) => {
    promise(request, 
        "Deleting...",
        "Ok, that session is gone"
    )
}

const userDisableMessage = (request) => {
    promise(request, 
        "Update disabled state...",
        "Success",
    )
}

const generateCodeMessage = (request) => {
    promise(request, 
        "Generating code...",
        "Success",
    )
}

const errorMessage = (error) => {
    toast.error(error)
}

const toaster = {
    loginMessage,
    registerMessage,
    boardgameAddMessage,
    playSessionAddMessage,
    playSessionEditMessage,
    descriptionUpdateMessage,
    deleteBoardgameMessage,
    deletePlaySessionMessage,
    userDisableMessage,
    generateCodeMessage,
    errorMessage
}

export default toaster