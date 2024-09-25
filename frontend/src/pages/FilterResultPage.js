import { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Button,
  Card,
  List,
  DatePicker,
  InputNumber,
  Row,
  Col,
  Select,
  Typography,
  Image,
  Tag,
  Slider,
  Modal,
} from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { CalendarOutlined, ClockCircleOutlined, SearchOutlined, StarFilled, CloseOutlined } from '@ant-design/icons';
import axios from 'axios';
import dayjs from 'dayjs';
import { getTag1, getTag2, getTag3, getMainsection1, getMainsection2, getSubsection3 } from '../enums/Enum';
import UserLocation from '../components/common/UserLocationModal';
import LoginAlert from '../components/alert/LoginAlert';
import { fetchSelectedLocation } from '../features/userLocation';
import { fetchPlacesByDistance } from '../features/fetchPlacesByDistance';

const { Text, Title } = Typography;
const { Option } = Select;

const FilterResultPage = () => {
  const user = useSelector((state) => state.user.user);
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const [locationName, setLocationName] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [selectedRange, setSelectedRange] = useState([10000, 1000000]);
  const [selectedDetailFilter, setSelectedDetailFilter] = useState(null);
  const [places, setPlaces] = useState([]);
  const [originalPlaces, setOriginalPlaces] = useState([]);
  const [hoveredPlace, setHoveredPlace] = useState(null);
  const [isSortedStandard, setIsSortedStandard] = useState('distance');
  const [visibleSpotCount, setVisibleSpotCount] = useState(20);
  const [isLoginAlertVisible, setIsLoginAlertVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedLatitude, setSelectedLatitude] = useState(null);
  const [selectedLongitude, setSelectedLongitude] = useState(null);
  const [filteredCount, setFilteredCount] = useState(0);
  const [modalKey, setModalKey] = useState(0);
  const [markers, setMarkers] = useState([]);
  const filterContainerRef = useRef(null);

  const date = queryParams.get('date');
  const time = queryParams.get('time');
  const amount = queryParams.get('amount');
  const latitude = parseFloat(queryParams.get('lat')) || 37.5665;
  const longitude = parseFloat(queryParams.get('lng')) || 126.978;
  const address = queryParams.get('address');

  useEffect(() => {
    window.handleCardClick = handleCardClick;
  }, []);

  useEffect(() => {
    setLocationName(address);
    setSelectedTime(time);
    setSelectedAmount(amount);
    if (date) {
      const formattedDate = dayjs(date, 'YYYY년 MM월 DD일');
      setSelectedDate(formattedDate);
    }

    const fetchPlacesByDistance = async () => {
      try {
        const currentPosition = {
          latitude: latitude,
          longitude: longitude,
          amount: amount,
        };
        const response = await axios.post('http://localhost:80/api/spots/getSpotByDistance', currentPosition);

        const updatedPlaces = response.data.map((place) => {
          const serviceTags = [];

          if (place.private_room === 1) serviceTags.push('개인룸');
          if (place.parking_lot > 0) serviceTags.push('주차가능');
          if (place.valet === 1) serviceTags.push('발렛가능');
          if (place.corkage === 'free') serviceTags.push('콜키지 무료');
          if (place.corkage === 'charge') serviceTags.push('콜키지 유료');
          if (place.rental === 1) serviceTags.push('대관가능');
          if (place.placard === 1) serviceTags.push('플랜카드 부착 가능');
          if (place.indoor_toilet === 1) serviceTags.push('실내화장실');
          if (place.wheelchair === 1) serviceTags.push('휠체어 이용가능');

          return {
            id: place.spot_id,
            title: place.spot_name,
            main_section_1: place.mainSec_1,
            main_section_2: place.mainSec_2,
            sub_section_1: place.subSec_1,
            sub_section_2: place.subSec_2,
            sub_section_3: place.subSec_3,
            sub_section_4: place.subSec_4,
            sub_section_5: place.subSec_5,
            tag_1: place.tag_1,
            tag_2: place.tag_2,
            tag_3: place.tag_3,
            distance: place.walking_time,
            max_group_seats: place.max_group_seats,
            rating: parseInt(place.avg_rating),
            reviews: place.review_count,
            price: parseInt(place.avg_price),
            lat: place.spot_lat,
            lng: place.spot_lng,
            img: place.spot_main_img,
            walking_time: place.walking_time,
            serviceTags: serviceTags,
          };
        });

        setPlaces(updatedPlaces);
        setOriginalPlaces(updatedPlaces);
        applyFilters(updatedPlaces, selectedRange);

        console.log('places:', updatedPlaces);
      } catch (error) {
        console.error('데이터를 가져오는 중 오류 발생:', error);
      }
    };
    if (latitude && longitude) {
      fetchPlacesByDistance();
    }
  }, [latitude, longitude, location.search, selectedFilters, selectedRange]);

  useEffect(() => {
    const map = new window.naver.maps.Map('map', {
      center: new window.naver.maps.LatLng(latitude, longitude),
      zoom: 16,
    });

    // 설정위치 빨간 원
    new window.naver.maps.Marker({
      position: new window.naver.maps.LatLng(latitude, longitude),
      map: map,
      icon: {
        content: `
      <div style="
        width: 15px;
        height: 15px;
        background-color: #CC3C28;
        border: 2px solid white;
        border-radius: 50%;
        box-shadow: 0 0 20px 0 rgba(204, 60, 40, 0.80);
      "></div>
    `,
        anchor: new window.naver.maps.Point(6, 6),
      },
    });

    // 주변 반경 원
    new window.naver.maps.Circle({
      map: map,
      center: new window.naver.maps.LatLng(latitude, longitude),
      radius: 700,
      fillColor: '#CC3C28',
      fillOpacity: 0.05,
      strokeColor: 'transparent',
      strokeOpacity: 0,
      strokeWeight: 0,
    });

    window.naverMap = map;
  }, [latitude, longitude]);

  useEffect(() => {
    if (places.length > 0) {
      // 기존 마커 제거
      markers.forEach((marker) => marker.setMap(null));
      setMarkers([]);

      // 새로운 마커 생성 및 저장
      const newMarkers = places.map((place) => {
        const marker = new window.naver.maps.Marker({
          position: new window.naver.maps.LatLng(place.lat, place.lng),
          map: window.naverMap,
          title: place.title,
        });

        window.naver.maps.Event.addListener(marker, 'mouseover', () => {
          setHoveredPlace(place);
        });

        window.naver.maps.Event.addListener(marker, 'mouseout', () => {
          setHoveredPlace(null);
        });

        return marker;
      });

      setMarkers(newMarkers);
    }
  }, [places]);

  useEffect(() => {
    if (hoveredPlace) {
      const infoWindow = new window.naver.maps.InfoWindow({
        content: `
        <div style="
          display: flex; 
          flex-direction: column; 
          width: 300px; 
          padding: 12px;
          box-shadow: 0 4px 16px rgba(0,0,0,0.15); 
          border-radius: 10px;
          background-color: white;
        ">
          <div style="display: flex; align-items: center;">
            <img src="${
              hoveredPlace.img
            }" style="width: 70px; height: 70px; border-radius: 6px; object-fit: cover; margin-right: 10px;" />
            <div style="flex-grow: 1;">
              <h3 style="margin: 0; font-size: 18px; font-weight: bold; color: #333;">${hoveredPlace.title}</h3>
              <p style="font-size: 12px; color: #666;">${getMainsection1(hoveredPlace.main_section_1)}
                ${hoveredPlace.main_section_2 ? ` · ${getMainsection2(hoveredPlace.main_section_2)}` : ''}
              </p>
              <p style="margin: 4px 0; color: #666; font-size: 12px;">
                방문자 리뷰 ${hoveredPlace.reviews}
              </p>
            </div>
          </div>
          <div style="display: flex; align-items: center; margin-top: 5px">
            <button style="
              width: 100%;
              height: 30px;
              background-color: #CC3C28; 
              color: white; 
              border: none;
              border-radius: 5px; 
              font-size: 12px;
              cursor: pointer;
            " onclick="window.handleCardClick(${hoveredPlace.id})">
              상세보기
            </button>
          </div>
        </div>
        `,
        position: new window.naver.maps.LatLng(hoveredPlace.lat, hoveredPlace.lng),
        map: window.naverMap,
        borderColor: 'transparent',
        backgroundColor: 'transparent',
        pixelOffset: new window.naver.maps.Point(0, -10),
      });

      infoWindow.open(window.naverMap);
    }
  }, [hoveredPlace]);

  useEffect(() => {
    if (isFilterVisible) {
      document.body.style.overflow = 'hidden'; // 스크롤 비활성화
    } else {
      document.body.style.overflow = 'auto'; // 스크롤 활성화
    }
  }, [isFilterVisible]);

  const handleDateChange = (dateString) => {
    setSelectedDate(dateString);
  };

  const handleTimeChange = (value) => {
    setSelectedTime(value);
  };

  const buttonStyle = {
    height: 32,
    borderRadius: '32px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 12px',
    border: '1px solid #d9d9d9',
  };

  const toggleFilter = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  const handleSelectFilter = (filter) => {
    let updatedFilters;
    if (selectedFilters.includes(filter)) {
      updatedFilters = selectedFilters.filter((item) => item !== filter);
    } else {
      updatedFilters = [...selectedFilters, filter];
    }

    setSelectedFilters(updatedFilters);
    applyFilters(originalPlaces, selectedRange);
  };

  const getFilterStyle = (filter) => ({
    height: 32,
    borderRadius: '32px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 12px',
    border: '1px solid #d9d9d9',
    backgroundColor: selectedFilters.includes(filter) ? '#F44E3B' : 'transparent',
    borderColor: selectedFilters.includes(filter) ? '#F44E3B' : '#D9D9D9',
    color: selectedFilters.includes(filter) ? '#FFFFFF' : '#000000',
  });

  const handleMapClick = () => {
    if (isFilterVisible) {
      setIsFilterVisible(false);
    }
  };

  const filterContainerStyle = {
    position: 'absolute',
    top: 1,
    left: isFilterVisible ? 0 : '-100%',
    width: '33%',
    height: '88%',
    backgroundColor: 'white',
    zIndex: 1000,
    transition: 'left 0.3s ease-in-out',
    boxShadow: '2px 0 5px rgba(0, 0, 0, 0.2)',
    overflowY: 'auto',
  };

  const filterList = ['동행인', '예산', '음식', '분위기', '시설·서비스'];

  const handleClickDetailFilter = (filter) => {
    setSelectedDetailFilter(filter);

    const filterElement = filterRefs[filter].current;
    if (filterElement && filterContainerRef.current) {
      const scrollOffset = filterElement.offsetTop - filterContainerRef.current.offsetTop;

      filterContainerRef.current.scrollTo({
        top: scrollOffset,
        behavior: 'smooth',
      });
    }
  };

  const firstFilter = [
    '친한사람과 함께',
    '동료와 함께',
    '상사와 함께',
    '임원과 함께',
    '거래처와 함께',
    '외국인과 함께',
  ];

  const secondFilter = ['한식', '중식', '일식', '양식', '아시안', '퓨전', '와인', '칵테일', '위스키', '전통주'];

  const thirdFilter = ['조용한담소', '활발한수다', '시끌벅적한', '캐주얼한', '격식있는', '이국적·이색적', '전통적인'];

  const fourthFilter = [
    '개인룸',
    '단체석',
    '대관가능',
    '실내화장실',
    '주차가능',
    '발렛가능',
    '콜키지 무료',
    '콜키지 유료',
    '휠체어 이용가능',
    '플랜카드 부착 가능',
  ];

  const handleCardMouseEnter = (place) => {
    setHoveredPlace(place);
  };

  const handleCardMouseLeave = () => {
    setHoveredPlace(null);
  };

  const sortByRating = () => {
    const sortedPlaces = [...places].sort((a, b) => b.rating - a.rating);
    setPlaces(sortedPlaces);
    setIsSortedStandard('rating');
  };

  const sortByDistance = () => {
    setPlaces(originalPlaces);
    setIsSortedStandard('distance');
  };

  const handleLoadMore = () => {
    setVisibleSpotCount((prevCount) => prevCount + 20);
  };

  const showLocationModal = () => {
    setIsModalVisible(true);
  };

  const handleLoginAlertClose = () => {
    setIsLoginAlertVisible(false);
  };

  const getCoordinates = async (address) => {
    try {
      const response = await fetch(`http://localhost:80/api/geocode`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ address }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch coordinates');
      }

      const data = await response.json();
      return { latitude: data.latitude, longitude: data.longitude };
    } catch (error) {
      console.error('Error fetching coordinates:', error);
      throw error;
    }
  };

  const handleOk = async () => {
    setIsModalVisible(false);
    if (user) {
      const selectedLocation = await fetchSelectedLocation(user.user_id);
      setLocationName(selectedLocation.location_road_address);
    }
  };

  const handleCancel = async () => {
    setIsModalVisible(false);
    setModalKey(modalKey + 1);
    if (user) {
      const selectedLocation = await fetchSelectedLocation(user.user_id);
      setLocationName(selectedLocation.location_road_address);
    }
  };

  const disabledDate = (current) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return current && current.toDate() < today;
  };

  const handleSearch = async () => {
    const updatedDate = selectedDate ? selectedDate.format('YYYY년 MM월 DD일') : date;
    const updatedTime = selectedTime || time;
    const updatedAmount = selectedAmount || amount;

    let latitude, longitude;

    if (locationName === '역삼역 2번 출구') {
      latitude = '37.5000263';
      longitude = '127.0365456';
    } else {
      try {
        const coordinates = await getCoordinates(locationName);
        latitude = coordinates.latitude;
        longitude = coordinates.longitude;
      } catch (error) {
        console.error('Failed to fetch coordinates:', error);
        return;
      }
    }
    setSelectedLatitude(latitude);
    setSelectedLongitude(longitude);
    setSelectedAmount(updatedAmount);

    await fetchPlacesByDistance({ latitude, longitude, amount: selectedAmount });

    window.location.href = `/filterResult?date=${updatedDate}&time=${updatedTime}&amount=${updatedAmount}&lat=${latitude}&lng=${longitude}&address=${locationName}`;
  };

  const applyFilters = (placesToFilter, range = selectedRange) => {
    const isDefaultRange = range[0] === 10000 && range[1] === 1000000;
    if (selectedFilters.length === 0 && isDefaultRange) {
      setPlaces(placesToFilter);
      setFilteredCount(placesToFilter.length);
      return;
    }

    const filteredPlaces = placesToFilter.filter((place) => {
      const tagGroup = {
        동행인: [getTag1(place.tag_1)],
        음식: [
          getMainsection1(place.main_section_1),
          getMainsection2(place.main_section_2),
          getSubsection3(place.sub_section_3),
        ],
        분위기: [getTag2(place.tag_2), getTag3(place.tag_3)],
        '시설·서비스': place.serviceTags,
      };

      const matchesAllFilters = Object.keys(tagGroup).every((filterGroup) => {
        const groupFilters = selectedFilters.filter((filter) => {
          if (filterGroup === '동행인' && firstFilter.includes(filter)) return true;
          if (filterGroup === '음식' && secondFilter.includes(filter)) return true;
          if (filterGroup === '분위기' && thirdFilter.includes(filter)) return true;
          if (filterGroup === '시설·서비스' && fourthFilter.includes(filter)) return true;
          return false;
        });

        if (groupFilters.length === 0) return true;

        // 시설·서비스 그룹에 대해서는 모든 선택된 필터가 포함되어 있는지 확인
        if (filterGroup === '시설·서비스') {
          return groupFilters.every((filter) => tagGroup['시설·서비스'].includes(filter));
        }

        return groupFilters.some((filter) => tagGroup[filterGroup].includes(filter));
      });

      const totalCost = place.price * selectedAmount;

      const isWithinBudget = totalCost >= selectedRange[0] && totalCost <= selectedRange[1];

      console.log('예산필터:', isWithinBudget);

      return matchesAllFilters && isWithinBudget;
    });

    console.log('filteredPlaces', filteredPlaces);

    setPlaces(filteredPlaces);
    setFilteredCount(filteredPlaces.length);
  };

  // 기존 마커 제거 및 필터링된 장소로 마커 업데이트
  const handleFilterResults = () => {
    markers.forEach((marker) => marker.setMap(null));
    setMarkers([]);

    const filteredMarkers = places.map((place) => {
      const marker = new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(place.lat, place.lng),
        map: window.naverMap,
        title: place.title,
      });

      return marker;
    });

    setMarkers(filteredMarkers);
    toggleFilter();
  };

  const handleCardClick = (id) => {
    navigate(`/spotdetail/${id}`);
  };

  const filterRefs = {
    동행인: useRef(null),
    예산: useRef(null),
    음식: useRef(null),
    분위기: useRef(null),
    '시설·서비스': useRef(null),
  };

  return (
    <Col style={{ width: '100%', height: '100vh', backgroundColor: 'white' }}>
      {/* 필터 영역 */}
      <Row
        style={{
          justifyContent: 'center',
          backgroundColor: '#FAFAFA',
          borderTop: '1.5px solid #E0E0E0',
          borderBottom: '1px solid #E0E0E0',
          paddingTop: '1px',
          paddingBottom: '16px',
        }}
      >
        <Row style={{ gap: 22, justifyContent: 'center', marginTop: '16px' }}>
          <Col style={{ minWidth: 300 }}>
            <div style={{ position: 'relative', display: 'inline-block', width: '300px', margin: '0 auto' }}>
              <Button
                style={{
                  minWidth: 250,
                  width: '100%',
                  textAlign: 'center',
                  border: 'none',
                  display: 'flex',
                  flexDirection: 'row',
                  fontSize: '20px',
                  fontStyle: 'normal',
                  fontWeight: 300,
                  position: 'relative',
                  backgroundColor: '#FAFAFA',
                }}
              >
                <span>{locationName}</span>
                {user ? (
                  <DownOutlined
                    onClick={showLocationModal}
                    style={{ fontSize: '15px', position: 'absolute', right: '10px' }}
                  />
                ) : (
                  <DownOutlined
                    onClick={() => setIsLoginAlertVisible(true)}
                    style={{ fontSize: '15px', position: 'absolute', right: '10px' }}
                  />
                )}
              </Button>
              <div
                style={{
                  position: 'absolute',
                  bottom: '-5px',
                  left: 0,
                  width: '100%',
                  height: '2px',
                  backgroundColor: '#B22222',
                }}
              ></div>
            </div>
          </Col>
          <Col style={{ minWidth: 240 }}>
            <DatePicker
              placeholder={date}
              value={selectedDate}
              style={{ width: 240, height: 40 }}
              disabledDate={disabledDate}
              format="YYYY년 MM월 DD일"
              suffixIcon={<CalendarOutlined />}
              onChange={handleDateChange}
              allowClear={false}
            />
          </Col>
          <Col style={{ minWidth: 240 }}>
            <Select
              placeholder={time}
              style={{ width: 240, height: 40 }}
              suffixIcon={<ClockCircleOutlined style={{ fontSize: 15 }} />}
              onChange={handleTimeChange}
              value={selectedTime}
              defaultValue={selectedTime}
              options={[
                { value: '점심회식', label: '점심회식' },
                { value: '저녁회식', label: '저녁회식' },
              ]}
            />
          </Col>
          <Col style={{ minWidth: 240 }}>
            <InputNumber
              placeholder={`${amount}명`}
              style={{
                width: 240,
                height: 40,
                textAlign: 'center',
                display: 'flex',
                alignItems: 'center',
              }}
              min={1}
              max={100}
              value={selectedAmount}
              onChange={setSelectedAmount}
            />
          </Col>
          <Col style={{ minWidth: 40 }}>
            <Button
              icon={<SearchOutlined style={{ fontSize: '20px', color: 'rgba(0, 0, 0, 0.65)' }} />}
              style={{
                width: 40,
                height: 40,
                borderRadius: '6px',
                border: '1px solid #d9d9d9',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 0,
              }}
              onClick={handleSearch}
            />
          </Col>
        </Row>
      </Row>
      {/* 리스트 및 지도 영역 */}
      <Row
        style={{
          display: 'flex',
          flexDirection: 'row',
          height: 'calc(100% - 188px)',
          borderBottom: '1px solid #E0E0E0',
        }}
      >
        {/* 왼쪽 리스트 영역 */}
        <div style={{ width: '33%', overflowY: 'auto', height: '100%' }}>
          {/* 최상단 filter 영역 */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, justifyContent: 'center' }}>
            <div style={{ padding: '24px 0' }}>
              {/* 첫 번째 줄: 동행인, 예산, 음식, 분위기, 시설/서비스 필터 */}
              <Row gutter={[21, 21]}>
                {filterList.map((filter) => (
                  <Col key={filter}>
                    <Button
                      style={buttonStyle}
                      onClick={() => {
                        toggleFilter();
                        handleClickDetailFilter(filter);
                      }}
                    >
                      {filter} <DownOutlined />
                    </Button>
                  </Col>
                ))}
              </Row>
              {/* 가변 줄: 세부 필터에서 선택한 옵션 표시 */}
              <Row style={{ margin: '10px 0', width: '520px', display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
                {selectedFilters.map((filter) => (
                  <Tag key={filter} color="red" closable onClose={() => handleSelectFilter(filter)}>
                    {filter}
                  </Tag>
                ))}
                {/* 예산 필터가 설정되어 있는 경우 예산을 표시 */}
                {(selectedRange[0] !== 10000 || selectedRange[1] !== 1000000) && (
                  <Tag
                    color="red"
                    closable
                    onClose={() => {
                      setSelectedRange([10000, 1000000]);
                    }}
                  >
                    {selectedRange[0] === 10000
                      ? `~ ${selectedRange[1].toLocaleString()} 원`
                      : `${selectedRange[0].toLocaleString()} 원 ~ ${selectedRange[1].toLocaleString()} 원`}
                  </Tag>
                )}
              </Row>
              {/* 두 번째 줄: 왼쪽에 도보 10분 이내, 오른쪽에 거리순/리뷰순 필터 */}
              <Row justify="space-between" align="middle">
                <Col>
                  <Select defaultValue="10" style={{ width: 130, borderRadius: '6px' }}>
                    <Option value="5">도보 5분 이내</Option>
                    <Option value="10">도보 10분 이내</Option>
                    <Option value="15">도보 15분 이내</Option>
                  </Select>
                </Col>
                <Col>
                  <Row gutter={8}>
                    <Col>
                      <Button
                        style={{ border: 'none', boxShadow: 'none', background: 'none' }}
                        onClick={sortByDistance}
                      >
                        <Text
                          style={{ color: isSortedStandard === 'distance' ? '#000000' : '#B3B3B3', fontSize: '17px' }}
                        >
                          거리순
                        </Text>
                      </Button>
                    </Col>
                    <Text style={{ marginTop: '4px' }}>|</Text>
                    <Col>
                      <Button style={{ border: 'none', boxShadow: 'none', background: 'none' }} onClick={sortByRating}>
                        <Text
                          style={{ color: isSortedStandard === 'rating' ? '#000000' : '#B3B3B3', fontSize: '17px' }}
                        >
                          별점순
                        </Text>
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
              {/* 세부 필터 애니메이션 스르륵 */}
              <div style={filterContainerStyle} ref={filterContainerRef}>
                {/* 첫 번째 Col: 필터 카테고리 */}
                <Col
                  style={{
                    borderBottom: '1px solid #E0E0E0',
                    backgroundColor: 'white',
                    position: 'sticky',
                    top: 0,
                    zIndex: 1200,
                  }}
                >
                  <Row justify="space-between" style={{ padding: '20px 5px 0 30px' }}>
                    {filterList.map((filter) => (
                      <Text
                        key={filter}
                        onClick={() => handleClickDetailFilter(filter)}
                        style={{
                          fontSize: '20px',
                          fontWeight: selectedDetailFilter === filter ? '800' : 'normal',
                          borderBottomWidth: selectedDetailFilter === filter ? 'medium' : 'normal',
                          borderBottomColor: selectedDetailFilter === filter ? '#CC3C28' : 'transparent',
                          borderBottomStyle: 'solid',
                          cursor: 'pointer',
                        }}
                      >
                        {filter}
                      </Text>
                    ))}
                    <Button
                      icon={<CloseOutlined />}
                      style={{ border: 'none', boxShadow: 'none', background: 'none' }}
                      onClick={() => toggleFilter()}
                    />
                  </Row>
                </Col>
                {/* 두 번째 Col: 선택 가능한 필터 값들 (스크롤 가능) */}
                <Col style={{ flex: 1, padding: '16px', marginLeft: '16px', marginRight: '16px' }}>
                  {/* 동행인 필터 */}
                  <Text strong ref={filterRefs['동행인']}>
                    동행인
                  </Text>
                  <Row
                    style={{
                      marginTop: '8px',
                      marginBottom: '32px',
                      gap: '8px',
                      borderBottom: '1px solid #E0E0E0',
                      paddingBottom: '32px',
                    }}
                  >
                    {firstFilter.map((filter) => (
                      <Button key={filter} onClick={() => handleSelectFilter(filter)} style={getFilterStyle(filter)}>
                        {filter}
                      </Button>
                    ))}
                  </Row>
                  {/* 예산 필터 */}
                  <Text strong ref={filterRefs['예산']}>
                    예산
                    <span
                      style={{
                        fontSize: 12,
                        color: 'var(--0Gray-500, #737373)',
                        marginLeft: '10px',
                      }}
                    >
                      최소 - 최대
                    </span>
                  </Text>
                  <Row
                    style={{
                      marginTop: '8px',
                      marginBottom: '32px',
                      gap: '8px',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div
                      style={{
                        width: '140px',
                        border: '1px solid #d9d9d9',
                        padding: '4px 11px',
                        borderRadius: '6px',
                      }}
                    >
                      {selectedRange[0].toLocaleString()} 원
                    </div>
                    <span>~</span>
                    <div
                      style={{
                        width: '140px',
                        border: '1px solid #d9d9d9',
                        padding: '4px 11px',
                        borderRadius: '6px',
                        textAlign: 'right',
                      }}
                    >
                      {selectedRange[1].toLocaleString()} 원
                    </div>
                  </Row>
                  <Slider
                    range
                    value={selectedRange}
                    onChange={(value) => {
                      const roundedValues = value.map((v) => Math.floor(v / 10000) * 10000);
                      setSelectedRange(roundedValues);
                      applyFilters(originalPlaces, roundedValues);
                    }}
                    min={10000}
                    max={1000000}
                    step={10000}
                    style={{ borderBottom: '1px solid #E0E0E0', paddingBottom: '32px', marginBottom: '32px' }}
                  />
                  {/* 음식 필터 */}
                  <Text strong ref={filterRefs['음식']}>
                    음식 및 주류
                  </Text>
                  <Row
                    style={{
                      marginTop: '8px',
                      marginBottom: '32px',
                      gap: '8px',
                      borderBottom: '1px solid #E0E0E0',
                      paddingBottom: '32px',
                    }}
                  >
                    {secondFilter.map((filter) => (
                      <Button key={filter} onClick={() => handleSelectFilter(filter)} style={getFilterStyle(filter)}>
                        {filter}
                      </Button>
                    ))}
                  </Row>
                  {/* 분위기 필터 */}
                  <Text strong ref={filterRefs['분위기']}>
                    분위기
                  </Text>
                  <Row
                    style={{
                      marginTop: '8px',
                      marginBottom: '32px',
                      gap: '8px',
                      borderBottom: '1px solid #E0E0E0',
                      paddingBottom: '32px',
                    }}
                  >
                    {thirdFilter.map((filter) => (
                      <Button key={filter} onClick={() => handleSelectFilter(filter)} style={getFilterStyle(filter)}>
                        {filter}
                      </Button>
                    ))}
                  </Row>
                  {/* 시설·서비스 필터 */}
                  <Text strong ref={filterRefs['시설·서비스']}>
                    시설·서비스
                  </Text>
                  <Row
                    style={{
                      marginTop: '8px',
                      marginBottom: '32px',
                      gap: '8px',
                      paddingBottom: '30px',
                    }}
                  >
                    {fourthFilter.map((filter) => (
                      <Button key={filter} onClick={() => handleSelectFilter(filter)} style={getFilterStyle(filter)}>
                        {filter}
                      </Button>
                    ))}
                  </Row>
                </Col>
                {/* 세 번째 Col: 취소 및 결과보기 버튼 */}
                <Col style={{ position: 'sticky', bottom: 0 }}>
                  <Row style={{ width: '100%' }}>
                    <Col span={8}>
                      <div
                        style={{
                          width: '100%',
                          backgroundColor: 'white',
                          borderRadius: 0,
                          borderTop: '1px solid #F44E3B',
                          fontWeight: '500',
                          textAlign: 'center',
                          lineHeight: '48px',
                          cursor: 'pointer',
                        }}
                        onClick={() => {
                          toggleFilter();
                          setSelectedFilters([]);
                        }}
                      >
                        취소
                      </div>
                    </Col>
                    <Col span={16}>
                      <div
                        style={{
                          width: '100%',
                          backgroundColor: '#F44E3B',
                          color: '#FFFFFF',
                          borderColor: '#F44E3B',
                          borderRadius: 0,
                          border: '1px solid #F44E3B',
                          textAlign: 'center',
                          lineHeight: '48px',
                          cursor: 'pointer',
                        }}
                        onClick={() => handleFilterResults()}
                      >
                        결과보기({filteredCount}건)
                      </div>
                    </Col>
                  </Row>
                </Col>
              </div>
            </div>
          </div>
          {/* 하단 식당 카드 영역 */}
          <List
            itemLayout="vertical"
            size="large"
            dataSource={places.slice(0, visibleSpotCount)}
            renderItem={(place) => (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, justifyContent: 'center' }}>
                <Card
                  hoverable
                  style={{
                    width: '450px',
                    borderRadius: '8px',
                    border: '1px solid var(--0Gray-300, #D4D4D4)',
                    boxShadow:
                      hoveredPlace === place ? '0px 0px 12px rgba(0, 0, 0, 0.3)' : '0px 0px 4px rgba(0, 0, 0, 0.12)',
                    transform: hoveredPlace === place ? 'scale(1.05)' : 'scale(1)',
                    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                    marginBottom: 24,
                  }}
                  onMouseEnter={() => handleCardMouseEnter(place)}
                  onMouseLeave={handleCardMouseLeave}
                  onClick={() => handleCardClick(place.id)}
                  bordered={false}
                  bodyStyle={{ padding: 12 }}
                >
                  <Row gutter={16} align="middle">
                    {/* 왼쪽 텍스트 및 태그 */}
                    <Col span={16}>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                          <Title
                            level={4}
                            style={{
                              margin: 0,
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              maxWidth: '190px',
                            }}
                          >
                            {place.title}
                          </Title>
                          <Text type="secondary">
                            {getMainsection1(place.main_section_1)}
                            {place.main_section_2 ? ` · ${getMainsection2(place.main_section_2)}` : ''}
                          </Text>
                        </div>
                        <div style={{ marginTop: 8 }}>
                          <Text strong>도보 {place.walking_time}분</Text>
                          <Text style={{ margin: '0 8px' }}>|</Text>
                          <Text>
                            최대 <Text strong>{place.max_group_seats}인</Text>
                          </Text>
                          <Text style={{ margin: '0 8px' }}>|</Text>
                          <Text>
                            평균 <Text strong>{place.price}원</Text>
                          </Text>
                        </div>

                        <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
                          <Tag color="#FAE7E5" style={{ color: 'black' }}>
                            {getTag1(place.tag_1)}
                          </Tag>
                          <Tag color="#E5F3FA" style={{ color: 'black' }}>
                            {getTag2(place.tag_2)}
                          </Tag>
                          <Tag color="#F1E5FA" style={{ color: 'black' }}>
                            {getTag3(place.tag_3)}
                          </Tag>
                        </div>

                        <div style={{ marginTop: 16, display: 'flex', alignItems: 'center' }}>
                          <StarFilled style={{ color: '#DB5744' }} />
                          <Text style={{ marginLeft: 8, fontSize: 16, fontWeight: 'bold' }}>{place.rating || 0}</Text>
                          <Text type="secondary" style={{ marginLeft: 8 }}>
                            리뷰 {place.reviews || 0}
                          </Text>
                        </div>
                      </div>
                    </Col>
                    {/* 오른쪽 이미지 */}
                    <Col span={8}>
                      <Image
                        src={place.img || '/default-image.jpg'}
                        fallback="/default.png"
                        preview={false}
                        bordered={false}
                        style={{
                          width: '130px',
                          height: '130px',
                          objectFit: 'cover',
                          borderRadius: '8px',
                        }}
                        loading="lazy"
                      />
                    </Col>
                  </Row>
                </Card>
              </div>
            )}
          />
          {/* 더보기 버튼 */}
          {visibleSpotCount < places.length && (
            <div
              style={{
                textAlign: 'center',
                marginBottom: 32,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Button
                onClick={handleLoadMore}
                style={{
                  backgroundColor: '#F2F2F2',
                  border: 'none',
                  color: '#444',
                  padding: '10px 16px',
                  borderRadius: '20px',
                  fontSize: '14px',
                  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <span>더보기</span>
                <DownOutlined style={{ fontSize: '12px' }} />
              </Button>
            </div>
          )}
        </div>

        {/* 오른쪽 지도 영역 */}
        <div style={{ width: '67%', height: '100%' }} onClick={handleMapClick}>
          <div
            id="map"
            style={{
              width: '100%',
              height: '100%',
            }}
          ></div>

          {/* deem 배경 */}
          {isFilterVisible && (
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                zIndex: 10,
              }}
              onClick={toggleFilter}
            />
          )}
        </div>
      </Row>

      <Modal
        key={modalKey}
        title=""
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        width="fit-content"
        style={{ maxWidth: '90%' }}
        bodyStyle={{ padding: 0 }}
      >
        <UserLocation visible={isModalVisible} />
      </Modal>
      <LoginAlert visible={isLoginAlertVisible} onClose={handleLoginAlertClose} />
    </Col>
  );
};

export default FilterResultPage;
