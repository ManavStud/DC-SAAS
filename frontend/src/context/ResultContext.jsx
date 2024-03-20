import React from "react";

// Create a new context
export const ResultContext = React.createContext();

// Create a provider component to wrap the components that need access to the data
export function ResultProvider({ children }) {
  const [result, setResult] = React.useState();
  return (
    <ResultContext.Provider value={{ result, setResult }}>
      {children}
    </ResultContext.Provider>
  );
}
