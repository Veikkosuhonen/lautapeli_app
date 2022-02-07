import { ExclamationIcon } from "@heroicons/react/outline";
import HeroSection from "../components/util/HeroSection";

const UnderConstruction = () => (
    <>
    <HeroSection />
    <div className="flex gap-2 items-center justify-center text-orange-400 text-xl text-center w-full">
        <ExclamationIcon className="w-7 h-7"/>
        This page is under construction!
        <ExclamationIcon className="w-7 h-7" />
    </div>
    </>
)

export default UnderConstruction