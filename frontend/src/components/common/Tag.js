import React, { useState } from 'react';
import { Button } from 'antd';
import SpotCard from './SpotCard'; // SpotCard 컴포넌트를 import합니다.

const Tag = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalCards = 5; // SpotCard의 총 개수

  const handleNext = () => {
    if (currentIndex < totalCards - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div
      style={{
        padding: '0px 340px',
        marginTop: 20,
        display: 'flex',
        flexDirection: 'column',
        height: 570,
        backgroundColor: 'seagreen',
        gap: 20,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <div style={{ height: 32, fontSize: 32 }}>#태그</div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <Button onClick={handlePrev} style={{ position: 'absolute', left: 0, zIndex: 1 }} disabled={currentIndex === 0}>
          &lt;
        </Button>
        <div
          style={{
            width: '100%',
            marginTop: 20,
            display: 'flex',
            flexDirection: 'row',
            height: '100%',
            gap: 20,
            overflowX: 'hidden',
            whiteSpace: 'nowrap',
            transform: `translateX(-${currentIndex * 340}px)`, // 카드 크기에 따라 이동
            transition: 'transform 0.3s ease',
          }}
        >
          <SpotCard />
          <SpotCard />
          <SpotCard />
          <SpotCard />
          <SpotCard />
        </div>
        <Button
          onClick={handleNext}
          style={{ position: 'absolute', right: 0, zIndex: 1 }}
          disabled={currentIndex === totalCards - 1}
        >
          &gt;
        </Button>
      </div>
    </div>
  );
};

export default Tag;
