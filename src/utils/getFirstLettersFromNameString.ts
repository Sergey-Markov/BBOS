const getFirstLettersFromNameString = (name: string) => {
  const nameArray = name.split(' ');
  const firstLetterArr = nameArray.map((item) => item.charAt(0));
  const result = firstLetterArr.join('');
  return result;
};

export default getFirstLettersFromNameString;
