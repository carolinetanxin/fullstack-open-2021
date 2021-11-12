import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
    // console.log('blog state now:', state)
    // console.log('blog action now:', action)

    switch (action.type) {
        case 'INIT_BLOGS': {
            return action.data
        }
        case 'ADD_BLOG': {
            return [...state, action.data]
        }
        case 'ADD_LIKE': {
            const { id } = action.data
            const updateBlog = {
                ...action.data,
                likes: action.data.likes + 1
            }
            return state.map(blog => blog.id === id ? updateBlog : blog)
        }
        case 'REMOVE_BLOG': {
            const { id } = action.data
            return state.filter((blog) => blog.id !== id)
        }
        default: {
            return state
        }
    }
}

export const initBlogs = () => {
    return async (dispatch) => {
        const blogs = await blogService.getAll()
        dispatch({
            type: 'INIT_BLOGS',
            data: blogs
        })
    }
}

export const createBlog = (newBlog) => {
    return async (dispatch) => {
        const createBlog = await blogService.create(newBlog)
        dispatch({
            type: 'ADD_BLOG',
            data: createBlog
        })
    }
}

export const addLike = (id, updateBlog) => {
    return async (dispatch) => {
        const updatedBlog = await blogService.update(id, updateBlog)
        dispatch({
            type: 'ADD_LIKE',
            data: updatedBlog
        })
    }
}

export const removeBlog = (id) => {
    return async (dispatch) => {
        await blogService.remove(id)
        dispatch({
            type: 'REMOVE_BLOG',
            data: { id }
        })
    }
}

export default blogReducer
