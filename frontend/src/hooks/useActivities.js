import { useQuery } from "react-query"
import activityService from "../services/activityService"

const sortByDate = (data) => data.sort((a, b) => new Date(b.date) - new Date(a.date))

const useActivities = () => {

    const queryKey = ["activities"]

    const { data, ...rest } = useQuery(queryKey, activityService.getAll, {
        select: sortByDate
    })

    return { activities: data, ...rest }
}

export default useActivities;