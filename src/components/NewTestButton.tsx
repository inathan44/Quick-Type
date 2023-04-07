import React, { useState, useEffect } from 'react';
import {
  setUserTextInput,
  setQuoteToType,
  setExcessQuoteToType,
  selectDuplicateQuoteToType,
  setDuplicateQuoteToType,
  selectNumOfWordsToType,
  selectRandomWords,
} from '../store/slices/TypeInputSlice';
import {
  adjustTime,
  resetStats,
  selectLanguage,
  selectUseCountdown,
} from '../store/slices/StatSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { useNavigate } from 'react-router-dom';
const NewTestButton = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const duplicateQuoteToType = useAppSelector(selectDuplicateQuoteToType);

  const useCountdown = useAppSelector(selectUseCountdown);
  const numOfWordsToType = useAppSelector(selectNumOfWordsToType);
  const language = useAppSelector(selectLanguage);
  const randomWordList = useAppSelector(selectRandomWords);

  useEffect(() => {
    dispatch(setQuoteToType(randomWordList.join(' ') || 'Loading'));
    dispatch(setDuplicateQuoteToType(randomWordList.join(' ') || 'Loading'));
  }, [useCountdown, numOfWordsToType, language]);

  return (
    <button
      className="border-2 px-6 py-2 rounded-lg my-5 mx-auto block"
      onClick={() => {
        dispatch(setUserTextInput(''));
        dispatch(setQuoteToType(duplicateQuoteToType));
        dispatch(setExcessQuoteToType(''));
        dispatch(adjustTime(0));
        dispatch(resetStats());
        dispatch(setQuoteToType(randomWordList.join(' ') || 'Loading'));
        dispatch(
          setDuplicateQuoteToType(randomWordList.join(' ') || 'Loading')
        );
        navigate('/');
      }}
    >
      Reset Test
    </button>
  );
};

export default NewTestButton;
