import { Carousel } from 'antd';

const promotion1 = 'https://team01-buchi-bucket.s3.ap-northeast-2.amazonaws.com/promotion1.png';
const promotion2 = 'https://team01-buchi-bucket.s3.ap-northeast-2.amazonaws.com/promotion2.png';
const promotion3 = 'https://team01-buchi-bucket.s3.ap-northeast-2.amazonaws.com/promotion3.png';
const promotion4 = 'https://team01-buchi-bucket.s3.ap-northeast-2.amazonaws.com/promotion4.png';
const promotion5 = 'https://team01-buchi-bucket.s3.ap-northeast-2.amazonaws.com/promotion5.png';

const images = [promotion1, promotion2, promotion3, promotion4, promotion5];

const Promotion = () => {
  return (
    <div style={{ width: 1920, height: 360, textAlign: 'center', backgroundColor: 'gray' }}>
      <Carousel autoplay dotPosition="top">
        {images.map((image, index) => (
          <div key={index}>
            <img src={image} alt={`promotion-${index}`} style={{ width: '100%', height: 360, objectFit: 'cover' }} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Promotion;
