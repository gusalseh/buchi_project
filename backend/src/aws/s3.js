require('dotenv').config();

const { s3 } = require('.');
const { ListObjectsV2Command } = require('@aws-sdk/client-s3');

// CloudFront 배포 도메인 설정
const cloudFrontDomain = process.env.AWS_CLOUDFRONT_DOMAIN;

const listImagesInDirectory = async (directory) => {
  const params = {
    Bucket: 'team01-buchi-bucket',
    Prefix: directory,
  };

  try {
    const command = new ListObjectsV2Command(params);
    const data = await s3.send(command);

    // CloudFront URL로 변환
    const imageUrls = data.Contents.filter((item) => item.Key.endsWith('.jpg')) // .jpg 파일만 필터링
      .map((item) => `https://${cloudFrontDomain}/${item.Key}`);

    return imageUrls;
  } catch (error) {
    console.error('Error fetching images from S3:', error);
    throw error;
  }
};

module.exports = { listImagesInDirectory };
