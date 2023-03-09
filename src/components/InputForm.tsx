import React, { useEffect, useState } from 'react';

const InputForm = () => {
  // const [quoteToType, setQuoteToType] = useState<string>(
  //   'Whoever fights monsters should see to it that in the process he does not become a monster. And if you gaze long enough into an abyss, the abyss will gaze back into you.'
  // );
  // const [quoteToType, setQuoteToType] = useState<string>(
  const [quoteToType, setQuoteToType] = useState<string>(
    'This is a typing test so type faster'
  );
  const [userTextInput, setUserTextInput] = useState<string>('');
  const [testComplete, setTestComplete] = useState<boolean>(false);

  const lettersAvailable =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ ';

  const letterColor = (idx: number): string => {
    if (idx > userTextInput.length - 1) return '#55848a';
    else {
      return quoteToType[idx] === userTextInput[idx] ? 'white' : 'red';
    }
  };

  function handleKeyPress(e: React.ChangeEvent<HTMLTextAreaElement>) {
    // Set textarea text to the entire string that has been typed
    setUserTextInput(e.target.value);

    // Keystroke that was JUST pressed
    const keyPressed: string = e.target.value[e.target.value.length - 1];
    // The key that should be typed next
    const nextLetterToType: string = quoteToType[userTextInput.length];
    console.log('keyPressed', keyPressed);
    console.log(
      'nextChar',
      nextLetterToType === ' ' ? 'space' : nextLetterToType
    );

    // If the next letter  is a space
    if (nextLetterToType === ' ') {
      if (keyPressed !== ' ') {
        console.log(
          'keys already pressed',
          `${quoteToType.slice(
            0,
            userTextInput.length
          )}${keyPressed}${quoteToType.slice(userTextInput.length)}`
        );
        setQuoteToType(
          `${quoteToType.slice(
            0,
            userTextInput.length
          )}${keyPressed}${quoteToType.slice(userTextInput.length)}`
        );
      }
    }
  }

  function TESTING(e: React.KeyboardEvent<HTMLTextAreaElement>): void {
    console.log('available letter', lettersAvailable.includes(e.key));
    if (e.key === 'Backspace') {
      setUserTextInput((prev) => prev.slice(0, prev.length - 1));
    } else if (lettersAvailable.includes(e.key)) {
      setUserTextInput((prev) => prev.concat(e.key));
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
          // onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
          //   handleKeyPress(e);
          // }}
          onKeyDown={(e) => TESTING(e)}
        />
      </div>
      <p>{userTextInput}</p>
      <button
        onClick={() => {
          setUserTextInput('');
        }}
      >
        Reset Test
      </button>
    </div>
  );
};

export default InputForm;
