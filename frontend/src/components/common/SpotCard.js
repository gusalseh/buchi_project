import React from 'react';
import { Card, Tag, Typography, Rate } from 'antd';
import { Image } from 'antd';
import { StarFilled } from '@ant-design/icons';

const { Text, Title } = Typography;

const SpotCard = ({ imageSrc, title, description, distance, capacity, averagePrice, tags, rating, reviews }) => {
  return (
    <Card
      hoverable
      cover={
        <Image
          alt={title}
          src={imageSrc}
          preview={false}
          bordered={false}
          style={{ width: 320, height: 320, objectFit: 'cover' }}
        />
      }
      bordered={false}
      style={{ width: 320, height: 494 }}
    >
      <div style={{ display: 'flex', gap: 12 }}>
        <Title level={4}>역삼농원</Title>
        <Text type="secondary" style={{ marginTop: 5 }}>
          닭볶음탕
        </Text>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div bordered={false} style={{ marginTop: 8 }}>
          <Text>도보 5분</Text>
          <Text style={{ margin: '0 8px' }}>|</Text>
          <Text>최대 12인</Text>
          <Text style={{ margin: '0 8px' }}>|</Text>
          <Text>평균 30,000원</Text>
        </div>
        <div>
          <span>Tag</span>
          <span style={{ marginLeft: 8 }}>Tag</span>
          <span style={{ marginLeft: 8 }}>Tag</span>
        </div>
      </div>
      <div style={{ marginTop: 8 }}></div>
      <div style={{ marginTop: 16, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <StarFilled />
        <p>4.2</p>
        <Text style={{ marginLeft: 8, fontSize: 16 }}>{rating}</Text>
        <Text type="secondary" style={{ marginLeft: 8 }}>
          리뷰 123
        </Text>
      </div>
    </Card>
  );
};

export default SpotCard;
