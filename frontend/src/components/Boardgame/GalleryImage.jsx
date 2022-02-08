import { Link } from "react-router-dom"

const imageUrl = (fileName) => `https://lautapeli-app.s3.eu-north-1.amazonaws.com/user-content/${fileName}`

const GalleryImage = ({ image, isLink }) => {

    const linkTo = image.playSessionId ? `/playsessions/${image.playSessionId}` : `/boardgames/${image.boardgameId}/gallery`

    return (
        <div className="flex flex-col p-2">
            <div className="overflow-hidden bg-slate-800/50 rounded-md shadow hover:shadow-2xl">
                <div className="relative shadow-md">
                    <div className="absolute hover:backdrop-blur-sm hover:backdrop-brightness-50 text-transparent hover:text-slate-100/75 cursor-pointer w-full h-full
                        flex flex-col items-stretch"
                        >
                        {isLink ? <Link to={linkTo} className="flex-grow" /> :
                        <div className="self-center flex-grow">
                            <p className="" >
                                {image.description}
                            </p>
                        </div>
                        }
                        <div className="flex justify-between backdrop-brightness-50 px-2">
                            <span className="text-sm text-slate-100 font-mono">{image.user?.name}</span>
                            <span className="text-sm text-slate-200">{new Date(image.date).toLocaleString("fi")}</span>
                        </div>
                    </div>
                    <img 
                        src={imageUrl(image.fileName)} 
                        alt={image.description}
                        className="object-cover"
                    />
                </div>
                
            </div>
        </div>
    )
}

export default GalleryImage