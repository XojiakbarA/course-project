import { useState } from "react"

export const useSinglePreview = (setValues, setTouched) => {

    const [preview, setPreview] = useState(null)

    const handlePreviewDeleteClick = () => {
        setValues(prevValues => ({ ...prevValues, image: null }))
        setPreview(null)
    }

    const handleUploadChange = (e) => {
        const image = e.target.files[0]
        const url = URL.createObjectURL(image)
        setTouched({ image: true })
        setValues(prevValues => ({ ...prevValues, image }))
        setPreview(url)
    }

    return { preview, handlePreviewDeleteClick, handleUploadChange }
}