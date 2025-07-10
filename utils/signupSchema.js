import * as Yup from "yup";


const validationSchema = Yup.object().shape({
    email: Yup.string()
    .required("Email is required")
    .email("Invalid Email format"),

    password: Yup.string()
    .required("Password is required")
    .min("6 characters long"),
});


export default validationSchema;