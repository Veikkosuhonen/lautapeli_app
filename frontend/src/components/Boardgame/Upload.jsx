import { useState } from "react"
import useUploadImage from "../../hooks/useUploadFile"
import toaster from "../../util/toaster"
import Button from "../util/Buttons"

const Upload = ({
    boardgame
}) => {

    const [file, setFile] = useState(null)
    const uploadImage = useUploadImage()

    const handleSubmit = () => {
        const response = uploadImage({
            file,
            boardgameId: boardgame.id,
            description: "test"
        })
        toaster.fileUploadMessage(response)
    }

    return (
        <div>
            <input 
                type="file"
                aria-label="upload image"
                onChange={event => setFile(event.target.files[0])}
            />
            <Button onClick={handleSubmit}>Upload</Button>
        </div>
    )
}

export default Upload