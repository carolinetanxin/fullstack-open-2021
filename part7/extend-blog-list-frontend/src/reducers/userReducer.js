import userService from '../services/users'

const userReducer = (state = [], action) => {
    // console.log('blog state now:', state)
    // console.log('blog action now:', action)

    switch (action.type) {
        case 'INIT_USER': {
            return action.data
        }
        default: {
            return state
        }
    }
}

export const initUsers = () => {
    return async (dispatch) => {
        const users = await userService.getAll()
        dispatch({
            type: 'INIT_USER',
            data: users
        })
    }
}

export default userReducer
