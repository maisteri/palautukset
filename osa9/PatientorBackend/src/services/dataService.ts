import diagnosesData from '../../data/diagnoses';
import patientData from '../../data/patients';
import {
  Diagnosis,
  NonSensitivePatient,
  Patient,
  newPatient,
  EntryWithoutId,
  Entry,
} from '../types';
import { v1 as uuid } from 'uuid';

const diagnoses: Diagnosis[] = diagnosesData;
let patients: Patient[] = patientData;

const getDiagnoses = () => {
  return diagnoses;
};

const getPatients = () => {
  return patients;
};

const getPatient = (id: string): Patient | undefined => {
  const patientFound = patients.find((patient) => patient.id === id);
  return patientFound;
};

const getNonSensitiveDataOfPatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (newEntry: newPatient): Patient => {
  const newPatient = { ...newEntry, id: uuid() };
  patients = patients.concat(newPatient);
  return newPatient;
};

const addPatientEntry = (id: string, newEntry: EntryWithoutId): Entry => {
  const newPatientEntry = { ...newEntry, id: uuid() };
  const patient = patients.find((patient) => patient.id === id);
  if (!patient) throw new Error(`No patient with id: ${id}`);
  patient.entries = patient.entries.concat(newPatientEntry);

  return newPatientEntry;
};

export default {
  getDiagnoses,
  getPatients,
  getNonSensitiveDataOfPatients,
  addPatient,
  getPatient,
  addPatientEntry,
};
