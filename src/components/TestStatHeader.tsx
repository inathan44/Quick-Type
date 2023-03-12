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
} from '../store/slices/StatSlice';
import {
  selectTestComplete,
  selectQuoteToType,
  selectUserTextInput,
  selectDuplicateQuoteToType,
} from '../store/slices/TypeInputSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';

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

  console.log('startingTime', startingTime);
  console.log('countdownTimer', countdownTimer);

  useEffect(() => {
    if (useCountdown) {
      if (Number.isInteger(countdownTimer)) {
        setWpm(
          +(
            (totalKeysPressed - incorrectKeys) /
            5 /
            ((startingTime - countdownTimer) / 60)
          ).toFixed(2) || 0
        );
      }
      console.log('is int?:', Number.isInteger(countdownTimer));
    } else {
      if (Number.isInteger(timeElapsed) && timeElapsed !== 0) {
        setWpm(
          +(
            (totalKeysPressed - incorrectKeys) /
            5 /
            (timeElapsed / 60)
          ).toFixed(2)
        );
      }
      console.log('is int?:', Number.isInteger(timeElapsed));
    }
  }, [timeElapsed, countdownTimer]);

  return (
    <div className="flex justify-center text-white gap-16 items-center">
      <div className="flex flex-col items-center">
        <h3 className="text-2xl">WPM</h3>
        <p className="text-green-400 text-xl">
          {wpm === Infinity ? 'Calc' : wpm}
        </p>
      </div>
      <div className="flex flex-col items-center text-4xl">
        <h3>{useCountdown ? 'Time Remaining' : 'Time Elapsed'}</h3>
        <p className="text-yellow-400">
          {useCountdown ? countdownTimer : timeElapsed}
        </p>
      </div>
      <div className="flex flex-col items-center">
        <h3 className="text-2xl">Errors</h3>
        <p className="text-red-400 text-xl">{incorrectKeys}</p>
      </div>
    </div>
  );
};

export default TestStatHeader;
