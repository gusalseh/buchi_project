const { s3 } = require('.');
const { ListObjectsV2Command } = require('@aws-sdk/client-s3');

const listImagesInDirectory = async (directory) => {
  const params = {
    Bucket: 'team01-buchi-bucket',
    Prefix: directory,
  };

  try {
    const command = new ListObjectsV2Command(params);
    const data = await s3.send(command);

    const imageUrls = data.Contents.filter((item) => item.Key.endsWith('.jpg')) // .jpg 파일만 필터링
      .map((item) => `https://${params.Bucket}.s3.ap-northeast-2.amazonaws.com/${item.Key}`);

    return imageUrls;
  } catch (error) {
    console.error('Error fetching images from S3:', error);
    throw error;
  }
};

module.exports = { listImagesInDirectory };
