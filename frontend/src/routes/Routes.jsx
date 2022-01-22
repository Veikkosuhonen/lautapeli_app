import {
    BrowserRouter as Router,
    Routes as AllRoutes,
    Route
} from "react-router-dom";

import Layout from "../components/Layout";
import Home from "./Home";
import Boardgames from "./Boardgames";
import NewBoardgame from "./NewBoardgame";
import Boardgame from "./Boardgame";
import Login from "./Login";
import Register from "./Register";
import Admin from "./Admin";
import Logout from "./Logout";
import NotFound from "./NotFound";

const Routes = ({
    user, activities, boardgames, users, handleLogin, handleLogout
}) => (
    <Router>
        <AllRoutes>
            <Route path="/" element={
                <Layout user={user} />
            }>
                <Route path="/" element={
                    <Home user={user} activities={activities} boardgames={boardgames} users={users}/>
                } />
                <Route path="boardgames" element={
                    <Boardgames boardgames={boardgames} activities={activities} />
                } >
                    <Route path="new" element={
                        <NewBoardgame boardgames={boardgames} />
                    } />
                </Route>
                <Route path="boardgames/:boardgameId" element={
                    <Boardgame user={user} users={users} />
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