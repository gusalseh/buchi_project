import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Input, Pagination, Button, List, Typography, Select, message } from 'antd';
import { fetchCompanies, fetchIndustryTypes, addCompany, checkCompanyName } from '../../features/companyThunk';
import { setSearchTerm, setCurrentPage } from '../../features/companySlice';
import { updateUserCompany, fetchUser } from '../../features/userThunk';
import { getIndustryType, getReverseIndustryType } from '../../enums/Enum';
import '../../styles/companyModal.css';

const { Search } = Input;
const { Text } = Typography;

const CompanyModal = ({ visible, onClose }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const { filteredCompanies, currentPage, pageSize, status, industryTypes, industryStatus } = useSelector(
    (state) => state.company
  );

  const [selectedItemId, setSelectedItemId] = useState(null);
  const [searchTerm, setSearchTermState] = useState('');
  const [isDirectInput, setIsDirectInput] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [industryType, setIndustryType] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUser());
    }
    if (status === 'idle') {
      dispatch(fetchCompanies());
    }
    if (industryStatus === 'idle') {
      dispatch(fetchIndustryTypes());
    }
  }, [status, industryStatus, dispatch]);

  const handleSearch = (value) => {
    setSearchTermState(value);
    dispatch(setSearchTerm(value));
    dispatch(setCurrentPage(1));
    setIsDirectInput(false);
  };

  const clickSearch = () => {
    setIsDirectInput(false);
    setCompanyName(null);
    setIndustryType(null);
  };

  const handleRegister = async () => {
    if (!selectedItemId) return;

    try {
      const response = await dispatch(updateUserCompany({ companyId: selectedItemId })).unwrap();

      if (response.message === 'Company ID updated successfully') {
        onClose();
        window.location.reload();
      } else {
        console.log('Failed to update Company ID');
      }
    } catch (error) {
      console.error('Error updating Company ID:', error);
    }
  };

  const handleRegisterDirectInput = async () => {
    try {
      const checkResponse = await dispatch(checkCompanyName(companyName)).unwrap();

      if (checkResponse.exists) {
        message.error('이미 존재하는 회사입니다. 검색을 통해 진행해주세요.');
        return;
      }

      const industryTypeKey = getReverseIndustryType(industryType);

      const newCompany = await dispatch(
        addCompany({ company_name: companyName, industry_type: industryTypeKey })
      ).unwrap();

      const response = await dispatch(updateUserCompany({ companyId: newCompany.company.company_id })).unwrap();

      onClose();

      if (response.user.company_id) window.location.reload();
    } catch (error) {
      if (error === '이미 존재하는 회사입니다. 검색을 통해 진행해주세요.') {
        message.error(error);
      } else {
        console.error('Error adding company or updating user company ID:', error);
        message.error('이미 존재하는 회사입니다. 검색을 통해 진행해주세요.');
      }
    }
  };

  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page));
  };

  const handleItemClick = (company_id) => {
    setSelectedItemId(company_id);
  };

  const handleDirectInput = () => {
    setIsDirectInput(true);
    setCompanyName('');
    setIndustryType(null);
    setSelectedItemId(false);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (value.length <= 20) {
      setCompanyName(value);
      setErrorMessage('');
    } else {
      setErrorMessage('최대 20자까지만 가능합니다.');
    }
  };

  const startIndex = (currentPage - 1) * pageSize;
  const paginatedCompanies = filteredCompanies.slice(startIndex, startIndex + pageSize);

  return (
    <Modal
      visible={visible}
      onCancel={onClose}
      footer={null}
      width={644}
      bodyStyle={{ height: '800px', overflowY: 'auto', padding: 20 }}
      style={{ height: '800px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
      title={null}
      closeIcon={null}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '16px',
          height: '64px',
          borderBottom: '1px solid',
          borderColor: '#D9D9D9',
        }}
      >
        <span
          style={{
            marginLeft: 40,
            fontSize: '20px',
            fontStyle: 'normal',
            fontWeight: 500,
            flex: 1,
            textAlign: 'center',
          }}
        >
          회사 정보 입력하기
        </span>
        <Button type="text" onClick={onClose} style={{ fontSize: '20px', marginLeft: 'auto' }}>
          ×
        </Button>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <Search
          placeholder="회사명 검색"
          onSearch={handleSearch}
          onClick={clickSearch}
          enterButton
          className="custom-search"
          style={{ flex: 1, marginRight: 8 }}
        />
        <Button
          type="primary"
          disabled={isDirectInput}
          style={{
            width: 193,
            height: 40,
            backgroundColor: isDirectInput ? '#525252' : '#ffffff',
            color: isDirectInput ? '#ffffff' : '#525252',
            border: '1px solid',
            borderColor: '#D9D9D9',
          }}
          onClick={handleDirectInput}
        >
          직접 입력하기
        </Button>
      </div>
      {isDirectInput ? (
        <div style={{ height: 532, marginBottom: 16 }}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: '16px', display: 'block', marginBottom: '8px' }}>회사명</label>
            <Input
              placeholder="회사명을 입력해주세요"
              style={{ width: '100%', height: 48, fontSize: '16px' }}
              value={companyName}
              onChange={handleInputChange}
              maxLength={20}
            />
            {errorMessage && <span style={{ color: 'red', fontSize: '14px' }}>{errorMessage}</span>}
          </div>
          <div>
            <label style={{ fontSize: '16px', display: 'block', marginBottom: '8px' }}>산업군</label>
            <Select
              placeholder="산업군을 선택해주세요"
              style={{ width: '100%', height: 48, fontSize: '16px' }}
              value={industryType}
              onChange={(value) => setIndustryType(value)}
            >
              {industryTypes.map((type, index) => (
                <Select.Option key={index} value={type}>
                  {type}
                </Select.Option>
              ))}
            </Select>
          </div>
        </div>
      ) : (
        <>
          {searchTerm ? (
            <>
              <List
                style={{ marginTop: 15, height: 500, marginBottom: 16 }}
                dataSource={paginatedCompanies}
                renderItem={(item) => (
                  <List.Item
                    key={item.company_id}
                    onClick={() => handleItemClick(item.company_id)}
                    style={{
                      backgroundColor: selectedItemId === item.company_id ? '#FDF5F4' : '#ffffff',
                      cursor: 'pointer',
                      padding: '12px 20px',
                      height: 90,
                      transition: 'background-color 0.3s ease',
                    }}
                  >
                    <List.Item.Meta
                      title={item.company_name}
                      description={getIndustryType(item.industry_type)}
                      style={{
                        fontSize: 16,
                        fontStyle: 'normal',
                        fontWeight: selectedItemId === item.company_id ? 900 : 700,
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    />
                  </List.Item>
                )}
                locale={{
                  emptyText: (
                    <div>
                      일치하는 회사가 없어요.
                      <br />
                      회사를 직접 입력해주세요.
                    </div>
                  ),
                }}
              />
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}>
                <Pagination
                  current={currentPage}
                  pageSize={pageSize}
                  total={filteredCompanies.length}
                  onChange={handlePageChange}
                  showSizeChanger={false}
                  style={{ textAlign: 'center' }}
                />
              </div>
            </>
          ) : (
            <div
              style={{
                display: 'flex',
                height: 520,
                textAlign: 'center',
                marginTop: 50,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text type="secondary" style={{ fontSize: '16px' }}>
                회사명을 검색해주세요
              </Text>
            </div>
          )}
        </>
      )}

      <Button
        type="primary"
        disabled={!selectedItemId && !(companyName && industryType)}
        onClick={isDirectInput ? handleRegisterDirectInput : handleRegister}
        style={{
          marginTop: 16,
          width: '100%',
          height: 48,
          backgroundColor: selectedItemId || (companyName && industryType) ? '#CC3C28' : '#A3A3A3',
          borderColor: selectedItemId || (companyName && industryType) ? '#CC3C28' : '#A3A3A3',
          color: 'white',
        }}
      >
        등록하기
      </Button>
    </Modal>
  );
};

export default CompanyModal;
