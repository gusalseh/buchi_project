import React, { useState } from 'react';
import { Button } from 'antd';
import SpotCard from './SpotCard'; // SpotCard 컴포넌트를 import합니다.

const Tag = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalCards = 10; // SpotCard의 총 개수

  const handleNext = () => {
    if (currentIndex < totalCards - 2) {
      // 마지막 카드 전까지만 이동 가능하도록 수정
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
        padding: '0px 20px',
        marginTop: 20,
        display: 'flex',
        flexDirection: 'column',
        height: 570,
        backgroundColor: 'seagreen',
        gap: 20,
        position: 'relative',
        overflow: 'hidden', // 여기서 overflow를 'hidden'으로 설정해 잘리는 문제 방지
      }}
    >
      <div style={{ height: 32, fontSize: 32 }}>#태그</div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden', // 슬라이드 컨테이너에 overflow hidden 설정
        }}
      >
        {currentIndex > 0 && (
          <Button onClick={handlePrev} style={{ position: 'absolute', left: 0, zIndex: 1 }}>
            &lt;
          </Button>
        )}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            height: '100%',
            gap: 20,
            transform: `translateX(-${currentIndex * 340}px)`,
            transition: 'transform 0.3s ease',
            width: 'calc(100% - 40px)', // 전체 슬라이드의 너비를 정확하게 설정
          }}
        >
          {Array.from({ length: totalCards - 1 }).map(
            (
              _,
              index // 마지막 카드는 제외하고 렌더링
            ) => (
              <div
                key={index}
                style={{
                  minWidth: 340, // SpotCard의 너비를 고정
                  flexShrink: 0, // 카드가 줄어들지 않도록 설정
                }}
              >
                <SpotCard />
              </div>
            )
          )}
        </div>
        {currentIndex < totalCards - 2 && (
          <Button onClick={handleNext} style={{ position: 'absolute', right: 0, zIndex: 1 }}>
            &gt;
          </Button>
        )}
      </div>
    </div>
  );
};

export default Tag;
