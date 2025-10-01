// src/App.tsx
import React, { useState, useRef, useEffect } from 'react';
import { Box, Card, CardContent, CardHeader, TextField, IconButton, CircularProgress, Paper } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

// Define the structure for a single message
interface Message {
  text: string;
  isUser: boolean;
}

function App() {
  // State variables to manage the chat
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Effect to automatically scroll to the latest message
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Function to handle sending a message
  const handleSend = async () => {
    if (input.trim() === '' || isLoading) return;

    const userMessage = { text: input, isUser: true };
    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    // Add a placeholder for the bot's streaming response
    setMessages((prev) => [...prev, { text: '', isUser: false }]);

    try {
      // API call to the backend
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/ask`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: currentInput }),
      });

      if (!response.body) return;
      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      // Read the streamed response chunk by chunk
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        setMessages((prev) => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1].text += chunk;
          return newMessages;
        });
      }
    } catch (error) {
      console.error('Failed to fetch response:', error);
      setMessages((prev) => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1].text = "Sorry, an error occurred. Please try again.";
        return newMessages;
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'background.default' }}>
      <Card sx={{ width: '100%', maxWidth: 800, height: '85vh', display: 'flex', flexDirection: 'column', boxShadow: 6 }}>
        <CardHeader title="Project Sahayak" sx={{ textAlign: 'center', borderBottom: 1, borderColor: 'divider' }} />
        <CardContent sx={{ flexGrow: 1, overflowY: 'auto', p: 2 }}>
          {messages.map((msg, index) => (
            <Box key={index} sx={{ display: 'flex', justifyContent: msg.isUser ? 'flex-end' : 'flex-start', mb: 2 }}>
              <Paper elevation={3} sx={{
                p: 1.5,
                bgcolor: msg.isUser ? 'primary.main' : 'background.paper',
                color: msg.isUser ? 'primary.contrastText' : 'text.primary',
                maxWidth: '70%',
                borderRadius: msg.isUser ? '20px 20px 5px 20px' : '20px 20px 20px 5px',
              }}>
                {msg.text || <CircularProgress size={20} color="inherit" />}
              </Paper>
            </Box>
          ))}
          <div ref={scrollRef} />
        </CardContent>
        <Box sx={{ p: 2, display: 'flex', alignItems: 'center', borderTop: 1, borderColor: 'divider' }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Ask anything about your campus..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            disabled={isLoading}
          />
          <IconButton color="primary" onClick={handleSend} disabled={isLoading} sx={{ ml: 1 }}>
            {isLoading ? <CircularProgress size={24} /> : <SendIcon />}
          </IconButton>
        </Box>
      </Card>
    </Box>
  );
}

export default App;