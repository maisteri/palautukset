import { useState } from 'react';
import diaryService from '../services/diaryService';
import { Visibility, Weather, NonSensitiveDiaryEntry } from '../types';
import axios from 'axios';
import Notification from '../components/Notification';

const AddDiary = ({
  setDiaries,
  diaries,
}: {
  setDiaries: React.Dispatch<React.SetStateAction<NonSensitiveDiaryEntry[]>>;
  diaries: NonSensitiveDiaryEntry[];
}) => {
  const [date, setDate] = useState('');
  const [weather, setWeather] = useState('');
  const [visibility, setVisibility] = useState('');
  const [comment, setComment] = useState('');
  const [notificationMessage, setNotificationMessage] = useState('');

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    console.log(date, weather, visibility, comment);
    try {
      await diaryService.addDiary({
        date,
        weather: weather as Weather,
        visibility: visibility as Visibility,
        comment,
      });
    } catch (e) {
      if (axios.isAxiosError(e)) {
        console.log(e.response?.data);
        setNotificationMessage(e.response?.data);
      }
    }
  };

  return (
    <>
      <h1>Add new entry</h1>
      <Notification message={notificationMessage} />
      <form onSubmit={handleSubmit}>
        <div>
          date
          <input
            type='date'
            name='date'
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </div>
        <div>
          visibility
          <input
            type='string'
            name='visibility'
            value={visibility}
            onChange={(event) => setVisibility(event.target.value)}
          />
        </div>
        <div>
          weather
          <input
            type='string'
            name='weather'
            value={weather}
            onChange={(event) => setWeather(event.target.value)}
          />
        </div>
        <div>
          comment
          <input
            type='string'
            name='comment'
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
        </div>
        <input type='submit' />
      </form>
    </>
  );
};

export default AddDiary;
