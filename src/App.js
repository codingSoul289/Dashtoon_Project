import React, { useState } from 'react';
import ComicStrip from './components/ComicStrip';
import QueryInput from './components/QueryInput';
import './App.css';

const App = () => {
  const apiEndpoint = 'https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud';
  const panelCount = 10;

  const [loadingStates, setLoadingStates] = useState(Array(panelCount).fill(false));
  const [errorStates, setErrorStates] = useState(Array(panelCount).fill(false));
  const [imageUrls, setImageUrls] = useState(Array(panelCount).fill(null));

  const fetchImageWithQuery = async (index, query) => {
    try {
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

      setImageUrls((prevUrls) => {
        const newUrls = [...prevUrls];
        newUrls[index] = url;
        return newUrls;
      });
    } catch (error) {
      console.error(`Error fetching image for panel ${index + 1} with query:`, error);

      setErrorStates((prevStates) => {
        const newStates = [...prevStates];
        newStates[index] = true;
        return newStates;
      });
    } finally {
      setLoadingStates((prevStates) => {
        const newStates = [...prevStates];
        newStates[index] = false;
        return newStates;
      });
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'right'}}>
      <div className="App">
        <header className="App-header">
          <QueryInput onSubmit={fetchImageWithQuery} />
          <ComicStrip imageUrls={imageUrls} loadingStates={loadingStates} errorStates={errorStates} />
        </header>
      </div>
    </div>
  );
};

export default App;
