import { NavLink } from "react-router-dom"
import Surface from "./Surface"

export default function Activities({
    activities
}) {
    return (
        <div className="w-64">
            <h1 className="text-2xl font-light text-slate-400 py-4">Recent activity</h1>
            <div className="flex flex-col space-y-2">
                {activities.map(activity => (
                    <NavLink key={activity.id} to={activity.link} >
                        <Surface className="p-1 text-slate-400 border-l-4 border-slate-800 transition duration-200
                        hover:border-indigo-500">
                            {activity.description}
                        </Surface>
                    </NavLink>
                ))}
            </div>
        </div>
    )
};
