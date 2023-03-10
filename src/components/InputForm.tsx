import React, { useEffect, useState } from 'react';

// What number word are we on?
// compare the duplicate word length with the changes word length
// allow deletion if the changed word length is longer than the duplicate word length

interface KeyLogic {
  currentWordNumber: number;
  userInputWordLength: number;
  quoteWordLength: number;
  quoteWord: string;
  userTypedWord: string;
  reassignWord: string;
  splitQuote: string[];
}

const InputForm = () => {
  const quote =
    'You take the blue pill... the story ends, you wake up in your bed and believe whatever you want to believe. You take the red pill... you stay in Wonderland, and I show you how deep the rabbit hole goes';

  // const quote = '<p>Hello world</p> <h1>I am the best</h1>';

  const [quoteToType, setQuoteToType] = useState<string>(quote);
  const [excessQuoteToType, setExcessQuoteToType] = useState<string>('');

  const [duplicateQuoteToType, setDuplicateQuoteToType] =
    useState<string>(quote);
  const [userTextInput, setUserTextInput] = useState<string>('');

  const [testComplete, setTestComplete] = useState<boolean>(false);

  const lettersAvailable =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ .,<>/123456789';

  const letterColor = (idx: number): string => {
    if (idx > userTextInput.length - 1) return '#55848a';
    else if (isExcessLetter(idx)) return '#f77795';
    else {
      return quoteToType[idx] === userTextInput[idx] ? 'white' : 'red';
    }
  };

  function isExcessLetter(idx: number): boolean {
    if (excessQuoteToType[idx] === '~') return true;
    return false;
  }

  function isValidChar(char: string): boolean {
    return lettersAvailable.includes(char);
  }

  function deleteExcessLettersData(sentence: string): KeyLogic {
    const currentWordNumber = sentence.split(' ').length;
    const userInputWordLength =
      userTextInput.split(' ')[currentWordNumber - 1].length;
    const quoteWordLength =
      duplicateQuoteToType.split(' ')[currentWordNumber - 1].length;
    const quoteWord = duplicateQuoteToType.split(' ')[currentWordNumber - 1];
    const userTypedWord = userTextInput
      .split(' ')
      [currentWordNumber - 1].slice(
        0,
        userTextInput.split(' ')[currentWordNumber - 1].length - 1
      );
    const reassignWord = quoteWord.concat(
      userTypedWord.slice(quoteWordLength, userInputWordLength - 1)
    );
    const splitQuote = quoteToType.split(' ');
    return {
      currentWordNumber,
      userInputWordLength,
      quoteWordLength,
      quoteWord,
      userTypedWord,
      reassignWord,
      splitQuote,
    };
  }

  // Returns the new string that should replace the quoteToType
  function remakeQuoteString(): string {
    const logicData = deleteExcessLettersData(userTextInput);
    const splitQuote = logicData.splitQuote;
    console.log('<<<<<SPLIT QUOTE>>>>>>>', splitQuote);
    console.log('<<<<<reassignWord>>>>>>', logicData.reassignWord);
    console.log('current word num', logicData.currentWordNumber - 1);
    // Replacing the current word with what was deleted from user input
    splitQuote[logicData.currentWordNumber - 1] = logicData.reassignWord;
    return splitQuote.join(' ');
  }

  function TESTING(e: React.KeyboardEvent<HTMLTextAreaElement>): void {
    const nextCharIsSpace = quoteToType[userTextInput.length] === ' ';

    // If the character that we are typing is supposed to be a space
    if (nextCharIsSpace) {
      // If the character IS NOT a space, adjust the quote to reflect the mistyped extra letters
      if (e.key !== ' ') {
        if (isValidChar(e.key)) {
          setQuoteToType(
            `${quoteToType.slice(0, userTextInput.length)}${
              e.key
            }${quoteToType.slice(userTextInput.length)}`
          );
          setUserTextInput((prev) => prev.concat(e.key));
          setExcessQuoteToType((prev) => prev.concat('~'));
        } else if (e.key === 'Backspace') {
          //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          // When Backspace is pressed but space SHOULD have been pressed
          console.log(
            'you just pressed backspace when you are supposed to press space'
          );
          const logicData = deleteExcessLettersData(userTextInput);
          console.log(logicData);
          if (logicData.userInputWordLength > logicData.quoteWordLength) {
            if (e.key === 'Backspace') {
              setQuoteToType(remakeQuoteString());
              setExcessQuoteToType((prev) => prev.slice(0, prev.length - 1));
              setUserTextInput((prev) => prev.slice(0, prev.length - 1));
            }
            //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          } else {
            if (e.key === 'Backspace') {
              console.log('normal word length');
              setUserTextInput((prev) => prev.slice(0, prev.length - 1));
              setExcessQuoteToType((prev) => prev.slice(0, prev.length - 1));
            }
          }
        }
      } else {
        // If the character is supposed to be a space and is a space, proceed as normal
        setUserTextInput((prev) => prev.concat(e.key));
        setExcessQuoteToType((prev) => prev.concat(e.key));
      }
    } else {
      if (e.key === 'Backspace') {
        setUserTextInput((prev) => prev.slice(0, prev.length - 1));
        setExcessQuoteToType((prev) => prev.slice(0, prev.length - 1));
      } else if (e.key === ' ') {
        setUserTextInput((prev) => prev.concat('*'));
        setExcessQuoteToType((prev) => prev.concat('*'));
      } else if (isValidChar(e.key)) {
        setUserTextInput((prev) => prev.concat(e.key));
        setExcessQuoteToType((prev) => prev.concat(e.key));
      }
    }
  }

  useEffect(() => {
    setTestComplete(quoteToType.length === userTextInput.length);
  }, [quoteToType, userTextInput]);

  useEffect(() => {}, [userTextInput]);

  return (
    <div className="flex pt-44 flex-col items-center gap-4">
      <h1 style={{ visibility: testComplete ? 'visible' : 'hidden' }}>
        Test Complete
      </h1>
      <div className="relative border-2 px-8 py-4 rounded-md text-3xl">
        <h2>
          {quoteToType.split('').map((char, idx) => (
            <span
              className={
                idx === userTextInput.length - 1
                  ? "after:content-['|'] after:animate-[pulse_2s_infinite] after:text-purple-500"
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
        <textarea
          value={userTextInput}
          className="border-2 border-white opacity-0 w-full h-full text-2xl rounded absolute py-4 px-8 left-0 top-0"
          onChange={() => {}}
          onKeyDown={(e) => TESTING(e)}
        />
      </div>
      <button
        onClick={() => {
          setUserTextInput('');
          setQuoteToType(duplicateQuoteToType);
          setExcessQuoteToType('');
        }}
      >
        Reset Test
      </button>
    </div>
  );
};

export default InputForm;
