// Define the structure for our multilingual knowledge base
export interface FaqItem {
  id: string;
  keywords: string[];
  answers: {
    en: string; // English
    hi: string; // Hindi
    te: string; // Telugu
  };
}

// Knowledge base data
export const defaultFaqData: FaqItem[] = [
  // ---------------- Existing College FAQs ----------------
  {
    id: 'exam',
    keywords: ['exam', 'test', 'परीक्षा', 'పరీక్ష'],
    answers: {
      en: 'The final exams are scheduled to begin on December 5th, 2025.',
      hi: 'अंतिम परीक्षाएं 5 दिसंबर, 2025 से शुरू होने वाली हैं।',
      te: 'ఫైనల్ పరీక్షలు డిసెంబర్ 5, 2025న ప్రారంభం కానున్నాయి.',
    },
  },
  {
    id: 'events',
    keywords: ['events', 'festival', 'function', 'कार्यक्रम', 'పండుగ', 'ఈవెంట్'],
    answers: {
      en: "The annual college festival 'Utsav' will be held in the second week of January.",
      hi: "वार्षिक कॉलेज उत्सव 'उत्सव' जनवरी के दूसरे सप्ताह में आयोजित किया जाएगा।",
      te: "వార్షిక కళాశాల పండుగ 'ఉత్సవ్' జనవరి రెండవ వారంలో నిర్వహించబడుతుంది.",
    },
  },
  {
    id: 'results',
    keywords: ['results', 'grades', 'marks', 'परिणाम', 'గ్రేడ్‌లు', 'మార్కులు'],
    answers: {
      en: 'Results for the previous semester will be announced on the student portal by the end of this month.',
      hi: 'पिछले सेमेस्टर के परिणाम इस महीने के अंत तक छात्र पोर्टल पर घोषित किए जाएंगे।',
      te: 'గత సెమిస్టర్ ఫలితాలు ఈ నెలాఖరులోగా విద్యార్థి పోర్టల్‌లో ప్రకటించబడతాయి.',
    },
  },
  // ... (other existing entries remain unchanged)
  
  // ---------------- General Conversation ----------------
  {
    id: 'greeting_hello',
    keywords: ['hi', 'hello', 'hey', 'नमस्ते', 'హలో', 'హాయ్'],
    answers: {
      en: 'Hello! How can I assist you today?',
      hi: 'नमस्ते! मैं आपकी कैसे मदद कर सकता हूँ?',
      te: 'హలో! నేను మీకు ఎలా సహాయం చేయగలను?',
    },
  },
  {
    id: 'greeting_howareyou',
    keywords: ['how are you', 'आप कैसे हैं', 'మీరు ఎలా ఉన్నారు'],
    answers: {
      en: "I'm doing great, thank you! How about you?",
      hi: 'मैं अच्छा हूँ, धन्यवाद! आप कैसे हैं?',
      te: 'నేను బాగున్నాను, ధన్యవాదాలు! మీరు ఎలా ఉన్నారు?',
    },
  },
  {
    id: 'thanks',
    keywords: ['thanks', 'thank you', 'धन्यवाद', 'ధన్యవాదాలు'],
    answers: {
      en: "You're welcome!",
      hi: 'आपका स्वागत है!',
      te: 'మీకు స్వాగతం!',
    },
  },
  {
    id: 'goodbye',
    keywords: ['bye', 'goodbye', 'see you', 'अलविदा', 'బై', 'వీడ్కోలు'],
    answers: {
      en: 'Goodbye! Have a great day.',
      hi: 'अलविदा! आपका दिन शुभ हो।',
      te: 'వీడ్కోలు! మీ రోజు మంచి గా గడవాలి.',
    },
  },
  {
    id: 'welcome',
    keywords: ['welcome', 'स्वागत', 'స్వాగతం'],
    answers: {
      en: 'Welcome! I am glad to assist you.',
      hi: 'स्वागत है! मुझे आपकी मदद करके खुशी होगी।',
      te: 'స్వాగతం! మీకు సహాయం చేయడానికి నాకు ఆనందంగా ఉంది.',
    },
  },
  {
    id: 'whatsyourname',
    keywords: ['what is your name', 'your name', 'नाम क्या है', 'నీ పేరు ఏమిటి'],
    answers: {
      en: "My name is CollegeBot, your friendly assistant.",
      hi: 'मेरा नाम कॉलेजबॉट है, मैं आपका सहायक हूँ।',
      te: 'నా పేరు కాలేజ్‌బాట్, నేను మీకు సహాయం చేయడానికి ఇక్కడ ఉన్నాను.',
    },
  },
  {
    id: 'whereareyoufrom',
    keywords: ['where are you from', 'आप कहाँ से हैं', 'మీరు ఎక్కడి నుండి వచ్చారు'],
    answers: {
      en: 'I live in the cloud ☁️ and serve your college virtually.',
      hi: 'मैं क्लाउड में रहता हूँ ☁️ और आपके कॉलेज की सेवा करता हूँ।',
      te: 'నేను క్లౌడ్‌లో ఉంటాను ☁️ మరియు మీ కాలేజీకి సేవ చేస్తాను.',
    },
  },
  {
    id: 'tellmeajoke',
    keywords: ['tell me a joke', 'joke', 'मजाक सुनाओ', 'జోక్ చెప్పు'],
    answers: {
      en: "Why don’t scientists trust atoms? Because they make up everything! 😄",
      hi: 'वैज्ञानिक परमाणुओं पर भरोसा क्यों नहीं करते? क्योंकि वे सब कुछ बना देते हैं! 😄',
      te: 'శాస్త్రవేత్తలు అణువులపై ఎందుకు నమ్మకం పెట్టుకోరు? ఎందుకంటే అవి అన్నింటినీ తయారు చేస్తాయి! 😄',
    },
  },
  {
    id: 'singasong',
    keywords: ['sing a song', 'गाना गाओ', 'పాట పాడు'],
    answers: {
      en: '🎵 La la la... Sorry, I can’t really sing, but I can cheer you up with text songs!',
      hi: '🎵 ला ला ला... माफ़ कीजिए, मैं गा नहीं सकता, लेकिन मैं आपको टेक्स्ट गाने सुना सकता हूँ!',
      te: '🎵 లా లా లా... క్షమించండి, నేను పాడలేను, కానీ నేను మీకు టెక్స్ట్ పాటలతో ఉత్సాహం ఇవ్వగలను!',
    },
  },
  {
    id: 'whattime',
    keywords: ['what is the time', 'time', 'समय क्या है', 'సమయం ఎంతైంది'],
    answers: {
      en: "I don't have a watch ⌚, but you can check your device clock!",
      hi: 'मेरे पास घड़ी नहीं है ⌚, लेकिन आप अपने डिवाइस की घड़ी देख सकते हैं!',
      te: 'నా దగ్గర గడియారం లేదు ⌚, కానీ మీరు మీ పరికరం గడియారాన్ని చూడవచ్చు!',
    },
  },
  {
    id: 'greeting_morning',
    keywords: ['good morning', 'सुबह की नमस्ते', 'శుభోదయం'],
    answers: {
      en: 'Good morning! Have a wonderful day ahead. 🌞',
      hi: 'सुप्रभात! आपका दिन शुभ हो। 🌞',
      te: 'శుభోదయం! మీ రోజు అద్భుతంగా గడవాలి. 🌞',
    },
  },
  {
    id: 'greeting_afternoon',
    keywords: ['good afternoon', 'नमस्कार', 'శుభ మధ్యాహ్నం'],
    answers: {
      en: 'Good afternoon! Hope your day is going well. 🌇',
      hi: 'नमस्कार! आशा है आपका दिन अच्छा बीत रहा है। 🌇',
      te: 'శుభ మధ్యాహ్నం! మీ రోజు బాగానే గడుస్తుందని ఆశిస్తున్నాను. 🌇',
    },
  },
  {
    id: 'greeting_night',
    keywords: ['good night', 'शुभ रात्रि', 'శుభరాత్రి'],
    answers: {
      en: 'Good night! Sleep well and sweet dreams. 🌙',
      hi: 'शुभ रात्रि! अच्छे से सोएं और मीठे सपने देखें। 🌙',
      te: 'శుభరాత్రి! బాగా నిద్రపోండి, తియ్యని కలలు కనండి. 🌙',
    },
  },
];
