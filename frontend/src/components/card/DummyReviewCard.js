import { Row, Col, Card, Typography, Rate, Button, Divider } from 'antd';

const { Text } = Typography;

const DummyReviewCard = () => {
  return (
    <div style={{ height: 200, padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* 오버레이 레이어 */}
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: 200,
          backgroundColor: 'rgba(255, 255, 255, 0.85)', // 반투명한 흰색 오버레이
          zIndex: 2, // 카드 위에 표시되도록 z-index를 높임
          textAlign: 'center',
          left: 0,
          fontSize: 25,
        }}
      >
        방문자 리뷰는 준비 중 입니다.
      </div>
    </div>
  );
};

export default DummyReviewCard;
