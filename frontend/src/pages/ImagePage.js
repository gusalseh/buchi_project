import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ImagePage = () => {
  const [spotImages, setSpotImages] = useState([]);
  const [menuImages, setMenuImages] = useState([]);
  const [spotError, setSpotError] = useState(null);
  const [menuError, setMenuError] = useState(null);

  useEffect(() => {
    // Spot 이미지 가져오기
    const fetchSpotImages = async () => {
      try {
        const response = await axios.get('http://localhost:3000/image/spot/1/images');
        setSpotImages(response.data.imageUrls);
        setSpotError(null);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setSpotError('No spot images found.');
        } else {
          setSpotError('Failed to fetch spot images.');
        }
      }
    };

    // Menu 이미지 가져오기
    const fetchMenuImages = async () => {
      try {
        const response = await axios.get('http://localhost:3000/image/menu/1/images');
        setMenuImages(response.data.imageUrls);
        setMenuError(null);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setMenuError('No menu images found.');
        } else {
          setMenuError('Failed to fetch menu images.');
        }
      }
    };

    fetchSpotImages();
    fetchMenuImages();
  }, []);

  return (
    <div>
      <h2>Spot Images</h2>
      {spotError ? (
        <p>{spotError}</p>
      ) : (
        <div>
          {spotImages.map((url, index) => (
            <img key={index} src={url} alt={`Spot Image ${index + 1}`} />
          ))}
        </div>
      )}

      <h2>Menu Images</h2>
      {menuError ? (
        <p>{menuError}</p>
      ) : (
        <div>
          {menuImages.map((url, index) => (
            <img key={index} src={url} alt={`Menu Image ${index + 1}`} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImagePage;
