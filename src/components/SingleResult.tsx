import React from 'react';

interface ResultProps {
  stat: number | string;
  statName: string;
}

const SingleResult = (props: ResultProps) => {
  return (
    <div className=" sm:w-60 sm:h-60 min-h-[160px] bg-gray-300 rounded opacity-75 flex flex-col items-center gap-6 justify-center hover:bg-white  ease-in transition-all">
      <h2 className="font-bold text-3xl sm:text-5xl">{props.statName}</h2>
      <p className="text-2xl sm:text-4xl font-bold text-blue-600">
        {props.stat}
      </p>
    </div>
  );
};

export default SingleResult;
