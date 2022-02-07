import { Formik } from 'formik';
import * as Yup from "yup"
import Button from "./util/Buttons"
import Surface from "./util/Surface"
import { NavLink } from "react-router-dom"
import FormikInputField from './util/FormikInputField';

const RegisterForm = ({
    handleSubmit
}) => (
    <div className="flex flex-row justify-center py-2 px-6 w-full">
        <Surface className="w-4/5 sm:w-full sm:basis-1/2 md:basis-1/2 lg:basis-1/4">
            <Formik
                initialValues={{
                    username: "",
                    name: "",
                    password: "",
                    passwordConfirm: "",
                    code: "",
                }}
                initialErrors={{
                    username: "Required",
                    name: "Required",
                    passoword: "Required",
                    passwordConfirm: "Required",
                    code: "Required",
                }}
                validationSchema={Yup.object({
                    username: Yup.string().min(3, "Min length is 3").max(20, "Min length is 20").required("Required"),
                    name: Yup.string().min(3, "Min length is 3").max(20, "Max length is 20").required("Required"),
                    password: Yup.string().min(5, "Min length is 5").max(20, "Max length is 20").required("Required"),
                    passwordConfirm: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
                    code: Yup.number().integer().required("Required"),
                })}
                onSubmit={handleSubmit}
            >
            {formik => (
                <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 p-2 py-4">
                    <div className="flex flex-row pb-4 gap-x-2 items-center">
                        <h1 className="text-lg text-slate-100 font-medium mr-auto">Register</h1>
                        <span className="hidden md:block text-slate-300">or</span>
                        <NavLink to="/login">
                            <span className="hidden sm:block whitespace-nowrap text-indigo-400 font-medium hover:text-indigo-300">login with an existing account</span>
                            <span className="block sm:hidden text-indigo-400 font-medium hover:text-indigo-300">login</span>
                        </NavLink>
                    </div>
                    <FormikInputField 
                        label="Username"
                        name="username"
                        placeholder="Username"
                        autoComplete="off"
                    />
                    <FormikInputField 
                        label="Name"
                        name="name"
                        placeholder="Name"
                        autoComplete="off"
                    />
                    <div />
                    <FormikInputField 
                        label="Password"
                        name="password"
                        type="password"
                        placeholder="Password"
                        autoComplete="off"
                    />
                    <FormikInputField 
                        label="Confirm Password"
                        name="passwordConfirm"
                        type="password"
                        placeholder="Confirm password"
                        autoComplete="off"
                    />
                    <div />
                    <FormikInputField 
                        label="Code"
                        name="code"
                        placeholder="Code"
                        autoComplete="off"
                    />
                    <Button type={"submit"} disabled={!formik.isValid}>
                        Register
                    </Button>
                </form>
            )}
            </Formik>
        </Surface>
    </div>
)


export default RegisterForm