interface KeyLogic {
  currentWordNumber: number;
  userInputWordLength: number;
  quoteWordLength: number;
  quoteWord: string;
  userTypedWord: string;
  reassignWord: string;
  splitQuote: string[];
}

function deleteExcessLettersData(
  userTextInput: string,
  duplicateQuoteToType: string,
  quoteToType: string
): KeyLogic {
  const currentWordNumber = userTextInput.split(' ').length;
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

function remakeQuoteString(
  userTextInput: string,
  duplicateQuoteToType: string,
  quoteToType: string
): string {
  const logicData = deleteExcessLettersData(
    userTextInput,
    duplicateQuoteToType,
    quoteToType
  );
  const splitQuote = logicData.splitQuote;
  // Replacing the current word with what was deleted from user input
  splitQuote[logicData.currentWordNumber - 1] = logicData.reassignWord;
  return splitQuote.join(' ');
}

export { deleteExcessLettersData, remakeQuoteString };
