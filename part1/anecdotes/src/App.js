import React, { useState } from 'react'

const arr = [0, 1, 2, 3, 4, 5, 6];
const voteCountList = [0, 0, 0, 0, 0, 0, 0];
let max = 0;
let maxIndex = 0;

const MostVoteAnexdotes = ({text, anecdotes, max}) => {
    if (!max) {
        return (
            <div>
                <h1>{text}</h1>
            </div>
        )
    }

    return (
        <div>
            <h1>{text}</h1>
            <p>{anecdotes}</p>
            <p>has {max} votes</p>
        </div>
    )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const [selected, setSelected] = useState(0)

  const voteSelectAnecdotes = () => {
    voteCountList[selected] = voteCountList[selected] + 1;
    max = Math.max.apply(Math, voteCountList);
    maxIndex = voteCountList.indexOf(max);
    // console.log(voteCountList, max, maxIndex)
  }

  const randomSelectAnecdotes = () => {
    const index = Math.floor((Math.random()*arr.length))
    setSelected(index);
  }

  return (
      <div>
        <h1>Anecdote of the day</h1>
        <p>{anecdotes[selected]}</p>
        <p>has {voteCountList[selected]} votes</p>
        <button onClick={voteSelectAnecdotes}>vote</button>
        <button onClick={randomSelectAnecdotes}>next anecdotes</button>

        <MostVoteAnexdotes text={'Anecdote with most votes'} anecdotes={anecdotes[maxIndex]} max={max}/>
      </div>
  )
}

export default App
