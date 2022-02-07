import HeroSection from "../components/util/HeroSection"
import { NavLink } from "react-router-dom"
import Button from "../components/util/Buttons"

const NotFound = () => (
    <>
        <HeroSection>
            <h1>Hmm nothing to be found here...</h1>
        </HeroSection>
        <div className="mt-16 flex flex-row justify-center">
            <NavLink to="/">
                <Button >Go home</Button>
            </NavLink>
        </div>
    </>
)

export default NotFound