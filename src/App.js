import React, { useState } from 'react';
import ComicStrip from './components/ComicStrip';
import QueryInput from './components/QueryInput';
import './App.css';

const App = () => {
  const apiEndpoint = 'https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud'; // Replace with your actual API endpoint
  const panelCount = 10;

  // Initialize loading and error states for each panel
  const [loadingStates, setLoadingStates] = useState(Array(panelCount).fill(false));
  const [errorStates, setErrorStates] = useState(Array(panelCount).fill(false));

  // Initialize imageUrls state with null values
  const [imageUrls, setImageUrls] = useState(Array(panelCount).fill(null));

  const fetchImageWithQuery = async (index, query) => {
    try {
      // Set loading state to true when starting the fetch
      setLoadingStates((prevStates) => {
        const newStates = [...prevStates];
        newStates[index] = true;
        return newStates;
      });

      const response = await fetch(`${apiEndpoint}`, {
        method: 'POST',
        headers: {
          "Accept": "image/png",
          "Authorization": "Bearer VknySbLLTUjbxXAXCjyfaFIPwUTCeRXbFSOjwRiCxsxFyhbnGjSFalPKrpvvDAaPVzWEevPljilLVDBiTzfIbWFdxOkYJxnOPoHhkkVGzAknaOulWggusSFewzpqsNWM",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ inputs: query }),
      });

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      // Update imageUrls state with the fetched URL
      setImageUrls((prevUrls) => {
        const newUrls = [...prevUrls];
        newUrls[index] = url;
        return newUrls;
      });
    } catch (error) {
      console.error(`Error fetching image for panel ${index + 1} with query:`, error);

      // Set error state to true in case of an error
      setErrorStates((prevStates) => {
        const newStates = [...prevStates];
        newStates[index] = true;
        return newStates;
      });
    } finally {
      // Set loading state back to false after the fetch is completed
      setLoadingStates((prevStates) => {
        const newStates = [...prevStates];
        newStates[index] = false;
        return newStates;
      });
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <QueryInput onSubmit={fetchImageWithQuery} />
        <ComicStrip imageUrls={imageUrls} loadingStates={loadingStates} errorStates={errorStates} />
      </header>
    </div>
  );
};

export default App;
