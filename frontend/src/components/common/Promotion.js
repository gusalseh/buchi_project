import { Carousel } from 'antd';
import promotion1 from '../../assets/Img/promotion/promotion1.png';
import promotion2 from '../../assets/Img/promotion/promotion2.png';
import promotion3 from '../../assets/Img/promotion/promotion3.png';
import promotion4 from '../../assets/Img/promotion/promotion4.png';
import promotion5 from '../../assets/Img/promotion/promotion5.png';

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
