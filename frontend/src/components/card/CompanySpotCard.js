import React from 'react';
import { Card, Typography, Tag, Image } from 'antd';
import { StarFilled, PictureOutlined } from '@ant-design/icons';

const { Text } = Typography;

const CompanySpotCard = () => {
  return (
    <Card
      bordered
      style={{
        width: 600,
        height: 140,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16,
        borderRadius: '8px',
      }}
    >
      <div
        style={{
          height: 100,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            width: 444,
            height: 100,
            display: 'flex',
            alignItems: 'flex-start',
            flexDirection: 'column',
          }}
        >
          <div>
            <Text strong style={{ fontSize: '24px', color: '#d4380d', marginRight: '8px' }}>
              1
            </Text>
            <Text strong style={{ fontSize: 24, fontStyle: 'normal', fontWeight: 600 }}>
              Spot1
            </Text>
            <Text style={{ marginLeft: 18, fontSize: 16, fontStyle: 'normal', fontWeight: 500 }} type="secondary">
              음식종류
            </Text>
          </div>

          <div style={{ marginLeft: 18, marginTop: '8px' }}>
            <Tag style={{ width: 38, height: 24, marginRight: 6 }}>Tag</Tag>
            <Tag style={{ width: 38, height: 24, marginRight: 6 }}>Tag</Tag>
            <Tag style={{ width: 38, height: 24 }}>Tag</Tag>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', marginLeft: 18, marginTop: '8px' }}>
            <StarFilled style={{ color: '#DB5744', marginRight: '4px', width: 20, height: 20 }} />
            <Text strong style={{ fontSize: '16px', marginRight: '8px' }}>
              4.2
            </Text>
            <Text>리뷰 개수</Text>
          </div>
        </div>
        <div style={{ marginLeft: 'auto', height: 100 }}>
          <Image
            alt="CompanySpot"
            src={'/default-image.jpg'}
            fallback="/default.png"
            preview={false}
            style={{ width: 100, height: 100, objectFit: 'cover' }} // 이미지 크기는 유지하고 모서리만 둥글게
          />
        </div>
      </div>
    </Card>
  );
};

export default CompanySpotCard;
