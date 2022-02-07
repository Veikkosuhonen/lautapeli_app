import GalleryImage from "./GalleryImage"
import Upload from "./Upload"

const Gallery = ({ boardgame }) => {
    

    return (
        <div>
            <Upload boardgame={boardgame} />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3" >
                {boardgame?.images.map(image => 
                    <GalleryImage image={image} key={image.id}/>
                )}
            </div>
        </div>
    )
}

export default Gallery