import { InputBase } from '@mui/material';
import { Search } from 'lucide-react';
import React from 'react'

const SearchComponent = ({ setSearchQuery, handleSearch }: { setSearchQuery: React.Dispatch<React.SetStateAction<string>>; handleSearch: (e: React.KeyboardEvent<HTMLInputElement>) => void }) => {
  return (
    <>
      <Search style={{ marginLeft: '10px', marginRight: '10px', color: 'black' }} />
      <InputBase
        placeholder="Search a subreddit..."
        inputProps={{ 'aria-label': 'search' }}
        sx={{ color: 'black', width: '100%', alignItems: 'center' }}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSearch(e as React.KeyboardEvent<HTMLInputElement>);
          }
        }}
      />
    </>
  )
}

export default SearchComponent