import React, { useState } from 'react';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppWrapper from './AppWrapper';

const theme = createTheme();

export const GlobalContext = React.createContext<any>(null);

const App: React.FC = () => {
  
  const [chatWindowShown, setChatWindowShown] = useState(false);

  const globalStates = {
    chatWindowShown,
    setChatWindowShown
  };

  return (
    <GlobalContext.Provider value={globalStates}>
        <AppWrapper theme={theme} />
    </GlobalContext.Provider>
  );
};

export default App;