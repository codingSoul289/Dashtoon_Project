import React, { useState } from 'react';
import ComicStrip from './components/ComicStrip';
import QueryInput from './components/QueryInput';
import './App.css'

const App = () => {
  const apiEndpoint = 'https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud'; // Replace with your actual API endpoint
  const [imageUrls, setImageUrls] = useState(Array(10).fill(null));

  const fetchImageWithQuery = async (index, query) => {
    try {
      const response = await fetch(`${apiEndpoint}/${index + 1}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inputs: query }),
      });

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      setImageUrls((prevUrls) => {
        const newUrls = [...prevUrls];
        newUrls[index] = url;
        return newUrls;
      });
    } catch (error) {
      console.error(`Error fetching image for panel ${index + 1} with query:`, error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <QueryInput onSubmit={fetchImageWithQuery} />
        <ComicStrip imageUrls={imageUrls} />
      </header>
    </div>
  );
};

export default App;
