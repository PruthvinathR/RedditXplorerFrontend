import React, { useContext, useState } from 'react';
import { Box, Select, MenuItem, SelectChangeEvent, CircularProgress, Typography } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SearchComponent from './SearchComponent';
import TableComponent from './TableComponent';
import { GlobalContext } from '../App';
import ChatBox from './ChatBox';
import { analyzePost, getPosts } from '../services/api';


interface RedditPost {
  post_id: string;
  username: string;
  title: string;
  upvotes: string;
  body: string;
  comments: string[];
}

const RedditAnalyzer = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [sortBy, setSortBy] = useState('');
  const [data, setData] = useState<RedditPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<RedditPost | null>(null);
  const [selectedPostData, setSelectedPostData] = useState<RedditPost>();

  const { chatWindowShown, setChatWindowShown } = useContext(GlobalContext);

  const sortOptions = [
    { value: 'top', label: 'Top' },
    { value: 'new', label: 'New' },
    { value: 'hot', label: 'Hot' },
    { value: 'rising', label: 'Rising' },
  ];

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    console.log(process.env.REACT_APP_BACKEND_URL);
    if (e.key === 'Enter') {
      setSubmitted(true);
      setChatWindowShown(false);
      getPosts(searchQuery, sortBy).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
    }
  };

  const handleSort = (event: SelectChangeEvent) => {
    setSortBy(event.target.value);
    setChatWindowShown(false);
  };

  const handleRowClick = (id: string) => {
    console.log(`Row clicked with id: ${id}`);
    analyzePost(id.toString()).then((response) => {
      console.log(response.data);
      setSelectedPostData(response.data);
    });
    setSelectedPost(data.find((post: any) => post.post_id === id) as RedditPost);
    setChatWindowShown(true);
  };

  return (
    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', 
        justifyContent: submitted ? 'flex-start' : 'center',
        minHeight: '100vh',
        transition: 'all 0.3s ease-in-out',
        paddingTop: submitted ? '20px' : '0',
    }}>
      <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', position: submitted ? 'fixed' : 'relative',
      top: submitted ? '20px' : 'auto',
      left: submitted ? '50%' : 'auto',
      transform: submitted ? 'translateX(-50%)' : 'none',
      zIndex: 1000,
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', width: 400, maxWidth: '100%', border: '1px solid black',
        borderRadius: '10px',
          backgroundColor: 'white',
        }}> 
          <SearchComponent setSearchQuery={setSearchQuery} handleSearch={handleSearch} />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: '10px'}}>
          <Select
            value={sortBy}
            onChange={handleSort}
            displayEmpty
            IconComponent={ArrowDropDownIcon}
            sx={{
              minWidth: 50,
              '& .MuiSelect-select': {
                padding: '0 8px',
              },
              '& .MuiSelect-icon': {
                right: '-5px',
              },
              '& .MuiOutlinedInput-notchedOutline': {
                border: 'none',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                border: 'none',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                border: 'none',
              },
            }}
          >
            <MenuItem value="">
              <em>Sort by</em>
            </MenuItem>
            {sortOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                <em>{option.label}</em>
              </MenuItem>
            ))}
          </Select>
        </Box>
      </Box>
      {submitted && (
        <>
        {!chatWindowShown ? (
          data.length > 0 ? (
            <TableComponent data={data} handleRowClick={handleRowClick} />
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
              <Typography variant="h6" color="textSecondary" sx={{ marginBottom: '16px' }}>
                Loading posts...
              </Typography>
              <CircularProgress />
            </Box>
          )
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100%' }}>
            <Typography variant="h6" color="textSecondary" sx={{ display: 'flex', marginTop: '16px', justifyContent: 'flex-start' }}>{selectedPost?.title}</Typography>
            <Typography variant="body1" color="textSecondary" sx={{ display: 'flex', marginTop: '8px', justifyContent: 'flex-start', maxWidth: '80%', textAlign: 'left' }}>
              {selectedPostData?.body || ""}
            </Typography>
            <ChatBox />
          </Box>
        )}
      </>
      )}
    </Box>
  );
};

export default RedditAnalyzer;
