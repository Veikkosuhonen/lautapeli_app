import { ExclamationIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";
import HeroSection from "../components/util/HeroSection";
import Button from "./util/Buttons";

const UnderConstruction = () =>  {

    return (
        <>
        <HeroSection />
        <div className="flex gap-2 items-center justify-center text-orange-400 text-xl text-center w-full">
            <ExclamationIcon className="w-7 h-7"/>
            This page is under construction!
            <ExclamationIcon className="w-7 h-7" />
        </div>
        <div className="flex w-full justify-center pt-8">
            <Button><Link to={-1}>Go back</Link></Button>
        </div>
        </>

    )
}

export default UnderConstruction