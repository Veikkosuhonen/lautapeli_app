import api from "../services/api"

const useCurrentUser = () => {
    
    const userJSON = window.localStorage.getItem("lautapeliAppUser")
    if (userJSON && userJSON !== "undefined") {
        const user = JSON.parse(userJSON)
        api.setToken(user.token)
        return user
    }
}

export default useCurrentUser;