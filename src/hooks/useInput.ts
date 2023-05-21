import { useCallback, useState, ChangeEvent } from "react";

export type InputChangeEvent = ChangeEvent<HTMLInputElement>;

type initialValue = string | number;

export interface UseInputReturn {
  inputTouched: boolean;
  value: string | number;
  inputVaild: boolean;
  errorText: string;
  onChange: (event: InputChangeEvent) => void;
  onBlurTouch: (touched: boolean) => void;
  checkVaild: (checked: boolean) => void;
  setErrorMessage: (errorMessage: string) => void;
  reset: () => void;
}

const useInput = (initialValue: initialValue): UseInputReturn => {
  const [value, setValue] = useState(initialValue);
  const [inputTouched, setInputTouched] = useState(false);
  const [inputVaild, setInputVaild] = useState(false);
  const [errorText, setErrorText] = useState("");

  const onChange = useCallback((event: InputChangeEvent) => {
    setValue(event.target.value);
  }, []);

  const setErrorMessage = (errorMessage: string) => {
    setErrorText(errorMessage)
  };

  const onBlurTouch = (touched: boolean) => {
    setInputTouched(touched);
  };

  const checkVaild = (touched:boolean) => {
    setInputVaild(touched)
  }

  const reset = useCallback(() => setValue(initialValue), [initialValue]);

  return {inputTouched, errorText, inputVaild, value, checkVaild, onChange, onBlurTouch, setErrorMessage, reset };
};

export default useInput;
