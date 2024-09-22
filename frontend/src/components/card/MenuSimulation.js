import React, { useState } from 'react';
import { Collapse, Row, Col, Typography, Divider, Button } from 'antd';
import { MinusOutlined, PlusOutlined, CloseOutlined } from '@ant-design/icons';

const { Panel } = Collapse;
const { Text } = Typography;

const initialMenus = [
  { id: 1, name: '모둠한판(500g)', price: 45000, recommended: true },
  { id: 2, name: '한돈 생삼겹살(160g)', price: 15000 },
];

const MenuSimulation = () => {
  const [selectedItems, setSelectedItems] = useState([]);

  const handleMenuSelect = (menu) => {
    const existingItem = selectedItems.find((item) => item.id === menu.id);
    if (!existingItem) {
      setSelectedItems([...selectedItems, { ...menu, quantity: 1 }]);
    }
  };

  const handleQuantityChange = (id, value) => {
    setSelectedItems(selectedItems.map((item) => (item.id === id ? { ...item, quantity: value } : item)));
  };

  const handleRemove = (id) => {
    setSelectedItems(selectedItems.filter((item) => item.id !== id));
  };

  const totalPrice = selectedItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <Collapse style={{ backgroundColor: 'white', marginBottom: 8 }}>
        <Panel header="메인">
          {initialMenus.map((menu) => (
            <div
              key={menu.id}
              onClick={() => handleMenuSelect(menu)}
              style={{ cursor: 'pointer', marginBottom: '10px' }}
            >
              <Row>
                {menu.recommended && <span style={{ color: '#DB5744', fontWeight: 'bold', marginRight: 8 }}>추천</span>}
                <span style={{ fontWeight: 'bold' }}>{menu.name}</span>
                <span style={{ marginLeft: '10px', fontWeight: 'bold' }}>{menu.price.toLocaleString()} 원</span>
              </Row>
            </div>
          ))}
        </Panel>
      </Collapse>
      <Collapse style={{ backgroundColor: 'white', marginBottom: 8 }}>
        <Panel header="사이드">
          {initialMenus.map((menu) => (
            <div
              key={menu.id}
              onClick={() => handleMenuSelect(menu)}
              style={{ cursor: 'pointer', marginBottom: '10px' }}
            >
              <Row>
                {menu.recommended && <span style={{ color: '#DB5744', fontWeight: 'bold', marginRight: 8 }}>추천</span>}
                <span style={{ fontWeight: 'bold' }}>{menu.name}</span>
                <span style={{ marginLeft: '10px', fontWeight: 'bold' }}>{menu.price.toLocaleString()} 원</span>
              </Row>
            </div>
          ))}
        </Panel>
      </Collapse>
      <Collapse style={{ backgroundColor: 'white' }}>
        <Panel header="음료/주류">
          {initialMenus.map((menu) => (
            <div
              key={menu.id}
              onClick={() => handleMenuSelect(menu)}
              style={{ cursor: 'pointer', marginBottom: '10px' }}
            >
              <Row>
                {menu.recommended && <span style={{ color: '#DB5744', fontWeight: 'bold', marginRight: 8 }}>추천</span>}
                <span style={{ fontWeight: 'bold' }}>{menu.name}</span>
                <span style={{ marginLeft: '10px', fontWeight: 'bold' }}>{menu.price.toLocaleString()} 원</span>
              </Row>
            </div>
          ))}
        </Panel>
      </Collapse>

      <Divider />

      {selectedItems.length > 0 && (
        <div>
          <Text strong>선택된 메뉴</Text>
          {selectedItems.map((item) => (
            <Row key={item.id} style={{ marginBottom: '10px' }} align="middle">
              <Col span={10}>
                <Text>{item.name}</Text>
              </Col>
              <Col span={8}>
                <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ccc', width: 'fit-content' }}>
                  <Button
                    icon={<MinusOutlined />}
                    onClick={() => handleQuantityChange(item.id, Math.max(1, item.quantity - 1))}
                    style={{
                      border: 'none',
                      width: '32px',
                      height: '32px',
                      borderRight: '1px solid #ccc',
                      borderRadius: '0px',
                    }}
                  />
                  <div style={{ width: '32px', textAlign: 'center', lineHeight: '32px' }}>
                    <Text>{item.quantity}</Text>
                  </div>
                  <Button
                    icon={<PlusOutlined />}
                    onClick={() => handleQuantityChange(item.id, Math.min(20, item.quantity + 1))}
                    style={{
                      border: 'none',
                      width: '32px',
                      height: '32px',
                      borderLeft: '1px solid #ccc',
                      borderRadius: '0px',
                      boxShadow: 'none', // 중복된 경계선 문제 해결
                    }}
                  />
                </div>
              </Col>
              <Col span={6} style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                {' '}
                {/* 금액이 줄바꿈되지 않도록 설정 */}
                <Text strong>{(item.price * item.quantity).toLocaleString()} 원</Text>
              </Col>
              <Col
                span={2}
                style={{ textAlign: 'right', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <Button
                  type="link"
                  onClick={() => handleRemove(item.id)}
                  style={{
                    color: 'black', // X 버튼 색상 검은색으로 설정
                    padding: 0,
                  }}
                >
                  <CloseOutlined />
                </Button>
              </Col>
            </Row>
          ))}

          <Divider />

          <Row justify="space-between" style={{ marginBottom: '16px' }}>
            <Text strong>총 주문 금액</Text>
            <Text strong style={{ fontSize: '16px', fontWeight: 'bold', color: '#DB5744', whiteSpace: 'nowrap' }}>
              {totalPrice.toLocaleString()} 원
            </Text>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Button
                block
                style={{
                  height: '48px',
                  borderColor: '#DB5744',
                  color: '#DB5744',
                  fontWeight: 'bold',
                  backgroundColor: 'white',
                }}
              >
                식당담기
              </Button>
            </Col>
            <Col span={12}>
              <Button
                block
                type="primary"
                style={{
                  height: '48px',
                  backgroundColor: '#DB5744',
                  borderColor: '#DB5744',
                  fontWeight: 'bold',
                }}
              >
                바로 예약하기
              </Button>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
};

export default MenuSimulation;
