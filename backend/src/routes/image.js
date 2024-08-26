const express = require('express');
const { listImagesInDirectory } = require('../aws/s3');
const router = express.Router();

// Spot 이미지 가져오기
router.get('/spot/:spotId/images', async (req, res) => {
  const { spotId } = req.params;
  const directory = `spot/${spotId}/`;

  try {
    const imageUrls = await listImagesInDirectory(directory);
    if (imageUrls.length === 0) {
      return res.status(404).json({ error: 'No images found in the specified directory' });
    }
    res.json({ spotId, imageUrls });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch images' });
  }
});

// Menu 이미지 가져오기
router.get('/menu/:spotId/images', async (req, res) => {
  const { spotId } = req.params;
  const directory = `menu/${spotId}/`;

  try {
    const imageUrls = await listImagesInDirectory(directory);
    if (imageUrls.length === 0) {
      return res.status(404).json({ error: 'No menu images found in the specified directory' });
    }
    res.json({ spotId, imageUrls });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch menu images' });
  }
});

module.exports = router;
