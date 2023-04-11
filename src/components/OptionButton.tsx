import React, { ReactNode, MouseEventHandler } from 'react';
import { Languages, Mode } from './OptionsMenu';
import { selectUseCountdown, changeMode } from '../store/slices/StatSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { useDispatch } from 'react-redux';
import { focusTextArea } from '../helperFunctions';
import { selectUserTextInput } from '../store/slices/TypeInputSlice';
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
