import _ from 'lodash'

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

interface ExerciseValues {
  target: number
  exercises: number[]
}

const parseExerciseArguments = (args: string[]): ExerciseValues => {
  if (args.length < 4) throw new Error('Not enough arguments')

  const target: number = Number(args[2])
  const exerciseArguments: string[] = args.slice(3)
  const exercisesAsNumbers: number[] = exerciseArguments.map((day) =>
    Number(day)
  )

  if (!isNaN(target) && !exercisesAsNumbers.some(isNaN)) {
    if (exercisesAsNumbers.some((day) => day > 24))
      throw new Error('a day has only 24h..')
    return {
      target,
      exercises: exercisesAsNumbers,
    }
  } else {
    throw new Error('Provided values were not numbers!')
  }
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

try {
  const { target, exercises }: ExerciseValues = parseExerciseArguments(
    process.argv
  )
  console.log(calculateExercises(exercises, target))
} catch (error) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message
  }
  console.log(errorMessage)
}
