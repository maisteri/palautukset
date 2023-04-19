import axios from 'axios';
import { NewDiaryEntry, NonSensitiveDiaryEntry, DiaryEntry } from '../types';

const baseUrl = 'http://localhost:3001/api/diaries';

const getDiaries = async () => {
  const response = await axios.get<NonSensitiveDiaryEntry[]>(`${baseUrl}`);
  return response.data;
};

const addDiary = async (newDiary: NewDiaryEntry) => {
  console.log(newDiary);
  const response = await axios.post<DiaryEntry>(`${baseUrl}`, newDiary);
  return response.data;
};

export default {
  getDiaries,
  addDiary,
};
