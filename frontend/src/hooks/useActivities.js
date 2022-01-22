import { useQuery } from "react-query"

import activityService from "../services/activityService"

const useActivities = () => {

    const queryKey = ["activities"]

    const { data, ...rest } = useQuery(queryKey, activityService.getAll)

    return { activities: data, ...rest }
}

export default useActivities;