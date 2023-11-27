import React, { useState } from 'react';

const QueryInput = ({ onSubmit }) => {
  const panelCount = 10;
  const [queries, setQueries] = useState(Array(panelCount).fill(''));
  const [loadingStates, setLoadingStates] = useState(Array(panelCount).fill(false));
  const [errorStates, setErrorStates] = useState(Array(panelCount).fill(false));

  const handleQueryChange = (index, event) => {
    const newQueries = [...queries];
    newQueries[index] = event.target.value;
    setQueries(newQueries);
  };

  const handleSubmit = async (index) => {
    setLoadingStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = true;
      return newStates;
    });

    try {
      await onSubmit(index, queries[index]);
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
    <div>
      <h1>Tanny Comics Generator</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {queries.map((query, index) => (
          <div key={index} style={{ width: '30%', padding: '10px' }}>
            <h3>Panel {index + 1}</h3>
            <input
              type="text"
              value={query}
              onChange={(event) => handleQueryChange(index, event)}
              placeholder="Enter text to generate image"
            />
            <button onClick={() => handleSubmit(index)}>
              {loadingStates[index] ? 'Generate Image' : 'Generate Image'}
            </button>
            {errorStates[index] && <div>Generate Image</div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default QueryInput;
