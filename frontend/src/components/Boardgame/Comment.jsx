const Comment = ({
    comment
}) => (
    <div className="flex flex-col gap-2 p-2">
        <div className="flex flex-row gap-2 items-end">
            <span className="text-sm font-serif text-slate-400">
                {comment.user.name}
            </span>
            <span className="text-xs text-slate-500">
                {new Date(comment.date).toLocaleString()}
            </span>
        </div>
        <p className="text-slate-400">
            {comment.comment}
        </p>
    </div>
)

export default Comment