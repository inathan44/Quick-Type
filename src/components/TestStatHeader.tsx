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
  selectCurrentScores,
  pushScore,
} from '../store/slices/StatSlice';
import {
  selectTestComplete,
  selectQuoteToType,
  selectUserTextInput,
  selectDuplicateQuoteToType,
  selectExcessQuoteToType,
} from '../store/slices/TypeInputSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  CalculateWPM,
  addScoreToState,
  calculateRaw,
  incorrectKeyPresses,
} from '../helperFunctions';

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
  const currentScores = useAppSelector(selectCurrentScores);

  useEffect(() => {
    const wordsPerMin = CalculateWPM(
      useCountdown,
      timeElapsed,
      countdownTimer,
      startingTime,
      excessQuoteToType,
      quoteToType,
      duplicateQuoteToType,
      userTextInput
    );

    dispatch(adjustWpm(wordsPerMin));
  }, [userTextInput]);

  useEffect(() => {
    const wordsPerMin = CalculateWPM(
      useCountdown,
      timeElapsed,
      countdownTimer,
      startingTime,
      excessQuoteToType,
      quoteToType,
      duplicateQuoteToType,
      userTextInput
    );

    const errors = incorrectKeyPresses(excessQuoteToType, incorrectKeys);

    dispatch(adjustWpm(wordsPerMin));

    if (useCountdown) {
      const raw =
        calculateRaw(totalKeysPressed, startingTime - countdownTimer) || 0;

      if (Number.isInteger(countdownTimer)) {
        addScoreToState(
          currentScores,
          dispatch,
          wordsPerMin,
          raw,
          errors,
          startingTime - countdownTimer,
          pushScore
        );
        setWpm(Math.floor(stateWpm));
      }
    } else {
      if (Number.isInteger(timeElapsed) && timeElapsed !== 0) {
        const raw = calculateRaw(totalKeysPressed, timeElapsed);

        addScoreToState(
          currentScores,
          dispatch,
          wordsPerMin,
          raw,
          errors,
          timeElapsed,
          pushScore
        );

        setWpm(Math.floor(stateWpm));
      }
    }
  }, [timeElapsed, countdownTimer]);

  useEffect(() => {
    if (stateWpm === 0) {
      setWpm(stateWpm);
    }
  }, [stateWpm]);

  useEffect(() => {
    if (timeElapsed !== 0 || countdownTimer !== startingTime) {
      const wordsPerMin = CalculateWPM(
        useCountdown,
        timeElapsed,
        countdownTimer,
        startingTime,
        excessQuoteToType,
        quoteToType,
        duplicateQuoteToType,
        userTextInput
      );

      const raw = calculateRaw(
        totalKeysPressed,
        useCountdown ? startingTime - countdownTimer : timeElapsed
      );

      const errors = incorrectKeyPresses(excessQuoteToType, incorrectKeys);

      addScoreToState(
        currentScores,
        dispatch,
        wordsPerMin,
        raw,
        errors,
        useCountdown ? startingTime - countdownTimer : timeElapsed,
        pushScore
      );
    }
  }, [testComplete]);

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
