export const newsState = {
    state: [],
    loading: true,
    error: false
}

export const newsReducer = (state = newsState, action) => {
    switch (action.type) {
        case 'ADD_NEWS':
            return { state: action.payload, loading: false, error: false }
        case 'LOADING_NEWS':
            return { ...state, loading: true }
        default:
            return { ...state, loading: false, error: true }
    }
}