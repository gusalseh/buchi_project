import React, { useState, useEffect } from 'react';
import { Button, Input, Row, Col, Typography, Divider } from 'antd';
import { EnvironmentOutlined } from '@ant-design/icons';
import { Work, Domain } from '@mui/icons-material';

const UserLocation = ({ saveLocation, visible }) => {
  const [isAddressSelected, setIsAddressSelected] = useState(false);
  const [address, setAddress] = useState('');
  const [locationType, setLocationType] = useState(null);
  const [locationName, setLocationName] = useState('');
  const [isIframeVisible, setIsIframeVisible] = useState(false);
  const [registeredLocations, setRegisteredLocations] = useState([]);
  const [addressDetail, setAddressDetail] = useState({ roadAddress: '', jibunAddress: '', buildingName: '' });

  // 모달이 열릴 때마다 상태를 초기화
  useEffect(() => {
    if (visible) {
      setIsAddressSelected(false);
      setLocationType(null);
      setLocationName('');
      setAddress('');
      setAddressDetail({ roadAddress: '', jibunAddress: '', buildingName: '' });
      setIsIframeVisible(false);
    }
  }, [visible]);

  const handleAddressSelect = (data) => {
    setAddress(data.roadAddress || data.address);
    setAddressDetail({
      roadAddress: data.roadAddress,
      jibunAddress: data.jibunAddress,
      buildingName: data.buildingName,
    });
    setIsAddressSelected(true);
    setIsIframeVisible(false);
  };

  const handleTypeChange = (e) => {
    setLocationType(e);
  };

  const handleInputClick = () => {
    if (!isIframeVisible) {
      setIsIframeVisible(true);
    } else {
      setIsIframeVisible(false);
    }
  };

  const handleRegisterLocation = () => {
    const newLocation = {
      roadAddress: addressDetail.roadAddress,
      jibunAddress: addressDetail.jibunAddress,
      buildingName: addressDetail.buildingName,
      locationType,
      locationName,
    };

    // // DB 저장 로직
    // saveLocation(newLocation);

    // 저장된 주소 프론트에서 상태 반영 - 추후 DB 연결
    setRegisteredLocations([...registeredLocations, newLocation]);

    setIsAddressSelected(false);
    setLocationType(null);
    setLocationName('');
    setAddress('');
    setAddressDetail({ roadAddress: '', jibunAddress: '', buildingName: '' });
    setIsIframeVisible(false);
  };

  const handleIframeMessage = (event) => {
    if (event.data && typeof event.data === 'object' && event.data.type === 'address') {
      handleAddressSelect(event.data.address);
    }
  };

  React.useEffect(() => {
    window.addEventListener('message', handleIframeMessage);

    return () => {
      window.removeEventListener('message', handleIframeMessage);
    };
  }, []);

  return (
    <div
      style={{
        width: 558,
        height: 550,
        border: 'none',
        // alignItems: 'center',
        // justifyContent: 'center',
        position: 'relative',
      }}
    >
      <Typography.Title
        level={5}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 20,
          height: 20,
          marginBottom: 20,
        }}
      >
        위치 입력하기
      </Typography.Title>

      <Divider style={{ margin: '8px 0' }} />

      {!isAddressSelected ? (
        <div style={{ textAlign: 'center', width: '100%' }}>
          <Row gutter={8} justify="center" style={{ marginBottom: '12px' }}>
            <Col span={12}>
              <Button onClick={handleInputClick} style={{ cursor: 'pointer', width: '100%' }}>
                주소 검색하기
              </Button>
            </Col>
            <Col span={12}>
              <Button disabled style={{ width: '100%' }}>
                현재 위치로 찾기
              </Button>
            </Col>
          </Row>
          {isIframeVisible && (
            <iframe
              src="/daum-postcode.html"
              title="Daum Postcode"
              style={{ width: '100%', height: '450px', border: 'none' }}
            />
          )}
          {!isIframeVisible && registeredLocations.length === 0 && (
            <div style={{ marginTop: 200, color: '#737373' }}>근무지(출발 위치)를 검색해주세요</div>
          )}
          {registeredLocations.length > 0 && (
            <div style={{ marginTop: 20, width: '100%' }}>
              {registeredLocations.map((location, index) => (
                <div
                  key={index}
                  style={{
                    marginBottom: 10,
                    padding: 10,
                    border: '1px solid #d9d9d9',
                    borderRadius: 4,
                    backgroundColor: '#fafafa',
                  }}
                >
                  <div style={{ fontWeight: 'bold' }}>
                    {location.locationType} {location.locationName && `- ${location.locationName}`}
                  </div>
                  <div>{location.roadAddress}</div>
                  <div>{location.jibunAddress}</div>
                  <div>{location.buildingName}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div style={{ width: '100%' }}>
          <div style={{ marginBottom: '16px', marginTop: '16px' }}>
            <Typography.Text style={{ fontSize: '16px', color: '#333333', fontWeight: 'bold' }}>
              {addressDetail.roadAddress}
              {addressDetail.buildingName && ` (${addressDetail.buildingName})`}
            </Typography.Text>
            <br />
            <Typography.Text style={{ fontSize: '14px', color: '#737373' }}>
              {addressDetail.jibunAddress}
            </Typography.Text>
          </div>

          <Divider style={{ margin: '8px 0' }} />

          <div style={{ display: 'flex', marginBottom: '16px' }}>
            <Button
              type={locationType === 'onsite' ? 'default' : 'default'}
              icon={<Domain />}
              onClick={() => handleTypeChange('onsite')}
              style={{
                borderColor: locationType === 'onsite' ? '#CC3C28' : '#d9d9d9',
                color: locationType === 'onsite' ? '#CC3C28' : 'inherit',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '48px',
                marginRight: '16px',
              }}
            >
              근무지
            </Button>

            <Button
              type={locationType === 'offsite' ? 'default' : 'default'}
              icon={<Work />}
              onClick={() => handleTypeChange('offsite')}
              style={{
                borderColor: locationType === 'offsite' ? '#CC3C28' : '#d9d9d9',
                color: locationType === 'offsite' ? '#CC3C28' : 'inherit',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '48px',
                marginRight: '16px',
              }}
            >
              출장지
            </Button>

            <Button
              type={locationType === 'etc' ? 'default' : 'default'}
              icon={<EnvironmentOutlined />}
              onClick={() => handleTypeChange('etc')}
              style={{
                borderColor: locationType === 'etc' ? '#CC3C28' : '#d9d9d9',
                color: locationType === 'etc' ? '#CC3C28' : 'inherit',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '48px',
              }}
            >
              기타
            </Button>
          </div>

          <Input
            placeholder="해당 장소의 명칭을 입력해주세요"
            value={locationName}
            onChange={(e) => setLocationName(e.target.value)}
            style={{
              borderColor: '#d9d9d9',
              color: '#737373',
            }}
          />

          <Button
            type="primary"
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              backgroundColor: '#CC3C28',
              borderColor: '#CC3C28',
              height: '40px',
            }}
            onClick={handleRegisterLocation}
          >
            등록하기
          </Button>
        </div>
      )}
    </div>
  );
};

export default UserLocation;
