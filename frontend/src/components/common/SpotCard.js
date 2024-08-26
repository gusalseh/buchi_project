import React, { useEffect, useState } from 'react';
import { Card, Tag, Typography, Rate } from 'antd';
import { Image } from 'antd';
import { StarFilled } from '@ant-design/icons';
import axios from 'axios';

const { Text, Title } = Typography;

const SpotCard = () => {
  const [spotCards, setSpotCards] = useState([]);

  // useEffect(() => {
  //   // API로부터 SpotCard 데이터를 가져옴
  //   axios
  //     .get('http://localhost:3000/api/spotcards')
  //     .then((response) => {
  //       setSpotCards(response.data); // 가져온 데이터를 state에 저장
  //     })
  //     .catch((error) => {
  //       console.error('There was an error fetching the spot cards!', error);
  //     });
  // }, []);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
      {spotCards.map((spot, index) => (
        <Card
          key={index}
          hoverable
          cover={
            <Image
              alt={spot.name}
              src={spot.imageSrc || '/default-image.jpg'} // 이미지가 없을 경우 기본 이미지
              preview={false}
              bordered={false}
              style={{ width: 320, height: 320, objectFit: 'cover' }}
            />
          }
          bordered={false}
          style={{ width: 320, height: 494 }}
        >
          <div style={{ display: 'flex', gap: 12 }}>
            <Title level={4}>{spot.name}</Title>
            <Text type="secondary" style={{ marginTop: 5 }}>
              {spot.food}
            </Text>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div bordered={false} style={{ marginTop: 8 }}>
              <Text>도보 {spot.walkTime}분</Text>
              <Text style={{ margin: '0 8px' }}>|</Text>
              <Text>최대 {spot.maxCapacity}인</Text>
              <Text style={{ margin: '0 8px' }}>|</Text>
              <Text>평균 {spot.averagePrice.toLocaleString()}원</Text>
            </div>
            <div>
              <Tag>{spot.tag1}</Tag>
              <Tag>{spot.tag2}</Tag>
              <Tag>{spot.tag3}</Tag>
            </div>
          </div>
          <div style={{ marginTop: 8 }}></div>
          <div style={{ marginTop: 16, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <StarFilled />
            <Text style={{ marginLeft: 8, fontSize: 16 }}>{spot.rating || 0}</Text>
            <Text type="secondary" style={{ marginLeft: 8 }}>
              리뷰 {spot.reviews || 0}
            </Text>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default SpotCard;
