import { Formik } from "formik"
import * as Yup from "yup"
import useAddComment from "../../hooks/useAddComment"
import toaster from "../../util/toaster"
import FormikTextArea from "../util/FormikTextArea"
import Comment from "./Comment"
import PaginatedList from "../util/PaginatedList"
import { PrimaryButton } from "../util/Buttons"

const CommentSection = ({
    boardgame
}) => {

    const addComment = useAddComment()

    const handleSubmit = ({ comment }) => {
        const response = addComment({ boardgameId: boardgame.id, comment: comment })
        toaster.boardgameAddMessage(response)
    }

    return (
        <div className="flex flex-col">
            <PaginatedList
                className="basis-full sm:basis-1/2"
                title={<h1 className="text-slate-400 text-md font-normal">Comments</h1>}
            >
                {boardgame.comments.map(comment => 
                    <Comment comment={comment} key={comment.id} /> 
                )}
            </PaginatedList>
            <Formik
                initialValues={{comment: ""}}
                initialErrors={{comment: "cannot be blank"}}
                validationSchema={Yup.object({
                    comment: Yup.string().min(0).required("cannot be blank")
                })}
                onSubmit={handleSubmit}
            >
                {formik => (
                    <form onSubmit={formik.handleSubmit} className="flex flex-row items-end gap-2 p-2">
                        <FormikTextArea
                            label="Comment"
                            name="comment"
                            placeholder="New comment"
                        />
                        <div>
                            <PrimaryButton content={"Comment"} type={"submit"} disabled={!formik.isValid}/>
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    )
}

export default CommentSection