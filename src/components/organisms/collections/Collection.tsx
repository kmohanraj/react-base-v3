import React, { useState, FC } from "react";
import Input from "components/atoms/TextField";
import TopPanel from "components/molecules/TopPanel";
import Button from "components/atoms/Button";
import { useDispatch, useSelector } from "react-redux";
import * as GroupSlice from 'store/slice/groups.slice';
import { RootState } from "store";

type CollectionProps = {
  title?: string
}

const Collection: FC<CollectionProps> = ({title}) => {
  const initialState = {
    collection_amount: '',
    description: ''
  }
  const { currentCustomerCode } = useSelector((state: RootState) => state.customer);

  const dispatch = useDispatch()
  const [collection, setCollection] = useState(initialState)

  const handleOnChange = (e: any) => {
    const { name, value } = e.target;
    setCollection({
      ...collection, [name]: value
    })
  }

  const handleOnSubmit = () => {
    const data = {...collection, user_id: 1, mapping_id: 1}
    console.log('-----submit', data)
  }

  const handleOnCloseModal = () => {
    dispatch(GroupSlice.setIsModalShow(false))
  }

  return (
    <>
      <div className="form-section">
        <TopPanel panelType='breadcrumb'>
          <div>{title} Collection from <b>{currentCustomerCode}</b></div>
        </TopPanel>
        <div className="chit-form">
          <Input
            inputId="collection_amount"
            placeholder="Enter Amount"
            required
            inputType="number"
            value={collection.collection_amount}
            onChange={handleOnChange}
          />
          <Input
            inputId="description"
            placeholder="Enter description"
            value={collection.description}
            onChange={handleOnChange}
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
            label='Create'
            onClick={handleOnSubmit}
          />
        </div>
      </div>
    </>
  )
}

export default Collection;
