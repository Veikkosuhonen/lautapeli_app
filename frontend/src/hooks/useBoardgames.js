import { useQuery } from "react-query"

import bgService from "../services/boardgameService"
import useCurrentUser from "./useCurrentUser"

const useBoardgames = () => {

    useCurrentUser()

    const queryKey = ["boardgames"]

    const { data, ...rest } = useQuery(queryKey, bgService.getAll)

    return { data, ...rest }
}

export default useBoardgames;