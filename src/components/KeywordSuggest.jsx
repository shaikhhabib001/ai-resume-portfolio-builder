import { useState } from 'react';

const KeywordSuggest = () => {
  const [jobDesc, setJobDesc] = useState('');
  const [keywords, setKeywords] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSuggest = async () => {
    setIsLoading(true);
    setKeywords([]);

    // This will be the endpoint for our Vercel Serverless Function
    const response = await fetch('/api/ai-suggest', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jobDesc }),
    });

    const data = await response.json();
    // Assuming the API returns a 'keywords' array
    setKeywords(data.keywords || []);
    setIsLoading(false);
  };

  return (
    <div className="p-6 my-6 bg-white border rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-3">AI Keyword Suggestions</h2>
      <p className="text-gray-600 mb-4">Paste a job description below to get keyword recommendations.</p>
      <textarea
        value={jobDesc}
        onChange={(e) => setJobDesc(e.target.value)}
        className="w-full p-2 border rounded-md text-gray-800 bg-gray-50"
        rows="8"
        placeholder="Paste job description here..."
      />
      <button
        onClick={handleSuggest}
        disabled={isLoading || !jobDesc}
        className="mt-4 px-4 py-2 bg-blue-600 cursor-pointer text-white font-semibold rounded-md hover:bg-blue-700 disabled:bg-red-300"
      >
        {isLoading ? 'Generating...' : 'Get Suggestions'}
      </button>

      {keywords.length > 0 && (
        <div className="mt-4">
          <h3 className="font-semibold text-gray-700">Suggested Keywords:</h3>
          <ul className="list-disc list-inside text-gray-600">
            {keywords.map((kw, index) => <li key={index}>{kw}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
};

export default KeywordSuggest;