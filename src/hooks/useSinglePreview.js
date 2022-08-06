import { useEffect, useState } from "react"

export const useSinglePreview = (setValues, image) => {

    const [preview, setPreview] = useState(null)

    useEffect(() => {
        setPreview(null)
    }, [image])

    const handlePreviewDeleteClick = () => {
        setValues(prevValues => (
            {
                ...prevValues,
                image: image
            }
        ))
        setPreview(null)
    }

    const handleUploadChange = (e) => {
        const image = e.target.files[0]
        const url = URL.createObjectURL(image)

        setValues(prevValues => (
            {
                ...prevValues,
                image: image
            }
        ))
        setPreview(url)
    }

    return {
        preview,
        handlePreviewDeleteClick,
        handleUploadChange
    }
}