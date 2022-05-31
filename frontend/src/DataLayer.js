import { useContext, createContext, useReducer } from "react";

const DataLayerContext = createContext();

export const DataLayer = ({ initialstate, reducer, children }) => {
       return (<DataLayerContext.Provider value={useReducer(reducer, initialstate)}>
              {children}
       </DataLayerContext.Provider>
       );
}

export const useDataLayerValue = () => useContext(DataLayerContext);