import React from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  selectQuoteToType,
  selectUserTextInput,
  selectExcessQuoteToType,
} from '../store/slices/TypeInputSlice';

const TypeBoxText = () => {
  const dispatch = useAppDispatch();

  const quoteToType = useAppSelector(selectQuoteToType);
  const userTextInput = useAppSelector(selectUserTextInput);
  const excessQuoteToType = useAppSelector(selectExcessQuoteToType);

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
    if (excessQuoteToType[idx] === '%') return true;
    return false;
  }

  return (
    <h2>
      {quoteToType.split('').map((char: string, idx: number) => (
        <span
          className={
            idx === userTextInput.length - 1
              ? "after:content-['|'] after:animate-[cursor-blink_2s_infinite] after:opacity-.1 after:text-yellow-400 after:absolute after:right-[-4px] relative"
              : ''
          }
          key={idx}
          style={{
            color: letterColor(idx),
          }}
        >
          {char}
        </span>
      ))}
    </h2>
  );
};

export default TypeBoxText;
