import { useQuery } from "react-query"

import activityService from "../services/activityService"
import useCurrentUser from "./useCurrentUser"

const useActivities = () => {

    useCurrentUser()

    const queryKey = ["activities"]

    const { data, ...rest } = useQuery(queryKey, activityService.getAll)

    return { data, ...rest }
}

export default useActivities;