import axios from 'axios';
import { Patient, PatientFormValues, EntryWithoutId, Entry } from '../types';

import { apiBaseUrl } from '../constants';

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);

  return data;
};

const getOne = async (id: string) => {
  const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);

  return data;
};

const createEntry = async (id: string, object: EntryWithoutId) => {
  const response = await axios.post<Entry>(
    `${apiBaseUrl}/patients/${id}/entries`,
    object
  );
  console.log('THIS SHOULD BE DATA: ', response);
  return response.data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAll,
  create,
  createEntry,
  getOne,
};
