export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum HealthCheckRating {
  'Healthy' = 0,
  'LowRisk' = 1,
  'HighRisk' = 2,
  'CriticalRisk' = 3,
}

export interface Discharge {
  date: string;
  criteria: string;
}

export interface SickLeave {
  startDate: string;
  endDate: string;
}

export enum Entrytype {
  HealthCheck = 'HealthCheck',
  OccupationalHealthcare = 'OccupationalHealthcare',
  Hospital = 'Hospital',
}

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export interface HealthCheckEntry extends BaseEntry {
  healthCheckRating: HealthCheckRating;
  type: Entrytype;
}

export interface HospitalEntry extends BaseEntry {
  discharge: Discharge;
  type: Entrytype;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  employerName: string;
  sickLeave?: SickLeave;
  type: Entrytype;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}

export type newPatient = Omit<Patient, 'id'>;

export type newBaseEntry = Omit<BaseEntry, 'id'>;

export type newHealthCheckEntry = Omit<HealthCheckEntry, 'id'>;

export type newHospitalEntry = Omit<HospitalEntry, 'id'>;

export type newOccupationalHealthcareEntry = Omit<
  OccupationalHealthcareEntry,
  'id'
>;

// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown
  ? Omit<T, K>
  : never;
// Define Entry without the 'id' property
export type EntryWithoutId = UnionOmit<Entry, 'id'>;

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;
