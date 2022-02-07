import {
    BrowserRouter,
    Routes as AllRoutes,
    Route,
    Navigate,
} from "react-router-dom";

import Layout from "../components/Layout";
import Home from "./Home";
import Boardgames from "./Boardgames";
import Boardgame from "../components/Boardgame";
import Login from "./Login";
import Register from "./Register";
import Admin from "./Admin";
import Logout from "./Logout";
import NotFound from "./NotFound";
import PlaySessions from "./PlaySessions";
import PlaySession from "./PlaySession";
import User from "./User";

const Routes = ({
    user, handleLogin, handleLogout
}) => (
    <BrowserRouter>
        <AllRoutes>
            <Route path="/" element={
                <Layout user={user} />
            }>
                <Route index element={
                    <Home user={user} />
                } />
                <Route path="shelf" element={
                    <Boardgames />
                } />
                <Route path="/boardgames" element={<Navigate to="/shelf" />} />
                <Route path="boardgames/:boardgameId/*" element={
                    <Boardgame user={user} />
                } />
                
                <Route path="playsessions" element={
                    <PlaySessions />
                } >
                    <Route path=":playSessionId" element={
                        <PlaySession />
                    } />
                </Route>
                <Route path="myprofile" element={<User />} />
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
    </BrowserRouter>
)

export default Routes