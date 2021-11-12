const initialState = ''

const notificationReducer = (state = initialState, action) => {
    // console.log('notificationReducer ------------')
    // console.log('state now: ', state)
    // console.log('action', action)

    switch (action.type) {
        case 'SET_MESSAGE': {
            clearTimeout(state.delay)
            return action.data.message
        }

        case 'REMOVE_MESSAGE': {
            return initialState
        }

        default:
            return state
    }

}

export const setNotification = (message, delayTime) => {
    return async dispatch => {
        dispatch({
            type: 'SET_MESSAGE',
            data: {
                message,
                delay: setTimeout(() => {
                    dispatch(removeNotification())
                }, delayTime * 1000)
            }
        })
    }
}

export const removeNotification = () => {
    return {
        type: 'REMOVE_MESSAGE'
    }
}

export default notificationReducer
