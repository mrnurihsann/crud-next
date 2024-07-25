import { useState } from "react";

// Definisikan tipe generic untuk useFormState
const useFormState = <T>(initialState: T) => {
  const [state, setState] = useState<T>(initialState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit =
    (callback: (formState: T) => void) => (e: React.FormEvent) => {
      e.preventDefault();
      callback(state);
    };

  return [state, handleChange, handleSubmit] as const;
};

export default useFormState;
