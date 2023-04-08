import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  selectQuoteToType,
  selectUserTextInput,
  selectExcessQuoteToType,
  selectDuplicateQuoteToType,
} from '../store/slices/TypeInputSlice';

const TypeBoxText = () => {
  const dispatch = useAppDispatch();

  const [cursorXPos, setCursorXPos] = useState(281.5);
  const [cursorYPos, setCursorYPos] = useState(378);
  const [translate, setTranslate] = useState(0);

  const quoteToType = useAppSelector(selectQuoteToType);
  const userTextInput = useAppSelector(selectUserTextInput);
  const excessQuoteToType = useAppSelector(selectExcessQuoteToType);
  const duplicateQuoteToType = useAppSelector(selectDuplicateQuoteToType);

  useEffect(() => {
    const quote = document.getElementById('quote');
    const xPos =
      quote?.children[userTextInput.length]?.getBoundingClientRect().x;
    setCursorXPos(xPos || 313.5);
    const yPos =
      quote?.children[userTextInput.length]?.getBoundingClientRect().y;
    setCursorYPos(yPos || 378);
  }, [userTextInput]);

  useEffect(() => {
    const quote = document.getElementById('quote');
    console.log('yyyyy', cursorYPos);
    setTranslate(cursorYPos - 36);
  }, [cursorYPos]);

  const letterColor = (idx: number): string => {
    if (idx > userTextInput.length - 1 || isSkippedLetter(idx)) {
      return '#55848a';
    } else if (isExcessLetter(idx)) {
      return '#f77795';
    } else {
      return quoteToType[idx] === userTextInput[idx] ? 'white' : 'red';
    }
  };

  function isExcessLetter(idx: number): boolean {
    if (excessQuoteToType[idx] === '~') return true;
    return false;
  }

  function isSkippedLetter(idx: number): boolean {
    if (excessQuoteToType[idx] === '%' || excessQuoteToType[idx] === '#')
      return true;
    return false;
  }

  return (
    <>
      <p id="quote" className="relative">
        {quoteToType.split('').map((char: string, idx: number) => (
          <span
            key={idx}
            style={{
              color: letterColor(idx),
            }}
          >
            {char}
          </span>
        ))}
      </p>
      <p
        id="cursor"
        className={`absolute transition-all text-yellow-400 animate-[cursor-blink_2s_infinite]`}
        style={{ left: `${cursorXPos - 287}px`, top: `${cursorYPos - 363}px` }}
      >
        |
      </p>
    </>
  );
};

export default TypeBoxText;
