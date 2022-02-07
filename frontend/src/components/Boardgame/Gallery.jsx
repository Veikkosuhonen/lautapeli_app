import { useRef } from "react"
import PopupWindow from "../util/PopupWindow"
import Button from "../util/Buttons"
import { PlusIcon } from "@heroicons/react/outline"
import GalleryImage from "./GalleryImage"
import Upload from "./Upload"

const Gallery = ({ boardgame }) => {
    

    const imageFormPopupRef = useRef()

    return (
        <div>
            <div>
            <PopupWindow ref={imageFormPopupRef}>
                <Upload boardgame={boardgame}/>
            </PopupWindow>
                <Button onClick={() => imageFormPopupRef.current.setOpen(true)} variant={"secondary"}> 
                    <PlusIcon className="h-4 w-4"/>Add image
                </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3" >
                {boardgame?.images.map(image => 
                    <GalleryImage image={image} key={image.id}/>
                )}
            </div>
        </div>
    )
}

export default Gallery