import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  selectLastTest,
  selectWpm,
  selectAccuracy,
  selectIncorrectKeys,
  Stat,
  adjustWpm,
  adjustAccuracy,
  adjustRaw,
  setLastTast,
  setIncorrectKeys,
} from '../store/slices/StatSlice';
import SingleResult from './SingleResult';

const Results = () => {
  const dispatch = useAppDispatch();
  const wpm = useAppSelector(selectWpm);
  const accuracy = useAppSelector(selectAccuracy);
  const incorrectKeys = useAppSelector(selectIncorrectKeys);
  const raw = useAppSelector((state) => state.statSlice.raw);

  useEffect(() => {
    const lastTest: Stat = JSON.parse(localStorage.getItem('lastTest') || '{}');
    dispatch(setLastTast(lastTest));
    if (!wpm) {
      dispatch(adjustWpm(lastTest.wpm));
      dispatch(adjustAccuracy(lastTest.accuracy));
      dispatch(setIncorrectKeys(lastTest.incorrectKeys));
      dispatch(adjustRaw(lastTest.raw));
    }
  }, []);

  return (
    <section className="text-gray-300 flex flex-col items-center">
      <h1 className="text-center text-5xl my-12">Test Stats</h1>
      <div className="mx-auto grid grid-cols-2 content-center justify-center gap-2 px-2 md:flex text-black md:justify-between w-11/12 sm:mx-auto">
        <SingleResult stat={Math.round(wpm)} statName="WPM" />
        <SingleResult
          stat={accuracy < 0.7 ? 'Too low' : `${(accuracy * 100).toFixed(0)}%`}
          statName="Accuracy"
        />
        <SingleResult stat={incorrectKeys} statName="Errors" />
        <SingleResult stat={Math.round(raw)} statName="Raw" />
      </div>
    </section>
  );
};

export default Results;
