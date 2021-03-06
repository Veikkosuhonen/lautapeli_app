import React from "react"
import { NavLink } from "react-router-dom"
import Activities from "../components/Activities"
import Commits from "../components/Commits"
import ImageCarousel from "../components/ImageCarousel"
import HeroSection from "../components/util/HeroSection"
import useActivities from "../hooks/useActivities"
import useBoardgames from "../hooks/useBoardgames"
import useCommits from "../hooks/useCommits"
import useUsers from "../hooks/useUsers"

const Home = ({
    user
}) => {
    const { boardgames } = useBoardgames()
    const { activities } = useActivities()
    const { commits } = useCommits()
    const { users } = useUsers()
    
    const playSessions = boardgames?.map(boardgame => boardgame.playSessions.length).reduce((a, b) => a + b, 0)

    return (
        <div>
            <HeroSection>
                {user 
                ? <h1>Greetings, {user.name}</h1>
                : <h1>Welcome to the great lautapeli app</h1>
                }
            </HeroSection>

            { user && 
            <div className="px-2 pt-8 sm:pt-16 md:pt-24 lg:pt-8 flex flex-row justify-center">
                <div>
                    <span className="text-lg font-base text-slate-400">{user ? "Here is the latest status report:" : "Currently we have"}</span>
                    <div className="flex flex-row flex-wrap gap-2 text-slate-200 font-medium text-base sm:text-lg">
                        <span className="select-none rounded border border-slate-700 p-2">
                            {users ? users.length : "?"} users
                        </span>
                        <NavLink to="/boardgames" className="rounded border border-orange-500 text-orange-300 hover:bg-slate-800/50 p-2">
                            {boardgames ? boardgames.length : "?"} boardgames
                        </NavLink>
                        <NavLink to="/playsessions" className="rounded border border-emerald-600 text-emerald-400 hover:bg-slate-800/50 p-2">
                            {playSessions} games played
                        </NavLink>
                    </div>
                </div>
            </div>
            }

            <ImageCarousel />

            <div className="flex flex-col sm:flex-row justify-center pt-16 md:pt-20 px-2">
            {user ?
            <>
                <div className="w-full pb-8 sm:pb-0 sm:w-1/2 md:w-1/3">
                    <Activities activities={activities} itemsPerPage={5} />
                </div>
                <div className="w-full sm:w-1/2 md:w-1/3">
                    <Commits commits={commits} itemsPerPage={5} />
                </div>
            </> : 
                <div className="flex flex-col">
                    <h1 className="text-xl font-light text-slate-200 text-center">To get started,</h1>
                    <div className="text-lg font-medium text-slate-300">
                        <a className="text-indigo-500 hover:text-indigo-300" href="/login">Login</a> or <a className="text-indigo-500 hover:text-indigo-300" href="/register">Register</a>
                    </div>
                </div>
            }
            </div>
        </div>
    )
}

export default Home