import {
  Gender,
  newPatient,
  Diagnosis,
  HealthCheckRating,
  newHealthCheckEntry,
  newHospitalEntry,
  newOccupationalHealthcareEntry,
  EntryWithoutId,
  Entrytype,
  Discharge,
  SickLeave,
  newBaseEntry,
} from './types';

const parseString = (parameter: unknown): string => {
  if (!isString(parameter)) {
    throw new Error('Incorrect or missing comment');
  }

  return parameter;
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isNumber = (nbr: unknown): nbr is number => {
  return typeof nbr === 'number';
};

const isGender = (parameter: string): parameter is Gender => {
  return Object.values(Gender)
    .map((x) => x.toString())
    .includes(parameter);
};

const isEntryType = (parameter: string): parameter is Entrytype => {
  return (
    parameter === 'HealthCheck' ||
    parameter === 'OccupationalHealthcare' ||
    parameter === 'Hospital'
  );
};

const isHealthCheckRating = (
  parameter: number
): parameter is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(parameter);
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> => {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    // we will just trust the data to be in correct form
    return object as Array<Diagnosis['code']>;
  }

  return object.diagnosisCodes as Array<Diagnosis['code']>;
};

const parseGender = (parameter: unknown): Gender => {
  if (!isString(parameter) || !isGender(parameter)) {
    throw new Error(`Incorrect or missing data: Gender: ${parameter}`);
  }
  return parameter;
};

const parseSickLeave = (object: unknown): SickLeave => {
  if (
    object &&
    typeof object === 'object' &&
    'startDate' in object &&
    'endDate' in object
  ) {
    if (isString(object.startDate) && isString(object.endDate)) {
      return {
        startDate: object.startDate,
        endDate: object.endDate,
      };
    }
  }
  throw new Error(`Incorrect or missing data: SickLeave`);
};

const parseDischarge = (object: unknown): Discharge => {
  if (
    object &&
    typeof object === 'object' &&
    'date' in object &&
    'criteria' in object
  ) {
    if (isString(object.date) && isString(object.criteria)) {
      return {
        date: object.date,
        criteria: object.criteria,
      };
    }
  }
  throw new Error(`Incorrect or missing data: Discharge`);
};

const parseEntryType = (parameter: unknown): Entrytype => {
  if (!isString(parameter) || !isEntryType(parameter)) {
    throw new Error('Incorrect or missing data');
  }
  return parameter;
};

const parseHealthCheckRating = (parameter: unknown): HealthCheckRating => {
  if (!isNumber(parameter) || !isHealthCheckRating(parameter)) {
    throw new Error(
      `Incorrect or missing data: HealthCheckRating: ${parameter}`
    );
  }
  return parameter;
};

export const parseNewPatientEntry = (object: unknown): EntryWithoutId => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if (
    'description' in object &&
    'date' in object &&
    'specialist' in object &&
    'type' in object
  ) {
    const newPatientBaseEntry: newBaseEntry = {
      description: parseString(object.description),
      specialist: parseString(object.specialist),
      date: parseString(object.date),
      diagnosisCodes:
        'diagnosisCodes' in object
          ? parseDiagnosisCodes(object.diagnosisCodes)
          : [],
    };

    switch (parseEntryType(object.type)) {
      case 'HealthCheck':
        if ('healthCheckRating' in object) {
          const newPatientEntry: newHealthCheckEntry = {
            ...newPatientBaseEntry,
            type: 'HealthCheck',
            healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
          };
          return newPatientEntry;
        }
        throw new Error('Incorrect data: some fields are missing');

      case 'Hospital':
        if ('discharge' in object) {
          const newPatientEntry: newHospitalEntry = {
            ...newPatientBaseEntry,
            type: 'Hospital',
            discharge: parseDischarge(object.discharge),
          };
          return newPatientEntry;
        }
        throw new Error('Incorrect data: some fields are missing');

      case 'OccupationalHealthcare':
        if ('employerName' in object) {
          const newPatientEntry: newOccupationalHealthcareEntry = {
            ...newPatientBaseEntry,
            type: 'OccupationalHealthcare',
            employerName: parseString(object.employerName),
            sickLeave:
              'sickLeave' in object
                ? parseSickLeave(object.sickLeave)
                : undefined,
          };
          return newPatientEntry;
        }
        throw new Error('Incorrect data: some fields are missing');
    }
  }
  throw new Error('Incorrect data: some fields are missing');
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
