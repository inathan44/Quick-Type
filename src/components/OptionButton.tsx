import React, { ReactNode, MouseEventHandler } from 'react';
import { Languages, Mode } from './OptionsMenu';
import { selectUseCountdown, changeMode } from '../store/slices/StatSlice';
import { useAppDispatch } from '../store/hooks';
import { useDispatch } from 'react-redux';
import { focusTextArea } from '../helperFunctions';

interface ButtonProps {
  children: ReactNode;
  clickFunc: any;
  id: Mode | Languages | number;
}

const OptionButton = (props: ButtonProps) => {
  const dispatch = useDispatch();

  return (
    <button
      onClick={() => {
        props.clickFunc(props.id);
        focusTextArea();
      }}
      className="border-2 px-2 py-1 rounded-lg text-sm text-gray-300 border-gray-300"
    >
      {props.children}
    </button>
  );
};

export default OptionButton;
