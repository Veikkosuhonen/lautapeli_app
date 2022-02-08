import { useQuery } from "react-query"
import api from "../services/api"
import useCurrentUser from "./useCurrentUser"

const usePlaySession = (id, options) => {

    const queryKey = ["playSession", Number(id)]

    const { user } = useCurrentUser()

    const queryFn = async () => api.get("/playsessions/" + id)

    const { data, ...rest } = useQuery(queryKey, queryFn, {
        ...options,
        enabled: !!user?.token
    })

    return { playSession: data, ...rest }
}

export default usePlaySession;