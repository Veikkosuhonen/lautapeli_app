import { useState } from "react"
import api from "../../services/api"
import s3 from "../../services/s3"
import { PrimaryButton } from "../util/Buttons"

const Upload = ({
    boardgame
}) => {

    const [file, setFile] = useState(null)

    const handleSubmit = async () => {
        const data = await api.get("/upload/boardgame?id=" + boardgame.id)
        console.log(data.url)
        s3.putObject(data.url, file).then(response => {
            console.log(JSON.stringify(response))
        }).catch(error => console.log(JSON.stringify(error)))
    }

    return (
        <div>
            <input 
                type="file"
                aria-label="upload image"
                onChange={event => setFile(event.target.files[0])}
            />
            <PrimaryButton content={"submit"} onClick={handleSubmit}/>
        </div>
    )
}

export default Upload