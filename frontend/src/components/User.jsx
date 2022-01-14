import { StarIcon } from "@heroicons/react/solid"

const User = ({ user, score, winner }) => (
    <div key={user.id} className="flex flex-row items-center bg-slate-600/50 py-1 px-2 rounded">
        {winner && 
            <StarIcon className="w-5 h-5 text-orange-500" />
        }
        <span className="text-slate-300 font-mono">{user.name}</span>
        {score !== undefined && <span className="pl-2 text-orange-500 font-serif">{score}</span> }
    </div>
)

export default User