import React, { useState } from 'react';

import { createTheme } from '@mui/material/styles';
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