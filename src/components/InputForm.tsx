import React, { useState } from 'react';

const InputForm = () => {
  const [typeTest, setTypeTest] = useState<String>(
    'Whoever fights monsters should see to it that in the process he does not become a monster. And if you gaze long enough into an abyss, the abyss will gaze back into you.'
  );
  const [textForm, setTextForm] = useState<String>('');

  return (
    <div className='flex pt-44 flex-col items-center gap-4'>
      <h1>{typeTest}</h1>
      <textarea
        className='border-2 border-white h-10 w-1/2 text-2xl rounded'
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
          setTextForm(e.target.value);
        }}
        // value={textForm}
      />
      <div>
        {textForm.split('').map((char, idx) => (
          <span
            key={idx}
            style={{
              color: typeTest[idx] === textForm[idx] ? 'green' : 'red',
            }}
          >
            {char}
          </span>
        ))}
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
