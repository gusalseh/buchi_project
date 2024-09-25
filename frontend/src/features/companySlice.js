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
    checkCompanyStatus: 'idle',
    checkCompanyError: null,
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

      //fetchCompanies
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

      //fetchIndustryTypes
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

      //addCompany
      .addCase(addCompany.fulfilled, (state, action) => {
        state.companies.push(action.payload);
        state.filteredCompanies.push(action.payload);
      })

      //checkCompanyName
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
