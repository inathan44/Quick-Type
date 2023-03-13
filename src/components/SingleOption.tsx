import React, { ReactNode } from 'react';
import OptionButton from './OptionButton';

interface OptionProps {
  children: ReactNode;
}

const SingleOption = (props: OptionProps) => {
  return (
    <div className="flex flex-col items-center w-80 gap-4">
      {props.children}
    </div>
  );
};

export default SingleOption;
