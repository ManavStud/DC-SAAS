import React from "react";

// Create a new context
export const AndroidResultContext = React.createContext();

// Create a provider component to wrap the components that need access to the data
export function AndroidResultProvider({ children }) {
  const [androidResult, setAndroidResult] = React.useState();
  return (
    <AndroidResultContext.Provider value={{ androidResult, setAndroidResult }}>
      {children}
    </AndroidResultContext.Provider>
  );
}
