import * as Yup from "yup"

export const validation = Yup.object({
    name:Yup.string()
    .max(30,"name have over length")
    .required("Required"),
    email:Yup.string()
    .email("invalid email address")
    .required("Required"),
    phoneNum:Yup.string()
    .required("Required")
    .matches(/^\d{10}$/, 'Invalid phone number, must be 10 digits'),
    password:Yup.string()
    .required('Required')
    .min(8, 'Must be at least 8 characters')
    .matches(/[A-Z]/, 'Must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Must contain at least one lowercase letter')
    .matches(/[0-9]/, 'Must contain at least one number')
    .matches(/[!@#$%^&*]/, 'Must contain at least one special character'),
})


export const loginValidation = Yup.object({
    email:Yup.string()
   .email("invalid email address")
   .required("Required"),
    password:Yup.string()
    .required('Required')
    .min(8, 'Must be at least 8 characters')
    .matches(/[A-Z]/, 'Must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Must contain at least one lowercase letter')
    .matches(/[0-9]/, 'Must contain at least one number')
    .matches(/[!@#$%^&*]/, 'Must contain at least one special character'),
})