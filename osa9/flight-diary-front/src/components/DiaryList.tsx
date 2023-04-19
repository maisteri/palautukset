import { NonSensitiveDiaryEntry } from '../types';

const DiaryList = ({ diaries }: { diaries: NonSensitiveDiaryEntry[] }) => {
  return (
    <div>
      <h1>Diary Entries</h1>
      {diaries.map((diary) => (
        <div key={diary.id}>
          <div>
            <strong>{diary.date}</strong>
          </div>
          <div>visibility: {diary.visibility}</div>
          <div>weather: {diary.weather}</div>
        </div>
      ))}
    </div>
  );
};

export default DiaryList;
