import { useState, useRef, useEffect } from 'react'; // <-- CORRECTED LINE
import { Box, Card, CardContent, CardHeader, TextField, IconButton, CircularProgress, Paper, Button, ButtonGroup, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import mammoth from 'mammoth/mammoth.browser';
import { defaultFaqData } from './data';
import type { FaqItem } from './data';

// --- Data Structures ---
interface Message {
  text: string;
  isUser: boolean;
}

function App() {
  const [language, setLanguage] = useState<'en' | 'hi' | 'te'>('en');
  const [messages, setMessages] = useState<Message[]>([{ text: 'Hello! How can I help?', isUser: false }]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  // Use the imported data as the initial state
  const [faqData, setFaqData] = useState<FaqItem[]>(defaultFaqData); 
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // On component load, check localStorage for any previously uploaded data
  useEffect(() => {
    try {
      const savedData = localStorage.getItem('faqData');
      if (savedData) {
        setFaqData(JSON.parse(savedData));
      }
    } catch (error)      {
      console.error("Failed to load data from localStorage", error);
      setFaqData(defaultFaqData);
    }
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // --- Core Chat Logic ---
  const handleSend = () => {
    if (input.trim() === '' || isLoading) return;
    const userMessage = { text: input, isUser: true };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    setTimeout(() => {
      const lowerCaseInput = input.toLowerCase();
      let botResponse: string | null = null;
      const fallbackAnswer = {
        en: "Sorry, I couldn't find an answer for that.",
        hi: "क्षमा करें, मुझे उसका उत्तर नहीं मिला।",
        te: "క్షమించండి, దానికి సమాధానం దొరకలేదు."
      };
      for (const item of faqData) {
        if (item.keywords.some(keyword => lowerCaseInput.includes(keyword))) {
          botResponse = item.answers[language] || item.answers.en; // Fallback to English
          break;
        }
      }
      setMessages((prev) => [...prev, { text: botResponse || fallbackAnswer[language], isUser: false }]);
      setIsLoading(false);
    }, 1000);
    setInput('');
  };

  // --- New File Upload and Parsing Logic ---
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      const arrayBuffer = e.target?.result;
      if (arrayBuffer) {
        try {
          const result = await mammoth.extractRawText({ arrayBuffer: arrayBuffer as ArrayBuffer });
          const text = result.value;
          const parsedData = parseDocxContent(text);
          if (parsedData.length === 0) {
            alert('Could not find any valid Q&A entries in the document. Please check the format.');
            return;
          }
          setFaqData(parsedData);
          localStorage.setItem('faqData', JSON.stringify(parsedData)); 
          alert('Knowledge base updated successfully!');
        } catch (error) {
          console.error("Error parsing DOCX file:", error);
          alert('Failed to read the Word document. Please check the format.');
        }
      }
    };
    reader.readAsArrayBuffer(file);
  };
  
  const parseDocxContent = (text: string): FaqItem[] => {
    const entries = text.split('---');
    const newFaqData: FaqItem[] = [];
    entries.forEach((entry, index) => {
      if (entry.trim() === '') return;
      const lines = entry.trim().split('\n');
      const faqItem: any = { id: `custom-${index}`, keywords: [], answers: {} };
      lines.forEach(line => {
        const [key, ...valueParts] = line.split(':');
        const value = valueParts.join(':').trim();
        if (key && value) {
          if (key.trim().toLowerCase() === 'keywords') {
            faqItem.keywords = value.split(',').map(k => k.trim().toLowerCase());
          } else if (['en', 'hi', 'te'].includes(key.trim().toLowerCase())) {
            faqItem.answers[key.trim().toLowerCase()] = value;
          }
        }
      });
      if (faqItem.keywords.length > 0 && Object.keys(faqItem.answers).length > 0) {
        newFaqData.push(faqItem);
      }
    });
    return newFaqData;
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <Box sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'background.default' }}>
      <Card sx={{ width: '100%', maxWidth: 800, height: '85vh', display: 'flex', flexDirection: 'column', boxShadow: 6 }}>
        <CardHeader 
            title="Campus FAQ Bot" 
            sx={{ textAlign: 'center', borderBottom: 1, borderColor: 'divider' }}
            action={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, position: 'absolute', right: 16, top: 12 }}>
                <IconButton onClick={triggerFileUpload} title="Upload new Q&A">
                  <UploadFileIcon />
                </IconButton>
                <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept=".docx" style={{ display: 'none' }} />
                <ButtonGroup variant="outlined" size="small">
                  <Button onClick={() => setLanguage('en')} variant={language === 'en' ? 'contained' : 'outlined'}>EN</Button>
                  <Button onClick={() => setLanguage('hi')} variant={language === 'hi' ? 'contained' : 'outlined'}>HI</Button>
                  <Button onClick={() => setLanguage('te')} variant={language === 'te' ? 'contained' : 'outlined'}>TE</Button>
                </ButtonGroup>
              </Box>
            }
        />
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
                <Typography>{msg.text}</Typography>
              </Paper>
            </Box>
          ))}
          {isLoading && (
             <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2 }}>
               <Paper elevation={3} sx={{ p: 1.5, bgcolor: 'background.paper', color: 'text.primary' }}>
                 <CircularProgress size={20} color="inherit" />
               </Paper>
             </Box>
          )}
          <div ref={scrollRef} />
        </CardContent>
        <Box sx={{ p: 2, display: 'flex', alignItems: 'center', borderTop: 1, borderColor: 'divider' }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type your question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            disabled={isLoading}
          />
          <IconButton color="primary" onClick={handleSend} disabled={isLoading} sx={{ ml: 1 }}>
            <SendIcon />
          </IconButton>
        </Box>
      </Card>
    </Box>
  );
}

export default App;

