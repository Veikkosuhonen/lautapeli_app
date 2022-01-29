import { PrimaryButton } from "./util/Buttons"
import Surface from "./util/Surface"
import { NavLink } from "react-router-dom"
import { Formik } from "formik"
import * as Yup from "yup"
import FormikInputField from "./util/FormikInputField"

const LoginForm = ({
    handleLogin,
}) => (
    <div className="flex flex-row justify-center py-2 px-6 w-full">
        <Surface className="w-4/5 sm:w-full sm:basis-1/2 md:basis-2/5 lg:basis-1/4 xl:basis-1/5">
            <Formik
                initialValues={{
                    username: "",
                    password: "",
                }}
                initialErrors={{
                    username: "Required",
                    password: "Required",
                }}
                validationSchema={Yup.object({
                    username: Yup.string().required(),
                    password: Yup.string().required(),
                })}
                onSubmit={handleLogin}
            >
            {formik => (
                <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 p-2 py-4">
                    <div className="flex flex-row pb-4 gap-x-2 items-center">
                        <h1 className="text-lg text-slate-100 font-medium mr-auto">Login</h1>
                        <span className="hidden md:block text-slate-300">or</span>
                        <NavLink to="/register">
                            <span className="text-indigo-400 font-medium whitespace-nowrap hover:text-indigo-300">create a new account</span>
                        </NavLink>
                    </div>
                    <FormikInputField 
                        label="Username"
                        name="username"
                        placeholder="Username"
                    />
                    <FormikInputField 
                        label="Password"
                        name="password"
                        type="password"
                        placeholder="Password"
                    />
                    <PrimaryButton type="submit" content="Login" disabled={!formik.isValid} />
                </form>
            )}
            </Formik>
        </Surface>
    </div>
)


export default LoginForm