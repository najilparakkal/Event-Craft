import * as Yup from "yup"

export const validation = Yup.object({
    name: Yup.string()
        .max(30, "name have over length")
        .required("Required"),
    email: Yup.string()
        .email("invalid email address")
        .required("Required"),
    phoneNum: Yup.string()
        .required("Required")
        .matches(/^\d{10}$/, 'Invalid phone number, must be 10 digits'),
    password: Yup.string()
        .required('Required')
        .min(8, 'Must be at least 8 characters')
        .matches(/[A-Z]/, 'Must contain at least one uppercase letter')
        .matches(/[a-z]/, 'Must contain at least one lowercase letter')
        .matches(/[0-9]/, 'Must contain at least one number')
        .matches(/[!@#$%^&*]/, 'Must contain at least one special character'),
})


export const loginValidation = Yup.object({
    email: Yup.string()
        .email("invalid email address")
        .required("Required"),
    password: Yup.string()
        .required('Required')
        .min(8, 'Must be at least 8 characters')
        .matches(/[A-Z]/, 'Must contain at least one uppercase letter')
        .matches(/[a-z]/, 'Must contain at least one lowercase letter')
        .matches(/[0-9]/, 'Must contain at least one number')
        .matches(/[!@#$%^&*]/, 'Must contain at least one special character'),
})

export const emailForgot = Yup.object({
    email: Yup.string()
        .email("invalid email address")
        .required("Required")
})

export const passwordForgot = Yup.object({
    password: Yup.string()
        .required('Required')
        .min(8, 'Must be at least 8 characters')
        .matches(/[A-Z]/, 'Must contain at least one uppercase letter')
        .matches(/[a-z]/, 'Must contain at least one lowercase letter')
        .matches(/[0-9]/, 'Must contain at least one number')
        .matches(/[!@#$%^&*]/, 'Must contain at least one special character'),
})

export const categoryValidation = Yup.object().shape({
    category: Yup.string()
        .matches(/^[A-Z\s]*$/, 'Category must be in uppercase letters')
        .max(30, 'Category name is too long')
        .required('Required')
});;



export const LisenseValidation = Yup.object().shape({
    applicantName: Yup.string()
        .matches(/^[A-Za-z0-9 ]*$/, 'check the number')
        .matches(/^[A-Z]/, 'First letter must be uppercase')
        .required('Applicant name is required'),
    businessName: Yup.string()
        .matches(/^[A-Za-z0-9 ]*$/, 'check the number')
        .matches(/^[A-Z]/, 'First letter must be uppercase')
        .required('Business name is required'),
    certificateExpirationDate: Yup.date()
        .required(' required'),
    emailAddress: Yup.string()
        .email('Invalid email address')
        .required('Email address is required'),
    phoneNumber: Yup.string()
        .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits')
        .required('Phone number is required'),
        location: Yup.string()
        .required(' required'),
    upiIdOrPhoneNumber: Yup.string()
        .required('UPI ID or Verified Phone number is required'),
    accountNumber: Yup.string()
        .matches(/^[A-Za-z0-9]{14}$/, 'Account number must be exactly 14 alphanumeric characters')
        .required('Account Number is required'),
    servicesYouChose: Yup.string()
        .required('Services You Chose is required'),
    whatWillYouSell: Yup.string()
        .min(15, 'What will you sell? must be at least 15 characters')
        .required('Services You Chose is required'),
    profileImage: Yup.mixed().test('fileSize', 'Profile image is required', (value) => {
        if (Array.isArray(value)) {
            return value.length > 0;
        } else {
            return Boolean(value);
        }
    }),

});

export const postValidation = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('description is required'),
    category: Yup.string().required('Category is required'),
    image: Yup.mixed().required('Image is required'),
});



export const  bookingValidation= Yup.object({
    clientName: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
    phoneNumber: Yup.string().required('Required'),
    eventDate: Yup.date().nullable().required('Required').test('is-future-date', 'Wedding date cannot be in the past', (value) => {
      if (!value) return false;
      return value >= new Date();
    }),
    arrivalTime: Yup.string().required('Required'),
    guests: Yup.string().required('Required'),
    location: Yup.string().required('Required'),
    pincode: Yup.string().required('Required'),
    endingTime: Yup.string().required('Required'),
    event: Yup.string().required('Required'),
  })