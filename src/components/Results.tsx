import React from 'react';
import { useAppSelector } from '../store/hooks';
import { selectLastTest } from '../store/slices/StatSlice';

const Results = () => {
  const lastTest = useAppSelector(selectLastTest) || null;

  if (!lastTest) return <h1>Loading...</h1>;

  return (
    <section className="text-gray-300">
      <h1 className="text-center text-5xl my-12">Test Stats</h1>
      <div className="flex text-black justify-between w-11/12 mx-auto">
        <div className="w-60 h-60 bg-gray-300 rounded-2xl opacity-75 flex flex-col items-center gap-6 justify-center hover:bg-white  ease-in transition-all">
          <h2 className="font-bold text-5xl">WPM</h2>
          <p className="text-4xl font-bold text-yellow-600">{lastTest?.wpm}</p>
        </div>
        <div className="w-60 h-60 bg-gray-300 rounded-2xl opacity-75 flex flex-col items-center gap-6 justify-center hover:bg-white  ease-in transition-all">
          <h2 className="font-bold text-5xl">Accuracy</h2>
          <p className="text-4xl font-bold text-green-600">
            {lastTest ? lastTest.accuracy * 100 : 'N/A'}%
          </p>
        </div>
        <div className="w-60 h-60 bg-gray-300 rounded-2xl opacity-75 flex flex-col items-center gap-6 justify-center hover:bg-white  ease-in transition-all">
          <h2 className="font-bold text-5xl">Errors</h2>
          <p className="text-4xl font-bold text-red-500">
            {lastTest?.incorrectKeys}
          </p>
        </div>
        <div className="w-60 h-60 bg-gray-300 rounded-2xl opacity-75 flex flex-col items-center gap-6 justify-center hover:bg-white  ease-in transition-all">
          <h2 className="font-bold text-5xl">Raw</h2>
          <p className="text-4xl font-bold text-sky-700">
            {lastTest ? lastTest.raw : 'N/A'}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Results;