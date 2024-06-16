import { saveToLocalStorage } from "./handleFormReload";

export const handleAnswerValidation = (
  rightOption,
  selectedOption,
  { setTotalRightAns }
) => {
  return new Promise((resolve) => {
    if (rightOption === selectedOption) {
      setTotalRightAns((prevTotalRightAns) => {
        const newTotalRightAns = prevTotalRightAns + 1;
        saveToLocalStorage("totalRightAns", newTotalRightAns);
        resolve(newTotalRightAns);
        return newTotalRightAns;
      });
    } else {
      resolve();
    }
  });
};
