import {
  createContext, useState, useContext, useMemo,
} from 'react';
import PropTypes from 'prop-types';

const defaultStore = {
  handleClose: null,
  step: null,
};

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [store, setStore] = useState(defaultStore);
  const value = useMemo(() => ({
    store, setStore,
  }), [store]);
  return (
    <AppContext.Provider value={value}>
      { children }
    </AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAppContext = () => {
  const { store, setStore } = useContext(AppContext);
  return [store, setStore];
};
