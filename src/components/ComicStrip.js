import React, { useState } from 'react';

const ComicStrip = () => {
  const panelCount = 10;
  const apiEndpoint = "https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud"; // Replace with your actual API endpoint
  const data1 = {
    "inputs": "Astronaut riding a horse"
  }
  const [imageUrls, setImageUrls] = useState(Array(panelCount).fill(null));

  const fetchImage = async (index) => {
    try {
      const response = await fetch(`${apiEndpoint}`,
            {
              headers: { 
                "Accept": "image/png",
                "Authorization": "Bearer VknySbLLTUjbxXAXCjyfaFIPwUTCeRXbFSOjwRiCxsxFyhbnGjSFalPKrpvvDAaPVzWEevPljilLVDBiTzfIbWFdxOkYJxnOPoHhkkVGzAknaOulWggusSFewzpqsNWM", 
                "Content-Type": "application/json" 
              },
              method: "POST",
              body: JSON.stringify(data1),
            } 
          );
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      setImageUrls((prevUrls) => {
        const newUrls = [...prevUrls];
        newUrls[index] = url;
        return newUrls;
      });
    } catch (error) {
      console.error(`Error fetching image for panel ${index + 1}:`, error);
    }
  };

  // Fetch images when the component mounts
  React.useEffect(() => {
    for (let i = 0; i < panelCount; i++) {
      fetchImage(i);
    }
  });

  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {imageUrls.map((url, index) => (
          <div
            key={index}
            style={{
              width: index < panelCount - 1 ? '30%' : '100%', // 30% width for first 9 panels, 100% for the last panel
              padding: '10px',
              textAlign: index === panelCount - 1 ? 'center' : 'center', // Center-align the last panel
            }}
          >
            {<img src={url} alt={`Loading Strip ${index + 1}`} style={{ maxWidth: '100%', maxHeight: '400px' }} />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComicStrip;
