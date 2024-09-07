import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import { Theme } from '@mui/material';
import RedditAnalyzer from './components/RedditAnalyzer';


const AppWrapper = ({ theme }: { theme: Theme }) => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [searchResults, setSearchResults] = useState<string[]>([]);
  
    const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen);
    };
  
    const handleSearch = (query: string) => {
      // Simulated search results
      const results = [`Result 1 for "${query}"`, `Result 2 for "${query}"`, `Result 3 for "${query}"`];
      setSearchResults(results);
      console.log(results);
    };
  
    return (
      <ThemeProvider theme={theme}>
        <RedditAnalyzer />
      </ThemeProvider>
    );
}

export default AppWrapper