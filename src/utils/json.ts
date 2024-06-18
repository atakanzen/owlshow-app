export const jsonSerializerReplacer = (
  key: string,
  value: any
) => {
  switch (key) {
    case 'titleError':
    case 'numberOfCorrectAnswersError':
    case 'numberOfAnswersError':
    case 'errorMessage':
    case 'isSelected':
    case 'isCurrent':
    case 'isAnswered':
      return undefined;
    default:
      return value;
  }
};
