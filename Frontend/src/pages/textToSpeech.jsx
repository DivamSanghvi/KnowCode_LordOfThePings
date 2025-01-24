// import React, { useState } from 'react';

// const useTextToSpeech = () => {
//   const [selectedLanguage, setSelectedLanguage] = useState('hi-IN'); // Default to Hindi

//   const speakText = (text) => {
//     if ('speechSynthesis' in window && text) {
//       const utterance = new SpeechSynthesisUtterance(text);
//       utterance.lang = selectedLanguage; // Use the selected language
//       speechSynthesis.speak(utterance);
//     }
//   };

//   // Language options for Indian languages
//   const languageOptions = [
//     { label: 'Hindi', value: 'hi-IN' },
//     { label: 'Tamil', value: 'ta-IN' },
//     { label: 'Telugu', value: 'te-IN' },
//     { label: 'Bengali', value: 'bn-IN' },
//     { label: 'Gujarati', value: 'gu-IN' },
//     { label: 'Kannada', value: 'kn-IN' },
//     { label: 'Malayalam', value: 'ml-IN' },
//     { label: 'Marathi', value: 'mr-IN' },
//     { label: 'Punjabi', value: 'pa-IN' },
//     { label: 'Odia', value: 'or-IN' },
//     { label: 'Assamese', value: 'as-IN' },
//   ];

//   return { speakText, selectedLanguage, setSelectedLanguage, languageOptions };
// };

// const SpeechWidget = () => {
//   const { speakText, selectedLanguage, setSelectedLanguage, languageOptions } = useTextToSpeech();
//   const [textToSpeak, setTextToSpeak] = useState('');

//   const handleLanguageChange = (e) => {
//     setSelectedLanguage(e.target.value);
//   };

//   const handleSpeak = () => {
//     speakText(textToSpeak);
//   };

//   return (
//     <div>
//       <textarea
//         placeholder="Enter text to speak"
//         value={textToSpeak}
//         onChange={(e) => setTextToSpeak(e.target.value)}
//         rows="4"
//         cols="50"
//       />
//       <div>
//         <label htmlFor="language-select">Choose a language:</label>
//         <select id="language-select" value={selectedLanguage} onChange={handleLanguageChange}>
//           {languageOptions.map((lang) => (
//             <option key={lang.value} value={lang.value}>
//               {lang.label}
//             </option>
//           ))}
//         </select>
//       </div>
//       <button onClick={handleSpeak}>Speak</button>
//     </div>
//   );
// };  

// export default SpeechWidget;

import React, { useState, useEffect } from 'react';

// Custom hook for text-to-speech functionality
const useTextToSpeech = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('hi-IN'); // Default language: Hindi

  const speakText = (text) => {
    if ('speechSynthesis' in window && text) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = selectedLanguage; // Use the selected language
      speechSynthesis.speak(utterance);
    }
  };

  // Language options
  const languageOptions = [
    { label: 'Hindi', value: 'hi-IN' },
    { label: 'Tamil', value: 'ta-IN' },
    { label: 'Telugu', value: 'te-IN' },
    { label: 'Bengali', value: 'bn-IN' },
    { label: 'Gujarati', value: 'gu-IN' },
    { label: 'Kannada', value: 'kn-IN' },
    { label: 'Malayalam', value: 'ml-IN' },
    { label: 'Marathi', value: 'mr-IN' },
    { label: 'Punjabi', value: 'pa-IN' },
    { label: 'Odia', value: 'or-IN' },
    { label: 'Assamese', value: 'as-IN' },
  ];

  return { speakText, selectedLanguage, setSelectedLanguage, languageOptions };
};

const SpeechWidget = () => {
  const { speakText, selectedLanguage, setSelectedLanguage, languageOptions } = useTextToSpeech();
  const [selectedText, setSelectedText] = useState('');

  useEffect(() => {
    let debounceTimeout;

    const handleSelectionChange = () => {
      const selection = window.getSelection();
      const text = selection.toString(); // Get selected text

      // Debounce to avoid rapid speech triggering
      clearTimeout(debounceTimeout);
      debounceTimeout = setTimeout(() => {
        setSelectedText(text); // Update the state with selected text
        if (text) speakText(text); // Speak the selected text
      }, 500);
    };

    // Add the event listener for text selection
    document.addEventListener('selectionchange', handleSelectionChange);

    // Cleanup on unmount
    return () => {
      document.removeEventListener('selectionchange', handleSelectionChange);
      clearTimeout(debounceTimeout);
    };
  }, [speakText]);

  // Handle language change
  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
    if (selectedText) speakText(selectedText); // Speak the selected text in the new language
  };

  return (
    <div>
      <label htmlFor="language-select">Choose a language:</label>
      <select id="language-select" value={selectedLanguage} onChange={handleLanguageChange}>
        {languageOptions.map((lang) => (
          <option key={lang.value} value={lang.value}>
            {lang.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SpeechWidget;



// import { useEffect } from 'react';

// const useTextToSpeech = () => {
//   const speakText = (text) => {
//     if ('speechSynthesis' in window && text) {
//       const utterance = new SpeechSynthesisUtterance(text);
//     //   utterance.lang = 'en-US';
//     utterance.lang = 'hi-IN';
//       speechSynthesis.speak(utterance);
//     }
//   };



//   useEffect(() => {
//     speakText();  // Trigger speech with the extracted text
//   }, []);  // This effect runs only once when the page is loaded

//   return { speakText };
// };

// export default useTextToSpeech;

