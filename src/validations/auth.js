import yup from "yup"

// TODO: Any sort of validations can be done here 

export const registerValidations = yup.object().shape({
    email: yup.string()
        .email("Invalid email")
        .required("email is a required field"),

    password: yup.string()
        .min(6, "Password is too short at least 6 characters are required")
        .max(50, "Password is too long only 50 characters are allowed")
        .required("password is required field") 
})

export const loginValidations = yup.object().shape({
    email: yup.string()
        .email("Invalid email")
        .required("email is a required field"),

    password: yup.string()
        .required("password is required field")
})





