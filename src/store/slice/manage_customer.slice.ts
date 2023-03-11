import { createSlice } from '@reduxjs/toolkit';
import { initialState, manageCustomer } from 'store/initialStates/manage_customer.initialState';

export const manageCustomerSlice = createSlice({
  name: 'manageCustomer',
  initialState,
  reducers: {
    setManageCustomer: (state, action) => {
      state.manageCustomer = action.payload;
    },
    setManageCustomers: (state, action) => {
      state.manageCustomers = action.payload;
    },
    setSelectedManage: (state, action) => {
      state.selected_manage = action.payload;
    },
    setIsAddManageCustomer: (state, action) => {
      state.isAddManageCustomer = action.payload;
    },
    setIsEditManageCustomer: (state, action) => {
      state.isEditManageCustomer = action.payload;
    },
    setIsDeleteManageCustomer: (state, action) => {
      state.isDeleteManageCustomer = action.payload;
    },
    setCurrentManageCustomerId: (state, action) => {
      state.currentManageCustomerId = action.payload
    },
    clearManageCustomer: (state) => ({
      ...state,
      manageCustomer: manageCustomer
    })
  }
});

export const {
  setManageCustomer,
  setManageCustomers,
  setSelectedManage,
  setIsAddManageCustomer,
  setIsEditManageCustomer,
  setIsDeleteManageCustomer,
  setCurrentManageCustomerId,
  clearManageCustomer
} = manageCustomerSlice.actions;

export default manageCustomerSlice.reducer;
