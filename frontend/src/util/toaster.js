import { toast } from "react-toastify"

const loginMessage = (request) => {
    toast.promise(request, {
        pending: "Checking credentials",
        success: { render({data}) { return `Welcome back, ${data.name}!`} },
        error: { render({data}) { return data.message }}
    })
}

const registerMessage = (request) => {
    toast.promise(request, {
        pending: "Checking credentials",
        success: { render({data}) { return `Welcome, ${data.name}! You can now log in`} },
        error: { render({data}) { return data.message }}
    })
}

const boardgameAddMessage = (request) => {
    toast.promise(request, {
        pending: "Adding boardgame",
        success: "Success",
        error: { render({data}) { return data.message }}
    })
}

const playSessionAddMessage = (request) => {
    toast.promise(request, {
        pending: "Adding playsession",
        success: "Success",
        error: { render({data}) { return data.message }}
    })
}

const descriptionUpdateMessage = (request) => {
    toast.promise(request, {
        pending: "Updating...",
        success: "Description updated",
        error: { render({data}) { return data.message }}
    })
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
    errorMessage
}

export default toaster