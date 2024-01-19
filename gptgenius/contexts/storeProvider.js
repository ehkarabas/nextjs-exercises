"use client";
import { Provider } from "react-redux";
import { ThemeClerkProvider } from "./themeClerkContext";
import store from "@/store/store";

const StoreProvider = ({ children }) => {
  return (
    <Provider store={store}>
      <ThemeClerkProvider>{children}</ThemeClerkProvider>
    </Provider>
  );
};

export default StoreProvider;
