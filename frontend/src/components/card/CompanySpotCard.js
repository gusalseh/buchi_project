import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Typography, Tag, Image } from 'antd';
import { StarFilled, PictureOutlined } from '@ant-design/icons';

const { Text } = Typography;

const CompanySpotCard = (spotList) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/spotdetail/${spotList.spotList.spot_id}`);
  };

  const index = spotList.index;
  return (
    <Card
      onClick={handleCardClick}
      bordered
      hoverable
      style={{
        width: 600,
        height: 140,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16,
        borderRadius: '8px',
        boxShadow: 'none',
        transition: 'box-shadow 0.3s ease-in-out',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0px 5px 8px rgba(0, 0, 0, 0.2)')}
      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = 'none')}
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
              {index + 1}
            </Text>
            <Text strong style={{ fontSize: 24, fontStyle: 'normal', fontWeight: 600 }}>
              {spotList.spotList.spot_name}
            </Text>
            <Text style={{ marginLeft: 18, fontSize: 16, fontStyle: 'normal', fontWeight: 500 }} type="secondary">
              {spotList.spotList.main_section_1}
              {spotList.spotList.main_section_2 != null ? `· ${spotList.spotList.main_section_2}` : ' '}
            </Text>
          </div>

          <div style={{ display: 'flex', marginLeft: 18, marginTop: '8px' }}>
            <Tag color="#FAE7E5" style={{ height: 24, marginRight: 6, color: 'black' }}>
              {spotList.spotList.tag_1}
            </Tag>
            <Tag color="#E5F3FA" style={{ height: 24, marginRight: 6, color: 'black' }}>
              {spotList.spotList.tag_2}
            </Tag>
            <Tag color="#F1E5FA" style={{ height: 24, color: 'black' }}>
              {spotList.spotList.tag_3}
            </Tag>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', marginLeft: 18, marginTop: '8px' }}>
            <StarFilled style={{ color: '#DB5744', marginRight: '4px', width: 20, height: 20 }} />
            <Text strong style={{ fontSize: '16px', marginRight: '8px' }}>
              {spotList.spotList.rating}
            </Text>
            <Text></Text>
          </div>
        </div>
        <div style={{ marginLeft: 'auto', height: 100 }}>
          <Image
            alt={spotList.spotList.spot_name}
            src={spotList.spotList.spot_main_img || '/default-image.jpg'}
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
