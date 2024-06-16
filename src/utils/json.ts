export const jsonSerializerReplacer = (
  key: string,
  value: any
) => {
  switch (key) {
    case 'titleError':
    case 'numberOfCorrectAnswersError':
    case 'numberOfAnswersError':
    case 'errorMessage':
      return undefined;
    default:
      return value;
  }
};
