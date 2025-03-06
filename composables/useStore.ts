interface State{
    isLoading: boolean
    appError: APIError
}

const state = reactive({
    isLoading: false,
    appError: null,
})