import { FC, useEffect } from "react";
import Input from "components/atoms/TextField";
import TopPanel from "components/molecules/TopPanel";
import Button from "components/atoms/Button";
import { useDispatch, useSelector } from "react-redux";
import * as GroupSlice from 'store/slice/groups.slice';
import * as CollectionSlice from 'store/slice/collection.slice';
import { RootState } from "store";
import { initialCollection } from 'store/initialStates/collection.initialState';
import CONSTANTS from "constants/constants";
import * as CollectionService from 'service/collection.service';
import useToGetCollections from 'hooks/collection/useToGetCollections';
import { CollectionProps } from "types/components.types";
import iziToast from "izitoast";


const { USER_ID_KEY, CURRENT_MANAGE_CUSTOMER_ID, CURRENT_ORG_ID } = CONSTANTS.SESSION_STORAGE;
const { STATUS_CODE, TOAST_DEFAULTS } = CONSTANTS;

const Collection: FC<CollectionProps> = ({title}) => {
  const dispatch = useDispatch()
  const currentUserID = sessionStorage.getItem(USER_ID_KEY);
  const { selected_manage } = useSelector((state: RootState) => state.manage_customer)
  const [loading] = useToGetCollections(Number(currentUserID), Number(sessionStorage.getItem(CONSTANTS.SESSION_STORAGE.USER_ID_KEY)))
  const { currentCustomerCode } = useSelector((state: RootState) => state.customer);
  const { collection, isEditCollectionBtnClicked } = useSelector((state: RootState) =>  state.collection)
  const { group } = useSelector((state: RootState) => state.group);

  const handleOnChange = (e: any) => {
    const { name, value } = e.target;
    dispatch(CollectionSlice.setCollection({
      ...collection, [name]: value
    }))
  }

  const handleOnSubmit = async () => {
    const data = {...collection,
      group_id: group?.id,
      user_id: Number(sessionStorage.getItem(USER_ID_KEY)),
      manage_customer_id: Number(sessionStorage.getItem(CURRENT_MANAGE_CUSTOMER_ID)),
      org_id: Number(sessionStorage.getItem(CURRENT_ORG_ID))
    }
    const response = await CollectionService.create(data, Number(sessionStorage.getItem(USER_ID_KEY)))
    if (response.status === STATUS_CODE.STATUS_200) {
      iziToast.success({
        title: TOAST_DEFAULTS.SUCCESS_TITLE,
        message: response?.data?.info
      })
      dispatch(GroupSlice.setIsModalShow(false))
      dispatch(CollectionSlice.setIsEditCollectionBtnClicked(false))
      dispatch(CollectionSlice.clearCollection())
    }
  }

  const handleOnCloseModal = () => {
    dispatch(CollectionSlice.setCollection(initialCollection))
    dispatch(GroupSlice.setIsModalShow(false))
    dispatch(CollectionSlice.setIsEditCollectionBtnClicked(false))
    dispatch(CollectionSlice.clearCollection())
  }

  useEffect(() => {

  }, [loading])
  console.log('EDIT', collection)

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
          {/* <Input
            inputId="collection_date"
            placeholder="Collection Date"
            value={moment( isEditCollectionBtnClicked ? collection.collection_date : new Date()).format('DD/MM/YYYY') }
            onChange={() => {}}
            isDisabled={true}
          /> */}
        </div>
        <div className='form-submit'>
          <Button
            type='ghost'
            label='Cancel'
            onClick={handleOnCloseModal}
          />
          <Button
            type='primary'
            label={isEditCollectionBtnClicked ? 'Update' : 'Create'}
            onClick={handleOnSubmit}
          />
        </div>
      </div>
    </>
  )
}

export default Collection;
