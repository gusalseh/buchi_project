import React, { useEffect, useState } from 'react';
import { Form, Input, Button } from 'antd';
import CustomModal from '../components/common/Modal';
import { Card } from 'antd';
import '../styles/mainPageTemporary.css';
import Filter from '../components/common/Filter';
import Tag from '../components/common/Tag';
import TeamSpot from '../components/common/TeamSpot';
import axios from 'axios';

const MainPage = () => {
  return (
    <div style={{ width: '100%' }}>
      {/* <div style={{ width: '100%', height: 460, textAlign: 'center', backgroundColor: 'gray' }}>프로모션 배너</div> */}
      <Filter />
      <Tag />
      <TeamSpot />
      <Card className="filter-card">가장 많이 방문 랭킹</Card>
      <Card className="filter-card">프로모션</Card>

      {/* <Button type="primary" onClick={() => setIsModalVisible(true)}>
        회사 등록하기
      </Button> */}
    </div>
  );
};

export default MainPage;
