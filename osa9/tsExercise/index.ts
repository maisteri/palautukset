import express from 'express'
import calculateBmi from './bmiCalculator'

const app = express()

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!')
})

app.get('/bmi', (req, res) => {
  if (
    !req.query.hasOwnProperty('height') ||
    !req.query.hasOwnProperty('weight')
  ) {
    res.status(400).json({
      error: 'mandatory parameters missing',
    })
  }

  const height = Number(req.query.height)
  const weight = Number(req.query.weight)

  if (!isNaN(height) && !isNaN(weight)) {
    const bmi = calculateBmi(height, weight)
    res.status(200).json({
      weight,
      height,
      bmi,
    })
  } else {
    res.status(400).json({
      error: 'malformatted parameters',
    })
  }
})

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}`)
})
