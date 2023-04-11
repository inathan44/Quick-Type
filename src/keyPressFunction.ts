import {
  deleteExcessLettersData as deleteExcessLettersDataFunc,
  remakeQuoteString as remakeQuoteStringFunc,
} from './helperFunctions';
import { AppDispatch } from './store';
import {
  incrementIncorrectKeys as incrementIncorrectKeysAction,
  incrementKeysPressed as incrementKeysPressedAction,
} from './store/slices/StatSlice';
import {
  setExcessQuoteToType as setExcessQuoteToTypeAction,
  setQuoteToType as setQuoteToTypeAction,
  setUserTextInput as setUserTextInputAction,
} from './store/slices/TypeInputSlice';

export function keyPress(
  e: React.KeyboardEvent<HTMLTextAreaElement>,
  setLastKeyPressed: (value: React.SetStateAction<string>) => void,
  deleteExcessLettersData: typeof deleteExcessLettersDataFunc,
  userTextInput: string,
  duplicateQuoteToType: string,
  quoteToType: string,
  useCountdown: boolean,
  countdownTimer: number,
  isValidChar: (char: string) => boolean,
  dispatch: AppDispatch,
  incrementKeysPressed: typeof incrementKeysPressedAction,
  setQuoteToType: typeof setQuoteToTypeAction,
  setUserTextInput: typeof setUserTextInputAction,
  setExcessQuoteToType: typeof setExcessQuoteToTypeAction,
  excessQuoteToType: string,
  incrementIncorrectKeys: typeof incrementIncorrectKeysAction,
  remakeQuoteString: typeof remakeQuoteStringFunc
): void {
  setLastKeyPressed(e.key);
  const logicData = deleteExcessLettersData(
    userTextInput,
    duplicateQuoteToType,
    quoteToType
  );

  if (quoteToType.length === userTextInput.length) {
    return;
  }

  if (useCountdown && countdownTimer <= 0) {
    return;
  }
  if (isValidChar(e.key)) {
    dispatch(incrementKeysPressed());
  }

  const nextCharIsSpace = quoteToType[userTextInput.length] === ' ';
  // If the character that we are typing is supposed to be a space
  if (nextCharIsSpace) {
    // If the character typed IS NOT a space, adjust the quote to reflect the mistyped extra letters
    if (e.key !== ' ') {
      if (isValidChar(e.key)) {
        dispatch(
          setQuoteToType(
            `${quoteToType.slice(0, userTextInput.length)}${
              e.key
            }${quoteToType.slice(userTextInput.length)}`
          )
        );
        dispatch(setUserTextInput(userTextInput.concat(e.key)));
        // the tilde (~) is used as a character that the algo knows to code as an excess letter
        dispatch(setExcessQuoteToType(excessQuoteToType.concat('~')));
        dispatch(incrementIncorrectKeys(1));
      } else if (e.key === 'Backspace') {
        // When Backspace is pressed but space SHOULD have been pressed

        if (logicData.userInputWordLength > logicData.quoteWordLength) {
          if (e.key === 'Backspace') {
            dispatch(
              setQuoteToType(
                remakeQuoteString(
                  userTextInput,
                  duplicateQuoteToType,
                  quoteToType
                )
              )
            );
            dispatch(
              setExcessQuoteToType(
                excessQuoteToType.slice(0, excessQuoteToType.length - 1)
              )
            );
            dispatch(
              setUserTextInput(userTextInput.slice(0, userTextInput.length - 1))
            );
          }
        } else {
          if (e.key === 'Backspace') {
            dispatch(
              setUserTextInput(userTextInput.slice(0, userTextInput.length - 1))
            );
            dispatch(
              setExcessQuoteToType(
                excessQuoteToType.slice(0, excessQuoteToType.length - 1)
              )
            );
          }
        }
      }
    } else {
      // If the character is supposed to be a space and is a space, proceed as normal
      dispatch(setUserTextInput(userTextInput.concat(e.key)));
      dispatch(setExcessQuoteToType(excessQuoteToType.concat(e.key)));
    }
  } else {
    if (e.key === 'Backspace') {
      if (
        // Delete all skipped letters when deleting to a prev word
        excessQuoteToType.slice(-2, -1) === '%' ||
        excessQuoteToType.slice(-2, -1) === '#'
      ) {
        let lastLetterIndex = excessQuoteToType.length - 2;
        let lettersToDelete = 1;
        while (
          excessQuoteToType[lastLetterIndex] === '%' ||
          excessQuoteToType[lastLetterIndex] === '#'
        ) {
          lastLetterIndex--;
          lettersToDelete++;
        }

        dispatch(
          setUserTextInput(
            userTextInput.slice(0, userTextInput.length - lettersToDelete)
          )
        );
        dispatch(
          setExcessQuoteToType(
            excessQuoteToType.slice(
              0,
              excessQuoteToType.length - lettersToDelete
            )
          )
        );
      } else {
        dispatch(
          setUserTextInput(userTextInput.slice(0, userTextInput.length - 1))
        );
        dispatch(
          setExcessQuoteToType(
            excessQuoteToType.slice(0, excessQuoteToType.length - 1)
          )
        );
      }
    } else if (e.key === ' ') {
      // Pressing space will skip to the next word

      // Don't allow pressing space when user is at the beginning of a word or on the last word
      if (
        userTextInput.slice(-1) === ' ' ||
        userTextInput.length == 0 ||
        logicData.currentWordNumber === duplicateQuoteToType.split(' ').length
      ) {
        return;
      }
      dispatch(incrementIncorrectKeys(logicData.lettersRemainingInCurrentWord));
      // # char indicates a space was pressed before the end of a word
      let skipToNextWord = '#';
      for (let i = 0; i < logicData.lettersRemainingInCurrentWord - 1; i++) {
        // % char is viewed as a skipped character
        skipToNextWord = skipToNextWord.concat('%');
      }
      skipToNextWord = skipToNextWord.concat(' ');

      dispatch(setUserTextInput(userTextInput.concat(skipToNextWord)));
      dispatch(setExcessQuoteToType(excessQuoteToType.concat(skipToNextWord)));
    } else if (isValidChar(e.key)) {
      dispatch(setUserTextInput(userTextInput.concat(e.key)));
      dispatch(setExcessQuoteToType(excessQuoteToType.concat(e.key)));
    }
  }
}
