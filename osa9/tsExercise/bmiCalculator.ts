const calculateBmi = (height: number, weight: number): string => {
  const heightInMetres: number = height / 100
  const index = weight / (heightInMetres * heightInMetres)

  if (index < 16.0) return 'Underweight (Severe thinness)'
  if (index < 17.0) return 'Underweight (Moderate thinness)'
  if (index < 18.5) return 'Underweight (Mild thinness)'
  if (index < 25.0) return 'Normal (healthy weight)'
  if (index < 30.0) return 'Overweight (Pre-obese)'
  if (index < 35.0) return 'Obese (Class I)'
  if (index < 40.0) return 'Obese (Class II)'
  return 'Obese (Class III)'
}

console.log(calculateBmi(180, 74))
