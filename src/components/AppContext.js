import React, { useContext, useEffect, useState } from "react";
import { _store, _setStore, _subscriptions } from "../logic/store";

const AppContext = React.createContext();

export const useAppContext = (filter = (e) => e) =>
  filter(useContext(AppContext));
export const updateContext = (func) => _setStore(func(_store));

export const Provider = ({ children }) => {
  const [store, setStore] = useState(_store);
  useEffect(() => {
    _subscriptions.push(setStore);
    return () => _subscriptions.splice(_subscriptions.indexOf(setStore), 1);
  }, []);
  return <AppContext.Provider value={store}>{children}</AppContext.Provider>;
};
