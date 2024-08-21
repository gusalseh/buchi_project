const express = require('express');
const { listImagesInDirectory } = require('../aws/s3'); // S3 관련 함수가 포함된 파일
const router = express.Router();

// Spot 이미지 가져오기
router.get('/spot/:spotId/images', async (req, res) => {
  const { spotId } = req.params;
  const directory = `spot/${spotId}/`;

  try {
    // 추후 imageUrls를 DB 테이블에 저장 고려
    const imageUrls = await listImagesInDirectory(directory); // 경로에 있는 모든 이미지를 가져옴
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
  const directory = `menu/${spotId}/`; // Menu 디렉토리 경로 설정

  try {
    // 추후 imageUrls를 DB 테이블에 저장 고려
    const imageUrls = await listImagesInDirectory(directory); // 경로에 있는 모든 이미지를 가져옴
    if (imageUrls.length === 0) {
      return res.status(404).json({ error: 'No menu images found in the specified directory' });
    }
    res.json({ spotId, imageUrls });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch menu images' });
  }
});

module.exports = router;
