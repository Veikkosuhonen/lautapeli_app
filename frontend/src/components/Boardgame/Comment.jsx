const Comment = ({
    comment
}) => (
    <div className="flex flex-col md:flex-row md:items-end gap-1 md:gap-4 p-2">
        <div className="flex flex-row md:flex-col-reverse gap-2 md:gap-1 items-center">
            <span className="text-sm font-mono text-slate-400">
                {comment.user.name}
            </span>
            <span className="text-xs text-slate-500">
                {new Date(comment.date).toLocaleString("fi")}
            </span>
        </div>
        <p className="text-slate-300">
            {comment.comment}
        </p>
    </div>
)

export default Comment