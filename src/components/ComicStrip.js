import React from 'react';

const ComicStrip = ({ imageUrls, loadingStates, errorStates }) => {
  return (
    <div>
      <h1>Comic Strip Generator</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {imageUrls.map((url, index) => (
          <div
            key={index}
            style={{
              width: index < imageUrls.length - 1 ? '30%' : '30%',
              boxSizing: 'border-box',
              padding: '10px',
              textAlign: index === imageUrls.length - 1 ? 'center' : 'center',
            }}
          >
            <div
              style={{
                border: '1px solid #ddd',
                borderRadius: '5px',
                overflow: 'hidden',
              }}
            >
              {loadingStates[index] ? (
                <div style={{ width: '100%', height: '300px', backgroundColor: '#000000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  Loading...
                </div>
              ) : errorStates[index] ? (
                <div style={{ width: '100%', height: '300px', backgroundColor: '#000000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  Error fetching image
                </div>
              ) : (
                <>
                  {!url && <h3>Enter text to generate image</h3>}
                  {url && <img src={url} alt={`Panel ${index + 1}`} style={{ width: '100%', height: '300px', objectFit: 'cover' }} />}
                </>
              )
              }
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComicStrip;