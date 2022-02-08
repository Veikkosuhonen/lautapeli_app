import { useParams } from "react-router-dom"
import usePlaySession from "../hooks/usePlaySession"
import HeroSection from "../components/util/HeroSection"
import Surface from "../components/util/Surface"
import { Link } from "react-router-dom"
import GalleryImage from "../components/Boardgame/GalleryImage"
import styles from "../util/styles"

const PlaySession = () => {

    const id = useParams().playSessionId
    const { playSession } = usePlaySession(id)

    return (
        <>
        <HeroSection />
        <div className="shadow-lg border-b border-slate-700 sm:px-2 md:px-8 pb-8 px-4">
            <div className="flex gap-2 items-end pb-4">
                <Link to={"/boardgames/" + playSession?.boardgame.id}>
                    <h1 className={styles.boardgameTitle}>
                        {playSession?.boardgame.name}
                    </h1>
                </Link>
                <span className="text-slate-500">on</span>
                <span className="text-slate-400">{new Date(playSession?.date).toLocaleString("fi")}</span>
            </div>
            <span className="text-slate-500">{playSession?.duration} minutes</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 p-4 gap-2 sm:gap-4 md:gap-6">
            <Surface>
                <div className="flex flex-col gap-2">
                    <h2 className="text-md text-slate-500">Description</h2>
                    {playSession?.description 
                    ? <p className="text-slate-400">{playSession.description}</p>
                    : <p className="text-slate-500 text-sm">Nothing...</p>
                    }
                </div>
            </Surface>
            <Surface>
                <div className="flex flex-col gap-2">
                    <h2 className="text-md text-slate-500">Players</h2>
                    {playSession?.players.map(player => 
                        <div key={player.id} className="flex flex-row items-center gap-2">
                            <span className="text-slate-400 font-mono mr-auto">{player.name}</span>
                            <span className="text-slate-500 text-sm">score:</span>
                            <span className="text-orange-500">{player.player.score}</span>
                        </div>
                    )}
                </div>
            </Surface>
            <div className="grid col-span-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                {playSession?.images.map(image => 
                    <GalleryImage image={image} key={image.id} />
                )}
                {playSession?.images?.length === 0 | undefined &&
                    <span className="text-slate-500 col-span-full text-center">No images added yet!</span>
                }
            </div>
        </div>
        </>
    )
}

export default PlaySession