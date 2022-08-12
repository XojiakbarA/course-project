export const appendToFormData = (data) => {
    let formData = new FormData()
    for (let key in data) {
        if (data[key] instanceof Date) {
            formData.append(key, data[key].toISOString())
        } else if (data[key] instanceof FileList) {
            const fileList = data[key]
            for (let file of fileList) {
                formData.append(`${key}[]`, file)
            }
        } else if (data[key] != null) {
            formData.append(key, data[key])
        }
    }
    return formData
}