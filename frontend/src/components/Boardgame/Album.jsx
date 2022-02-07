import AlbumImage from "./AlbumImage"

const Album = ({ boardgame }) => {
    

    return (
        <div className="grid grid-cols-3" >
            {boardgame?.images.map(image => 
                <AlbumImage image={image} key={image.id}/>
            )}
        </div>
    )
}

export default Album