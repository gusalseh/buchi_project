import React, { useState, useEffect } from 'react';
import { Button, Input, Row, Col, Typography, Divider, Dropdown, Menu } from 'antd';
import { EnvironmentOutlined, MoreOutlined } from '@ant-design/icons';
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

  const handleDeleteLocation = (index) => {
    setRegisteredLocations(registeredLocations.filter((_, i) => i !== index));
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

  const getLocationIcon = (type) => {
    switch (type) {
      case '근무지':
        return <Domain />;
      case '출장지':
        return <Work />;
      case '기타':
      default:
        return <EnvironmentOutlined />;
    }
  };

  const menu = (index) => (
    <Menu>
      <Menu.Item key="1" onClick={() => handleDeleteLocation(index)}>
        삭제하기
      </Menu.Item>
    </Menu>
  );

  return (
    <div
      style={{
        width: 558,
        // height: 550,
        height: 600,
        border: 'none',
        // alignItems: 'center',
        // justifyContent: 'center',
        position: 'relative',
        overflowY: 'auto',
        overflowX: 'hidden',
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

      <Divider style={{ marginTop: '8px', marginBottom: '16px' }} />

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
          {/* 등록된 주소지가 유무에 따른 UI 구분 */}
          {!isIframeVisible &&
            (registeredLocations.length === 0 ? (
              <div style={{ marginTop: 200, color: '#737373' }}>근무지(출발 위치)를 검색해주세요</div>
            ) : (
              <div style={{ marginTop: 20, width: '100%', overflow: 'hidden' }}>
                {registeredLocations.map((location, index) => (
                  <div
                    key={index}
                    style={{
                      marginBottom: 10,
                      paddingTop: 10,
                      paddingRight: 10,
                      paddingBottom: 10,
                      paddingLeft: 15,
                      border: '1px solid var(--0Gray-200, #E5E5E5)',
                      borderRadius: 8,
                      display: 'flex',
                      justifyContent: 'space-between',
                      // alignItems: 'center',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      {React.cloneElement(getLocationIcon(location.locationType), {
                        style: { fontSize: 36, marginRight: 20, color: '#A3A3A3' },
                      })}
                      <div style={{ textAlign: 'start' }}>
                        <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>{location.locationType}</div>
                        <div>{location.locationName}</div>
                        <div style={{ color: '#737373' }}>{location.roadAddress}</div>
                      </div>
                    </div>
                    <Dropdown overlay={menu(index)} trigger={['click']} placement="bottomRight">
                      <Button type="text" icon={<MoreOutlined />} />
                    </Dropdown>
                  </div>
                ))}
              </div>
            ))}
        </div>
      ) : (
        <div style={{ width: '100%' }}>
          <div style={{ marginBottom: '16px' }}>
            <Typography.Text style={{ fontSize: '16px', color: '#333333', fontWeight: 'bold' }}>
              {addressDetail.roadAddress}
              {addressDetail.buildingName && ` (${addressDetail.buildingName})`}
            </Typography.Text>
            <br />
            <Typography.Text style={{ fontSize: '14px', color: '#737373' }}>
              {addressDetail.jibunAddress}
            </Typography.Text>
          </div>

          <Divider style={{ marginTop: '8px', marginBottom: '16px' }} />

          <div style={{ display: 'flex', marginBottom: '16px' }}>
            <Button
              type={locationType === '근무지' ? 'default' : 'default'}
              icon={React.cloneElement(<Domain />, { style: { fontSize: 15 } })}
              onClick={() => handleTypeChange('근무지')}
              style={{
                borderColor: locationType === '근무지' ? '#CC3C28' : '#d9d9d9',
                color: locationType === '근무지' ? '#CC3C28' : 'inherit',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '48px',
                marginRight: '16px',
                borderRadius: 8,
              }}
            >
              근무지
            </Button>

            <Button
              type={locationType === '출장지' ? 'default' : 'default'}
              icon={React.cloneElement(<Work />, { style: { fontSize: 15 } })}
              onClick={() => handleTypeChange('출장지')}
              style={{
                borderColor: locationType === '출장지' ? '#CC3C28' : '#d9d9d9',
                color: locationType === '출장지' ? '#CC3C28' : 'inherit',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '48px',
                marginRight: '16px',
                borderRadius: 8,
              }}
            >
              출장지
            </Button>

            <Button
              type={locationType === '기타' ? 'default' : 'default'}
              icon={React.cloneElement(<EnvironmentOutlined />, { style: { fontSize: 15 } })}
              onClick={() => handleTypeChange('기타')}
              style={{
                borderColor: locationType === '기타' ? '#CC3C28' : '#d9d9d9',
                color: locationType === '기타' ? '#CC3C28' : 'inherit',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '48px',
                borderRadius: 8,
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
