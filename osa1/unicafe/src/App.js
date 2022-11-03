import { useState } from 'react'

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => setGood(good + 1)
  const handleBadClick = () => setBad(bad + 1)
  const handleNeutralClick = () => setNeutral(neutral + 1)

  const Header = () => <h1>give feedback</h1>
  const Button = (props) => <button onClick={props.handler}>{props.name}</button>
  const StatisticsHeader = () => <h1>statistics</h1>
  const StatisticsLine = ({name, value, unit}) => <p>{name} {value} {unit}</p>
  const Statistics = ({good, neutral, bad}) => {
    const all = bad + good + neutral
    const average = (1 * good + 0 * neutral + (-1) * bad) / all;
    
    if (all) {
      return (
        <>
          <StatisticsLine name="good" value={good} />
          <StatisticsLine name="neutral" value={neutral} />
          <StatisticsLine name="bad" value={bad} />
          <StatisticsLine name="all" value={all} />
          <StatisticsLine name="average" value={average} />
          <StatisticsLine name="positive" value={good / all} unit="%" />
        </>
      )
    }
    return <p>No feedback given</p>
  }

  return (
    <div>
      <Header />
      <Button name="good" handler={handleGoodClick} />
      <Button name="neutral" handler={handleNeutralClick} />
      <Button name="bad" handler={handleBadClick} />
      <StatisticsHeader />
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App
