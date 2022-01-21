import "react-toastify/dist/ReactToastify.css"

import Routes from "./routes/Routes"
import { QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"
import useBoardgames from "./hooks/useBoardgames"
import useUsers from "./hooks/useUsers"
import useActivities from "./hooks/useActivities"
import queryClient from "./services/queryClient"
import useCurrentUser from "./hooks/useCurrentUser"

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <Main/>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    )
}

const Main = () => {

    const boardgames = useBoardgames()
    const users = useUsers()
    const activities = useActivities()
    const { user, login, logout } = useCurrentUser()

    return (
        <Routes 
            user={user}
            activities={activities}
            boardgames={boardgames}
            users={users}
            addActivity={() => { }}
            handleLogin={login}
            handleLogout={logout}
        /> 
    )
}

export default App