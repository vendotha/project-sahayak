// Corrected line
import { useState, useRef, useEffect } from 'react';
import { Box, Card, CardContent, CardHeader, Button, CircularProgress, Paper } from '@mui/material';

// Define the structure for a single message
interface Message {
  text: string;
  isUser: boolean;
}

// Our local, frontend-only knowledge base
const faqData = [
  {
    keywords: ['fee', 'fees', 'payment', 'deadline'],
    answer: 'The deadline for fee payment is October 25th, 2025. You can pay through the student portal.'
  },
  {
    keywords: ['timetable', 'schedule', 'classes'],
    answer: 'The updated timetable for the 3rd year CSE is available in the Academics section of the college website.'
  },
  {
    keywords: ['scholarship', 'financial aid'],
    answer: 'Scholarship forms are available at the administration office. The last day to submit is November 10th, 2025.'
  },
  {
    keywords: ['hi', 'hello', 'hey'],
    answer: 'Hello! How can I help you today? You can ask me about fees, timetables, or scholarships.'
  }
];

// Define the options that will be shown as buttons to the user
const chatOptions = [
    {
        label: 'Fees & Deadlines',
        keywords: ['fee', 'fees'],
    },
    {
        label: 'Timetable & Classes',
        keywords: ['timetable', 'schedule'],
    },
    {
        label: 'Scholarships',
        keywords: ['scholarship', 'financial aid'],
    }
];

const fallbackAnswer = "Sorry, I can only answer questions about fees, timetables, and scholarships.";

function App() {
  const [messages, setMessages] = useState<Message[]>([{ text: 'Hello! Please select a topic below.', isUser: false }]);
  const [isLoading, setIsLoading] = useState(false);
  const [showOptions, setShowOptions] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // This function is triggered when a user clicks an option button
  const handleOptionClick = (optionLabel: string) => {
    if (isLoading) return;

    const userMessage = { text: optionLabel, isUser: true };
    setMessages((prev) => [...prev, userMessage]);
    
    setIsLoading(true);
    setShowOptions(false); // Hide options while the bot "thinks"

    // Simulate the bot "thinking" for a moment
    setTimeout(() => {
      let botResponse = fallbackAnswer;
      const selectedOption = chatOptions.find(opt => opt.label === optionLabel);

      // Find the corresponding answer from our main knowledge base
      if (selectedOption) {
        for (const item of faqData) {
          if (item.keywords.some(keyword => selectedOption.keywords.includes(keyword))) {
            botResponse = item.answer;
            break;
          }
        }
      }

      setMessages((prev) => [...prev, { text: botResponse, isUser: false }]);
      setIsLoading(false);
      setShowOptions(true); // Show the options again for the next question
    }, 1000); // 1-second delay
  };

  return (
    <Box sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'background.default' }}>
      <Card sx={{ width: '100%', maxWidth: 800, height: '85vh', display: 'flex', flexDirection: 'column', boxShadow: 6 }}>
        <CardHeader title="Campus FAQ Bot" sx={{ textAlign: 'center', borderBottom: 1, borderColor: 'divider' }} />
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
                {msg.text}
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
        <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
            {showOptions && !isLoading ? (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
                    {chatOptions.map((option) => (
                        <Button
                            key={option.label}
                            variant="outlined"
                            onClick={() => handleOptionClick(option.label)}
                        >
                            {option.label}
                        </Button>
                    ))}
                </Box>
            ) : (
                <Box sx={{ display: 'flex', justifyContent: 'center', height: '36.5px' }}>
                    {/* This empty box prevents the layout from shifting when buttons are hidden */}
                </Box>
            )}
        </Box>
      </Card>
    </Box>
  );
}

export default App;

