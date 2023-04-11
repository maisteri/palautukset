interface BmiValues {
  height: number;
  weight: number;
}

const parseCliArguments = (args: string[]): BmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

const calculateBmi = (height: number, weight: number): string => {
  const heightInMetres: number = height / 100;
  const index = weight / (heightInMetres * heightInMetres);

  if (index < 16.0) return 'Underweight (Severe thinness)';
  if (index < 17.0) return 'Underweight (Moderate thinness)';
  if (index < 18.5) return 'Underweight (Mild thinness)';
  if (index < 25.0) return 'Normal (healthy weight)';
  if (index < 30.0) return 'Overweight (Pre-obese)';
  if (index < 35.0) return 'Obese (Class I)';
  if (index < 40.0) return 'Obese (Class II)';
  return 'Obese (Class III)';
};

try {
  const { height, weight } = parseCliArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}

export default calculateBmi;
