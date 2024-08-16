import React, { useState } from 'react';
import { Checkbox, Button, Collapse, Typography } from 'antd';
import { RightOutlined } from '@ant-design/icons';

const { Panel } = Collapse;

const AgreementPage = () => {
  const [checkedList, setCheckedList] = useState([]);
  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(false);

  const agreements = [
    {
      label: '(필수) 개인정보 처리 방침에 동의',
      value: 'privacy',
      required: true,
      content: '개인정보 처리 방침의 상세 내용...',
    },
    {
      label: '(필수) 개인정보 수집 및 이용에 동의',
      value: 'collection',
      required: true,
      content: '개인정보 수집 및 이용에 대한 상세 내용...',
    },
    {
      label: '(필수) 개인정보 제3자 제공 동의',
      value: 'thirdParty',
      required: true,
      content: '개인정보 제3자 제공에 대한 상세 내용...',
    },
    {
      label: '(필수) 위치기반 서비스 이용약관 동의',
      value: 'location',
      required: true,
      content: '위치기반 서비스 이용약관의 상세 내용...',
    },
    {
      label: '(선택) 이벤트 혜택 및 광고성 정보 수신 동의',
      value: 'marketing',
      required: false,
      content: '이벤트 혜택 및 광고성 정보 수신 동의에 대한 상세 내용...',
    },
  ];

  const requiredItems = agreements.filter((item) => item.required).map((item) => item.value);

  const handleCheckAll = (e) => {
    setCheckedList(e.target.checked ? agreements.map((item) => item.value) : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };

  const handleCheck = (value) => {
    const newList = checkedList.includes(value)
      ? checkedList.filter((item) => item !== value)
      : [...checkedList, value];
    setCheckedList(newList);
    setIndeterminate(!!newList.length && newList.length < agreements.length);
    setCheckAll(newList.length === agreements.length);
  };

  const allRequiredChecked = requiredItems.every((item) => checkedList.includes(item));

  return (
    <div
      style={{
        backgroundColor: '#f0f2f5',
        minHeight: '100vh',
        padding: '50px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{ maxWidth: 600, border: 'solid', padding: '50px', backgroundColor: 'white' }}>
        <Typography.Title level={5} style={{ color: 'gray', textAlign: 'center' }}>
          즐거운 회식을 위한 장소찾기
        </Typography.Title>
        <Typography.Title
          level={5}
          style={{ fontWeight: 'bold', color: 'gray', textAlign: 'center', marginBottom: '30px' }}
        >
          <span style={{ color: 'black' }}>부장님의 취향 </span>에 오신 것을 환영합니다.
        </Typography.Title>
        <div style={{ backgroundColor: '#f5f5f5', marginBottom: '10px' }}>
          <Checkbox
            style={{ margin: '10px' }}
            indeterminate={indeterminate}
            onChange={handleCheckAll}
            checked={checkAll}
          >
            모두 동의합니다.
          </Checkbox>
        </div>
        <div style={{ border: 'solid' }}>
          <Collapse bordered={false} expandIconPosition="right" style={{ backgroundColor: 'white', marginTop: '3px' }}>
            {agreements.map((item) => (
              <Panel
                header={
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Checkbox
                      key={item.value}
                      checked={checkedList.includes(item.value)}
                      onChange={() => handleCheck(item.value)}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {item.label}
                    </Checkbox>
                  </div>
                }
                key={item.value}
              >
                <Typography.Paragraph>{item.content}</Typography.Paragraph>
              </Panel>
            ))}
          </Collapse>
        </div>

        <Button type="primary" style={{ marginTop: '20px', width: '100%' }} disabled={!allRequiredChecked}>
          선택완료
        </Button>
      </div>
    </div>
  );
};

export default AgreementPage;
