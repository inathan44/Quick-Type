import React, { useEffect, useState } from 'react';
import {
  toggleTimerActive,
  selectTimeElapsed,
  adjustTime,
  selectTimerActive,
  selectTotalKeysPressed,
  selectIncorrectKeys,
  addNewScore,
  selectUseCountdown,
  selectCountdownTimer,
  selectStartingTime,
  adjustWpm,
  selectWpm,
} from '../store/slices/StatSlice';
import {
  selectTestComplete,
  selectQuoteToType,
  selectUserTextInput,
  selectDuplicateQuoteToType,
  selectExcessQuoteToType,
} from '../store/slices/TypeInputSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { CalculateWPM } from '../helperFunctions';

const TestStatHeader = () => {
  const dispatch = useAppDispatch();
  const [wpm, setWpm] = useState(0);

  const timeElapsed = useAppSelector(selectTimeElapsed);
  const timerActive = useAppSelector(selectTimerActive);
  const quoteToType = useAppSelector(selectQuoteToType);
  const userTextInput = useAppSelector(selectUserTextInput);
  const totalKeysPressed = useAppSelector(selectTotalKeysPressed);
  const duplicateQuoteToType = useAppSelector(selectDuplicateQuoteToType);
  const incorrectKeys = useAppSelector(selectIncorrectKeys);
  const testComplete = useAppSelector(selectTestComplete);
  const useCountdown = useAppSelector(selectUseCountdown);
  const countdownTimer = useAppSelector(selectCountdownTimer);
  const startingTime = useAppSelector(selectStartingTime);
  const excessQuoteToType = useAppSelector(selectExcessQuoteToType);
  const stateWpm = useAppSelector(selectWpm);

  useEffect(() => {
    dispatch(
      adjustWpm(
        CalculateWPM(
          useCountdown,
          timeElapsed,
          countdownTimer,
          startingTime,
          excessQuoteToType,
          quoteToType,
          duplicateQuoteToType,
          userTextInput
        )
      )
    );
  }, [userTextInput]);

  useEffect(() => {
    dispatch(
      adjustWpm(
        CalculateWPM(
          useCountdown,
          timeElapsed,
          countdownTimer,
          startingTime,
          excessQuoteToType,
          quoteToType,
          duplicateQuoteToType,
          userTextInput
        )
      )
    );
    if (useCountdown) {
      if (Number.isInteger(countdownTimer)) {
        setWpm(Math.floor(stateWpm));
      }
    } else {
      if (Number.isInteger(timeElapsed) && timeElapsed !== 0) {
        setWpm(Math.floor(stateWpm));
      }
    }
  }, [timeElapsed, countdownTimer]);

  useEffect(() => {
    if (stateWpm === 0) {
      setWpm(stateWpm);
    }
  }, [stateWpm]);

  return (
    <div className="text-center px-4 flex justify-center text-white gap-16 items-center">
      <div className="flex flex-col items-center">
        <h3 className="sm:text-2xl text-xl">WPM</h3>
        <p className="text-green-400 text-xl">{wpm === Infinity ? '0' : wpm}</p>
      </div>
      <div className="flex flex-col items-center text-3xl sm:text-4xl">
        <h3>{useCountdown ? 'Time Remaining' : 'Time Elapsed'}</h3>
        <p className="text-yellow-400">
          {useCountdown ? Math.floor(countdownTimer) : Math.floor(timeElapsed)}
        </p>
      </div>
      <div className="flex flex-col items-center">
        <h3 className="sm:text-2xl text-xl">Errors</h3>
        <p className="text-red-400 text-xl">{incorrectKeys}</p>
      </div>
    </div>
  );
};

export default TestStatHeader;
