import { NavLink } from "react-router-dom"

const links = [
    { path: "/", label: "Home" },
    { path: "/boardgames", label: "Boardgames" },
    { path: "/logout", label: "Logout" }
]

const FooterLink = ({ link }) => (
    <NavLink to={link.path}>
        <span className="text-slate-200 text-sm">{link.label}</span>
    </NavLink>
)

const Footer = () => (
    <div className="w-full -z-10 -mt-10">
        <svg xmlns="http://www.w3.org/2000/svg" id="visual" viewBox="0 0 900 600" version="1.1">
            <path d="M0 416L113 457L225 409L338 465L450 444L563 473L675 421L788 408L900 458L900 601L788 601L675 601L563 601L450 601L338 601L225 601L113 601L0 601Z" 
            fill="#f5730a"/>
            <path d="M0 499L113 498L225 487L338 468L450 440L563 436L675 498L788 476L900 462L900 601L788 601L675 601L563 601L450 601L338 601L225 601L113 601L0 601Z" 
            fill="#da5b09"/>
            <path d="M0 486L113 484L225 491L338 509L450 501L563 495L675 491L788 482L900 524L900 601L788 601L675 601L563 601L450 601L338 601L225 601L113 601L0 601Z" 
            fill="#be4407"/>
            <path d="M0 517L113 536L225 551L338 536L450 539L563 510L675 509L788 507L900 539L900 601L788 601L675 601L563 601L450 601L338 601L225 601L113 601L0 601Z" 
            fill="#b32f02"/>
            <path d="M0 577L113 549L225 562L338 546L450 549L563 570L675 576L788 554L900 545L900 601L788 601L675 601L563 601L450 601L338 601L225 601L113 601L0 601Z" 
            fill="#9a3412"/> {/* orange-800 */}
        </svg>

        <div className="bg-orange-800 pb-16 px-4">
            <div className="grid grid-cols-3 justify-center justify-items-center">
                {links.map((link, idx) => <FooterLink key={idx} link={link}/>)}
            </div>
        </div>

    </div>
)

export default Footer