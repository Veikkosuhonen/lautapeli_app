import { useQuery } from "react-query"

import boardgameService from "../services/boardgameService"

const useBoardgames = () => {

    const queryKey = ["boardgames"]

    const { data, ...rest } = useQuery(queryKey, boardgameService.getAll)

    return { boardgames: data, ...rest }
}

export default useBoardgames;