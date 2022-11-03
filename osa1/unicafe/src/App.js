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
  const Statistics = (props) => {
    return (
      <>
        <p>good {props.good}</p>
        <p>neutral {props.neutral}</p>
        <p>bad {props.bad}</p>
      </>
    )
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
