import React, { useState } from 'react'

const Statisticline = ({text, value}) => {
  return (
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const calculateAll = () => good + neutral + bad
  const calculateAverage = () => (good * 1 + neutral * 0 + bad * -1) / (calculateAll())
  const calculatePositive = () => Math.round((good * 1) / calculateAll() * 10000) / 100.00 + '%'

  if (calculateAll() === 0) {
    return (
        <div>
          No feedback given
        </div>
    )
  }

  return (
      <div>
        <table>
          <tbody>
              <Statisticline text='good' value={good}/>
              <Statisticline text='neutral' value={neutral}/>
              <Statisticline text='bad' value={bad}/>
            <tr>
              <td>all</td>
              <td>{calculateAll()}</td>
            </tr>
            <tr>
              <td>average</td>
              <td>{calculateAverage()}</td>
            </tr>
            <tr>
              <td>positive</td>
              <td>{calculatePositive()}</td>
            </tr>
          </tbody>
        </table>
      </div>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
      <div>
        <h3>give feedback</h3>
        <button onClick={() => setGood(good + 1)}>good</button>
        <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
        <button onClick={() => setBad(bad + 1)}>bad</button>

        <h3>statistics</h3>
        <Statistics good={good} neutral={neutral} bad={bad}/>

      </div>
  )
}

export default App
