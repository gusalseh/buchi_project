import { useState } from 'react';
import { Button } from 'antd';
import SpotCard from './SpotCard';

const Tag = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalCards = 10;

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
        display: 'flex',
        flexDirection: 'column',
        height: 570,
        gap: 20,
        backgroundColor: 'white',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ color: 'black', height: 32, fontSize: 32 }}>#짜글이</div>
      <div
        style={{
          height: 570,
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
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
            width: 'calc(100% - 40px)',
          }}
        >
          {Array.from({ length: totalCards }).map((_, index) => (
            <div
              key={index}
              style={{
                minWidth: 340,
                flexShrink: 0,
              }}
            >
              <SpotCard />
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

export default Tag;
