import loginService from '../services/login'

const loggedInUserJSON = JSON.parse(
    window.localStorage.getItem('loggedBlogappUser'),
)

const initialState = loggedInUserJSON ? loggedInUserJSON : null

const loginReducer = (state = initialState, action) => {
    // console.log('blog state now:', state)
    // console.log('blog action now:', action)

    switch (action.type) {
        case 'LOG_IN': {
            return action.data
        }
        case 'LOG_OUT': {
            return null
        }
        default: {
            return state
        }
    }
}

export const login = (username, password) => {
    return async (dispatch) => {
        const user = await loginService.login({ username, password })
        return dispatch({
            type: 'LOG_IN',
            data: user
        })
    }
}

export const logout = () => {
    return {
        type: 'LOGOUT',
    }
}

export default loginReducer
