import React from 'react';

const ComicStrip = ({ imageUrls }) => {
  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {imageUrls.map((url, index) => (
          <div
            key={index}
            style={{
              width: index < imageUrls.length - 1 ? '30%' : '100%', // 30% width for first 9 panels, 100% for the last panel
              padding: '10px',
              textAlign: index === imageUrls.length - 1 ? 'center' : 'center', // Center-align the last panel
            }}
          >
            {url && <img src={url} alt={`Panel ${index + 1}`} style={{ maxWidth: '100%', maxHeight: '300px' }} />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComicStrip;
