import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { authorizeToken } from '../store/slices/AuthSlice';
import { dataState } from '../store/slices/AuthSlice';
import {
  toggleTimerActive,
  selectTimeElapsed,
  adjustTime,
  selectTimerActive,
  selectTotalKeysPressed,
  selectIncorrectKeys,
  addNewScore,
  selectUseCountdown,
} from '../store/slices/StatSlice';
import {
  selectTestComplete,
  selectQuoteToType,
  selectUserTextInput,
  selectDuplicateQuoteToType,
} from '../store/slices/TypeInputSlice';

const Timer = () => {
  const dispatch = useAppDispatch();
  const userData = useAppSelector(dataState);
  const timeElapsed = useAppSelector(selectTimeElapsed);
  const timerActive = useAppSelector(selectTimerActive);
  const quoteToType = useAppSelector(selectQuoteToType);
  const userTextInput = useAppSelector(selectUserTextInput);
  const totalKeysPressed = useAppSelector(selectTotalKeysPressed);
  const duplicateQuoteToType = useAppSelector(selectDuplicateQuoteToType);
  const incorrectKeys = useAppSelector(selectIncorrectKeys);
  const testComplete = useAppSelector(selectTestComplete);
  const useCountdown = useAppSelector(selectUseCountdown);

  useEffect(() => {
    const raw = totalKeysPressed / 5 / (timeElapsed / 60);
    const wpm = +(
      (totalKeysPressed - incorrectKeys) /
      5 /
      (timeElapsed / 60)
    ).toFixed(2);
    const accuracy = +(
      (totalKeysPressed - incorrectKeys) /
      totalKeysPressed
    ).toFixed(2);

    // Dispatch adding the score to the datbase once test is complete (user reaches the end of the test),
    // user has typed at least once and we are on countdown mode
    // dispatch(authorizeToken());
    if (testComplete && userTextInput.length !== 0 && !useCountdown) {
      async function dispatchData() {
        if (userData) {
          dispatch(
            addNewScore({
              timeElapsed,
              totalKeysPressed,
              incorrectKeys,
              wpm,
              raw,
              accuracy,
              language: 'English',
              testType: 'words',
              userId: userData.id,
            })
          );
        } else {
          dispatch(
            addNewScore({
              timeElapsed,
              totalKeysPressed,
              incorrectKeys,
              wpm,
              raw,
              accuracy,
              language: 'English',
              testType: 'words',
            })
          );
        }
      }
      dispatchData();
    }
    dispatch(authorizeToken());
  }, [testComplete]);

  useEffect(() => {
    if (userTextInput.length > 0 && userTextInput.length < quoteToType.length) {
      dispatch(toggleTimerActive(true));
    }

    return () => {
      dispatch(toggleTimerActive(false));
    };
  }, [userTextInput, quoteToType, useCountdown]);

  useEffect(() => {
    let interval: any = null;
    if (timerActive) {
      interval = setInterval(() => {
        dispatch(adjustTime(timeElapsed + 0.1));
      }, 100);
    } else if (!timerActive && timeElapsed !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerActive, timeElapsed]);

  return <div>{/* <p>{timeElapsed}</p> */}</div>;
};

export default Timer;
