import React, { useState } from 'react';
import { Box, TextField, Button, Paper, Typography, Avatar, CircularProgress } from '@mui/material';
import { SendIcon } from 'lucide-react';
import { getChatResponse } from '../services/api';
import PersonIcon from '@mui/icons-material/Person';
import SmartToyIcon from '@mui/icons-material/SmartToy';


interface Message {
  text: string;
  sender: 'human' | 'ai';
}

interface ChatBoxProps {
  post_id: string;
}

const ChatBox: React.FC<ChatBoxProps> = ({ post_id }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [chatHistory, setChatHistory] = useState<Array<[string, string]>>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: 'human' }]);
      setInput('');
      setChatHistory([...chatHistory, ['human', input]]);
      setIsLoading(true);
      getChatResponse(post_id, input, chatHistory).then((response) => {
        setMessages(prev => [...prev, { text: response.data['response'], sender: 'ai' }]);
        setChatHistory([...chatHistory, ['ai', response.data['response']]]);
      }).catch((error) => {
        alert('An error occurred while fetching the response. Please try again.');
      }).finally(() => {
        setIsLoading(false);
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
          <Box 
            key={index} 
            sx={{ 
              display: 'flex',
              justifyContent: message.sender === 'human' ? 'flex-end' : 'flex-start',
              mb: 2
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: message.sender === 'human' ? 'row-reverse' : 'row',
                alignItems: 'flex-end',
                maxWidth: '70%'
              }}
            >
              <Avatar 
                sx={{ 
                  bgcolor: message.sender === 'human' ? 'primary.main' : 'secondary.main',
                  width: 28, 
                  height: 28, 
                  mx: 1
                }}
              >
                {message.sender === 'human' ? <PersonIcon fontSize="small" /> : <SmartToyIcon fontSize="small" />}
              </Avatar>
              <Paper 
                elevation={1} 
                sx={{ 
                  p: 1.5, 
                  borderRadius: 2,
                  bgcolor: message.sender === 'human' ? 'primary.light' : 'grey.100',
                  color: message.sender === 'human' ? 'primary.contrastText' : 'text.primary',
                  maxWidth: '100%',
                  wordWrap: 'break-word'
                }}
              >
                <Typography variant="body2">{message.text}</Typography>
              </Paper>
            </Box>
          </Box>
        ))}
        {isLoading && (
          <Box 
            sx={{ 
              display: 'flex',
              justifyContent: 'flex-start',
              mb: 2
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                maxWidth: '70%'
              }}
            >
              <Avatar 
                sx={{ 
                  bgcolor: 'secondary.main',
                  width: 28, 
                  height: 28, 
                  mx: 1
                }}
              >
                <SmartToyIcon fontSize="small" />
              </Avatar>
              <Paper 
                elevation={1} 
                sx={{ 
                  p: 1.5, 
                  borderRadius: 2,
                  bgcolor: 'grey.100',
                  color: 'text.secondary',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <CircularProgress size={20} sx={{ mr: 1 }} />
                <Typography variant="body2">AI is thinking...</Typography>
              </Paper>
            </Box>
          </Box>
        )}
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