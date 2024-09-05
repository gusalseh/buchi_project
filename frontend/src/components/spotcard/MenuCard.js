import React, { useEffect, useState } from 'react';
import { Card, Tag, Typography, Rate } from 'antd';
import { Image } from 'antd';
import { StarFilled } from '@ant-design/icons';
import axios from 'axios';

const { Text, Title } = Typography;

const MenuCard = (sectionLabelSpot) => {
  console.log('MenuCard sectionLabelSpot Test', sectionLabelSpot);
  const sectionLabel = sectionLabelSpot.sectionLabelSpot;
  const spot = sectionLabel.Spot;
  const tagLabel = spot.TagLabel;
  const menu = spot.Menu;

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
      <Card
        hoverable
        cover={
          <Image
            alt={spot.spot_name}
            src={spot.spot_main_img || '/default-image.jpg'}
            preview={false}
            bordered={false}
            style={{ width: 320, height: 320, objectFit: 'cover', borderRadius: 8 }} // 이미지 크기는 유지하고 모서리만 둥글게
          />
        }
        bordered={false}
        style={{ width: 320, height: 494, padding: 20, boxShadow: 'none' }} // 카드 크기 그대로
      >
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          {' '}
          {/* 제목과 텍스트 간 간격 조정 */}
          <Title level={4} style={{ margin: 0 }}>
            {spot.spot_name}
          </Title>
          <Text type="secondary" style={{ marginTop: 5 }}>
            {sectionLabel.main_section_1} · {sectionLabel.main_section_2}
          </Text>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', marginTop: 8, alignItems: 'center' }}>
            {' '}
            {/* 텍스트 정렬 맞춤 */}
            <Text>도보 5분</Text> {/* 텍스트 수정 */}
            <Text style={{ margin: '0 8px' }}>|</Text>
            <Text>최대 {spot.max_group_seats}인</Text>
            <Text style={{ margin: '0 8px' }}>|</Text>
            <Text>평균 {menu.price}원</Text>
          </div>

          <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
            {' '}
            {/* 태그 간격 조정 */}
            <Tag color="#FAE7E5" style={{ color: 'black' }}>
              {tagLabel.tag_1}
            </Tag>
            <Tag color="#E5F3FA" style={{ color: 'black' }}>
              {tagLabel.tag_2}
            </Tag>
            <Tag color="#F1E5FA" style={{ color: 'black' }}>
              {tagLabel.tag_3}
            </Tag>
          </div>
        </div>

        <div style={{ marginTop: 16, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <StarFilled style={{ color: '#DB5744' }} /> {/* 별 색상 변경 */}
          <Text style={{ marginLeft: 8, fontSize: 16, fontWeight: 'bold' }}>{sectionLabelSpot.rating || 0}</Text>
          <Text type="secondary" style={{ marginLeft: 8 }}>
            리뷰 {sectionLabelSpot.reviews || 0}
          </Text>
        </div>
      </Card>
    </div>
  );
};

export default MenuCard;
