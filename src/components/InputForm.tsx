import React, { useEffect, useState, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
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
  }, []);

  useEffect(() => {
    dispatch(setTestComplete(false));
    return () => {
      dispatch(setTestComplete(false));
    };
  }, []);

  useEffect(() => {
    dispatch(
      setQuoteToType(
        randomWordList.slice(0, numOfWordsToType).join(' ') || 'Loading'
      )
    );
    dispatch(setDuplicateQuoteToType(randomWordList.join(' ') || 'Loading'));
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
  }

  function handleBlur() {
    setBorder(false);
  }

  const textInput = useRef(null);

  return (
    <>
      <TestStatHeader />
      <OptionsMenu />
      <div className="flex flex-col items-center gap-4 text-white">
        {useCountdown ? <Countdown /> : <Timer />}
        <h1 style={{ visibility: testComplete ? 'visible' : 'hidden' }}>
          Test Complete
        </h1>
        <div
          className={`relative px-8 py-4 text-3xl mx-auto ${
            border ? 'border-2' : ''
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
    setLastKeyPressed(e.key);
    const logicData = deleteExcessLettersData(
      userTextInput,
      duplicateQuoteToType,
      quoteToType
    );

    if (quoteToType.length === userTextInput.length) {
      return;
    }

    if (useCountdown && countdownTimer <= 0) {
      return;
    }
    if (isValidChar(e.key)) {
      dispatch(incrementKeysPressed());
    }

    const nextCharIsSpace = quoteToType[userTextInput.length] === ' ';
    // If the character that we are typing is supposed to be a space
    if (nextCharIsSpace) {
      // If the character IS NOT a space, adjust the quote to reflect the mistyped extra letters
      if (e.key !== ' ') {
        if (isValidChar(e.key)) {
          dispatch(
            setQuoteToType(
              `${quoteToType.slice(0, userTextInput.length)}${
                e.key
              }${quoteToType.slice(userTextInput.length)}`
            )
          );
          dispatch(setUserTextInput(userTextInput.concat(e.key)));
          // the tilde (~) is used as a character that the algo knows to code as an excess letter
          dispatch(setExcessQuoteToType(excessQuoteToType.concat('~')));
          dispatch(incrementIncorrectKeys(1));
        } else if (e.key === 'Backspace') {
          // When Backspace is pressed but space SHOULD have been pressed

          if (logicData.userInputWordLength > logicData.quoteWordLength) {
            if (e.key === 'Backspace') {
              dispatch(
                setQuoteToType(
                  remakeQuoteString(
                    userTextInput,
                    duplicateQuoteToType,
                    quoteToType
                  )
                )
              );
              dispatch(
                setExcessQuoteToType(
                  excessQuoteToType.slice(0, excessQuoteToType.length - 1)
                )
              );
              dispatch(
                setUserTextInput(
                  userTextInput.slice(0, userTextInput.length - 1)
                )
              );
            }
          } else {
            if (e.key === 'Backspace') {
              dispatch(
                setUserTextInput(
                  userTextInput.slice(0, userTextInput.length - 1)
                )
              );
              dispatch(
                setExcessQuoteToType(
                  excessQuoteToType.slice(0, excessQuoteToType.length - 1)
                )
              );
            }
          }
        }
      } else {
        // If the character is supposed to be a space and is a space, proceed as normal
        dispatch(setUserTextInput(userTextInput.concat(e.key)));
        dispatch(setExcessQuoteToType(excessQuoteToType.concat(e.key)));
      }
    } else {
      if (e.key === 'Backspace') {
        dispatch(
          setUserTextInput(userTextInput.slice(0, userTextInput.length - 1))
        );
        dispatch(
          setExcessQuoteToType(
            excessQuoteToType.slice(0, excessQuoteToType.length - 1)
          )
        );
      } else if (e.key === ' ') {
        // Pressing space will skip to the next word

        // Don't allow pressing space when user is at the beginning of a word or on the last word
        if (
          userTextInput.slice(-1) === ' ' ||
          userTextInput.length == 0 ||
          logicData.currentWordNumber === duplicateQuoteToType.split(' ').length
        ) {
          return;
        }
        dispatch(
          incrementIncorrectKeys(logicData.lettersRemainingInCurrentWord)
        );
        // # char indicates a space was pressed before the end of a word
        let skipToNextWord = '#';
        for (let i = 0; i < logicData.lettersRemainingInCurrentWord - 1; i++) {
          // % char is viewed as a skipped character
          skipToNextWord = skipToNextWord.concat('%');
        }
        skipToNextWord = skipToNextWord.concat(' ');

        dispatch(setUserTextInput(userTextInput.concat(skipToNextWord)));
        dispatch(
          setExcessQuoteToType(excessQuoteToType.concat(skipToNextWord))
        );
      } else if (isValidChar(e.key)) {
        dispatch(setUserTextInput(userTextInput.concat(e.key)));
        dispatch(setExcessQuoteToType(excessQuoteToType.concat(e.key)));
      }
    }
  }
};

export default InputForm;
