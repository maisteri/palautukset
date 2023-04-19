import React, { useEffect, useState } from 'react';
import diaryService from './services/diaryService';
import { NonSensitiveDiaryEntry } from './types';
import DiaryList from './components/DiaryList';
import AddDiary from './components/AddDiary';

function App() {
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);

  useEffect(() => {
    (async () => {
      const dairyData = await diaryService.getDiaries();
      setDiaries(dairyData);
    })();
  }, []);

  return (
    <div>
      <AddDiary setDiaries={setDiaries} diaries={diaries} />
      <DiaryList diaries={diaries} />
    </div>
  );
}

export default App;

