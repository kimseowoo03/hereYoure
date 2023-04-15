import { useCallback, useState, ChangeEvent } from "react";

type InputEvent = ChangeEvent<HTMLInputElement>;

interface UseInputReturn {
  value: string;
  onChange: (event: InputEvent) => void;
  reset: () => void;
}

const useInput = (initialValue: string): UseInputReturn => {
  const [value, setValue] = useState(initialValue);

  const onChange = useCallback((event: InputEvent) => {
    setValue(event.target.value);
  }, []);

  const reset = useCallback(() => setValue(initialValue), [initialValue]);

  return { value, onChange, reset };
};

export default useInput;
