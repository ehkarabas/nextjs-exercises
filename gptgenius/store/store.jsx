"use client";
import { configureStore } from "@reduxjs/toolkit";
import { themeReducer } from "@/features/themeSlice";

const store = configureStore({
  reducer: {
    theme: themeReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
