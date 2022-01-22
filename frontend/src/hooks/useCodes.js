import { useQuery } from "react-query"

import adminService from "../services/adminService"

const useCodes = () => {

    const queryKey = ["codes"]

    const { data, ...rest } = useQuery(queryKey, adminService.getCodes)

    return { codes: data, ...rest }
}

export default useCodes;