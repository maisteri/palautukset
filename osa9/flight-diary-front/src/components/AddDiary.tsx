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
        setTimeout(() => setNotificationMessage(''), 5000);
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>
            <strong>
              <h2>Add new entry</h2>
            </strong>
          </legend>
          <Notification message={notificationMessage} />

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
              type='radio'
              id='great'
              name='visibility'
              value={visibility}
              onChange={() => setVisibility('great')}
            />
            <label htmlFor='great'>great</label>
            <input
              type='radio'
              id='good'
              name='visibility'
              value={visibility}
              onChange={() => setVisibility('good')}
            />
            <label htmlFor='good'>good</label>
            <input
              type='radio'
              id='ok'
              name='visibility'
              value={visibility}
              onChange={() => setVisibility('ok')}
            />
            <label htmlFor='ok'>ok</label>
            <input
              type='radio'
              id='poor'
              name='visibility'
              value={visibility}
              onChange={() => setVisibility('poor')}
            />
            <label htmlFor='poor'>poor</label>
          </div>

          <div>
            weather
            <input
              type='radio'
              id='sunny'
              name='weather'
              value={weather}
              onChange={() => setWeather('sunny')}
            />
            <label htmlFor='sunny'>sunny</label>
            <input
              type='radio'
              id='rainy'
              name='weather'
              value={weather}
              onChange={() => setWeather('rainy')}
            />
            <label htmlFor='rainy'>rainy</label>
            <input
              type='radio'
              id='cloudy'
              name='weather'
              value={weather}
              onChange={() => setWeather('cloudy')}
            />
            <label htmlFor='cloudy'>cloudy</label>
            <input
              type='radio'
              id='stormy'
              name='weather'
              value={weather}
              onChange={() => setWeather('stormy')}
            />
            <label htmlFor='stormy'>stormy</label>
            <input
              type='radio'
              id='windy'
              name='weather'
              value={weather}
              onChange={() => setWeather('windy')}
            />
            <label htmlFor='windy'>windy</label>
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
        </fieldset>
      </form>
    </>
  );
};

export default AddDiary;
