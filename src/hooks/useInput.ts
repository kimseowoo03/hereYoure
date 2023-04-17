import { useCallback, useState, ChangeEvent } from "react";

export type InputChangeEvent = ChangeEvent<HTMLInputElement>;

type initialValue = string | number;

interface UseInputReturn {
  value: string | number;
  onChange: (event: InputChangeEvent) => void;
  reset: () => void;
}

const useInput = (initialValue: initialValue): UseInputReturn => {
  const [value, setValue] = useState(initialValue);

  const onChange = useCallback((event: InputChangeEvent) => {
    setValue(event.target.value);
  }, []);

  const reset = useCallback(() => setValue(initialValue), [initialValue]);

  return { value, onChange, reset };
};

export default useInput;
