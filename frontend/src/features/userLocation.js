import axios from 'axios';

export const createLocation = async (locationData) => {
  try {
    const response = await axios.post('http://localhost:3000/api/userLocation', locationData);
    return response.data;
  } catch (error) {
    console.error('Error creating location:', error);
    throw error;
  }
};

export const updateSelectedLocation = async (locationId, updatedData) => {
  try {
    const response = await axios.put(
      `http://localhost:3000/api/userLocation/updateSelectedUserLocation/${locationId}`,
      updatedData
    );
    return response.data;
  } catch (error) {
    console.error('Error updating location:', error);
    throw error;
  }
};

export const deleteLocation = async (locationId) => {
  try {
    await axios.delete(`http://localhost:3000/api/userLocation/${locationId}`);
  } catch (error) {
    console.error('Error deleting location:', error);
    throw error;
  }
};

export const fetchUserLocations = async (userId) => {
  try {
    const response = await axios.get(`http://localhost:3000/api/userLocation/fetchUserLocation/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user locations:', error);
    throw error;
  }
};
