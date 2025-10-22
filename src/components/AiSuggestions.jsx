import { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = import.meta.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

const AiSuggestions = () => {
  const [jobDescription, setJobDescription] = useState('');
  const [keywords, setKeywords] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const generateKeywords = async () => {
    if (!jobDescription) {
      setError('Please paste a job description first.');
      return;
    }
    setIsLoading(true);
    setError('');
    setKeywords('');

    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
      const prompt = `Based on the following job description, suggest 10-15 powerful keywords and 3 short, impactful phrases to include in a resume. Format the output clearly with headings for "Keywords" and "Phrases". Job Description: ${jobDescription}`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      setKeywords(text);
    } catch (err) {
      console.error("Error generating keywords:", err);
      setError('Failed to generate keywords. Please check your API key and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 dark:bg-transparent bg-white border rounded-lg shadow-sm">
      <h3 className="text-lg font-bold dark:text-gray-100 text-gray-800 mb-2">AI Keyword Suggester</h3>
      <p className="text-sm dark:text-gray-200 text-gray-600 mb-4">Paste a job description below to get AI-powered keyword suggestions for your resume.</p>
      <textarea
        rows="8"
        className="w-full p-2 border dark:text-gray-300 border-gray-300 rounded-md shadow-sm"
        placeholder="Paste job description here..."
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
      />
      <button
        onClick={generateKeywords}
        disabled={isLoading}
        className="mt-4 px-4 py-2 font-semibold text-white cursor-pointer dark:bg-blue-700 dark:hover:bg-blue-600 bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
      >
        {isLoading ? 'Generating...' : 'Generate Keywords'}
      </button>

      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

      {keywords && (
        <div className="mt-6 p-4 dark:bg-transparent dark:border dark:border-gray-600 bg-gray-50 border rounded-md">
          <h4 className="font-bold dark:text-gray-300 text-gray-700 mb-2">Suggestions:</h4>
          <pre className="whitespace-pre-wrap text-sm dark:text-gray-300 text-gray-800 font-sans">{keywords}</pre>
        </div>
      )}
    </div>
  );
};

export default AiSuggestions;