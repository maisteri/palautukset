const _ = require('lodash')

type Rating = 1 | 2 | 3

interface Result {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: Rating
  ratingDescription: string
  target: number
  average: number
}

const calculateExercises = (exercises: number[], target: number): Result => {
  const average: number = _.mean(exercises)
  let rating: Rating
  let ratingDescription: string

  if (average / target < 0.8) {
    rating = 1
    ratingDescription = 'you are a failure!'
  } else if (average / target > 1.2) {
    rating = 3
    ratingDescription = 'superb performance!'
  } else {
    rating = 2
    ratingDescription = 'nice!'
  }

  return {
    periodLength: exercises.length,
    trainingDays: exercises.filter((day) => day > 0).length,
    success: average >= target,
    rating,
    ratingDescription,
    target,
    average,
  }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))
