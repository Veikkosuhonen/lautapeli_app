import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline"
import { useState } from "react"
import { NavLink } from "react-router-dom"

export default function Activities({
    activities
}) {

    const [page, setPage] = useState(0)
    const itemsPerPage = 4
    const pages = Math.ceil(activities.length / itemsPerPage)
    const start = Math.min(page * itemsPerPage, activities.length)
    const end = Math.min((page + 1) * itemsPerPage, activities.length)

    return (
        <div className="p-2 basis-2/5 overflow-hidden">
            <div className="flex flex-row space-x-2 items-center pb-4">
                <h1 className="text-md font-normal text-slate-400 pr-4">Recent activity</h1>
                <button className="text-slate-400 hover:text-slate-300 disabled:text-slate-600"
                    disabled={page === 0}
                    onClick={() => {setPage(page - 1)}}
                >
                    <ChevronLeftIcon className="w-6 h-6"/>
                </button>
                <span className="text-sm text-slate-500">{page + 1}/{pages}</span>
                <button className="text-slate-400 hover:text-slate-300 disabled:text-slate-600"
                    disabled={page === pages - 1}
                    onClick={() => {setPage(page + 1)}}
                >
                    <ChevronRightIcon className="w-6 h-6"/>
                </button>

            </div>
            <div className="flex flex-col space-y-2 border-l border-slate-700">
                {activities.slice(start, end).map(activity => (
                    <NavLink key={activity.id} to={activity.link} >
                        <div className="flex flex-col ml-1 pl-1 py-2 transition duration-200
                            rounded hover:bg-slate-800"
                        >
                            <span className="text-slate-500 text-xs">
                                {activity.date ? new Date(activity.date).toLocaleString() : "unknown date"}
                            </span>
                            <span className="text-slate-400 text-sm">
                                {activity.description || "Suspicious activity with no description"}
                            </span>
                        </div>
                    </NavLink>
                ))}
            </div>
        </div>
    )
};
