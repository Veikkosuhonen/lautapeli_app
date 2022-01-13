import { NavLink } from "react-router-dom"
import Surface from "./Surface"

export default function Activities({
    activities
}) {
    return (
        <Surface className="hidden sm:block overflow-auto no-scrollbar rounded basis-2/5 h-96">
            <h1 className="text-md font-normal text-slate-400 pb-6">Recent activity</h1>
            <div className="flex flex-col space-y-6">
                {activities.map(activity => (
                    <NavLink key={activity.id} to={activity.link} >
                        <div className="flex flex-col pl-2 border-l-2 border-slate-700 transition duration-200
                            hover:border-indigo-500"
                        >
                            <span className="text-slate-500 text-xs">
                                {activity.date ? new Date(activity.date).toLocaleString() : "unknown date"}
                            </span>
                            <span className="text-slate-400 text-sm">
                                {activity.description}
                            </span>
                        </div>
                    </NavLink>
                ))}
            </div>
        </Surface>
    )
};
