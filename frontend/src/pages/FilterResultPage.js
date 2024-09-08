// import React, { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import { Button, Card, List } from 'antd';

// const FilterResultPage = () => {
//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);

//   const date = queryParams.get('date');
//   const time = queryParams.get('time');
//   const amount = queryParams.get('amount');
//   const latitude = queryParams.get('lat');
//   const longitude = queryParams.get('lng');
//   const address = queryParams.get('address');

//   const [places, setPlaces] = useState([
//     {
//       title: '역삼농원',
//       description: '한식-삼겹살',
//       distance: '도보 5분',
//       rating: 4.2,
//       reviews: 123,
//       price: 30000,
//       lat: 37.501306,
//       lng: 127.039668,
//     },
//     // 추가 장소 데이터를 여기에 포함
//   ]);

//   useEffect(() => {
//     // 네이버 지도 초기화
//     const map = new window.naver.maps.Map('map', {
//       center: new window.naver.maps.LatLng(latitude, longitude),
//       zoom: 15,
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

//   return (
//     <div style={{ display: 'flex', flexDirection: 'row', padding: '20px' }}>
//       {/* 왼쪽 리스트 영역 */}
//       <div style={{ width: '40%', paddingRight: '20px' }}>
//         <List
//           itemLayout="vertical"
//           size="large"
//           dataSource={places}
//           renderItem={(place) => (
//             <Card style={{ marginBottom: '20px' }}>
//               <Card.Meta
//                 title={place.title}
//                 description={
//                   <>
//                     <p>{place.description}</p>
//                     <p>
//                       {place.distance} | 최대 12인 | 평균 {place.price}원
//                     </p>
//                     <p>
//                       ★ {place.rating} 리뷰 {place.reviews}
//                     </p>
//                   </>
//                 }
//               />
//             </Card>
//           )}
//         />
//       </div>

//       {/* 오른쪽 지도 영역 */}
//       <div style={{ width: '60%' }}>
//         <div
//           id="map"
//           style={{
//             width: '100%',
//             height: '600px',
//           }}
//         ></div>
//       </div>
//     </div>
//   );
// };

// export default FilterResultPage;

import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Card, List } from 'antd';

const FilterResultPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const date = queryParams.get('date');
  const time = queryParams.get('time');
  const amount = queryParams.get('amount');
  const latitude = parseFloat(queryParams.get('lat')) || 37.5665; // 기본값으로 서울 좌표
  const longitude = parseFloat(queryParams.get('lng')) || 126.978; // 기본값으로 서울 좌표
  const address = queryParams.get('address');

  const [places, setPlaces] = useState([
    {
      title: '역삼농원',
      description: '한식-삼겹살',
      distance: '도보 5분',
      rating: 4.2,
      reviews: 123,
      price: 30000,
      lat: 37.501306,
      lng: 127.039668,
    },
    // 추가 장소 데이터를 여기에 포함
  ]);

  useEffect(() => {
    const map = new window.naver.maps.Map('map', {
      center: new window.naver.maps.LatLng(latitude, longitude),
      zoom: 16,
    });

    // 작은 파란색 원 (구글맵의 현재 위치처럼 고정된 크기)
    new window.naver.maps.Marker({
      position: new window.naver.maps.LatLng(latitude, longitude),
      map: map,
      icon: {
        content: `
      <div style="
        width: 15px;
        height: 15px;
        background-color: #4285F4;
        border: 2px solid white;
        border-radius: 50%;
        box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
      "></div>
    `,
        anchor: new window.naver.maps.Point(6, 6), // 중심점을 마커의 가운데로 설정
      },
    });

    // 큰 파란색 원 (주변 반경)
    new window.naver.maps.Circle({
      map: map,
      center: new window.naver.maps.LatLng(latitude, longitude),
      radius: 550, // 큰 원의 반경
      fillColor: '#4285F4', // 파란색
      fillOpacity: 0.2, // 투명도 적용
      strokeColor: '#4285F4', // 테두리 색상
      strokeOpacity: 0.5, // 테두리의 투명도
      strokeWeight: 1, // 테두리 두께
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

  return (
    <div style={{ display: 'flex', flexDirection: 'row', padding: '20px' }}>
      {/* 왼쪽 리스트 영역 */}
      <div style={{ width: '40%', paddingRight: '20px' }}>
        <List
          itemLayout="vertical"
          size="large"
          dataSource={places}
          renderItem={(place) => (
            <Card style={{ marginBottom: '20px' }}>
              <Card.Meta
                title={place.title}
                description={
                  <>
                    <p>{place.description}</p>
                    <p>
                      {place.distance} | 최대 12인 | 평균 {place.price}원
                    </p>
                    <p>
                      ★ {place.rating} 리뷰 {place.reviews}
                    </p>
                  </>
                }
              />
            </Card>
          )}
        />
      </div>

      {/* 오른쪽 지도 영역 */}
      <div style={{ width: '60%' }}>
        <div
          id="map"
          style={{
            width: '100%',
            height: '600px',
          }}
        ></div>
      </div>
    </div>
  );
};

export default FilterResultPage;
