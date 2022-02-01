import {
    BrowserRouter as Router,
    Routes as AllRoutes,
    Route
} from "react-router-dom";

import Layout from "../components/Layout";
import Home from "./Home";
import Boardgames from "./Boardgames";
import NewBoardgame from "./NewBoardgame";
import Boardgame from "../components/Boardgame";
import Login from "./Login";
import Register from "./Register";
import Admin from "./Admin";
import Logout from "./Logout";
import NotFound from "./NotFound";

const Routes = ({
    user, handleLogin, handleLogout
}) => (
    <Router>
        <AllRoutes>
            <Route path="/" element={
                <Layout user={user} />
            }>
                <Route path="/" element={
                    <Home user={user} />
                } />
                <Route path="boardgames" element={
                    <Boardgames />
                } >
                    <Route path="new" element={
                        <NewBoardgame />
                    } />
                </Route>
                <Route path="boardgames/:boardgameId" element={
                    <Boardgame user={user} />
                } />
                <Route path="login" element={
                    <Login user={user} handleLogin={handleLogin}/>
                } />
                <Route path="logout" element={
                    <Logout handleLogout={handleLogout}/>
                } />
                <Route path="register" element={
                    <Register user={user} />
                } />
                <Route path="admin" element={
                    <Admin user={user}/>
                } />
                <Route path="*" element={
                    <NotFound />
                } />
            </Route>
        </AllRoutes>
    </Router>
)

export default Routes