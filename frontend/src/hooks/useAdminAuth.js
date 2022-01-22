import { useEffect } from "react"
import useCurrentUser from "./useCurrentUser"
import { useNavigate } from "react-router-dom"
import toaster from "../util/toaster"

const useAdminAuth = () => {
    const { user } = useCurrentUser()
    const navigate = useNavigate()

    useEffect(() => {
        if (!user || !user.isAdmin) {
            navigate("/")
            toaster.errorMessage("Sorry, you are not authorized to go there")
            return
        }
    }, [user, navigate])
}

export default useAdminAuth