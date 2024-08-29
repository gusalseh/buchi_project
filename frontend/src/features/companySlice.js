import { createSlice } from '@reduxjs/toolkit';
import { fetchCompanies, fetchIndustryTypes, addCompany, checkCompanyName } from './companyThunk';

const companySlice = createSlice({
  name: 'company',
  initialState: {
    companies: [],
    filteredCompanies: [],
    industryTypes: [],
    status: 'idle',
    industryStatus: 'idle',
    error: null,
    currentPage: 1,
    pageSize: 5,
    checkCompanyStatus: 'idle', // 추가된 상태
    checkCompanyError: null, // 추가된 에러 상태
  },
  reducers: {
    setSearchTerm(state, action) {
      const searchTerm = action.payload.toLowerCase();
      state.filteredCompanies = state.companies.filter((company) =>
        company.company_name.toLowerCase().includes(searchTerm)
      );
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCompanies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.companies = action.payload;
        state.filteredCompanies = action.payload;
      })
      .addCase(fetchCompanies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchIndustryTypes.pending, (state) => {
        state.industryStatus = 'loading';
      })
      .addCase(fetchIndustryTypes.fulfilled, (state, action) => {
        state.industryStatus = 'succeeded';
        state.industryTypes = action.payload;
      })
      .addCase(fetchIndustryTypes.rejected, (state, action) => {
        state.industryStatus = 'failed';
        state.error = action.error.message;
      })
      .addCase(addCompany.fulfilled, (state, action) => {
        state.companies.push(action.payload);
        state.filteredCompanies.push(action.payload);
      })
      .addCase(checkCompanyName.pending, (state) => {
        state.checkCompanyStatus = 'loading';
        state.checkCompanyError = null;
      })
      .addCase(checkCompanyName.fulfilled, (state) => {
        state.checkCompanyStatus = 'succeeded';
      })
      .addCase(checkCompanyName.rejected, (state, action) => {
        state.checkCompanyStatus = 'failed';
        state.checkCompanyError = action.payload;
      });
  },
});

export const { setSearchTerm, setCurrentPage } = companySlice.actions;

export default companySlice.reducer;
