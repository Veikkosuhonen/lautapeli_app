
const imageUrl = (fileName) => `https://lautapeli-app.s3.eu-north-1.amazonaws.com/user-content/${fileName}`

const GalleryImage = ({ image }) => {

    return (
        <div className="flex flex-col p-2">
            <div className="overflow-hidden bg-slate-800/50 rounded-md shadow hover:shadow-2xl">
                <div className="relative shadow-md">
                    <div className="absolute hover:backdrop-blur-sm hover:backdrop-brightness-50 text-transparent hover:text-slate-100/75 cursor-pointer w-full h-full
                        flex items-center">
                        <p className="text-center flex-grow">
                            {image.description}
                        </p>
                    </div>
                    <img 
                        src={imageUrl(image.fileName)} 
                        alt={image.description}
                        className="object-fill"
                    />
                </div>
                <div className="flex flex-col sm:flex-row justify-between px-2 py-1">
                    <span className="text-sm text-slate-400">{image.user.name}</span>
                    <span className="text-sm text-slate-500">{new Date(image.date).toLocaleString("fi")}</span>
                </div>
            </div>
        </div>
    )
}

export default GalleryImage