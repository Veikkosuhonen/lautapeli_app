import { Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import Navbar from "./Navbar"
import Footer from "./Footer"

const Layout = ({ user, handleLogout }) => (
    <>
        <Navbar user={user} handleLogout={handleLogout}/>
        <ToastContainer position="top-center"/>
        <Outlet />
        <Footer />
    </>
)

export default Layout