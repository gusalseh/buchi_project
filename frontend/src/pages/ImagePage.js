import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSpotImages, fetchMenuImages } from '../features/imageThunk';

const ImagePage = () => {
  const dispatch = useDispatch();

  const { spotImages, menuImages, spotError, menuError, loading } = useSelector((state) => state.images);

  useEffect(() => {
    dispatch(fetchSpotImages());
    dispatch(fetchMenuImages());
  }, [dispatch]);

  return (
    <div>
      <h2>Spot Images</h2>
      {loading && <p>Loading...</p>}
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
      {loading && <p>Loading...</p>}
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
