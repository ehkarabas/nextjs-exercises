"use client";
import StoreProvider from "./storeProvider";

const GeneralProvider = ({ children }) => {
  return <StoreProvider>{children}</StoreProvider>;
};

export default GeneralProvider;
