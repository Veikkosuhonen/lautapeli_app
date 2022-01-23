import "react-toastify/dist/ReactToastify.css"

import Routes from "./routes/Routes"
import { QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"
import queryClient from "./services/queryClient"
import useCurrentUser from "./hooks/useCurrentUser"

const App = () => {
    const { user, login, logout } = useCurrentUser()

    return (
        <QueryClientProvider client={queryClient}>
            <Routes 
                user={user}
                handleLogin={login}
                handleLogout={logout}
            /> 
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    )
}

export default App