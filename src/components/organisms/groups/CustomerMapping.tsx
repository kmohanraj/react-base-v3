import React, { FC, useState } from "react";
import Select from "components/atoms/Select";
import useItToGetCustomers from "hooks/customer/useItToGetCustomers";
import CONSTANTS from "constants/constants";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import Button from "components/atoms/Button";
import TopPanel from "components/molecules/TopPanel";
import * as GroupSlice from 'store/slice/groups.slice';

const collectionTypeOptions = [
  {
    id: 1,
    label: 'Daily'
  },
  {
    id: 2,
    label: 'Monthly'
  },
  {
    id: 3,
    label: 'Weekly'
  }
]

type CustomerMappingProps = {
  currentGroupId: number | null
}

const CustomerMapping: FC<CustomerMappingProps> = ({ currentGroupId }) => {
  const dispatch = useDispatch();
  const currentUserID = sessionStorage.getItem(CONSTANTS.SESSION_STORAGE.USER_ID_KEY);
  const [isCustomerLoading] = useItToGetCustomers(Number(currentUserID))
  const { customerOptions } = useSelector((state: RootState) => state.customer)

  const initialState = {
    group_id: null,
    customer_id: null,
    collection_type: null
  }

  const [mapCustomer, setMapCustomer] = useState(initialState)

  const handleOnSelect = (value: any, fieldName: string) => {
    setMapCustomer({
      ...mapCustomer, [fieldName]: value.id
    })
  }

  const handleOnCloseModal = () => {
    // setMapCustomer(initialState)
    dispatch(GroupSlice.setIsModalShow(false))
    
  }

  const handleOnSubmit = () => {
    const {group_id, ...filterData} = mapCustomer;
    const data = {
      ...filterData,
      group_id: currentGroupId && currentGroupId
    }
    console.log('------submit', data)
  }

  return (
    <div className="form-section">
      <TopPanel panelType="breadcrumb">
        <div>Customer Mapping</div>
      </TopPanel>
      <div className="chit-form">
        <Select
          inputId="customer_id"
          placeholder="Select Customer"
          required
          value=""
          onSelect={(value: any) => handleOnSelect(value, 'customer_id')}
          options={customerOptions}
          isLoading={isCustomerLoading}
        />
        <Select
          inputId="collection_type"
          placeholder="Select Collection Type"
          required
          value=""
          onSelect={(value: any) => handleOnSelect(value, 'collection_type')}
          options={collectionTypeOptions}
        />
      </div>
      <div className='form-submit'>
          <Button
            type='ghost'
            label='Cancel'
            onClick={handleOnCloseModal}
          />
          <Button
            type='primary'
            label="Add"
            onClick={handleOnSubmit}
            disabled={!mapCustomer.customer_id || !mapCustomer.collection_type}
          />
        </div>
    </div>
  )
}
export default CustomerMapping;
