import React, { useState, useEffect } from 'react';

const ImageFromAPI = ({ apiUrl,data }) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(
          apiUrl,
          {
            headers: { 
              "Accept": "image/png",
              "Authorization": "Bearer VknySbLLTUjbxXAXCjyfaFIPwUTCeRXbFSOjwRiCxsxFyhbnGjSFalPKrpvvDAaPVzWEevPljilLVDBiTzfIbWFdxOkYJxnOPoHhkkVGzAknaOulWggusSFewzpqsNWM", 
              "Content-Type": "application/json" 
            },
            method: "POST",
            body: JSON.stringify(data),
          }
        );
        const blob = await response.blob();

        const reader = new FileReader();
        reader.onload = () => {
          setImageSrc(reader.result);
          setLoading(false);
        };
        reader.readAsDataURL(blob);
      } catch (error) {
        console.error('Error fetching image:', error);
        setLoading(false);
      }
    };

    fetchImage();
  }, [apiUrl,data]);

  return (
    <div className='comic-panel'>
      {loading ? (
        <p>Loading image...</p>
      ) : (
        <img src={imageSrc} alt="Fetched" style={{ maxWidth: '100%' }} />
      )}
    </div>
  );
};

export default ImageFromAPI;
