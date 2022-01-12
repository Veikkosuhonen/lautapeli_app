import api from "./api";

const baseUrl = "/api/activities"

const getAll = () => {
    return api.get(baseUrl)
}

const activityService = { getAll }

export default activityService