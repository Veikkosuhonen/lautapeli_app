import useDeleteBoardgame from '../../hooks/useDeleteBoardgame';
import useUpdateBoardgame from "../../hooks/useUpdateBoardgame"
import { Formik } from 'formik';
import * as Yup from "yup"
import FormikInputField from '../util/FormikInputField';
import FormikTextArea from '../util/FormikTextArea';
import { PrimaryButton, SecondaryButton } from '../util/Buttons';
import DeleteButton from './DeleteButton';
import toaster from '../../util/toaster';
import { useNavigate } from 'react-router-dom';


const Edit = ({ boardgame, user }) => {

    const navigate = useNavigate()

    const deleteBoardgame = useDeleteBoardgame()
    const updateBoardgame = useUpdateBoardgame()


    const handleSubmit = (formData) => {
        const response = updateBoardgame({
            id: boardgame.id,
            name: formData.name,
            description: formData.description
        })
        toaster.descriptionUpdateMessage(response)
    }

    const handleDelete = () => {
        if (!window.confirm("Are you absolutely sure you want to delete " + boardgame?.name + "?")) return
        const response = deleteBoardgame(boardgame)
        toaster.deleteBoardgameMessage(response)
        response.then(() => {
            navigate("/boardgames")
        })
    }

    const isOwner = boardgame?.addedById === user?.id || user?.isAdmin
    const canDelete = boardgame.playSessions.length === 0

    return (
        <Formik
            initialValues={{ name: boardgame.name, description: boardgame.description }}
            validationSchema={Yup.object({
                name: Yup.string().max(48, "Maximum length is 48 characters").required("Required"),
                description: Yup.string().max(255, "Maximum length is 255")
            })}
            onSubmit={handleSubmit}
        >
            {formik => (

            <form onSubmit={formik.handleSubmit}>
                <div className="flex flex-col">
                    <span className="text-slate-400 text-sm pb-1">Name</span>
                    <FormikInputField 
                        label="Name"
                        name="name"
                        type="text"
                        placeholder="Name"
                        autoComplete="off"
                    />
                    <span className="text-slate-400 text-sm pt-4 pb-1">Description</span>
                    <FormikTextArea 
                        label="Description"
                        name="description"
                        type="text-area"
                        placeholder="No description"
                        autoComplete="off"
                    />
                    <div className="flex flex-row gap-2 pt-4 items-center">
                        <SecondaryButton content={"Cancel"} type={"reset"} onClick={() => formik.resetForm()}/>
                        <PrimaryButton content={"Update"} type={"submit"} disabled={!formik.isValid}/>
                        <div className="ml-auto">
                            <DeleteButton onClick={handleDelete} disabled={!canDelete || !isOwner}/>
                        </div>
                    </div>
                </div>
            </form>

            )}
        </Formik>
    )
}

export default Edit