import { Carousel } from 'antd';
import promotion1 from '../../assets/Img/promotiontest1.webp';
import promotion2 from '../../assets/Img/promotiontest2.webp';
import promotion3 from '../../assets/Img/promotiontest3.webp';

const images = [promotion1, promotion2, promotion3];

const Promotion = () => {
  return (
    <div style={{ width: '100%', height: 360, textAlign: 'center', backgroundColor: 'gray' }}>
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
