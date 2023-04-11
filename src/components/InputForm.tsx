import React, { useEffect, useState, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { keyPress } from '../keyPressFunction';
import {
  selectTestComplete,
  setTestComplete,
  selectQuoteToType,
  setQuoteToType,
  selectLettersAvailable,
  setExcessQuoteToType,
  selectExcessQuoteToType,
  setDuplicateQuoteToType,
  selectDuplicateQuoteToType,
  setUserTextInput,
  selectUserTextInput,
  fetchAllQuotes,
  selectAllQuotes,
  QuoteFormat,
  selectRandomWords,
  selectNumOfWordsToType,
  generateRandomWords,
} from '../store/slices/TypeInputSlice';
import TypeBoxText from './TypeBoxText';
import { deleteExcessLettersData, remakeQuoteString } from '../helperFunctions';
import Timer from './Timer';
import {
  adjustTime,
  incrementKeysPressed,
  resetStats,
  incrementIncorrectKeys,
  selectIncorrectKeys,
  selectUseCountdown,
  selectCountdownTimer,
  selectLanguage,
} from '../store/slices/StatSlice';
import Countdown from './Countdown';
import TestStatHeader from './TestStatHeader';
import OptionsMenu from './OptionsMenu';
import { useNavigate } from 'react-router-dom';

const InputForm = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const [border, setBorder] = useState(false);

  const [lastKeyPressed, setLastKeyPressed] = useState<string>('');

  const testComplete: boolean = useAppSelector(selectTestComplete);
  const allQuotes: QuoteFormat[] = useAppSelector(selectAllQuotes);
  const lettersAvailable: string = useAppSelector(selectLettersAvailable);
  const quoteToType: string = useAppSelector(selectQuoteToType);
  const excessQuoteToType: string = useAppSelector(selectExcessQuoteToType);
  const userTextInput: string = useAppSelector(selectUserTextInput);
  const countdownTimer = useAppSelector(selectCountdownTimer);
  const randomWordList = useAppSelector(selectRandomWords);
  const numOfWordsToType = useAppSelector(selectNumOfWordsToType);
  const language = useAppSelector(selectLanguage);
  const duplicateQuoteToType: string = useAppSelector(
    selectDuplicateQuoteToType
  );
  const incorrectKeys = useAppSelector(selectIncorrectKeys);
  const useCountdown = useAppSelector(selectUseCountdown);

  // Checks if key pressed is part of the character bank
  // Stops other keys from interfering with test
  function isValidChar(char: string): boolean {
    return lettersAvailable.includes(char);
  }

  useEffect(() => {
    dispatch(setUserTextInput(''));
    dispatch(setQuoteToType(duplicateQuoteToType));
    dispatch(setExcessQuoteToType(''));
    dispatch(fetchAllQuotes());
    dispatch(
      setQuoteToType(
        randomWordList.slice(0, numOfWordsToType).join(' ') || 'Loading'
      )
    );
    dispatch(setDuplicateQuoteToType(randomWordList.join(' ') || 'Loading'));
    dispatch(setTestComplete(false));
    return () => {
      dispatch(setTestComplete(false));
    };
  }, []);

  useEffect(() => {
    dispatch(setQuoteToType(randomWordList.join(' ') || 'Loading'));
    dispatch(setDuplicateQuoteToType(randomWordList.join(' ') || 'Loading'));
  }, [useCountdown, numOfWordsToType, language]);

  useEffect(() => {
    dispatch(setTestComplete(quoteToType.length === userTextInput.length));
  }, [quoteToType, userTextInput]);

  useEffect(() => {
    if (
      userTextInput.charAt(userTextInput.length - 1) !==
        quoteToType.charAt(userTextInput.length - 1) &&
      lastKeyPressed !== 'Backspace'
    ) {
      dispatch(incrementIncorrectKeys(1));
    }
  }, [userTextInput, quoteToType]);

  function handleFocus() {
    setBorder(true);
    const cursor = document.getElementById('cursor');
    if (cursor) {
      cursor.style.display = 'block';
    }
  }

  function handleBlur() {
    setBorder(false);
    const cursor = document.getElementById('cursor');
    if (cursor) {
      cursor.style.display = 'none';
    }
  }

  const textInput = useRef(null);

  return (
    <>
      <TestStatHeader />
      <OptionsMenu />
      <div className="flex flex-col gap-4 text-white">
        {useCountdown ? <Countdown /> : <Timer />}
        <h1 style={{ visibility: testComplete ? 'visible' : 'hidden' }}>
          Test Complete
        </h1>
        <div
          id="test-box"
          className={`relative px-8 text-3xl self-start border-x-2  min-w-full h-28 overflow-hidden ${
            border ? 'border-[#55848a]' : 'border-transparent'
          }`}
        >
          <TypeBoxText />
          <textarea
            value={userTextInput}
            id="type-test"
            className="border-2 border-white opacity-0 w-full h-full text-2xl rounded absolute py-4 px-8 left-0 top-0 "
            onChange={() => {}}
            onKeyDown={(e) => handleKeyPress(e)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            autoFocus
            ref={textInput}
          />
        </div>
      </div>
    </>
  );

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  // KEY PRESS FUNCTION BELOW, handles key logic, colors, etc

  function handleKeyPress(e: React.KeyboardEvent<HTMLTextAreaElement>): void {
    keyPress(
      e,
      setLastKeyPressed,
      deleteExcessLettersData,
      userTextInput,
      duplicateQuoteToType,
      quoteToType,
      useCountdown,
      countdownTimer,
      isValidChar,
      dispatch,
      incrementKeysPressed,
      setQuoteToType,
      setUserTextInput,
      setExcessQuoteToType,
      excessQuoteToType,
      incrementIncorrectKeys,
      remakeQuoteString
    );
  }
};

export default InputForm;
