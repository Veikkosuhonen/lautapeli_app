import PaginatedList from "./util/PaginatedList"

export default function Commits({
    commits, itemsPerPage
}) {
    return (
        <PaginatedList className="basis-1/4" itemsPerPage={itemsPerPage || 4} title={
            <h1 
                title="Only frontend updates!" 
                className="text-slate-500 text-md hover:text-sky-300 select-none"
            >Recent app updates</h1>
        }>
            {commits?.map((commit, index) => (
                <a key={index} href="https://github.com/Veikkosuhonen/lautapeli_app"
                    className="flex flex-col ml-1 pl-1 py-2 transition duration-200
                    rounded hover:bg-slate-800"
                >
                    <span className="text-slate-500 text-xs">
                        {commit.author} on {new Date(commit.date).toLocaleString()}
                    </span>
                    <span className="text-slate-400 text-sm">
                        {commit.message}
                    </span>
                </a>
            ))}
        </PaginatedList>
    )
};
