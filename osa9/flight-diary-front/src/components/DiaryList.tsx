import { NonSensitiveDiaryEntry } from '../types';

const DiaryList = ({ diaries }: { diaries: NonSensitiveDiaryEntry[] }) => {
  return (
    <div>
      <h2>Diary Entries</h2>
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
