import HeroSection from "../components/HeroSection"
import { NavLink } from "react-router-dom"
import { PrimaryButton } from "../components/util/Buttons"

const NotFound = () => (
    <>
        <HeroSection>
            <h1>Hmm nothing to be found here...</h1>
        </HeroSection>
        <div className="mt-16 flex flex-row justify-center">
            <NavLink to="/">
                <PrimaryButton content={"Go home"} />
            </NavLink>
        </div>
    </>
)

export default NotFound