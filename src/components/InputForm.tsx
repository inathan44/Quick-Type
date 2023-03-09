import React, { useEffect, useState } from 'react';

const InputForm = () => {
  // const [typeTest, setTypeTest] = useState<string>(
  //   'Whoever fights monsters should see to it that in the process he does not become a monster. And if you gaze long enough into an abyss, the abyss will gaze back into you.'
  // );
  const [typeTest, setTypeTest] = useState<string>(
    'This is a typing test so type faster'
  );
  const [textForm, setTextForm] = useState<string>('');
  const [testComplete, setTestComplete] = useState<boolean>(false);

  const letterColor = (idx: number): string => {
    if (idx > textForm.length - 1) return '#55848a';
    else {
      return typeTest[idx] === textForm[idx] ? 'white' : 'red';
    }
  };

  useEffect(() => {
    setTestComplete(typeTest.length === textForm.length);
  }, [typeTest, textForm]);

  console.log(testComplete);

  return (
    <div className='flex pt-44 flex-col items-center gap-4'>
      <h1 style={{ visibility: testComplete ? 'visible' : 'hidden' }}>
        Test Complete
      </h1>
      <div className='relative border-2 px-8 py-4 rounded-md text-3xl'>
        <h2>
          {typeTest.split('').map((char, idx) => (
            <span
              className={
                idx === textForm.length - 1
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
          className='border-2 border-white opacity-0 w-full h-full text-2xl rounded absolute py-4 px-8 left-0 top-0'
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            setTextForm(e.target.value);
          }}
          value={textForm}
        />
      </div>
      <button
        onClick={() => {
          setTextForm('');
        }}
      >
        Reset Test
      </button>
    </div>
  );
};

export default InputForm;
