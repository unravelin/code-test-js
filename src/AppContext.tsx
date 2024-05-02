import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AppContextType {
  apiKey: string;
  setApiKey: (key: string) => void;
  selectedVenueId: string;
  setSelectedVenueId: (id: string) => void;
}

const defaultState = {
  apiKey: '',
  setApiKey: () => {},
  selectedVenueId: '',
  setSelectedVenueId: () => {},
};

const AppContext = createContext<AppContextType>(defaultState);

export const useAppContext = () => useContext(AppContext);

interface ProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<ProviderProps> = ({ children }) => {
  const [apiKey, setApiKey] = useState('');
  const [selectedVenueId, setSelectedVenueId] = useState('');

  return (
    <AppContext.Provider value={{ apiKey, setApiKey, selectedVenueId, setSelectedVenueId }}>
      {children}
    </AppContext.Provider>
  );
};
