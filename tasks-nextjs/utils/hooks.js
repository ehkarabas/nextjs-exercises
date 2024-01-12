import { useState, useCallback } from "react";

export const useCustomFormState = (actionFunction, initialState) => {
  const [state, setState] = useState(initialState);

  const formAction = async (formData) => {
    const newState = await actionFunction(state, formData);
    setState(newState);
    return newState;
  };

  const resetState = useCallback(() => {
    setState(initialState);
  }, [initialState]);

  return [state, formAction, resetState];
};
