import React, { useEffect, useState } from 'react';
import { Card, Tag, Typography, Rate } from 'antd';
import { Image } from 'antd';
import { StarFilled } from '@ant-design/icons';
import axios from 'axios';

const { Text, Title } = Typography;

const MenuCard = () => {
  const [menuCards, setMenuCards] = useState([]);
  const [menuSection2Cards, setMenuSection2Cards] = useState([]);
  const [spots, setSpots] = useState([]);
  const [randomMainSection2, setRandomMainSection2] = useState('');

  useEffect(() => {
    // API로부터 Spot 불러오기
    axios
      .get(`http://localhost:80/api/spots`)
      .then((response) => {
        setSpots(response.data); // 가져온 데이터를 state에 저장
      })
      .catch((error) => {
        console.error('There was an error fetching the spot cards!', error);
      });
  }, []);
  console.log(setSpots);

  useEffect(() => {
    //sectionLabel 불러오기
    axios
      .get(`http://localhost:80/api/sectionLabels`)
      .then((response) => {
        setMenuCards(response.data); // 가져온 데이터를 state에 저장
      })
      .catch((error) => {
        console.error('MenuCard에서 sectionLabel 불러오기 실패', error);
      });
  }, []);
  console.log(setMenuCards);

  useEffect(() => {
    if (randomMainSection2) {
      // 랜덤으로 선택된 main_section_2 값을 이용해 Spot 데이터를 가져옴
      axios
        .get(`http://localhost:80/api/spots?main_section_2=${randomMainSection2}`)
        .then((response) => {
          setSpots(response.data); // 가져온 데이터를 state에 저장
        })
        .catch((error) => {
          console.error('There was an error fetching the spot cards!', error);
        });
    }
  }, [randomMainSection2]);

  console.log(setMenuSection2Cards);

  useEffect(() => {
    //sectionLabel main_section_2 ENUM 타입 불러오기
    axios
      .get(`http://localhost:80/api/sectionLabels/main_section_2`)
      .then((response) => {
        const mainSection2Types = response.data;
        // 랜덤으로 하나의 main_section_2 값을 선택
        const randomIndex = Math.floor(Math.random() * mainSection2Types.length);
        setRandomMainSection2(mainSection2Types[randomIndex]);
      })
      .catch((error) => {
        console.error('MenuCard에서 sectionLabel 불러오기 실패', error);
      });
  }, []);

  console.log('randoxIndex', randomMainSection2);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
      {spots.map((spot, index) => (
        <Card
          key={index}
          hoverable
          cover={
            <Image
              alt={spot.name}
              src={spot.imageSrc || '/default-image.jpg'}
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
          <div
            style={{
              marginTop: 16,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
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

export default MenuCard;
