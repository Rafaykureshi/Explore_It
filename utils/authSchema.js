import * as Yup from "yup";

// Schema for login (signin)
export const signinSchema = Yup.object().shape({
    email: Yup.string()
        .required("Email is required")
        .email("Invalid email format"),
    password: Yup.string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters long"),
});

// Schema for registration (signup)
export const signupSchema = Yup.object().shape({
    fname: Yup.string()
        .required("First name is required")
        .min(2, "First name must be at least 2 characters"),
    lname: Yup.string()
        .required("Last name is required")
        .min(2, "Last name must be at least 2 characters"),
    email: Yup.string()
        .required("Email is required")
        .email("Invalid email format"),
    password: Yup.string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters long"),
    cpassword: Yup.string()
        .required("Confirm password is required")
        .oneOf([Yup.ref('password'), null], "Passwords must match"),
});

// Default export for backward compatibility
const validationSchema = signupSchema;
export default validationSchema;