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
    {
      id: 'idcard',
      keywords: ['id card', 'identity', 'आई कार्ड', 'ఐడి కార్డ్'],
      answers: {
        en: 'For a new or replacement ID card, please visit the administration office (Room 101). A fee of Rs. 100 may apply for duplicates.',
        hi: 'नए या डुप्लीकेट आईडी कार्ड के लिए, कृपया प्रशासन कार्यालय (कमरा 101) में संपर्क करें। डुप्लीकेट के लिए 100 रुपये का शुल्क लागू हो सकता है।',
        te: 'కొత్త లేదా రీప్లేస్‌మెంట్ ID కార్డ్ కోసం, దయచేసి అడ్మినిస్ట్రేషన్ కార్యాలయాన్ని (గది 101) సందర్శించండి. నకిలీల కోసం రూ. 100 రుసుము వర్తించవచ్చు.',
      },
    },
    {
      id: 'library',
      keywords: ['library', 'books', 'पुस्तकालय', 'పుస్తకాలు', 'గ్రంథాలయం'],
      answers: {
        en: 'The library is open from 9 AM to 8 PM on weekdays and 10 AM to 4 PM on weekends.',
        hi: 'पुस्तकालय सप्ताह के दिनों में सुबह 9 बजे से रात 8 बजे तक और सप्ताहांत पर सुबह 10 बजे से शाम 4 बजे तक खुला रहता है।',
        te: 'గ్రంథాలయం వారపు రోజులలో ఉదయం 9 నుండి రాత్రి 8 వరకు మరియు వారాంతాల్లో ఉదయం 10 నుండి సాయంత్రం 4 వరకు తెరిచి ఉంటుంది.',
      },
    },
    {
      id: 'hostel',
      keywords: ['hostel', 'accommodation', 'room', 'छात्रावास', 'హాస్టల్', 'గది'],
      answers: {
        en: 'Hostel allotment details will be released on October 15th. Please check the notice board for more information.',
        hi: 'छात्रावास आवंटन का विवरण 15 अक्टूबर को जारी किया जाएगा। अधिक जानकारी के लिए कृपया नोटिस बोर्ड देखें।',
        te: 'హాస్టల్ కేటాయింపు వివరాలు అక్టోబర్ 15న విడుదల చేయబడతాయి. దయచేసి మరింత సమాచారం కోసం నోటీసు బోర్డును తనిఖీ చేయండి.',
      },
    },
    {
      id: 'canteen',
      keywords: ['canteen', 'mess', 'food', 'कैंटीन', 'మెస్', 'ఆహారం'],
      answers: {
        en: 'The main canteen is located on the ground floor of the B-Block and is open from 8 AM to 7 PM.',
        hi: 'मुख्य कैंटीन बी-ब्लॉक के ग्राउंड फ्लोर पर स्थित है और सुबह 8 बजे से शाम 7 बजे तक खुली रहती है।',
        te: 'ప్రధాన క్యాంటీన్ బి-బ్లాక్ గ్రౌండ్ ఫ్లోర్‌లో ఉంది మరియు ఉదయం 8 నుండి సాయంత్రం 7 వరకు తెరిచి ఉంటుంది.',
      },
    },
    {
      id: 'wifi',
      keywords: ['wifi', 'internet', 'wi-fi', 'वाई-फाई', 'ఇంటర్నెట్'],
      answers: {
        en: "To access the campus Wi-Fi, connect to the 'College-WiFi' network and log in with your student roll number and password.",
        hi: "कैंपस वाई-फाई का उपयोग करने के लिए, 'College-WiFi' नेटवर्क से कनेक्ट करें और अपने छात्र रोल नंबर और पासवर्ड से लॉगिन करें।",
        te: "క్యాంపస్ Wi-Fiని యాక్సెస్ చేయడానికి, 'College-WiFi' నెట్‌వర్క్‌కి కనెక్ట్ చేయండి మరియు మీ విద్యార్థి రోల్ నంబర్ మరియు పాస్‌వర్డ్‌తో లాగిన్ చేయండి.",
      },
    },
    {
      id: 'placement',
      keywords: ['placement', 'tpo', 'jobs', 'प्लेसमेंट', 'ఉద్యోగాలు'],
      answers: {
        en: 'The Training and Placement Office (TPO) is located in the main administrative building. For inquiries, please email tpo@college.edu.',
        hi: 'प्रशिक्षण और प्लेसमेंट कार्यालय (टीपीओ) मुख्य प्रशासनिक भवन में स्थित है। पूछताछ के लिए, कृपया tpo@college.edu पर ईमेल करें।',
        te: 'శిక్షణ మరియు ప్లేస్‌మెంట్ కార్యాలయం (TPO) ప్రధాన పరిపాలన భవనంలో ఉంది. విచారణల కోసం, దయచేసి tpo@college.eduకి ఇమెయిల్ చేయండి.',
      },
    },
    {
      id: 'bonafide',
      keywords: ['bonafide', 'certificate', 'transcripts', 'बोनाफाइड', 'प्रमाण पत्र', 'ట్రాన్స్క్రిప్ట్స్'],
      answers: {
        en: 'You can apply for a bonafide certificate or academic transcripts through the student portal. It usually takes 3-5 working days to process.',
        hi: 'आप छात्र पोर्टल के माध्यम से बोनाफाइड प्रमाण पत्र या शैक्षणिक प्रतिलेख के लिए आवेदन कर सकते हैं। इसे संसाधित करने में आमतौर पर 3-5 कार्य दिवस लगते हैं।',
        te: 'మీరు విద్యార్థి పోర్టల్ ద్వారా బోనఫైడ్ సర్టిఫికేట్ లేదా అకడమిక్ ట్రాన్స్క్రిప్ట్స్ కోసం దరఖాస్తు చేసుకోవచ్చు. ప్రాసెస్ చేయడానికి సాధారణంగా 3-5 పని దినాలు పడుతుంది.',
      },
    },
    {
      id: 'holiday',
      keywords: ['holiday', 'vacation', 'छुट्टी', 'సెలవు'],
      answers: {
        en: 'The college will be closed for Diwali vacation from November 1st to November 5th.',
        hi: 'दिवाली की छुट्टियों के लिए कॉलेज 1 नवंबर से 5 नवंबर तक बंद रहेगा।',
        te: 'దీపావళి సెలవుల కోసం కళాశాల నవంబర్ 1 నుండి నవంబర్ 5 వరకు మూసివేయబడుతుంది.',
      },
    },
    {
      id: 'sports',
      keywords: ['sports', 'gym', 'ground', 'खेल', 'క్రీడలు', 'జిమ్'],
      answers: {
        en: 'The sports facilities, including the cricket ground and basketball court, are available for students from 6 AM to 9 AM and 4 PM to 7 PM.',
        hi: 'क्रिकेट ग्राउंड और बास्केटबॉल कोर्ट सहित खेल सुविधाएं छात्रों के लिए सुबह 6 बजे से 9 बजे तक और शाम 4 बजे से 7 बजे तक उपलब्ध हैं।',
        te: 'క్రికెట్ గ్రౌండ్ మరియు బాస్కెట్‌బాల్ కోర్ట్‌తో సహా క్రీడా సౌకర్యాలు విద్యార్థులకు ఉదయం 6 నుండి 9 వరకు మరియు సాయంత్రం 4 నుండి 7 వరకు అందుబాటులో ఉంటాయి.',
      },
    },
  ];
  