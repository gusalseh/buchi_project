// import React, { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import { Button, Card, List, DatePicker, InputNumber, Row, Col, Select, Typography, Image, Tag } from 'antd';
// import { DownOutlined } from '@ant-design/icons';
// import { CalendarOutlined, ClockCircleOutlined, SearchOutlined, StarFilled } from '@ant-design/icons';

// const { Text, Title } = Typography;
// const { Option } = Select;

// const FilterResultPage = () => {
//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const [selectedDate, setSelectedDate] = useState(null); // TODO: 날짜, 시간, 인원의 정보를 한꺼번에 state 관리해주는게 좋아보임
//   const [selectedTime, setSelectedTime] = useState(null);
//   const [selectedAmount, setSelectedAmount] = useState(null);
//   const [isLoading, setIsLoading] = useState(false); // 현재 위치 주소 받기 로딩 상태
//   const [isSelectOpen, setIsSelectOpen] = useState(false); // 시간 선택 filter 열릴지 말지

//   const date = queryParams.get('date');
//   const time = queryParams.get('time');
//   const amount = queryParams.get('amount');
//   const latitude = parseFloat(queryParams.get('lat')) || 37.5665;
//   const longitude = parseFloat(queryParams.get('lng')) || 126.978;
//   const address = queryParams.get('address');

//   const [places, setPlaces] = useState([
//     {
//       title: '역삼농원',
//       main_section_1: '한식',
//       main_section_2: '삼겹살',
//       distance: '5',
//       max_group_seats: '10',
//       rating: 4.2,
//       reviews: 123,
//       price: '17,000',
//       lat: 37.501306,
//       lng: 127.039668,
//     },
//     {
//       title: '역삼농원',
//       main_section_1: '한식',
//       main_section_2: '삼겹살',
//       distance: '5',
//       max_group_seats: '10',
//       rating: 4.2,
//       reviews: 123,
//       price: '17,000',
//       lat: 37.509123,
//       lng: 127.045123,
//     },
//     {
//       title: '역삼농원',
//       main_section_1: '한식',
//       main_section_2: '삼겹살',
//       distance: '5',
//       max_group_seats: '10',
//       rating: 4.2,
//       reviews: 123,
//       price: '17,000',
//       lat: 37.515789,
//       lng: 127.051789,
//     },
//     {
//       title: '역삼농원',
//       main_section_1: '한식',
//       main_section_2: '삼겹살',
//       distance: '5',
//       max_group_seats: '10',
//       rating: 4.2,
//       reviews: 123,
//       price: '17,000',
//       lat: 37.507777,
//       lng: 127.043777,
//     },
//     {
//       title: '역삼농원',
//       main_section_1: '한식',
//       main_section_2: '삼겹살',
//       distance: '5',
//       max_group_seats: '10',
//       rating: 4.2,
//       reviews: 123,
//       price: '17,000',
//       lat: 37.504789,
//       lng: 127.038789,
//     },
//     // 추가 장소 데이터를 여기에 포함
//   ]);

//   useEffect(() => {
//     const map = new window.naver.maps.Map('map', {
//       center: new window.naver.maps.LatLng(latitude, longitude),
//       zoom: 16,
//     });

//     // 작은 파란색 원
//     new window.naver.maps.Marker({
//       position: new window.naver.maps.LatLng(latitude, longitude),
//       map: map,
//       icon: {
//         content: `
//       <div style="
//         width: 15px;
//         height: 15px;
//         background-color: #4285F4;
//         border: 2px solid white;
//         border-radius: 50%;
//         box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
//       "></div>
//     `,
//         anchor: new window.naver.maps.Point(6, 6),
//       },
//     });

//     // 큰 파란색 원 (주변 반경)
//     new window.naver.maps.Circle({
//       map: map,
//       center: new window.naver.maps.LatLng(latitude, longitude),
//       radius: 550,
//       fillColor: '#4285F4',
//       fillOpacity: 0.2,
//       strokeColor: '#4285F4',
//       strokeOpacity: 0.5,
//       strokeWeight: 1,
//     });

//     // 장소마다 마커 추가
//     places.forEach((place) => {
//       new window.naver.maps.Marker({
//         position: new window.naver.maps.LatLng(place.lat, place.lng),
//         map: map,
//         title: place.title,
//       });
//     });
//   }, [latitude, longitude, places]);

//   const handleDateChange = (dateString) => {
//     setSelectedDate(dateString);
//     setIsSelectOpen(true);
//   };

//   const handleTimeChange = (value) => {
//     setSelectedTime(value);
//     setIsSelectOpen(false);
//   };

//   return (
//     <div style={{ width: '100%', backgroundColor: 'white' }}>
//       {/* 필터 영역 */}
//       <div style={{ textAlign: 'center', marginBottom: '24px' }}>
//         <Row style={{ gap: 22, justifyContent: 'center', marginTop: '16px' }}>
//           <Col style={{ minWidth: 300 }}>
//             <div style={{ position: 'relative', display: 'inline-block', width: '300px', margin: '0 auto' }}>
//               <Button
//                 style={{
//                   minWidth: 250,
//                   width: '100%',
//                   textAlign: 'center',
//                   border: 'none',
//                   display: 'flex',
//                   flexDirection: 'row',
//                   fontSize: '20px',
//                   fontStyle: 'normal',
//                   fontWeight: 300,
//                   position: 'relative',
//                 }}
//               >
//                 <span>{address || '장소 선택'}</span>
//                 <DownOutlined style={{ fontSize: '15px', position: 'absolute', right: '10px' }} />
//               </Button>
//               <div
//                 style={{
//                   position: 'absolute',
//                   bottom: '-5px',
//                   left: 0,
//                   width: '100%',
//                   height: '2px',
//                   backgroundColor: '#B22222',
//                 }}
//               ></div>
//             </div>
//           </Col>
//           <Col style={{ minWidth: 240 }}>
//             <DatePicker
//               placeholder="날짜 선택"
//               value={selectedDate}
//               style={{ width: 240, height: 40 }}
//               format="YYYY년 MM월 DD일"
//               suffixIcon={<CalendarOutlined />}
//               onChange={handleDateChange}
//               allowClear={false}
//             />
//           </Col>
//           <Col style={{ minWidth: 240 }}>
//             <Select
//               placeholder="저녁회식"
//               style={{ width: 240, height: 40 }}
//               suffixIcon={<ClockCircleOutlined style={{ fontSize: 15 }} />}
//               onChange={handleTimeChange}
//               value={selectedTime}
//             >
//               <Option value="점심회식">점심회식</Option>
//               <Option value="저녁회식">저녁회식</Option>
//             </Select>
//           </Col>
//           <Col style={{ minWidth: 240 }}>
//             <InputNumber
//               placeholder="3명"
//               style={{
//                 width: 240,
//                 height: 40,
//                 textAlign: 'center',
//                 display: 'flex',
//                 alignItems: 'center',
//               }}
//               min={1}
//               max={100}
//               value={selectedAmount}
//               onChange={setSelectedAmount}
//             />
//           </Col>
//           <Col style={{ minWidth: 40 }}>
//             <Button
//               icon={<SearchOutlined style={{ fontSize: '20px', color: 'rgba(0, 0, 0, 0.65)' }} />}
//               style={{
//                 width: 40,
//                 height: 40,
//                 borderRadius: '6px',
//                 border: '1px solid #d9d9d9',
//                 display: 'flex',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 padding: 0,
//               }}
//               // onClick={handleSearch}
//             />
//           </Col>
//         </Row>
//       </div>
//       {/* 리스트 및 지도 영역 */}
//       <div style={{ display: 'flex', flexDirection: 'row' }}>
//         {/* 왼쪽 리스트 영역 */}
//         <div style={{ width: '33%', paddingRight: '20px', height: 'calc(100vh - 200px)', overflowY: 'auto' }}>
//           <List
//             itemLayout="vertical"
//             size="large"
//             dataSource={places}
//             renderItem={(place) => (
//               <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
//                 <Card
//                   hoverable
//                   cover={
//                     <Image
//                       src={'/default-image.jpg'}
//                       fallback="/default.png"
//                       preview={false}
//                       bordered={false}
//                       style={{ width: 320, height: 320, objectFit: 'cover', borderRadius: 8 }}
//                     />
//                   }
//                   bordered={false}
//                   style={{ width: 360, height: 494, padding: 20, boxShadow: 'none' }}
//                 >
//                   <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
//                     {' '}
//                     {/* 제목과 텍스트 간 간격 조정 */}
//                     <Title level={4} style={{ margin: 0 }}>
//                       {place.title}
//                     </Title>
//                     <Text type="secondary" style={{ marginTop: 5 }}>
//                       {place.main_section_1} · {place.main_section_2}
//                     </Text>
//                   </div>

//                   <div style={{ display: 'flex', flexDirection: 'column' }}>
//                     <div style={{ display: 'flex', marginTop: 8, alignItems: 'center' }}>
//                       {' '}
//                       {/* 텍스트 정렬 맞춤 */}
//                       <Text>도보 {place.distance}분</Text> {/* 텍스트 수정 */}
//                       <Text style={{ margin: '0 8px' }}>|</Text>
//                       <Text>최대 {place.max_group_seats}인</Text>
//                       <Text style={{ margin: '0 8px' }}>|</Text>
//                       <Text>평균 {place.price}원</Text>
//                     </div>

//                     <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
//                       {' '}
//                       {/* 태그 간격 조정 */}
//                       <Tag color="#FAE7E5" style={{ color: 'black' }}>
//                         {'외국인과 함께'}
//                       </Tag>
//                       <Tag color="#E5F3FA" style={{ color: 'black' }}>
//                         {'조용한담소'}
//                       </Tag>
//                       <Tag color="#F1E5FA" style={{ color: 'black' }}>
//                         {'이국적/이색적'}
//                       </Tag>
//                     </div>
//                   </div>

//                   <div style={{ marginTop: 16, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
//                     <StarFilled style={{ color: '#DB5744' }} /> {/* 별 색상 변경 */}
//                     <Text style={{ marginLeft: 8, fontSize: 16, fontWeight: 'bold' }}>{'5.0' || 0}</Text>
//                     <Text type="secondary" style={{ marginLeft: 8 }}>
//                       리뷰 {'120' || 0}
//                     </Text>
//                   </div>
//                 </Card>
//               </div>
//             )}
//           />
//         </div>

//         {/* 오른쪽 지도 영역 */}
//         <div style={{ width: '66%' }}>
//           <div
//             id="map"
//             style={{
//               width: '100%',
//               height: '600px',
//             }}
//           ></div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FilterResultPage;

import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Card, List, DatePicker, InputNumber, Row, Col, Select, Typography, Image, Tag } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { CalendarOutlined, ClockCircleOutlined, SearchOutlined, StarFilled } from '@ant-design/icons';

const { Text, Title } = Typography;
const { Option } = Select;

const FilterResultPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  const date = queryParams.get('date');
  const time = queryParams.get('time');
  const amount = queryParams.get('amount');
  const latitude = parseFloat(queryParams.get('lat')) || 37.5665;
  const longitude = parseFloat(queryParams.get('lng')) || 126.978;
  const address = queryParams.get('address');

  const [places, setPlaces] = useState([
    {
      title: '역삼농원',
      main_section_1: '한식',
      main_section_2: '삼겹살',
      distance: '5',
      max_group_seats: '10',
      rating: 4.2,
      reviews: 123,
      price: '17,000',
      lat: 37.501306,
      lng: 127.039668,
    },
    {
      title: '역삼농원',
      main_section_1: '한식',
      main_section_2: '삼겹살',
      distance: '5',
      max_group_seats: '10',
      rating: 4.2,
      reviews: 123,
      price: '17,000',
      lat: 37.509123,
      lng: 127.045123,
    },
    {
      title: '역삼농원',
      main_section_1: '한식',
      main_section_2: '삼겹살',
      distance: '5',
      max_group_seats: '10',
      rating: 4.2,
      reviews: 123,
      price: '17,000',
      lat: 37.515789,
      lng: 127.051789,
    },
    {
      title: '역삼농원',
      main_section_1: '한식',
      main_section_2: '삼겹살',
      distance: '5',
      max_group_seats: '10',
      rating: 4.2,
      reviews: 123,
      price: '17,000',
      lat: 37.507777,
      lng: 127.043777,
    },
    {
      title: '역삼농원',
      main_section_1: '한식',
      main_section_2: '삼겹살',
      distance: '5',
      max_group_seats: '10',
      rating: 4.2,
      reviews: 123,
      price: '17,000',
      lat: 37.504789,
      lng: 127.038789,
    },
    // 추가 장소 데이터를 여기에 포함
  ]);

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
      radius: 550,
      fillColor: '#CC3C28',
      fillOpacity: 0.05,
      strokeColor: 'transparent',
      strokeOpacity: 0,
      strokeWeight: 0,
    });

    // 장소마다 마커 추가
    places.forEach((place) => {
      new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(place.lat, place.lng),
        map: map,
        title: place.title,
      });
    });
  }, [latitude, longitude, places]);

  const handleDateChange = (dateString) => {
    setSelectedDate(dateString);
    setIsSelectOpen(true);
  };

  const handleTimeChange = (value) => {
    setSelectedTime(value);
    setIsSelectOpen(false);
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
                <span>{address || '장소 선택'}</span>
                <DownOutlined style={{ fontSize: '15px', position: 'absolute', right: '10px' }} />
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
              placeholder="날짜 선택"
              value={selectedDate}
              style={{ width: 240, height: 40 }}
              format="YYYY년 MM월 DD일"
              suffixIcon={<CalendarOutlined />}
              onChange={handleDateChange}
              allowClear={false}
            />
          </Col>
          <Col style={{ minWidth: 240 }}>
            <Select
              placeholder="저녁회식"
              style={{ width: 240, height: 40 }}
              suffixIcon={<ClockCircleOutlined style={{ fontSize: 15 }} />}
              onChange={handleTimeChange}
              value={selectedTime}
            >
              <Option value="점심회식">점심회식</Option>
              <Option value="저녁회식">저녁회식</Option>
            </Select>
          </Col>
          <Col style={{ minWidth: 240 }}>
            <InputNumber
              placeholder="3명"
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
          <List
            itemLayout="vertical"
            size="large"
            dataSource={places}
            renderItem={(place) => (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, justifyContent: 'center' }}>
                <Card
                  hoverable
                  style={{
                    borderRadius: '8px',
                    border: '1px solid var(--0Gray-300, #D4D4D4)',
                    boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.12)',
                    marginBottom: 24,
                  }}
                  bordered={false}
                  bodyStyle={{ padding: 12 }}
                >
                  <Row gutter={16} align="middle">
                    {/* 왼쪽 텍스트 및 태그 */}
                    <Col span={16}>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                          <Title level={4} style={{ margin: 0 }}>
                            {place.title}
                          </Title>
                          <Text type="secondary">
                            {place.main_section_1} · {place.main_section_2}
                          </Text>
                        </div>

                        <div style={{ marginTop: 8 }}>
                          <Text strong>도보 {place.distance}분</Text>
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
                            {'외국인과 함께'}
                          </Tag>
                          <Tag color="#E5F3FA" style={{ color: 'black' }}>
                            {'조용한담소'}
                          </Tag>
                          <Tag color="#F1E5FA" style={{ color: 'black' }}>
                            {'이국적/이색적'}
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
                        src={'/default-image.jpg'}
                        fallback="/default.png"
                        preview={false}
                        bordered={false}
                        style={{
                          width: '100%',
                          height: 'auto',
                          objectFit: 'cover',
                          borderRadius: '8px',
                        }}
                      />
                    </Col>
                  </Row>
                </Card>
              </div>
            )}
          />
        </div>
        {/* 오른쪽 지도 영역 */}
        <div style={{ width: '67%', height: '100%' }}>
          <div
            id="map"
            style={{
              width: '100%',
              height: '100%',
            }}
          ></div>
        </div>
      </Row>
    </Col>
  );
};

export default FilterResultPage;
