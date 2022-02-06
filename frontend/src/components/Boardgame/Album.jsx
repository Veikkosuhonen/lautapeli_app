const Album = ({ boardgame }) => {
    const imageUrl = (fileName) => `https://lautapeli-app.s3.eu-north-1.amazonaws.com/user-content/${fileName}`

    return (
        <div className="flex flex-col gap-2" >
            {boardgame?.images.map(image => 
                <div>
                    <img src={imageUrl(image.fileName)} alt={image.description} />
                    <div className="flex flex-row">
                        <p className="flex-basis-1/2">
                            {image.description}
                        </p>
                        <span>{new Date(image.date).toLocaleString()}</span>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Album