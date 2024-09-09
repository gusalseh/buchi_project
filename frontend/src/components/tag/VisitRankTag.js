import React, { useEffect, useState } from 'react';
import { Button, Spin } from 'antd';
import { useSelector } from 'react-redux';
import { fetchSelectedLocation } from '../../features/userLocation';
import { getDistance } from '../../utils/distance';
import VisitRankSpotCard from '../card/VisitRankSpotCard';
import axios from 'axios';

const VisitRankTag = () => {
  const [sectionLabelSpotList, setSectionLabelSpotList] = useState({});
  const [randomMainSection2, setRandomMainSection2] = useState('');

  const user = useSelector((state) => state.user.user);

  const [locationName, setLocationName] = useState(null);
  const [selectedLatitude, setSelectedLatitude] = useState(null);
  const [selectedLongitude, setSelectedLongitude] = useState(null);
  const [isLocationFetched, setIsLocationFetched] = useState(false); // 첫 번째 useEffect 완료 여부
  const [isLoading, setIsLoading] = useState(false); // 현재 위치 주소 받기 로딩 상태

  const formatAddress = (data) => {
    const item = data[0];
    const region = item.region;
    const land = item.land;

    const city = (region.area1?.name).slice(0, 2);
    const district = region.area2?.name;

    const roadName = land.name;
    const buildingNumber = land.number1;

    const address = `${city} ${district} ${roadName} ${buildingNumber}`;

    return address;
  };

  useEffect(() => {
    const fetchLocation = async () => {
      setIsLoading(true);
      if (user) {
        const selectedLocation = await fetchSelectedLocation(user.user_id);
        if (selectedLocation && selectedLocation.location_road_address) {
          setLocationName(selectedLocation.location_road_address);
        }
      }
      setIsLoading(false);
      setIsLocationFetched(true);
    };

    fetchLocation();
  }, [user, locationName, isLocationFetched]);

  useEffect(() => {
    if (isLocationFetched && !locationName) {
      setIsLoading(true);
      const getCurrentLocation = () => {
        return new Promise((resolve, reject) => {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          } else {
            reject(new Error('Geolocation is not supported by this browser.'));
          }
        });
      };

      const onSuccess = (position) => {
        const { latitude, longitude } = position.coords;
        setSelectedLatitude(latitude);
        setSelectedLongitude(longitude);
        getReverseGeocode(latitude, longitude);
      };

      const onError = (error) => {
        console.error(error);
        // alert('위치를 가져올 수 없습니다.');
        setLocationName('역삼역 2번 출구');
      };

      const getReverseGeocode = async (latitude, longitude) => {
        try {
          setIsLoading(true);
          const response = await fetch(`http://localhost:80/reverse_geocode?lat=${latitude}&lon=${longitude}`);

          if (!response.ok) {
            const text = await response.text();
            console.error(`Error response: ${text}`);
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();

          if (data.results && data.results[0]) {
            const roadAddress = formatAddress(data.results) || '주소를 찾을 수 없습니다.';
            setLocationName(roadAddress);
          } else {
            setLocationName('주소를 찾을 수 없습니다.');
          }
        } catch (error) {
          console.error('Reverse geocoding failed:', error);
        } finally {
          setIsLoading(false);
        }
      };

      const getFetchedLocation = async () => {
        try {
          const position = await getCurrentLocation();
          onSuccess(position);
        } catch (error) {
          onError(error);
        }
      };

      getFetchedLocation();
    }
  }, [locationName, isLocationFetched]);

  useEffect(() => {
    const fetchSpotList = async () => {
      try {
        const sectionLabelResponse = await axios.get('http://localhost:80/api/spots/spotlist');
        const sectionLabelSpotList = sectionLabelResponse.data;
        setSectionLabelSpotList(sectionLabelSpotList);
      } catch (error) {
        console.error('spotlist:', error);
      }
    };

    fetchSpotList();
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
        marginLeft: 340,
        display: 'flex',
        flexDirection: 'column',
        height: 570,
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
        월별 방문 순위
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
          <Button
            onClick={handlePrev}
            style={{ borderRadius: '50%', width: 32, height: 32, position: 'absolute', left: 0, zIndex: 1 }}
          >
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
          {sectionLabelSpotList && sectionLabelSpotList.length > 0 ? (
            sectionLabelSpotList
              .slice() // 원본 배열을 변경하지 않기 위해 복사본을 생성
              .filter((spot) => {
                const distance = getDistance(
                  selectedLatitude,
                  selectedLongitude,
                  spot.sectionSpot.Spot.spot_lat,
                  spot.sectionSpot.Spot.spot_lng
                );
                console.log('util distance', distance);
                return distance <= 1; // 거리가 1km 이내인 경우에만 true 반환
              })
              .sort((a, b) => {
                return b.visitReviewData.reviewCount - a.visitReviewData.reviewCount;
              })
              .map((spot, index) => (
                <div
                  key={index}
                  style={{
                    minWidth: 340, // SpotCard의 너비를 고정
                    flexShrink: 0, // 카드가 줄어들지 않도록 설정
                  }}
                >
                  <VisitRankSpotCard
                    key={index}
                    sectionLabelSpot={spot}
                    selectedLatitude={selectedLatitude}
                    selectedLongitude={selectedLongitude}
                    index={index}
                  />
                </div>
              ))
          ) : (
            <div>데이터를 불러오는 중입니다...</div>
          )}
        </div>
        {currentIndex < totalCards - 4 && (
          <Button
            onClick={handleNext}
            style={{ borderRadius: '50%', width: 32, height: 32, position: 'absolute', right: 0, zIndex: 1 }}
          >
            &gt;
          </Button>
        )}
      </div>
    </div>
  );
};

export default VisitRankTag;
