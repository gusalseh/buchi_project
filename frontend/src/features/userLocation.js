import axios from 'axios';

export const createLocation = async (locationData) => {
  try {
    const response = await axios.post(`http://localhost:${BACKEND_PORT}/api/userLocation`, locationData);
    return response.data;
  } catch (error) {
    console.error('Error creating location:', error);
    throw error;
  }
};

export const updateSelectedLocation = async (locationId, updatedData) => {
  try {
    const response = await axios.put(
      `http://localhost:${BACKEND_PORT}/api/userLocation/updateSelectedUserLocation/${locationId}`,
      updatedData
    );
    return response.data;
  } catch (error) {
    console.error('Error updating location:', error);
    throw error;
  }
};

export const deleteLocation = async (locationId, updatedData) => {
  try {
    const response = await axios.delete(
      `http://localhost:${BACKEND_PORT}/api/userLocation/deleteUserLocation/${locationId}`,
      updatedData
    );
    return response.data;
  } catch (error) {
    console.error('Error deleting location:', error);
    throw error;
  }
};

export const fetchUserLocations = async (userId) => {
  try {
    const response = await axios.get(`http://localhost:${BACKEND_PORT}/api/userLocation/fetchUserLocation/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user locations:', error);
    throw error;
  }
};

export const fetchSelectedLocation = async (userId) => {
  try {
    const response = await axios.get(`http://localhost:${BACKEND_PORT}/api/userLocation/selectedLocation/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching selected location:', error);
    return { location_road_address: '역삼역 2번 출구' };
  }
};
