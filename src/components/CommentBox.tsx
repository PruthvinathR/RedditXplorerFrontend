import React from 'react';
import { Box, Paper, Typography } from '@mui/material';

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
      {comments.map((comment, index) => (
        <Box key={index} sx={{ marginBottom: '12px', padding: '8px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
          <Typography variant="body2">{comment}</Typography>
        </Box>
      ))}
      </Box>
    </Paper>
  );
};

export default CommentBox;
