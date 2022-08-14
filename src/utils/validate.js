import * as yup from "yup"

export const resetValidationSchema = yup.object({
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required')
})

export const loginValidationSchema = yup.object({
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string('Enter your password')
        .required('Password is required')
})

export const registerValidationSchema = yup.object({
    firstName: yup
        .string('Enter Your First Name')
        .required('First Name is required'),
    lastName: yup
        .string('Enter Your Last Name')
        .required('Last Name is required'),
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string('Enter your password')
        .required('Password is required'),
    confirmPassword: yup
        .string('Enter your password')
        .required('Please re-type password')
        .when('password',
            {
                is: val => (val && val.length > 0),
                then: yup.string().oneOf(
                    [yup.ref('password')],
                    'Both password need to be the same'
                )
            }),
    image: yup
        .mixed()
        .test('fileSize', "File Size is too large", value => (
            value ? value.size <= 1024*2*1024 : true
        ))
        .test('fileType', "Unsupported File Format", value => (
            value
                ?
                ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'].includes(value.type)
                :
                true
        ))
})

export const editUserValidationSchema = yup.object({
    firstName: yup
        .string('Enter Your First Name')
        .required('First Name is required'),
    lastName: yup
        .string('Enter Your Last Name')
        .required('Last Name is required'),
    image: yup
        .mixed()
        .test('fileSize', "File Size is too large", value => (
            value ? value.size <= 1024*2*1024 : true
        ))
        .test('fileType', "Unsupported File Format", value => (
            value
            ?
            ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'].includes(value.type)
            :
            true
        ))
})