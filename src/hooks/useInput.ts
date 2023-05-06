import { useCallback, useState, ChangeEvent } from "react";

export type InputChangeEvent = ChangeEvent<HTMLInputElement>;

type initialValue = string | number;

interface UseInputReturn {
  inputTouched: boolean;
  value: string | number;
  inputVaild: boolean;
  onChange: (event: InputChangeEvent) => void;
  onBlurTouch: (touched: boolean) => void;
  checkVaild: (checked: boolean) => void;
  reset: () => void;
}

const useInput = (initialValue: initialValue): UseInputReturn => {
  const [value, setValue] = useState(initialValue);
  const [inputTouched, setInputTouched] = useState(false);
  const [inputVaild, setInputVaild] = useState(false);

  const onChange = useCallback((event: InputChangeEvent) => {
    setValue(event.target.value);
  }, []);

  const onBlurTouch = (touched: boolean) => {
    setInputTouched(touched);
  };

  const checkVaild = (touched:boolean) => {
    setInputVaild(touched)
  }

  const reset = useCallback(() => setValue(initialValue), [initialValue]);

  return {inputTouched, inputVaild, value, checkVaild, onChange, onBlurTouch, reset };
};

export default useInput;
