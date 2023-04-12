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

  const [modes, setModes] = useState<ModeState>({
    activeMode: useCountdown ? 'Time' : 'Words',
    modes: [{ id: 'Time' }, { id: 'Words' }],
  });

  const [languages, setLanguages] = useState<LanguageState>({
    activeLanguage: testLanguage,
    languages: [{ id: 'English' }, { id: 'HTML' }, { id: 'JavaScript' }],
  });
  const [times, setTimes] = useState<TimeState>({
    activeTime: startingTime,
    times: [{ id: 15 }, { id: 30 }, { id: 60 }],
  });
  const [words, setWords] = useState<WordState>({
    activeWords: numberofWordsToType,
    words: [{ id: 10 }, { id: 20 }, { id: 50 }],
  });

  useEffect(() => {
    dispatch(changeMode(modes.activeMode));
  }, [modes]);

  useEffect(() => {
    dispatch(changeTestLangauge(languages.activeLanguage));
  }, [languages]);

  function toggleMode(id: Mode): void {
    setModes((prev) => ({ ...prev, activeMode: id }));
    dispatch(resetStats());
    dispatch(resetUserInput());
  }

  function toggleLanguage(id: Languages): void {
    setLanguages((prev) => ({ ...prev, activeLanguage: id }));
    dispatch(resetUserInput());
    dispatch(resetStats());
  }
  function toggleTime(id: number): void {
    setTimes((prev) => ({ ...prev, activeTime: id }));
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
    <div className="flex justify-center max-w-3xl mx-auto py-8 text-white">
      <div className="max-w-[256px] hidden sm:block">
        <SingleOption>
          <h4 className="">Language</h4>
          <div className="flex gap-5">
            {languages.languages.map((language) => (
              <OptionButton
                id={language.id}
                clickFunc={toggleLanguage}
                key={language.id}
                selected={language.id === languages.activeLanguage}
              >
                {language.id}
              </OptionButton>
            ))}
          </div>
        </SingleOption>
      </div>
      <SingleOption>
        <h4 className="">Mode</h4>
        <div className="flex gap-5">
          {modes.modes.map((mode) => (
            <OptionButton
              id={mode.id}
              clickFunc={toggleMode}
              key={mode.id}
              selected={mode.id === modes.activeMode}
            >
              {mode.id}
            </OptionButton>
          ))}
        </div>
      </SingleOption>
      <SingleOption>
        <h4 className="">{useCountdown ? 'Time' : 'Words'}</h4>
        <div className="flex gap-5">
          {useCountdown
            ? times.times.map((time) => (
                <OptionButton
                  id={time.id}
                  clickFunc={toggleTime}
                  key={time.id}
                  selected={time.id === times.activeTime}
                >
                  {time.id}
                </OptionButton>
              ))
            : words.words.map((word) => (
                <OptionButton
                  id={word.id}
                  clickFunc={toggleWord}
                  key={word.id}
                  selected={word.id === words.activeWords}
                >
                  {word.id}
                </OptionButton>
              ))}
        </div>
      </SingleOption>
    </div>
  );
};

export default OptionsMenu;
