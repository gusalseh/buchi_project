import axios from 'axios';

export const createLocation = async (locationData) => {
  try {
    const response = await axios.post(`http://localhost:80/api/userLocation`, locationData);
    return response.data;
  } catch (error) {
    console.error('Error creating location:', error);
    throw error;
  }
};

export const updateSelectedLocation = async (locationId, updatedData) => {
  try {
    const response = await axios.put(
      `http://localhost:80/api/userLocation/updateSelectedUserLocation/${locationId}`,
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
      `http://localhost:80/api/userLocation/deleteUserLocation/${locationId}`,
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
    const response = await axios.get(`http://localhost:80/api/userLocation/fetchUserLocation/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user locations:', error);
    throw error;
  }
};

export const fetchSelectedLocation = async (userId) => {
  try {
    const response = await axios.get(`http://localhost:80/api/userLocation/selectedLocation/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching selected location:', error);
    return { location_road_address: '역삼역 2번 출구', location_lat: '37.5000263', location_lng: '127.0365456' };
  }
};

export const updateLocationByType = async (locationData) => {
  try {
    const response = await axios.put(`http://localhost:80/api/userLocation/updateLocationByType`, locationData);
    return response.data;
  } catch (error) {
    console.error('Error updating location:', error);
    throw error;
  }
};
