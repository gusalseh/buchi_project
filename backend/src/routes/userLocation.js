const express = require('express');
const { UserLocation } = require('../models');
const router = express.Router();

router.post('/', async (req, res) => {
  const {
    user_id,
    location_type,
    location_name,
    location_building_name,
    location_road_address,
    location_jibun_address,
  } = req.body;

  // 프론트엔드에서 전송된 location_type 값을 ENUM 값으로 변환
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

  const location = await UserLocation.create({
    user_id,
    location_type: dbLocationType,
    location_name,
    location_building_name,
    location_road_address,
    location_jibun_address,
    selected: existingLocations.length === 0 ? true : false,
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
      return res.status(200).json({ location_road_address: '역삼역 2번 출구' });
    }

    res.status(200).json(selectedLocation);
  } catch (error) {
    console.error('Error fetching selected location:', error);
    res.status(500).json({ error: 'Failed to fetch selected location' });
  }
});

module.exports = router;
