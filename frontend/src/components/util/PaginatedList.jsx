import { useState } from "react"
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline"

const PaginatedList = ({
    title, children, className, itemsPerPage
}) => {
    itemsPerPage = itemsPerPage || 4
    const [page, setPage] = useState(0)
    const pages = children ? Math.ceil(children.length / itemsPerPage) : 1
    const start = children ? Math.min(page * itemsPerPage, children.length) : 1
    const end = children ? Math.min((page + 1) * itemsPerPage, children.length) : 1

    return (
        <div className={"p-2 " + className}>
            <div className="flex flex-row space-x-2 items-center pb-4">
                <div className="pr-4">
                    {title}
                </div>
                {children && pages > 1 && <>
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
                </> }
            </div>
            <div className="flex flex-col space-y-2 border-l border-slate-700">
                {children ? children.slice(start, end) : <span className="text-sm text-slate-500">No items</span>}
                { children?.length === 0 && <span className="text-slate-500 pl-2">Wow, its still empty here!</span>}
            </div>
        </div>
    )
}

export default PaginatedList