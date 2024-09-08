import React from 'react';
import { Avatar, Box, CircularProgress, Paper, Typography } from '@mui/material';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

interface CommentBoxProps {
  comments: string[];
}

const CommentBox: React.FC<CommentBoxProps> = ({ comments }) => {
  return (
    <Paper elevation={3} sx={{ p: 2, height: '70%', display: 'flex', flexDirection: 'column', marginTop: '30px', width: '80%' }}>
      <Typography variant="h6" gutterBottom>
        Comments
      </Typography>
      <Box sx={{ flexGrow: 1, overflowY: 'auto', mb: 2 }}>
      {comments.length > 0 ? (
        comments.map((comment, index) => (
          <Box
            key={index}
            sx={{
              marginBottom: '16px',
              marginRight: '16px',
              padding: '12px',
              backgroundColor: '#f0f4f8',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
              },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
              <Avatar sx={{ bgcolor: '#1976d2', width: 28, height: 28, marginRight: '8px' }}>
                <ChatBubbleOutlineIcon fontSize="small" />
              </Avatar>
              <Typography variant="subtitle2" color="text.secondary">
                Comment {index + 1}
              </Typography>
            </Box>
            <Typography variant="body2">{comment}</Typography>
          </Box>
        ))
      ) : (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <CircularProgress size={20} />
        </Box>
      )}
      </Box>
    </Paper>
  );
};

export default CommentBox;
