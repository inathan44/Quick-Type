import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  toggleTimerActive,
  selectTimeElapsed,
  adjustTime,
  selectTimerActive,
  selectTotalKeysPressed,
  selectIncorrectKeys,
  addScore,
  addNewScore,
  selectCountdownTimer,
  adjustCountdown,
  selectUseCountdown,
  selectStartingTime,
} from '../store/slices/StatSlice';
import {
  selectTestComplete,
  selectQuoteToType,
  selectUserTextInput,
  selectDuplicateQuoteToType,
  setTestComplete,
} from '../store/slices/TypeInputSlice';

const Timer = () => {
  const dispatch = useAppDispatch();

  const [timeRemaining, setTimeRemaining] = useState(15);

  const timeElapsed = useAppSelector(selectTimeElapsed);
  const timerActive = useAppSelector(selectTimerActive);
  const quoteToType = useAppSelector(selectQuoteToType);
  const userTextInput = useAppSelector(selectUserTextInput);
  const totalKeysPressed = useAppSelector(selectTotalKeysPressed);
  const duplicateQuoteToType = useAppSelector(selectDuplicateQuoteToType);
  const incorrectKeys = useAppSelector(selectIncorrectKeys);
  const testComplete = useAppSelector(selectTestComplete);
  const countdownTimer = useAppSelector(selectCountdownTimer);
  const useCountdown = useAppSelector(selectUseCountdown);
  const startingTime = useAppSelector(selectStartingTime);

  useEffect(() => {
    const raw = totalKeysPressed / 5 / (startingTime / 60);
    const wpm = +(
      (totalKeysPressed - incorrectKeys) /
      5 /
      (startingTime / 60)
    ).toFixed(2);
    const accuracy = +(
      (totalKeysPressed - incorrectKeys) /
      totalKeysPressed
    ).toFixed(2);

    // Dispatch adding the score to the datbase once test is complete (clock hits 0),
    // user has typed at least once and we are on countdown mode
    if (testComplete && userTextInput.length !== 0 && useCountdown) {
      dispatch(
        addScore({
          timeElapsed: startingTime,
          totalKeysPressed,
          incorrectKeys,
          wpm,
          raw,
          accuracy,
          language: 'english',
          testType: 'time',
        })
      );
      dispatch(
        addNewScore({
          timeElapsed: startingTime,
          totalKeysPressed,
          incorrectKeys,
          wpm,
          raw,
          accuracy,
          language: 'english',
          testType: 'time',
          userId: 1,
        })
      );
    }
  }, [testComplete]);

  useEffect(() => {
    if (userTextInput.length > 0 && userTextInput.length < quoteToType.length) {
      dispatch(toggleTimerActive(true));
    }

    return () => {
      dispatch(toggleTimerActive(false));
    };
  }, [userTextInput, quoteToType]);

  useEffect(() => {
    let interval: any = null;
    if (timerActive) {
      interval = setInterval(() => {
        dispatch(adjustCountdown(countdownTimer - 0.1));
      }, 100);
    } else if (!timerActive && timeElapsed !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerActive, countdownTimer]);

  useEffect(() => {
    if (countdownTimer <= 0) {
      dispatch(toggleTimerActive(false));
      dispatch(setTestComplete(true));
    }
  }, [countdownTimer, timerActive]);

  return (
    <div>
      <p>{countdownTimer}</p>
    </div>
  );
};

export default Timer;
