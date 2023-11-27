import './App.css';
import ComicStrip from './components/ComicStrip';
import QueryInput from './components/QueryInput';
import { useState } from 'react';

// import PanelStripComponent from './components/PanelStripComponent'
function App() {
  // const apiUrl = "https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud";
  // const data = {
  //   "inputs":"Astronaut riding a horse"
  // };

  const apiEndpoint = 'YOUR_API_ENDPOINT'; // Replace with your actual API endpoint
  const [imageUrls, setImageUrls] = useState(Array(10).fill(null));

  const fetchImagesWithQueries = async (queries) => {
    try {
      const responses = await Promise.all(
        queries.map((query, index) =>
          fetch(`${apiEndpoint}/${index + 1}?query=${query}`, { method: 'GET' })
        )
      );

      const blobs = await Promise.all(responses.map((response) => response.blob()));

      setImageUrls(blobs.map((blob) => URL.createObjectURL(blob)));
    } catch (error) {
      console.error('Error fetching images with queries:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Comic Strip
        </p>
        <QueryInput onSubmit={fetchImagesWithQueries} />
        <ComicStrip imageUrls={imageUrls}></ComicStrip>
      </header>
    </div>
  );
}

export default App;
