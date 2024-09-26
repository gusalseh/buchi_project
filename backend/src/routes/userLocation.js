const express = require('express');
const { UserLocation } = require('../models');
const router = express.Router();
const Sequelize = require('sequelize');
const { Op } = Sequelize;

router.post('/', async (req, res) => {
  const {
    user_id,
    location_type,
    location_name,
    location_latitude,
    location_longitude,
    location_building_name,
    location_road_address,
    location_jibun_address,
  } = req.body;

  const enumLocationTypeMap = {
    근무지: 'onsite',
    출장지: 'offsite',
    기타: 'etc',
  };

  const dbLocationType = enumLocationTypeMap[location_type];

  // Check if there are any existing locations for this user
  const existingLocations = await UserLocation.findAll({ where: { user_id } });

  // Check if the user already has a '근무지' or '출장지'
  if (['onsite', 'offsite'].includes(dbLocationType)) {
    const existingLocation = await UserLocation.findOne({ where: { user_id, location_type: dbLocationType } });
    if (existingLocation) {
      return res.status(400).json({ error: 'You can only have one 근무지 or 출장지' });
    }
  }

  // 기존 유저의 모든 주소의 selected 값을 false로 설정
  await UserLocation.update({ selected: false }, { where: { user_id } });

  const location = await UserLocation.create({
    user_id,
    location_type: dbLocationType,
    location_name,
    location_lat: location_latitude,
    location_lng: location_longitude,
    location_building_name,
    location_road_address,
    location_jibun_address,
    selected: true,
  });

  res.status(201).json(location);
});

router.put('/updateSelectedUserLocation/:id', async (req, res) => {
  const { id } = req.params;
  const { selected } = req.body;

  if (selected) {
    // Set other locations' `selected` to false for this user
    await UserLocation.update({ selected: false }, { where: { user_id: req.body.user_id } });
  }

  const updatedLocation = await UserLocation.update(req.body, { where: { location_id: id }, returning: true });

  res.status(200).json(updatedLocation[1][0]); // Return the updated record
});

router.delete('/deleteUserLocation/:id', async (req, res) => {
  const { id } = req.params;

  await UserLocation.destroy({ where: { location_id: id } });

  res.status(204).send();
});

router.get('/fetchUserLocation/:user_id', async (req, res) => {
  const { user_id } = req.params;

  try {
    const locations = await UserLocation.findAll({ where: { user_id } });
    console.log('fetched user locations', locations);
    res.status(200).json(locations);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch locations' });
  }
});

router.get('/selectedLocation/:user_id', async (req, res) => {
  const { user_id } = req.params;

  try {
    const selectedLocation = await UserLocation.findOne({
      where: { user_id, selected: true },
    });

    if (!selectedLocation) {
      return res
        .status(200)
        .json({ location_road_address: '역삼역 2번 출구', location_lat: '37.5000263', location_lng: '127.0365456' });
    }

    res.status(200).json(selectedLocation);
  } catch (error) {
    console.error('Error fetching selected location:', error);
    res.status(500).json({ error: 'Failed to fetch selected location' });
  }
});

// 새롭게 "출장지" 또는 "근무지"를 업데이트하는 라우터
router.put('/updateLocationByType', async (req, res) => {
  const {
    user_id,
    location_type,
    location_name,
    location_latitude,
    location_longitude,
    location_building_name,
    location_road_address,
    location_jibun_address,
  } = req.body;

  const enumLocationTypeMap = {
    근무지: 'onsite',
    출장지: 'offsite',
    기타: 'etc',
  };

  const dbLocationType = enumLocationTypeMap[location_type];

  if (!['onsite', 'offsite'].includes(dbLocationType)) {
    return res.status(400).json({ error: 'Only 근무지 and 출장지 types can be updated.' });
  }

  try {
    const existingLocation = await UserLocation.findOne({
      where: { user_id, location_type: dbLocationType },
    });

    if (!existingLocation) {
      return res.status(404).json({ error: 'Location not found for this user.' });
    }

    await UserLocation.update(
      {
        location_name,
        location_lat: location_latitude,
        location_lng: location_longitude,
        location_building_name,
        location_road_address,
        location_jibun_address,
        selected: true,
      },
      { where: { user_id, location_type: dbLocationType } }
    );

    await UserLocation.update({ selected: false }, { where: { user_id, location_type: { [Op.not]: dbLocationType } } });

    const updatedLocation = await UserLocation.findOne({
      where: { user_id, location_type: dbLocationType },
    });

    res.status(200).json(updatedLocation);
  } catch (error) {
    console.error('Error updating location:', error);
    res.status(500).json({ error: 'Failed to update location' });
  }
});

module.exports = router;
