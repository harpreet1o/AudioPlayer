import React, { createContext, useContext, useReducer } from "react";

export const StateContext = createContext();

// creating the stateProvide for the stateContext
export const StateProvider = ({ reducer, initialState, children }) => {
  return (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateValue = () => useContext(StateContext);
