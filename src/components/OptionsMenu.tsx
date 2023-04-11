import React, { useState, useEffect } from 'react';
import SingleOption from './SingleOption';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  changeMode,
  selectUseCountdown,
  setTestTime,
  changeTestLangauge,
  resetStats,
  selectLanguage,
  selectStartingTime,
} from '../store/slices/StatSlice';
import OptionButton from './OptionButton';
import {
  resetUserInput,
  selectNumOfWordsToType,
  setTestWords,
} from '../store/slices/TypeInputSlice';

export type Mode = 'Time' | 'Words';
export type Languages = 'English' | 'HTML' | 'JavaScript';

interface ModeState {
  activeMode: Mode;
  modes: { id: Mode }[];
}

interface LanguageState {
  activeLanguage: Languages;
  languages: { id: Languages }[];
}

interface TimeState {
  activeTime: number;
  times: { id: number }[];
}

interface WordState {
  activeWords: number;
  words: { id: number }[];
}

const OptionsMenu = () => {
  const useCountdown = useAppSelector(selectUseCountdown);
  const testLanguage = useAppSelector(selectLanguage);
  const startingTime = useAppSelector(selectStartingTime);
  const numberofWordsToType = useAppSelector(selectNumOfWordsToType);

  const dispatch = useAppDispatch();

  const [mode, setMode] = useState<ModeState>({
    activeMode: useCountdown ? 'Time' : 'Words',
    modes: [{ id: 'Time' }, { id: 'Words' }],
  });

  const [language, setLanguage] = useState<LanguageState>({
    activeLanguage: testLanguage,
    languages: [{ id: 'English' }, { id: 'HTML' }, { id: 'JavaScript' }],
  });
  const [time, setTime] = useState<TimeState>({
    activeTime: startingTime,
    times: [{ id: 15 }, { id: 30 }, { id: 60 }],
  });
  const [words, setWords] = useState<WordState>({
    activeWords: numberofWordsToType,
    words: [{ id: 10 }, { id: 20 }, { id: 50 }],
  });

  useEffect(() => {
    dispatch(changeMode(mode.activeMode));
  }, [mode]);

  useEffect(() => {
    dispatch(changeTestLangauge(language.activeLanguage));
  }, [language]);

  function toggleMode(id: Mode): void {
    setMode((prev) => ({ ...prev, activeMode: id }));
    dispatch(resetStats());
    dispatch(resetUserInput());
  }

  function toggleLanguage(id: Languages): void {
    setLanguage((prev) => ({ ...prev, activeLanguage: id }));
    dispatch(resetUserInput());
    dispatch(resetStats());
  }
  function toggleTime(id: number): void {
    setTime((prev) => ({ ...prev, activeTime: id }));
    dispatch(resetStats());
    dispatch(resetUserInput());
    dispatch(setTestTime(id));
  }
  function toggleWord(id: number): void {
    setWords((prev) => ({ ...prev, activeWords: id }));
    dispatch(resetStats());
    dispatch(resetUserInput());
    dispatch(setTestWords(id));
  }

  return (
    <div className="flex justify-between max-w-3xl mx-auto py-8 text-white">
      <SingleOption>
        <h4 className="">Language</h4>
        <div className="flex gap-5">
          {language.languages.map((language) => (
            <OptionButton
              id={language.id}
              clickFunc={toggleLanguage}
              key={language.id}
            >
              {language.id}
            </OptionButton>
          ))}
        </div>
      </SingleOption>
      <SingleOption>
        <h4 className="">Mode</h4>
        <div className="flex gap-5">
          {mode.modes.map((mode) => (
            <OptionButton id={mode.id} clickFunc={toggleMode} key={mode.id}>
              {mode.id}
            </OptionButton>
          ))}
        </div>
      </SingleOption>
      <SingleOption>
        <h4 className="">{useCountdown ? 'Time' : 'Quote'}</h4>
        <div className="flex gap-5">
          {useCountdown
            ? time.times.map((time) => (
                <OptionButton id={time.id} clickFunc={toggleTime} key={time.id}>
                  {time.id}
                </OptionButton>
              ))
            : words.words.map((word) => (
                <OptionButton id={word.id} clickFunc={toggleWord} key={word.id}>
                  {word.id}
                </OptionButton>
              ))}
        </div>
      </SingleOption>
    </div>
  );
};

export default OptionsMenu;
