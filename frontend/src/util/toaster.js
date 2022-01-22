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
        "Adding playsession",
        "Success"
    )
}

const descriptionUpdateMessage = (request) => {
    promise(request, 
        "Updating...",
        "Description updated",
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
    toast(error)
}

const toaster = {
    loginMessage,
    registerMessage,
    boardgameAddMessage,
    playSessionAddMessage,
    descriptionUpdateMessage,
    userDisableMessage,
    generateCodeMessage,
    errorMessage
}

export default toaster