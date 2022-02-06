import { Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import Navbar from "./Navbar"
import Footer from "./Footer"

const Layout = ({ user, handleLogout }) => (
    <>
        <ToastContainer position="top-center"/>
        <div className="flex flex-col min-h-screen">
            <Navbar user={user} handleLogout={handleLogout}/>
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    </>
)

export default Layout