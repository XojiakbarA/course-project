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
            value ? value.size <= 1048576 : true
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
})

export const editImageValidationSchema = yup.object({
    image: yup
        .mixed()
        .test('fileSize', "File Size is too large", value => (
            value ? value.size <= 1048576 : true
        ))
        .test('fileType', "Unsupported File Format", value => (
            value
                ?
                ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'].includes(value.type)
                :
                true
        ))
})

export const collectionValidationSchema = yup.object({
    name: yup
        .string('Enter Name')
        .required('Name is required'),
    description: yup
        .string('Enter Description')
        .required('Description is required'),
    topicId: yup
        .number('Select Topic')
        .required('Topic is required'),
    userId: yup
        .number('Select User')
        .required('User is required'),
    image: yup
        .mixed()
        .test('fileSize', "File Size is too large", value => (
            value ? value.size <= 1048576 : true
        ))
        .test('fileType', "Unsupported File Format", value => (
            value
                ?
                ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'].includes(value.type)
                :
                true
        ))
})

export const itemValidationSchema = yup.object({
    name: yup
        .string('Enter Name')
        .required('Name is required'),
    collectionId: yup
        .number('Select Collection')
        .required('Collection is required'),
    tagIds: yup
        .array('Choose Tags')
        .of(yup.number('ID must be a integer'))
        .min(1, 'Choose Tags')
        .required('Tags is Required'),
    image: yup
        .mixed()
        .test('fileSize', "File Size is too large", value => (
            value ? value.size <= 1048576 : true
        ))
        .test('fileType', "Unsupported File Format", value => (
            value
                ?
                ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'].includes(value.type)
                :
                true
        ))
})