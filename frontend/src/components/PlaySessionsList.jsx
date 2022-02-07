import PlaySession from "./PlaySession"


const PlaySessionsList = ({ playSessions }) => {

    return (
        <div className="flex flex-col gap-2 border-l border-slate-800 pl-1">
            {playSessions?.map(ps => 
                <PlaySession playSession={ps} key={ps.id} />
            )}
        </div>
    )
}

export default PlaySessionsList