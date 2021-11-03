const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

// 以当前状态和action为函数，返回新状态
// 纯函数不可以更改state对象的状态，需要创建新对象，其中包含新旧元素的所有元素
const counterReducer = (state = initialState, action) => {
  // console.log(initialState, action)
  switch (action.type) {
    case 'GOOD':
      return {...state, good: state.good + 1}
    case 'OK':
      return {...state, ok: state.ok + 1}
    case 'BAD':
      return {...state, bad: state.bad + 1}
    case 'ZERO':
      return initialState
    default: return state
  }
  
}

export default counterReducer
