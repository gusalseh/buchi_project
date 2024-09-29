import { useEffect, useState } from 'react';
import { Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSelectedLocation, getCurrentLocation } from '../../features/userLocationThunk';
import { getDistance } from '../../utils/distance';
import Vector from '../../assets/Img/Vector.svg';
import LeftVector from '../../assets/Img/LeftVector.png';
import VisitRankSpotCard from '../card/VisitRankSpotCard';
import axios from 'axios';

const VisitRankTag = (user) => {
  const [sectionLabelSpotList, setSectionLabelSpotList] = useState([]);
  const [filterSpot, setFilterSpot] = useState([]);
  const [selectedLatitude, setSelectedLatitude] = useState(null);
  const [selectedLongitude, setSelectedLongitude] = useState(null);

  const dispatch = useDispatch();

  const selectedLocation = useSelector((state) => state.userLocation.selectedLocation);

  useEffect(() => {
    if (!user) {
      dispatch(getCurrentLocation());
    } else if (user) {
      dispatch(fetchSelectedLocation(user.user_id));
    }
  }, [dispatch, user]);

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

    if (selectedLocation) {
      setSelectedLatitude(user ? selectedLocation?.location_lat : selectedLocation.latitude);
      setSelectedLongitude(user ? selectedLocation?.location_lng : selectedLocation.longitude);

      fetchSpotList();
    } else if (!selectedLocation) {
      setSelectedLatitude(37.500483);
      setSelectedLongitude(127.036707);

      fetchSpotList();
    }
  }, [selectedLocation]);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const filteredSpots = sectionLabelSpotList
      .slice()
      .filter((spot) => {
        const distance = getDistance(
          selectedLatitude,
          selectedLongitude,
          spot.sectionSpot.Spot.spot_lat,
          spot.sectionSpot.Spot.spot_lng
        );
        return distance <= 1;
      })
      .sort((a, b) => b.visitReviewData.averageRating - a.visitReviewData.averageRating);
    setFilterSpot(filteredSpots);
  }, [sectionLabelSpotList, selectedLatitude, selectedLongitude]);

  const totalCards = filterSpot.length;

  const handleNext = () => {
    if (currentIndex < totalCards - 2) {
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
        marginLeft: '20rem',
        marginBottom: 40,
        display: 'flex',
        flexDirection: 'column',
        height: 600,
        gap: 20,
        backgroundColor: 'white',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          color: 'black',
          height: 32,
          fontSize: 32,
          display: 'inline-block',
          borderBottom: '8px solid #e5989b',
          paddingBottom: '32px',
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
          overflow: 'visible',
          width: '100%',
        }}
      >
        {currentIndex > 0 && (
          <Button
            onClick={handlePrev}
            style={{
              borderRadius: '50%',
              width: 48,
              height: 48,
              position: 'absolute',
              left: -20,
              zIndex: 10,
              background: '#FFF',
              boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.12)',
              overflow: 'visible',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.3')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            <img
              src={LeftVector}
              alt="previous button"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
              }}
            />
          </Button>
        )}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            height: '100%',
            gap: 20,
            transform: `translateX(-${currentIndex * 360}px)`,
            transition: 'transform 0.3s ease',
            width: `${filterSpot.length * 360}px`,
            position: 'relative',
            overflow: 'visible',
          }}
        >
          {totalCards ? (
            totalCards > 3 ? (
              filterSpot.map((spot, index) => (
                <div
                  key={index}
                  style={{
                    minWidth: 340,
                    flexShrink: 0,
                  }}
                >
                  <VisitRankSpotCard
                    sectionLabelSpot={spot}
                    selectedLatitude={selectedLatitude}
                    selectedLongitude={selectedLongitude}
                    index={index}
                  />
                </div>
              ))
            ) : (
              <div
                style={{
                  whiteSpace: 'nowrap',
                  textAlign: 'left',
                  transform: 'none',
                }}
              >
                데이터를 불러오는 중입니다...
              </div>
            )
          ) : (
            <div
              style={{
                whiteSpace: 'nowrap',
                textAlign: 'left',
                transform: 'none',
              }}
            >
              데이터가 부족한 지역입니다.
            </div>
          )}
        </div>
        {totalCards > 3 && currentIndex < totalCards - 3 && (
          <Button
            onClick={handleNext}
            style={{
              borderRadius: '50%',
              width: 48,
              height: 48,
              position: 'absolute',
              right: 0,
              zIndex: 1,
              background: '#FFF',
              boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.12)',
              overflow: 'visible',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.3')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            <img
              src={Vector}
              alt="next button"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
              }}
            />
          </Button>
        )}
      </div>
    </div>
  );
};

export default VisitRankTag;
