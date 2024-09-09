import React, { useContext, useEffect, useRef, useState } from 'react';
import { Box, Select, MenuItem, SelectChangeEvent, CircularProgress, Typography, Divider, Paper, Fade, Skeleton, Button } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SearchComponent from './SearchComponent';
import TableComponent from './TableComponent';
import { GlobalContext } from '../App';
import ChatBox from './ChatBox';
import { analyzePost, getPosts } from '../services/api';
import CommentBox from './CommentBox';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';


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
  const [selectedPostData, setSelectedPostData] = useState<RedditPost | null>(null);
  const [loading, setLoading] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);

  const { chatWindowShown, setChatWindowShown } = useContext(GlobalContext);

  const postDetailsHeight = 0.1;

  const sortOptions = [
    { value: 'top', label: 'Top' },
    { value: 'new', label: 'New' },
    { value: 'hot', label: 'Hot' },
    { value: 'rising', label: 'Rising' },
  ];

  useEffect(() => {
    if (contentRef.current) {
      const contentHeight = contentRef.current.scrollHeight;
      const screenHeight = window.innerHeight;
      setExpanded(contentHeight <= screenHeight * postDetailsHeight);
    }
  }, [selectedPost, selectedPostData]);

  const toggleExpand = () => {
    setExpanded(expanded => !expanded);
  };

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      
      setChatWindowShown(false);
      setSelectedPost(null);
      setSelectedPostData(null);
      const effectiveSortBy = sortBy || 'hot';
      if (sortBy === '') setSortBy('hot');

      if (searchQuery.trim() === '') {
        alert('Please enter a subreddit to search.');
        setSubmitted(false);
        return;
      }
      setSubmitted(true);
      setData([]);
      getPosts(searchQuery, effectiveSortBy).then((response) => {
        setData(response.data);
      }).catch((error) => {
        setSubmitted(false);
        if (error.response.status === 500 ) {
          alert('An error occurred while fetching posts. Please check your subreddit and try again.');
        }
        else {
          alert('An error occurred while fetching posts. Please try again.');
        }
      });
    }
  };

  const handleSort = (event: SelectChangeEvent) => {
    const sortValue = event.target.value;
    setSortBy(() => sortValue);
    setChatWindowShown(false);
    setSelectedPost(null);
    setSelectedPostData(null);
    setData([]);
    if (searchQuery.trim() !== '') {
      setSubmitted(true);
      getPosts(searchQuery, sortValue).then((response) => {
        setData(response.data);
      }).catch((error) => {
        setSubmitted(false);
        if (error.response.status === 500 ) {
          alert('An error occurred while fetching posts. Please check your subreddit and try again.');
        }
        else {
          alert('An error occurred while fetching posts. Please try again.');
        }
      });
    }
    
  };

  const handleRowClick = (id: string) => {
    analyzePost(id.toString()).then((response) => {
      setSelectedPostData(response.data);
    });
    setSelectedPost(data.find((post: any) => post.post_id === id) as RedditPost);
    setChatWindowShown(true);
  };

  const onBack = () => {
    setChatWindowShown(false);
    setSelectedPost(null);
    setSelectedPostData(null);
  };

  return (
    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', 
        justifyContent: submitted ? 'flex-start' : 'center',
        minHeight: '100vh',
        transition: 'all 0.3s ease-in-out',
        paddingTop: submitted ? '80px' : '0',
    }}>
      <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', position: submitted ? 'fixed' : 'relative',
      top: submitted ? '20px' : 'auto',
      left: submitted ? '50%' : 'auto',
      transform: submitted ? 'translateX(-50%)' : 'none',
      zIndex: 1000,
      padding: '10px',
      width: '100%',
      backgroundColor: 'white',
    }}>
        {chatWindowShown && (
          <Button
            onClick={onBack}
            sx={{ marginRight: '10px' }}
          >
            Back
          </Button>
        )}
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
          <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100vh' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', padding: '16px', borderBottom: '1px solid #ccc' }}>
            <Paper elevation={3} sx={{ padding: '16px', borderRadius: '8px', backgroundColor: '#f7f7f7' }}>
              <Fade in={!!selectedPost?.title} timeout={800}>
                <Typography variant="h6" gutterBottom sx={{
                  fontWeight: 'bold',
                  color: '#1a1a1a',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
                }}>
                  {selectedPost?.title || <Skeleton width="80%" />}
                </Typography>
              </Fade>
              <Fade in={!!selectedPostData?.body} timeout={1000}>
                <Box>
                <Typography variant="body1" ref={contentRef} sx={{
                  marginTop: '12px',
                  lineHeight: 1.6,
                  color: '#333',
                  '&::first-letter': {
                    fontSize: '1.5em',
                    fontWeight: 'bold',
                    color: '#4a4a4a',
                  },
                  maxHeight: expanded? 'none' : '10vh',
                  overflow: 'hidden',
                  transition: 'max-height 0.3s ease-in-out',
                }}>
                  {selectedPostData?.body ? (
                    selectedPostData.body
                  ) : (
                    <Skeleton variant="text" width="100%" height={100} />
                  )}
                </Typography>
                {contentRef.current && contentRef.current.scrollHeight > window.innerHeight * postDetailsHeight && (
                  <Button
                    onClick={toggleExpand}
                    startIcon={expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    sx={{ alignSelf: 'center', marginTop: '8px', fontSize: '12px' }}
                  >
                    {expanded ? 'Show Less' : 'Show More'}
                  </Button>
                )}
                </Box>
              </Fade>
            </Paper>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', flex: 1, overflow: 'hidden' }}>
              <Box sx={{ display: 'flex', width: '50%', height: '100%', justifyContent: 'center' }}>
                <CommentBox comments={selectedPostData?.comments || []} />
              </Box>
              <Divider orientation="vertical" flexItem />
              <Box sx={{ width: '50%', 
  height: '100%', 
  display: 'flex', 
  justifyContent: 'center',  }}>
                <ChatBox post_id={selectedPostData?.post_id || ""} />
              </Box>
            </Box>
          </Box>
        )}
      </>
      )}
    </Box>
  );
};

export default RedditAnalyzer;
