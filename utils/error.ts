export const handlerError = (error: any) => {
    const generalMessage = "An unexpected error occured"
    let statusCode = 500
    let statusMessage = "unexpected error"
    let message = generalMessage
    let data = undefined

    // console.log(error.response)
    // console.log(error.response._data)

    if(error.response) {
        statusCode = error.response.statusCode
        statusMessage = error.response.statusText

        if(error.response.data) {
            data = error.response._data && error.response.errors ? error.response._data : undefined
            message =  error.response._data && error.response._data.message ?  error.response._data.message : generalMessages
        }
    }

    return {
        statusCode,
        statusMessage,
        message,
        data
    }
}