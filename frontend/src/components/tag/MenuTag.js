import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import MenuCard from '../spotcard/MenuCard'; // SpotCard 컴포넌트를 import합니다.
import axios from 'axios';

const MenuTag = () => {
  const [menuCards, setMenuCards] = useState([]);

  useEffect(() => {
    //sectionLabel main_section_2 ENUM 타입 불러오기
    axios
      .get(`http://localhost:${BACKEND_PORT}/api/sectionLabels/main_section_2`)
      .then((response) => {
        setMenuCards(response.data); // 가져온 데이터를 state에 저장
      })
      .catch((error) => {
        console.error('MenuCard에서 sectionLabel 불러오기 실패', error);
      });
  }, []);

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
        gap: 20,
        backgroundColor: 'white',
        position: 'relative',
        overflow: 'hidden', // 여기서 overflow를 'hidden'으로 설정해 잘리는 문제 방지
      }}
    >
      <div style={{ color: 'black', height: 32, fontSize: 32 }}>#{menuCards}</div>
      <div
        style={{
          height: 570,
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
          {Array.from({ length: totalCards }).map((_, index) => (
            <div
              key={index}
              style={{
                minWidth: 340, // SpotCard의 너비를 고정
                flexShrink: 0, // 카드가 줄어들지 않도록 설정
              }}
            >
              <MenuCard />
            </div>
          ))}
        </div>
        {currentIndex < totalCards - 4 && (
          <Button onClick={handleNext} style={{ position: 'absolute', right: 0, zIndex: 1 }}>
            &gt;
          </Button>
        )}
      </div>
    </div>
  );
};

export default MenuTag;
