import { ExclamationIcon } from "@heroicons/react/outline"

export default function DeleteButton({
    onClick,
    disabled,
    disabledMessage
}) {

    return (
        <button 
            className="text-rose-500 hover:text-rose-400 disabled:text-rose-400/50" 
            onClick={onClick} 
            disabled={disabled}
            title={disabled ? (disabledMessage ? disabledMessage : "You are not allowed to delete this") : null}
        >
            <div className="flex flex-row items-center gap-1">
                <ExclamationIcon className="w-4 h-4"/>Delete
            </div>
        </button>
    )
};
