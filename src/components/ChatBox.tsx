import React, { useState } from 'react';
import { Box, TextField, Button, Paper, Typography } from '@mui/material';
import { SendIcon } from 'lucide-react';
import { getChatResponse } from '../services/api';

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

interface ChatBoxProps {
  post_id: string;
}

const ChatBox: React.FC<ChatBoxProps> = ({ post_id }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: 'user' }]);
      setInput('');
      getChatResponse(post_id, input).then((response) => {
        setMessages(prev => [...prev, { text: response.data['response'], sender: 'bot' }]);
        console.log(response.data);
      });
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 2, height: '70%', display: 'flex', flexDirection: 'column', marginTop: '30px', width: '80%' }}>
      <Typography variant="h6" gutterBottom>
        Chat Box
      </Typography>
      <Box sx={{ flexGrow: 1, overflowY: 'auto', mb: 2 }}>
        {messages.map((message, index) => (
          <Box key={index} sx={{ mb: 1, textAlign: message.sender === 'user' ? 'right' : 'left' }}>
            <Paper elevation={1} sx={{ p: 1, display: 'inline-block', bgcolor: message.sender === 'user' ? 'primary.light' : 'grey.200' }}>
              <Typography variant="body2">{message.text}</Typography>
            </Paper>
          </Box>
        ))}
      </Box>
      
      <Box sx={{ display: 'flex', mt: 'auto' }}>
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <Button variant="contained" onClick={handleSend} sx={{ ml: 1 }}>
          <SendIcon />
        </Button>
      </Box>
    </Paper>
  );
};

export default ChatBox;