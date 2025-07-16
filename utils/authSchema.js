import * as Yup from "yup";


const validationSchema = Yup.object().shape({
    email: Yup.string()
    .required("Email is required")
    .email("Invalid Email format"),

    password: Yup.string()
    .required("Password is required")
    .min("6 characters long"),
    
    fname: Yup.string()
    .required("First name is required"),

    lname: Yup.string()
    .required("Last name is required"),

    cpassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref('password'), null]),
});


export default validationSchema;