import React from 'react';
import { DownOutlined } from '@ant-design/icons';

const Filter = () => {
  return (
    <div
      style={{
        width: '100%',
        height: 235,
        padding: '40px 0px',
        backgroundColor: 'green',
      }}
    >
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: 67,
          backgroundColor: 'red',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '400px',
            height: 67,
            backgroundColor: 'blue',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              paddingTop: 0,
              width: 400,
              height: 40,
              backgroundColor: 'purple',
            }}
          >
            <p style={{ width: 400, fontSize: 32, height: 40, textAlign: 'center' }}>역삼역</p>
            <button style={{ width: 24, height: 24 }}>
              <DownOutlined style={{ width: 24, height: 24 }} />
            </button>
          </div>
          <div
            style={{
              fontSize: 15,
              width: '400px',
              height: 15,
              backgroundColor: 'yellow',
              textAlign: 'center',
            }}
          >
            근처 추천 회식 장소입니다.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
