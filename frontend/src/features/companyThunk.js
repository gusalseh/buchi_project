import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// 회사 데이터를 불러오기
export const fetchCompanies = createAsyncThunk('company/fetchCompanies', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`http://localhost:80/api/companies`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return rejectWithValue('No companies found.');
    }
    return rejectWithValue('Failed to fetch companies.');
  }
});

// 산업군 ENUM 데이터를 불러오기
export const fetchIndustryTypes = createAsyncThunk('company/fetchIndustryTypes', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`http://localhost:80/api/companies/industry-types`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return rejectWithValue('Failed to fetch industry types.');
  }
});

// 새로운 회사를 추가하기
export const addCompany = createAsyncThunk('company/addCompany', async (newCompany) => {
  const response = await axios.post(`http://localhost:80/api/companies/add-company`, newCompany);
  return response.data;
});

// 회사명이 중복되는지 확인하는 Thunk
export const checkCompanyName = createAsyncThunk(
  'company/checkCompanyName',
  async (companyName, { rejectWithValue }) => {
    try {
      const response = await axios.post(`http://localhost:80/api/companies/check-company`, {
        company_name: companyName,
      });
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 409) {
        return rejectWithValue('이미 존재하는 회사입니다.');
      }
      return rejectWithValue('서버 오류가 발생했습니다.');
    }
  }
);
