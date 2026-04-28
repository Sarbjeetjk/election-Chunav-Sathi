// Hybrid AI Service for Chunav Saathi
// Automatically detects and uses the appropriate AI provider via a CORS-safe proxy

const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

const electionKnowledge = [
  {
    category: 'registration',
    keywords: ['register', 'voter id', 'apply', 'enroll', 'form 6', 'पंजीकरण', 'वोटर आईडी', 'आवेदन'],
    en: "To register as a voter, you can apply online through the Voters' Service Portal (voters.eci.gov.in) or use the Voter Helpline App. You need to fill 'Form 6' for new registration.",
    hi: "मतदाता के रूप में पंजीकरण करने के लिए, आप मतदाता सेवा पोर्टल (voters.eci.gov.in) के माध्यम से ऑनलाइन आवेदन कर सकते हैं या वोटर हेल्पलाइन ऐप का उपयोग कर सकते हैं। नए पंजीकरण के लिए आपको 'फॉर्म 6' भरना होगा।"
  }
];

export const getAIResponse = async (query, language = 'en') => {
  if (!API_KEY) return fallbackResponse(query, language);

  const isGoogle = API_KEY.startsWith('AIza');
  const isCerebras = API_KEY.startsWith('csk-');
  
  try {
    if (isGoogle) {
      // GOOGLE GEMINI FLOW (Via Proxy)
      const response = await fetch(`/api/gemini/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: `You are Chunav Saathi, an election assistant. Answer in ${language === 'hi' ? 'Hindi' : 'English'}: ${query}` }]
          }]
        })
      });
      const data = await response.json();
      return data.candidates[0].content.parts[0].text;
    } else if (isCerebras) {
      // CEREBRAS FLOW (Via Proxy)
      const response = await fetch('/api/cerebras/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
          model: "llama3.1-8b",
          messages: [
            { role: "system", content: `You are Chunav Saathi, an election assistant. Respond in ${language === 'hi' ? 'Hindi' : 'English'}. Keep responses concise and helpful.` },
            { role: "user", content: query }
          ]
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Cerebras API Error:", response.status, errorData);
        return fallbackResponse(query, language);
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } else {
      const response = await fetch('/api/openai/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: `You are Chunav Saathi, an election assistant. Respond in ${language === 'hi' ? 'Hindi' : 'English'}.` },
            { role: "user", content: query }
          ]
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("OpenAI API Error:", response.status, errorData);
        return fallbackResponse(query, language);
      }

      const data = await response.json();
      return data.choices[0].message.content;
    }
  } catch (error) {
    console.error("AI Proxy Error:", error);
    return fallbackResponse(query, language);
  }
};

const fallbackResponse = async (query, language) => {
  await new Promise(resolve => setTimeout(resolve, 800));
  const qLower = query.toLowerCase();
  for (const entry of electionKnowledge) {
    if (entry.keywords.some(keyword => qLower.includes(keyword))) {
      return language === 'hi' ? entry.hi : entry.en;
    }
  }
  return language === 'hi' 
    ? "नमस्ते! मैं आपका चुनाव साथी हूँ। मैं आपके चुनाव संबंधी प्रश्नों में मदद कर सकता हूँ।" 
    : "Hello! I am your Chunav Saathi. I can help you with your election questions.";
};
