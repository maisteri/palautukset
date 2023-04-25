import { Gender, newPatient } from './types';

const parseString = (parameter: unknown): string => {
  if (!isString(parameter)) {
    throw new Error('Incorrect or missing comment');
  }

  return parameter;
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isGender = (parameter: string): parameter is Gender => {
  return Object.values(Gender)
    .map((x) => x.toString())
    .includes(parameter);
};

const parseGender = (parameter: unknown): Gender => {
  if (!isString(parameter) || !isGender(parameter)) {
    throw new Error('Incorrect or missing data');
  }
  return parameter;
};

export const parseNewPatient = (object: unknown): newPatient => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if (
    'name' in object &&
    'dateOfBirth' in object &&
    'ssn' in object &&
    'gender' in object &&
    'occupation' in object
  ) {
    const newPatient: newPatient = {
      name: parseString(object.name),
      dateOfBirth: parseString(object.dateOfBirth),
      ssn: parseString(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseString(object.occupation),
      entries: [],
    };

    return newPatient;
  }

  throw new Error('Incorrect data: some fields are missing');
};
