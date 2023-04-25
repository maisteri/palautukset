import diagnosesData from '../../data/diagnoses';
import patientData from '../../data/patients';
import { Diagnosis, NonSensitivePatient, Patient, newPatient } from '../types';
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

export default {
  getDiagnoses,
  getPatients,
  getNonSensitiveDataOfPatients,
  addPatient,
  getPatient,
};
