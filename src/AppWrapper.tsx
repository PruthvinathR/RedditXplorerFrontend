import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import { Theme } from '@mui/material';
import RedditAnalyzer from './components/RedditAnalyzer';


const AppWrapper = ({ theme }: { theme: Theme }) => {
  
    return (
      <ThemeProvider theme={theme}>
        <RedditAnalyzer />
      </ThemeProvider>
    );
}

export default AppWrapper