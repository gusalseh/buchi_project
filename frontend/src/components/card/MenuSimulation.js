import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Col, Collapse, Row, Typography, Divider, Button, message } from 'antd';
import { MinusOutlined, PlusOutlined, CloseOutlined } from '@ant-design/icons';
import LoginAlert from '../alert/LoginAlert';

const { Panel } = Collapse;
const { Text } = Typography;

const MenuSimulation = (menus) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [showLoginAlert, setShowLoginAlert] = useState(false);
  const [activeKey, setActiveKey] = useState('key');

  const user = useSelector((state) => state.user.user);

  const handleMenuSelect = (menu) => {
    const existingItem = selectedItems.find((item) => item.menu_id === menu.menu_id);
    if (!existingItem) {
      setSelectedItems([...selectedItems, { ...menu, quantity: 1 }]);
    }
  };

  const handleQuantityChange = (id, value) => {
    setSelectedItems(selectedItems.map((item) => (item.menu_id === id ? { ...item, quantity: value } : item)));
  };

  const handleRemove = (id) => {
    setSelectedItems(selectedItems.filter((item) => item.menu_id !== id));
  };

  const totalPrice = selectedItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const mainDishes = menus.menu.filter((menu) => menu.menu_type === 'maindish');
  const sideDishes = menus.menu.filter((menu) => menu.menu_type === 'sidedish');
  const liquors = menus.menu.filter((menu) => menu.menu_type === 'liquar');
  const beverages = menus.menu.filter((menu) => menu.menu_type === 'beverage');

  const handleActionClick = () => {
    if (!user) {
      setShowLoginAlert(true);
    } else {
      message.success('추후 개발 예정입니다.');
    }
  };

  return (
    <div
      style={{
        borderRadius: 8,
        border: '1px solid var(--0Gray-200, #E5E5E5)',
        padding: '15px',
        maxWidth: '600px',
        width: 520,
        margin: '0 auto',
        zIndex: 4,
      }}
    >
      <Text style={{ fontSize: 24, fontStyle: 'normal', fontWeight: 600 }}>메뉴</Text>
      <Collapse
        accordion
        activeKey={activeKey}
        onChange={(key) => setActiveKey(key)}
        style={{ marginTop: 10, backgroundColor: 'white', marginBottom: 8 }}
      >
        <Panel header="메인" key="1">
          {mainDishes.map((menu) => (
            <div
              key={menu.menu_id}
              onClick={() => handleMenuSelect(menu)}
              style={{ cursor: 'pointer', marginBottom: '10px' }}
            >
              <Row justify="space-between">
                <span style={{ fontWeight: 'bold' }}>{menu.menu_name}</span>
                <span style={{ marginLeft: '10px', fontWeight: 'bold' }}>{menu.price.toLocaleString()} 원</span>
              </Row>
            </div>
          ))}
        </Panel>
      </Collapse>

      <Collapse
        accordion
        activeKey={activeKey}
        onChange={(key) => setActiveKey(key)}
        style={{ backgroundColor: 'white', marginBottom: 8 }}
      >
        <Panel header="사이드" key="2">
          {sideDishes.map((menu) => (
            <div
              key={menu.menu_id}
              onClick={() => handleMenuSelect(menu)}
              style={{ cursor: 'pointer', marginBottom: '10px' }}
            >
              <Row justify="space-between">
                <span style={{ fontWeight: 'bold' }}>{menu.menu_name}</span>
                <span style={{ marginLeft: '10px', fontWeight: 'bold' }}>{menu.price.toLocaleString()} 원</span>
              </Row>
            </div>
          ))}
        </Panel>
      </Collapse>

      <Collapse
        accordion
        activeKey={activeKey}
        onChange={(key) => setActiveKey(key)}
        style={{ backgroundColor: 'white', marginBottom: 8 }}
      >
        <Panel header="주류" key="3">
          {liquors.map((menu) => (
            <div
              key={menu.menu_id}
              onClick={() => handleMenuSelect(menu)}
              style={{ cursor: 'pointer', marginBottom: '10px' }}
            >
              <Row justify="space-between">
                <span style={{ fontWeight: 'bold' }}>{menu.menu_name}</span>
                <span style={{ marginLeft: '10px', fontWeight: 'bold' }}>{menu.price.toLocaleString()} 원</span>
              </Row>
            </div>
          ))}
        </Panel>
      </Collapse>

      <Collapse
        accordion
        activeKey={activeKey}
        onChange={(key) => setActiveKey(key)}
        style={{ backgroundColor: 'white' }}
      >
        <Panel header="음료" key="4">
          {beverages.map((menu) => (
            <div
              key={menu.menu_id}
              onClick={() => handleMenuSelect(menu)}
              style={{ cursor: 'pointer', marginBottom: '10px' }}
            >
              <Row justify="space-between">
                <span style={{ fontWeight: 'bold' }}>{menu.menu_name}</span>
                <span style={{ marginLeft: '10px', fontWeight: 'bold' }}>{menu.price.toLocaleString()} 원</span>
              </Row>
            </div>
          ))}
        </Panel>
      </Collapse>

      <Divider />

      {selectedItems.length >= 0 && (
        <div>
          <Text strong style={{ marginLeft: 5 }}>
            선택된 메뉴
          </Text>
          {selectedItems.map((item) => (
            <Row
              key={item.menu_id}
              gutter={[8, 8]}
              style={{ marginLeft: 15, width: '30rem', marginBottom: '10px' }}
              align="middle"
            >
              <Col span={8}>
                <Text>{item.menu_name}</Text>
              </Col>
              <Col span={8}>
                <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ccc', width: 'fit-content' }}>
                  <Button
                    icon={<MinusOutlined />}
                    onClick={() => handleQuantityChange(item.menu_id, Math.max(1, item.quantity - 1))}
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
                    onClick={() => handleQuantityChange(item.menu_id, Math.min(20, item.quantity + 1))}
                    style={{
                      border: 'none',
                      width: '32px',
                      height: '32px',
                      borderLeft: '1px solid #ccc',
                      borderRadius: '0px',
                      boxShadow: 'none',
                    }}
                  />
                </div>
              </Col>
              <Col span={6} style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                <Text strong>{(item.price * item.quantity).toLocaleString()} 원</Text>
              </Col>
              <Col
                span={2}
                style={{
                  whiteSpace: 'nowrap',
                  textAlign: 'right',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Button
                  type="link"
                  onClick={() => handleRemove(item.menu_id)}
                  style={{
                    color: 'black',
                    padding: 0,
                  }}
                >
                  <CloseOutlined />
                </Button>
              </Col>
            </Row>
          ))}

          <Divider
            style={{
              borderColor: 'black',
              borderWidth: '1px',
            }}
          />

          <Row justify="space-between" style={{ marginBottom: '16px' }}>
            <Text strong style={{ marginLeft: 5 }}>
              총 주문 금액
            </Text>
            <Text strong style={{ fontSize: '16px', fontWeight: 'bold', color: '#DB5744', whiteSpace: 'nowrap' }}>
              {totalPrice.toLocaleString()} 원
            </Text>
          </Row>

          <Row>
            <Col span={12}>
              <Button
                block
                onClick={handleActionClick}
                style={{
                  marginLeft: 20,
                  width: 160,
                  height: '40px',
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
                onClick={handleActionClick}
                style={{
                  marginLeft: -50,
                  width: 300,
                  height: '40px',
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

      {showLoginAlert && <LoginAlert visible={showLoginAlert} onClose={() => setShowLoginAlert(false)} />}
    </div>
  );
};

export default MenuSimulation;
