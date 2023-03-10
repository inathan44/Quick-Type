import React from 'react';

interface TypeBoxProps {
  quoteToType: string;
  userTextInput: string;
  letterColor: (idx: number) => string;
}

const TypeBoxText = (props: TypeBoxProps) => {
  const { quoteToType, userTextInput, letterColor } = props;
  return (
    <h2>
      {quoteToType.split('').map((char: string, idx: number) => (
        <span
          className={
            idx === userTextInput.length - 1
              ? "after:content-['|'] after:animate-[cursor-blink_2s_infinite] after:opacity-.1 after:text-yellow-400"
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
