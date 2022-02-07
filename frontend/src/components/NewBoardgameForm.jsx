import { Formik } from 'formik';
import * as Yup from "yup"
import Button from './util/Buttons';
import FormikInputField from './util/FormikInputField';
import FormikTextArea from './util/FormikTextArea';

const NewBoardgameForm = ({
    handleSubmit
}) => {

    return (
        <Formik
            initialValues={{ name: "", description: "" }}
            initialErrors={{ name: "Required" }}
            validationSchema={Yup.object({
                name: Yup.string().max(48, "Maximum length is 48 characters").required("Required"),
                description: Yup.string().max(255, "Maximum length is 255")
            })}
            onSubmit={handleSubmit}
        >
            {formik => (

            <form onSubmit={formik.handleSubmit}>
                <div className="flex flex-col gap-4">
                    <FormikInputField 
                        label="Name"
                        name="name"
                        type="text"
                        placeholder="Name"
                        autoComplete="off"
                    />
                    <FormikTextArea 
                        label="Description"
                        name="description"
                        type="text-area"
                        placeholder="Description (optional)"
                        autoComplete="off"
                    />
                    <Button type={"submit"} disabled={!formik.isValid}>Create</Button>
                </div>
            </form>

            )}
        </Formik>
    )
}

export default NewBoardgameForm