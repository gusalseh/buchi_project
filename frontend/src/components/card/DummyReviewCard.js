const DummyReviewCard = () => {
  return (
    <div style={{ height: 200, padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: 200,
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
          zIndex: 2,
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
