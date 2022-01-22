import { useQuery } from "react-query"

import boardgameService from "../services/boardgameService"

const useBoardgame = (id) => {

    const queryKey = ["boardgame", Number(id)]

    const { data, ...rest } = useQuery(queryKey, async () => boardgameService.getOne(id))

    return { boardgame: data, ...rest }
}

export default useBoardgame;