import { CubeIcon as SolidCubeIcon } from "@heroicons/react/solid"
import { CubeIcon as OutlineCubeIcon } from "@heroicons/react/outline"

export default function LikeButton({
    onClick, liked, likes
}) {
    return (
        <button className="
            p-1 rounded-lg 
            transition ease-in-out duration-200 delay-75
            border border-slate-700 hover:border-rose-600
            hover:shadow-lg hover:shadow-rose-600/30 text-slate-700 hover:text-rose-600" 
            onClick={onClick}
        >
            <div className="flex flex-row items-center gap-1">
                <span className="font-medium text-rose-500 tabular-nums">{likes}</span>
                { liked ?  
                    <SolidCubeIcon className="w-5 h-5 text-rose-500"/> 
                : 
                <>
                    <OutlineCubeIcon className="w-5 h-5 "/>
                </>
                }
            </div>
        </button>
    )
};
