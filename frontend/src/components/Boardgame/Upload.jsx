import { useEffect, useState } from "react"
import useUploadImage from "../../hooks/useUploadFile"
import toaster from "../../util/toaster"
import Button from "../util/Buttons"
import Surface from "../util/Surface"
import FormikTextArea from "../util/FormikTextArea"
import { Formik } from "formik"

const Upload = ({
    boardgame
}) => {
    const uploadImage = useUploadImage()

    const [file, setFile] = useState(null)
    const [fileUrl, setFileUrl] = useState(null)
    
    useEffect(() => {
        if (!file) return
        setFileUrl(URL.createObjectURL(file))
    }, [file])
    
    const handleSubmit = (formData) => {
        const response = uploadImage({
            file,
            boardgameId: boardgame.id,
            description: formData.description
        })
        toaster.fileUploadMessage(response)
    }

    return (
        <div className="flex w-full justify-center pt-8">
            <Surface className="sm:w-full sm:basis-2/3 md:basis-1/2 lg:basis-2/5 xl:basis-1/3">
                <Formik
                    onSubmit={handleSubmit}
                    initialValues={{ description: "" }}
                >
                {formik => 
                <form className="flex flex-col gap-2" onSubmit={formik.handleSubmit}>
                    <h1 className="text-slate-300">New image</h1>
                    {file ? 
                        <img src={fileUrl} alt="preview of the upload"/>
                    : 
                    <div />}
                    <input 
                        type="file"
                        accept="image/*"
                        aria-label="upload image"
                        onChange={event => setFile(event.target.files[0])}
                        className="w-full text-slate-400 rounded border border-slate-800 px-2 py-1"
                    />
                    <FormikTextArea name={"description"} placeholder="description"/>
                    <Button disabled={!file || !formik.isValid} type="submit">Upload</Button>
                </form>}
                </Formik>
            </Surface>
        </div>
    )
}

export default Upload