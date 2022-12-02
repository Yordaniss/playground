import { useState, useEffect } from "react";

export default function useInput(validateValue) {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const valueChangeHandler = (callBack) => {};
  useEffect(() => {
    (e, data) => {
      if (e !== undefined) {
        setEnteredValue(e.target.value);
      } else if (data !== undefined) {
        setEnteredValue(data);
      }
    };
  }, []);

  const inputBlurHandler = (e) => {
    setIsTouched(true);
  };

  const reset = () => {
    setEnteredValue("");
    setIsTouched(false);
  };

  const valueIsValid = validateValue(enteredValue);
  const hasError = !valueIsValid && isTouched;

  return {
    value: enteredValue,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
}
