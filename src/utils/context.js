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
  const updateStore = (newData) => {
    setStore((prevStore) => ({
      ...prevStore,
      ...newData,
    }));
  };
  const value = useMemo(() => ({
    store,
    updateStore,
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
  const { store, updateStore } = useContext(AppContext);
  return [store, updateStore];
};
