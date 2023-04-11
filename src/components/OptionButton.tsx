import React, { ReactNode } from 'react';
import { Languages, Mode } from './OptionsMenu';
import { useAppDispatch } from '../store/hooks';
import { focusTextArea } from '../helperFunctions';
import { resetFormatState } from '../store/slices/formatSlice';

interface ButtonProps {
  children: ReactNode;
  clickFunc: any;
  id: Mode | Languages | number;
  selected: boolean;
}

const OptionButton = (props: ButtonProps) => {
  const dispatch = useAppDispatch();

  return (
    <button
      onClick={() => {
        props.clickFunc(props.id);
        focusTextArea();
        dispatch(resetFormatState());
      }}
      className={`border-2 px-2 py-1 rounded-lg text-sm text-gray-300 transition-all ${
        !props.selected ? 'border-transparent' : ' border-gray-300'
      }`}
    >
      {props.children}
    </button>
  );
};

export default OptionButton;
