"use client";
import { useDispatch } from "react-redux";
import { changeTheme } from "@/features/themeSlice";

const useThemeCall = () => {
  const dispatch = useDispatch();
  const themeChange = (theme) => {
    dispatch(changeTheme(theme));
  };

  return {
    themeChange,
  };
};

export default useThemeCall;
