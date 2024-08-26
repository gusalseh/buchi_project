// import React, { useState, useEffect } from 'react';
// import { Card, Button, Row, Col, Typography } from 'antd';
// import useUsersWithoutCompany from '../hooks/useUsersWithoutCompany'; // 커스텀 훅을 가져옴

// const { Title, Text } = Typography;

// const TeamSpot = () => {
//   const [companyId, setCompanyId] = useState(null); // 회사 ID 상태 관리

//   useEffect(() => {
//     const fetchCompanyId = async () => {
//       const userData = await fetch('/api/users/no-company');
//       const user = await userData.json();
//       setCompanyId(user.company_id);
//     };

//     fetchCompanyId();
//   }, []);

//   return (
//     <div style={{ padding: '24px' }}>
//       {companyId ? (
//         // 회사 ID가 있을 때 UI
//         <Row gutter={16}>
//           <Col span={12}>
//             <Card title="우리 회사 사원들의 회식 장소" bordered>
//               <Card type="inner" title="역삼동1" extra={<Text>회식장소</Text>}>
//                 <Text>평범한 장소</Text>
//                 <Text>별점 4.2 | 리뷰 123</Text>
//               </Card>
//               <Card type="inner" title="역삼동2" extra={<Text>회식장소</Text>}>
//                 <Text>평범한 장소</Text>
//                 <Text>별점 4.2 | 리뷰 123</Text>
//               </Card>
//               <Card type="inner" title="역삼동3" extra={<Text>회식장소</Text>}>
//                 <Text>평범한 장소</Text>
//                 <Text>별점 4.2 | 리뷰 123</Text>
//               </Card>
//             </Card>
//           </Col>
//           <Col span={12}>
//             <Card title="비슷한 업종 사람들의 회식 장소" bordered>
//               <Card type="inner" title="역삼동1" extra={<Text>회식장소</Text>}>
//                 <Text>평범한 장소</Text>
//                 <Text>별점 4.2 | 리뷰 123</Text>
//               </Card>
//               <Card type="inner" title="역삼동2" extra={<Text>회식장소</Text>}>
//                 <Text>평범한 장소</Text>
//                 <Text>별점 4.2 | 리뷰 123</Text>
//               </Card>
//               <Card type="inner" title="역삼동3" extra={<Text>회식장소</Text>}>
//                 <Text>평범한 장소</Text>
//                 <Text>별점 4.2 | 리뷰 123</Text>
//               </Card>
//             </Card>
//           </Col>
//         </Row>
//       ) : (
//         // 회사 ID가 없을 때 UI
//         <div style={{ textAlign: 'center', padding: '50px 0', backgroundColor: '#fff5f5' }}>
//           <Text>회사 정보를 입력하면 더욱 자세히 맞춤형 정보를 받을 수 있습니다.</Text>
//           <div style={{ marginTop: '20px' }}>
//             <Button type="primary" style={{ backgroundColor: '#B22222', borderColor: '#B22222' }}>
//               내 회사 정보 입력하기
//             </Button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TeamSpot;
