import { useState } from "react"
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline"

const PaginatedList = ({
    title, children, className, itemsPerPage
}) => {
    itemsPerPage = itemsPerPage || 4
    const [page, setPage] = useState(0)
    const pages = Math.ceil(children.length / itemsPerPage)
    const start = Math.min(page * itemsPerPage, children.length)
    const end = Math.min((page + 1) * itemsPerPage, children.length)

    return (
        <div className={"p-2 overflow-hidden " + className}>
            <div className="flex flex-row space-x-2 items-center pb-4">
                <div className="pr-4">
                    {title}
                </div>
                {children && <>
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
            </div>
        </div>
    )
}

export default PaginatedList