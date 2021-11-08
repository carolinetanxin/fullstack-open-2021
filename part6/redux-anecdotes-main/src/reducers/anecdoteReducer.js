import anecdoteService from '../services/anecdotes'

export const getId = () => (100000 * Math.random()).toFixed(0)

const anecdotesReducer = (state = [], action) => {
  // console.log('anecdotesReducer ------------')
  // console.log('state now: ', state)
  // console.log('action', action)

  switch (action.type) {
    case 'VOTE': {
      const { id } = action.data
      // const voteAnecdote = state.find((anecdote) => anecdote.id === id)
      // const updateVoteAnecdote = {...voteAnecdote, votes: voteAnecdote.votes + 1}
      //
      // return state.map(anecdote => anecdote.id !== id ? anecdote : updateVoteAnecdote)
      return state.map(anecdote => anecdote.id !== id ? anecdote : action.data)
    }

    case 'NEW_ANECDOTE': {
      return [...state, action.data]
    }

    case 'INIT_ANECDOTES': {
      return action.data
    }

    default:
      return state
  }

}

// 初始化获取所有列表
export const initialAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: "INIT_ANECDOTES",
      data: anecdotes
    })
  }
}

// 投票
export const voteAnecdote = (votedAnecdote) => {
  return async dispatch => {
    const anecdote = {
      ...votedAnecdote,
      votes: votedAnecdote.votes + 1
    }
    const updatedAnecdote = await anecdoteService.update(anecdote)
    dispatch({
        type: 'VOTE',
        data: updatedAnecdote
    })
  }
}

// 新增八卦
export const createAnecdote = (content) => {
  return async dispatch => {
    console.log(content, dispatch)
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch ({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}


export default anecdotesReducer
