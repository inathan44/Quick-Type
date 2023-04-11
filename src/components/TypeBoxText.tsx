import React, { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  selectQuoteToType,
  selectUserTextInput,
  selectExcessQuoteToType,
  selectDuplicateQuoteToType,
  setUserTextInput,
} from '../store/slices/TypeInputSlice';
import { selectUseCountdown } from '../store/slices/StatSlice';
import { adjustTranslate, resetFormatState } from '../store/slices/formatSlice';

const LINE_HEIGHT = 36;
const TEXT_PADDDING_X = 32;

const TypeBoxText = () => {
  const dispatch = useAppDispatch();

  const quote = document.getElementById('quote-hidden');
  const STARTING_QUOTE_Y = quote?.getBoundingClientRect().y || 362;
  const STARTING_QUOTE_X = quote?.getBoundingClientRect().x || 250;

  const [cursorXPos, setCursorXPos] = useState(STARTING_QUOTE_X);
  const [cursorYPos, setCursorYPos] = useState(STARTING_QUOTE_Y);
  const translate = useAppSelector((state) => state.format.translate);
  const [lastLetterPosition, setLastLetterPosition] =
    useState(STARTING_QUOTE_Y);

  const quoteToType = useAppSelector(selectQuoteToType);
  const userTextInput = useAppSelector(selectUserTextInput);
  const excessQuoteToType = useAppSelector(selectExcessQuoteToType);
  const yPos = quote?.children[userTextInput.length]?.getBoundingClientRect().y;
  const xPos = quote?.children[userTextInput.length]?.getBoundingClientRect().x;

  useEffect(() => {
    if (xPos) {
      setCursorXPos(xPos);
    }

    if (yPos) {
      setCursorYPos(yPos + translate);
      setLastLetterPosition(yPos);
    }
  }, [userTextInput]);

  useEffect(() => {
    const quote = document.getElementById('quote-hidden');
    if (quote) {
      const lastLine =
        quote?.getBoundingClientRect().bottom ===
        quote?.children[userTextInput.length]?.getBoundingClientRect().y + 36;

      if (lastLine) return;
    }
    if (STARTING_QUOTE_Y - lastLetterPosition < -LINE_HEIGHT) {
      const newPosition = STARTING_QUOTE_Y - lastLetterPosition + LINE_HEIGHT;
      if (yPos) setCursorYPos(yPos + newPosition);
      dispatch(adjustTranslate(newPosition));
    }
  }, [lastLetterPosition]);

  useEffect(() => {
    dispatch(resetFormatState());
    setTimeout(() => {
      const quote = document.getElementById('quote-hidden');
      if (quote)
        setCursorXPos(
          quote?.children[userTextInput.length]?.getBoundingClientRect().x
        );
    }, 0);
  }, []);

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
        <p id="quote-hidden" className="opacity-0">
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
      <p
        id="quote"
        className=""
        style={{ transform: `translate(0,${translate}px)` }}
      >
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
        className={`absolute transition-all duration-[100ms] ease-in-out text-yellow-400 animate-[cursor-blink_2s_infinite]`}
        style={{
          left: `${cursorXPos - STARTING_QUOTE_X + TEXT_PADDDING_X - 5}px`,
          top: `${cursorYPos - STARTING_QUOTE_Y - 2}px`,
        }}
      >
        |
      </p>
    </>
  );
};

export default TypeBoxText;
