import express from 'express';
import calculateBmi from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  if (!req.query.height || !req.query.weight) {
    res.status(400).json({
      error: 'mandatory parameters missing',
    });
  }

  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (!isNaN(height) && !isNaN(weight)) {
    const bmi = calculateBmi(height, weight);
    res.status(200).json({
      weight,
      height,
      bmi,
    });
  } else {
    res.status(400).json({
      error: 'malformatted parameters',
    });
  }
});

app.post('/exercises', (req, res) => {
  const daily_exercises: number[] = req.body.daily_exercises;
  const target: number = req.body.target;

  if (!daily_exercises || !target) {
    return res.status(400).json({
      error: 'mandatory parameters missing',
    });
  }

  if (!isNaN(target) && !daily_exercises.some(isNaN)) {
    return res.status(200).json(calculateExercises(daily_exercises, target));
  } else {
    return res.status(400).json({
      error: 'malformatted parameters',
    });
  }
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}`);
});
