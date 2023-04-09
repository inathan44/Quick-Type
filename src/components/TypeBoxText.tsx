import React, { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  selectQuoteToType,
  selectUserTextInput,
  selectExcessQuoteToType,
  selectDuplicateQuoteToType,
} from '../store/slices/TypeInputSlice';
import { selectUseCountdown } from '../store/slices/StatSlice';
import { adjustTranslate } from '../store/slices/formatSlice';

// const LINE_HEIGHT = import.meta.env.MODE === 'development' ? 18 : 36;
const LINE_HEIGHT = 18;

const TypeBoxText = () => {
  const dispatch = useAppDispatch();

  const [cursorXPos, setCursorXPos] = useState(313.5);
  const translate = useAppSelector((state) => state.format.translate);
  const [lastLetterPosition, setLastLetterPosition] = useState(362);

  const quoteToType = useAppSelector(selectQuoteToType);
  const userTextInput = useAppSelector(selectUserTextInput);
  const excessQuoteToType = useAppSelector(selectExcessQuoteToType);
  const useCountdown = useAppSelector(selectUseCountdown);

  useEffect(() => {
    const quote = document.getElementById('quote-hidden');
    const xPos =
      quote?.children[userTextInput.length]?.getBoundingClientRect().x;
    if (xPos) {
      setCursorXPos(xPos);
    }
    const yPos =
      quote?.children[userTextInput.length]?.getBoundingClientRect().y;
    if (yPos) setLastLetterPosition(yPos);
  }, [userTextInput]);

  useEffect(() => {
    dispatch(adjustTranslate(-LINE_HEIGHT));
    console.log('dispatch should have ran');
    const quote = document.getElementById('quote');
    if (quote) quote.style.transform = `translate(0,${translate}px)`;
  }, [lastLetterPosition]);

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
      <div className="absolute top-0 pr-8">
        <p id="quote-hidden" className="opacity-10">
          {quoteToType.split('').map((char: string, idx: number) => (
            <span
              key={idx}
              style={{
                color: 'orange',
              }}
            >
              {char}
            </span>
          ))}
        </p>
      </div>
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
        style={{
          left: `${cursorXPos - 287}px`,
          top: `${15}px`,
        }}
      >
        |
      </p>
    </>
  );
};

export default TypeBoxText;
