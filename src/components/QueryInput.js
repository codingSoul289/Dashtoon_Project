import React, { useState } from 'react';

const QueryInput = ({ onSubmit }) => {
  const panelCount = 10;
  const [queries, setQueries] = useState(Array(panelCount).fill(''));

  const handleQueryChange = (index, event) => {
    const newQueries = [...queries];
    newQueries[index] = event.target.value;
    setQueries(newQueries);
  };

  const handleSubmit = (index) => {
    // Call the onSubmit callback with the query for the specified index
    onSubmit(index, queries[index]);
  };

  return (
    <div>
      <h1>Queries to Image Generator</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {queries.map((query, index) => (
          <div key={index} style={{ width: '30%', padding: '10px' }}>
            <h3>Panel {index + 1}</h3>
            <input
              type="text"
              value={query}
              onChange={(event) => handleQueryChange(index, event)}
              placeholder={`Query for Panel ${index + 1}`}
            />
            <button onClick={() => handleSubmit(index)}>Submit Query</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QueryInput;
