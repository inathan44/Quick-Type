import React, { useEffect, useState } from 'react';
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
  addScore,
} from '../store/slices/StatSlice';

document.cookie = 'test=test';

const InputForm = () => {
  const dispatch = useAppDispatch();

  const [lastKeyPressed, setLastKeyPressed] = useState<string>('');

  const testComplete: boolean = useAppSelector(selectTestComplete);
  const lettersAvailable: string = useAppSelector(selectLettersAvailable);
  const quoteToType: string = useAppSelector(selectQuoteToType);
  const excessQuoteToType: string = useAppSelector(selectExcessQuoteToType);
  const userTextInput: string = useAppSelector(selectUserTextInput);
  // console.log('user TI', userTextInput);
  const allQuotes: QuoteFormat[] = useAppSelector(selectAllQuotes);
  const duplicateQuoteToType: string = useAppSelector(
    selectDuplicateQuoteToType
  );
  const incorrectKeys = useAppSelector(selectIncorrectKeys);

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
    const randomIdx = Math.floor(Math.random() * allQuotes.length);
    dispatch(setQuoteToType(allQuotes[randomIdx]?.text || 'Loading'));
    dispatch(setDuplicateQuoteToType(allQuotes[randomIdx]?.text || 'Loading'));
  }, [allQuotes]);

  useEffect(() => {
    dispatch(setTestComplete(quoteToType.length === userTextInput.length));
  }, [quoteToType, userTextInput]);

  useEffect(() => {
    if (
      userTextInput.charAt(userTextInput.length - 1) !==
        quoteToType.charAt(userTextInput.length - 1) &&
      lastKeyPressed !== 'Backspace'
    ) {
      dispatch(incrementIncorrectKeys());
    }
  }, [userTextInput, quoteToType]);

  return (
    <div className="flex pt-44 flex-col items-center gap-4 text-white">
      <Timer />
      <h1 style={{ visibility: testComplete ? 'visible' : 'hidden' }}>
        Test Complete
      </h1>
      <div className="relative border-2 px-8 py-4 rounded-md text-3xl">
        <TypeBoxText />
        <textarea
          value={userTextInput}
          className="border-2 border-white opacity-0 w-full h-full text-2xl rounded absolute py-4 px-8 left-0 top-0"
          onChange={() => {}}
          onKeyDown={(e) => handleKeyPress(e)}
        />
      </div>
      <button
        onClick={() => {
          dispatch(setUserTextInput(''));
          dispatch(setQuoteToType(duplicateQuoteToType));
          dispatch(setExcessQuoteToType(''));
          dispatch(adjustTime(0));
          dispatch(resetStats());
        }}
      >
        Reset Test
      </button>
    </div>
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

    if (isValidChar(e.key)) {
      dispatch(incrementKeysPressed());
    }
    if (quoteToType.length === userTextInput.length) {
      return;
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
          dispatch(setExcessQuoteToType(excessQuoteToType.concat('~')));
          dispatch(incrementIncorrectKeys());
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
        dispatch(setUserTextInput(userTextInput.concat('*')));
        dispatch(setExcessQuoteToType(excessQuoteToType.concat('*')));
      } else if (isValidChar(e.key)) {
        dispatch(setUserTextInput(userTextInput.concat(e.key)));
        dispatch(setExcessQuoteToType(excessQuoteToType.concat(e.key)));
      }
    }
    // console.log('userInput', userTextInput);
    // console.log('user last char', userTextInput[userTextInput.length - 1]);
    // console.log('quote last char', quoteToType[userTextInput.length - 1]);
    // if (
    //   userTextInput[userTextInput.length - 1] !==
    //     quoteToType[userTextInput.length - 1] &&
    //   e.key !== 'Backspace'
    // ) {
    //   dispatch(incrementIncorrectKeys());
    // }
  }
};

export default InputForm;
