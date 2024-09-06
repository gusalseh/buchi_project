import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import SpotCard from '../common/SpotCard'; // SpotCard 컴포넌트를 import합니다.
import axios from 'axios';

const MenuTag = () => {
  const [sectionLabelSpotList, setSectionLabelSpotList] = useState({});
  const [randomMainSection2, setRandomMainSection2] = useState('');

  useEffect(() => {
    const fetchRandomMainSection2 = async () => {
      try {
        //main_section_2의 랜덤 값을 받아옴
        const randomResponse = await axios.get(`http://localhost:80/api/sectionLabels/main_section_2_random`);
        const randomMainSection2 = randomResponse.data;
        setRandomMainSection2(randomMainSection2);
        console.log('check randomMainSection2', randomMainSection2);

        //mainSection2 값을 사용해 데이터 조회
        const sectionLabelResponse = await axios.get('http://localhost:80/api/sectionLabels/main_section_list', {
          params: { mainSection2: randomMainSection2 },
        });
        const sectionLabelSpotList = sectionLabelResponse.data;
        setSectionLabelSpotList(sectionLabelSpotList);
      } catch (error) {
        console.error('랜덤 mainSection2 값을 가져오거나 sectionLabels를 불러오는 데 실패했습니다:', error);
      }
    };

    fetchRandomMainSection2();
  }, []); // 빈 배열: 컴포넌트가 처음 마운트될 때 한 번 실행

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
        height: 592,
        gap: 20,
        backgroundColor: 'white',
        position: 'relative',
        overflow: 'hidden', // 여기서 overflow를 'hidden'으로 설정해 잘리는 문제 방지
      }}
    >
      <div
        style={{
          color: 'black',
          height: 32,
          fontSize: 32,
          display: 'inline-block', // 텍스트 길이에 맞춰 선을 그리기 위해 inline-block 사용
          borderBottom: '8px solid #e5989b', // 텍스트 아래 선을 추가
          paddingBottom: '32px', // 텍스트와 선 사이의 간격 조정
          alignSelf: 'flex-start',
        }}
      >
        {randomMainSection2}
      </div>
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
          {Array.from({ length: sectionLabelSpotList.length }).map((_, index) => (
            <div
              key={index}
              style={{
                minWidth: 340, // SpotCard의 너비를 고정
                flexShrink: 0, // 카드가 줄어들지 않도록 설정
              }}
            >
              <SpotCard sectionLabelSpot={sectionLabelSpotList[index]} />
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
