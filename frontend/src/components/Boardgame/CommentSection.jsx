import { Formik } from "formik"
import * as Yup from "yup"
import useAddComment from "../../hooks/useAddComment"
import toaster from "../../util/toaster"
import FormikTextArea from "../util/FormikTextArea"
import Comment from "./Comment"
import PaginatedList from "../util/PaginatedList"
import Button from "../util/Buttons"

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
            <h1 className="text-slate-400 text-md font-normal pb-6">Comments</h1>
            <Formik
                initialValues={{comment: ""}}
                initialErrors={{comment: "cannot be blank"}}
                validationSchema={Yup.object({
                    comment: Yup.string().min(0).required("cannot be blank")
                })}
                onSubmit={handleSubmit}
            >
                {formik => (
                    <form onSubmit={formik.handleSubmit} className="flex items-end gap-2">
                        <FormikTextArea
                            label="Comment"
                            name="comment"
                            placeholder="New comment"
                            errorMessage={false}
                        />
                        <div>
                            <Button variant={"secondary"} type={"submit"} disabled={!formik.isValid}>Comment</Button>
                        </div>
                    </form>
                )}
            </Formik>
            <PaginatedList
                itemsPerPage={10}
                className=""
            >
                {boardgame?.comments.map(comment => 
                    <Comment comment={comment} key={comment.id} /> 
                )}
            </PaginatedList>
            
        </div>
    )
}

export default CommentSection