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
            style={{ width: 320, height: 320, objectFit: 'cover' }}
          />
        }
        bordered={false}
        style={{ width: 320, height: 494 }}
      >
        <div style={{ display: 'flex', gap: 12 }}>
          <Title level={4}>{spot.spot_name}</Title>
          <Text type="secondary" style={{ marginTop: 5 }}>
            {sectionLabel.main_section_1}·{sectionLabel.main_section_2}
          </Text>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div bordered={false} style={{ marginTop: 8 }}>
            <Text>도보 101분</Text>
            <Text style={{ margin: '0 8px' }}>|</Text>
            <Text>최대 {spot.max_group_seats}인</Text>
            <Text style={{ margin: '0 8px' }}>|</Text>
            <Text>평균 {menu.price}원</Text>
          </div>
          <div>
            <Tag>{tagLabel.tag_1}</Tag>
            <Tag>{tagLabel.tag_2}</Tag>
            <Tag>{tagLabel.tag_3}</Tag>
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
          <Text style={{ marginLeft: 8, fontSize: 16 }}>{sectionLabelSpot.rating || 0}</Text>
          <Text type="secondary" style={{ marginLeft: 8 }}>
            리뷰 {sectionLabelSpot.reviews || 0}
          </Text>
        </div>
      </Card>
    </div>
  );
};

export default MenuCard;
