import { NavLink } from "react-router-dom"
import PaginatedList from "./util/PaginatedList"

export default function Activities({
    activities, itemsPerPage
}) {
    return (
        <PaginatedList className="basis-1/4" itemsPerPage={itemsPerPage || 4} title={
            <h1 className="text-slate-500 text-md">Recent activity</h1>
        }>
            {activities?.map(activity => (
                <NavLink key={activity.id} to={activity.link} >
                    <div className="flex flex-col ml-1 pl-1 py-2 transition duration-200
                        rounded hover:bg-slate-800"
                    >
                        <span className="text-slate-500 text-xs">
                            {activity.date ? new Date(activity.date).toLocaleString("fi") : "unknown date"}
                        </span>
                        <span className="text-slate-400 text-sm">
                            {activity.description || "Suspicious activity with no description"}
                        </span>
                    </div>
                </NavLink>
            ))}
        </PaginatedList>
    )
};
