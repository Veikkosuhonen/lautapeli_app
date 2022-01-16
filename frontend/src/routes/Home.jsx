import React from "react"
import Activities from "../components/Activities"
import HeroSection from "../components/HeroSection"

const Home = ({
    user, activities, users, boardgames
}) => {

    const playSessions = boardgames.map(boardgame => boardgame.playSessions.length).reduce((a, b) => a + b, 0)

    return (
        <div>
            <HeroSection>
                {user 
                ? <h1>Greetings, {user.name}</h1>
                : <h1>Welcome to the great lautapeli app</h1>
                }
                <span className="text-lg font-base text-slate-300">{user ? "Here is the latest status report:" : "Currently we have"}</span>
                <div className="flex flex-row flex-wrap gap-2 text-slate-200 font-medium text-base sm:text-lg">
                    <span className="rounded border border-slate-700 p-2">
                        {users ? users.length : "?"} users
                    </span>
                    <span className="rounded border border-slate-700 p-2">
                        {boardgames ? boardgames.length : "?"} boardgames
                    </span>
                    <span className="rounded border border-slate-700 p-2">
                        {playSessions} games played
                    </span>
                </div>
            </HeroSection>
            <div className="flex flex-row justify-center pt-16 sm:pt-24 md:pt-40 lg:pt-24">
                <div className="w-full sm:w-1/2">
                    <Activities activities={activities} itemsPerPage={5} />
                </div>
            </div>
        </div>
    )
}

export default Home