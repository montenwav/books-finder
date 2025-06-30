"use client";
import React from "react";
import { Provider } from "react-redux";
import { store } from "./Reducer";

function AppProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}

export default AppProvider;
