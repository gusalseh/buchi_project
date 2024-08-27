import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Button, Input, Row, Col, Typography, Divider, Dropdown, Menu, Spin } from 'antd';
import { EnvironmentOutlined, MoreOutlined } from '@ant-design/icons';
import { Work, Domain } from '@mui/icons-material';
import { createLocation, updateLocation, fetchUserLocations } from '../../features/userLocation';

const UserLocation = ({ saveLocation, visible }) => {
  const user = useSelector((state) => state.user.user);
  const [isAddressSelected, setIsAddressSelected] = useState(false);
  const [address, setAddress] = useState('');
  const [locationType, setLocationType] = useState(null); // 등록할 주소 타입
  const [locationName, setLocationName] = useState(''); // 등록할 주소 이름
  const [isIframeVisible, setIsIframeVisible] = useState(false);
  const [registeredLocations, setRegisteredLocations] = useState([]); // 백엔드에서 받은 주소목록
  const [addressDetail, setAddressDetail] = useState({ roadAddress: '', jibunAddress: '', buildingName: '' }); // 등록할 주소 정보
  const [loading, setLoading] = useState(false);

  // 모달이 열릴 때마다 상태를 초기화
  useEffect(() => {
    if (visible) {
      setIsAddressSelected(false);
      setLocationType(null);
      setLocationName('');
      setAddress('');
      setAddressDetail({ roadAddress: '', jibunAddress: '', buildingName: '' });
      setIsIframeVisible(false);
      setLoading(false);
      // 모달 진입시 유저 등록주소 받아오기
      const fetchData = async () => {
        try {
          const fetchLocations = await fetchUserLocations(user.user_id);
          setRegisteredLocations(fetchLocations);
        } catch (error) {
          console.error('Error fetching user locations:', error);
        }
      };
      fetchData();
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
    setLoading(false);
  };

  const handleTypeChange = (e) => {
    setLocationType(e);
  };

  const handleInputClick = () => {
    if (!isIframeVisible) {
      setIsIframeVisible(true);
      setLoading(true);
    } else {
      setIsIframeVisible(false);
      setLoading(false);
    }
  };

  const handleIframeLoad = () => {
    setLoading(false);
  };

  const handleRegisterLocation = async () => {
    try {
      // 새로운 주소지 등록 요청 - 백엔드로
      await createLocation({
        user_id: user.user_id,
        location_type: locationType,
        location_name: locationName || null,
        location_road_address: addressDetail.roadAddress,
        location_jibun_address: addressDetail.jibunAddress || null,
        location_building_name: addressDetail.buildingName || null,
      });

      // 주소를 등록한 후, 해당 유저의 주소 리스트를 다시 가져와 상태 업데이트
      // 사실 등록한 직후에는 useState에서 관리하는 주소목록으로 핸들링하는게 서버 부담 적을듯
      const fetchLocations = await fetchUserLocations(user.user_id);
      setRegisteredLocations(fetchLocations);

      setIsAddressSelected(false);
      setLocationType(null);
      setLocationName('');
      setAddress('');
      setAddressDetail({ roadAddress: '', jibunAddress: '', buildingName: '' });
      setIsIframeVisible(false);
      setLoading(false);
    } catch (error) {
      console.log('handleRegisterLocation Failed');
    }
  };

  const handleSelectLocation = async (locationId) => {
    try {
      const updateSelectedLocation = await updateSelectedLocation(locationId, { selected: true, user_id: user.id });
      // Update the locations state to reflect the change
      setRegisteredLocations((prevLocations) =>
        prevLocations.map((loc) => (loc.location_id === locationId ? updateSelectedLocation : loc))
      );
    } catch (error) {
      console.log('handleSelectLocation Failed');
    }
  };

  const handleDeleteLocation = (index) => {
    // const sortedLocations = getSortedLocations();
    // const locationToDelete = sortedLocations[index];
    // 원래의 registeredLocations에서 해당 location을 찾아 삭제
    // 요건 바로 삭제 요청을 백엔드로 보내야함 !! 수정요망
    // setRegisteredLocations(registeredLocations.filter((location) => location !== locationToDelete));
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
      case 'onsite':
        return <Domain />;
      case 'offsite':
        return <Work />;
      case 'etc':
      default:
        return <EnvironmentOutlined />;
    }
  };

  // const getSortedLocations = () => {
  //   const priority = {
  //     근무지: 1,
  //     출장지: 2,
  //     기타: 3,
  //   };

  //   return [...registeredLocations].sort((a, b) => priority[a.locationType] - priority[b.locationType]);
  // };

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
              <Button
                onClick={handleInputClick}
                style={{
                  cursor: 'pointer',
                  width: '100%',
                  backgroundColor: isIframeVisible ? '#CC3C28' : '',
                  color: isIframeVisible ? '#fff' : '',
                  height: '40px',
                }}
              >
                주소 검색하기
              </Button>
            </Col>
            <Col span={12}>
              <Button disabled style={{ width: '100%', height: '40px' }}>
                현재 위치로 찾기
              </Button>
            </Col>
          </Row>
          {isIframeVisible && (
            <Spin spinning={loading} tip="주소 검색 로딩 중...">
              <iframe
                src="/daum-postcode.html"
                title="Daum Postcode"
                style={{ width: '100%', height: '450px', border: 'none', marginLeft: '20px' }}
                onLoad={handleIframeLoad}
              />
            </Spin>
          )}
          {/* 등록된 주소지가 유무에 따른 UI 구분 */}
          {!isIframeVisible &&
            (registeredLocations.length === 0 ? (
              <div style={{ marginTop: 200, color: '#737373' }}>근무지(출발 위치)를 검색해주세요</div>
            ) : (
              <div style={{ marginTop: 20, width: '100%', overflow: 'hidden' }}>
                {registeredLocations.map((location, index) => (
                  <div
                    key={location.location_id}
                    style={{
                      marginBottom: 10,
                      paddingTop: 10,
                      paddingRight: 10,
                      paddingBottom: 10,
                      paddingLeft: 15,
                      border: `1px solid ${
                        location.selected ? 'var(--0Gray-700, #404040)' : 'var(--0Gray-200, #E5E5E5)'
                      }`,
                      borderRadius: 8,
                      display: 'flex',
                      justifyContent: 'space-between',
                      position: 'relative',
                      // alignItems: 'center',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      {React.cloneElement(getLocationIcon(location.location_type), {
                        style: { fontSize: 36, marginRight: 20, color: '#A3A3A3' },
                      })}
                      <div style={{ textAlign: 'start' }}>
                        <div style={{ fontWeight: 'bold', marginBottom: '5px', display: 'flex', alignItems: 'center' }}>
                          {location.location_type === 'onsite' && '근무지'}
                          {location.location_type === 'offsite' && '출장지'}
                          {location.selected && (
                            <div
                              style={{
                                borderRadius: '4px',
                                border: '1px solid var(--0Primary-100, #F2CCC7)',
                                color: 'var(--0Primary-500, #CC3C28)',
                                backgroundColor: 'var(--0Primary-50, #FDF5F4)',
                                padding: '1px 8px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                                marginLeft: '8px',
                                height: '20px',
                                fontSize: '12px',
                                fontFamily: 'Inter',
                                fontWeight: '500',
                              }}
                            >
                              현재 설정된 위치
                            </div>
                          )}
                        </div>

                        <div>{location.location_name}</div>
                        <div style={{ color: '#737373' }}>{location.location_road_address}</div>
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
              icon={React.cloneElement(<Domain />, {
                style: { fontSize: 15, color: locationType === '근무지' ? '#CC3C28' : '#A3A3A3' },
              })}
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
              icon={React.cloneElement(<Work />, {
                style: { fontSize: 15, color: locationType === '출장지' ? '#CC3C28' : '#A3A3A3' },
              })}
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
              icon={React.cloneElement(<EnvironmentOutlined />, {
                style: { fontSize: 15, color: locationType === '기타' ? '#CC3C28' : '#A3A3A3' },
              })}
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
              height: '40px',
              borderRadius: 8,
            }}
          />

          <Button
            type="primary"
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              backgroundColor: locationType ? '#CC3C28' : '#A3A3A3',
              borderColor: locationType ? '#CC3C28' : '#A3A3A3',
              height: '40px',
            }}
            onClick={handleRegisterLocation}
            disabled={!locationType}
          >
            등록하기
          </Button>
        </div>
      )}
    </div>
  );
};

export default UserLocation;
