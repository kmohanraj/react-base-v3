import { FC, useEffect } from 'react';
import Input from 'components/atoms/TextField';
import TopPanel from 'components/molecules/TopPanel';
import Button from 'components/atoms/Button';
import { useDispatch, useSelector } from 'react-redux';
import * as CollectionSlice from 'store/slice/collection.slice';
import { RootState } from 'store';
import CONSTANTS from 'constants/constants';
import * as CollectionService from 'service/collection.service';
import useToGetCollections from 'hooks/collection/useToGetCollections';
import { CollectionProps } from 'types/components.types';
import iziToast from 'izitoast';
import { AxiosResponse } from 'axios';

const { USER_ID_KEY, CURRENT_MANAGE_CUSTOMER_ID, CURRENT_ORG_ID } =
  CONSTANTS.SESSION_STORAGE;
const { STATUS_CODE, TOAST_DEFAULTS } = CONSTANTS;

const Collection: FC<CollectionProps> = ({ title, onClose }) => {
  const dispatch = useDispatch();
  const currentUserID = sessionStorage.getItem(USER_ID_KEY);
  const [loading, handleRefreshCollection] = useToGetCollections(
    Number(currentUserID),
    Number(sessionStorage.getItem(CURRENT_MANAGE_CUSTOMER_ID))
  );
  const { currentCustomerCode } = useSelector(
    (state: RootState) => state.customer
  );
  const { collection, isEditCollection } = useSelector(
    (state: RootState) => state.collection
  );
  const { group } = useSelector((state: RootState) => state.group);

  const handleOnChange = (e: any) => {
    const { name, value } = e.target;
    dispatch(
      CollectionSlice.setCollection({
        ...collection,
        [name]: checkInputType(name, value)
      })
    );
  };

  const checkInputType = (name: string, value: string) => {
    if (name === 'collection_amount') {
      return value.replace(/[^0-9]/g, '')
    } else {
      return value
    }
  }

  const handleOnSubmit = async () => {
    const data = {
      ...collection,
      group_id: group?.id,
      user_id: Number(sessionStorage.getItem(USER_ID_KEY)),
      manage_customer_id: Number(
        sessionStorage.getItem(CURRENT_MANAGE_CUSTOMER_ID)
      ),
      org_id: Number(sessionStorage.getItem(CURRENT_ORG_ID))
    };
    isEditCollection ? updateCollection(data) : createCollection(data);
  };

  const createCollection = async (data: any) => {
    const response = await CollectionService.create(
      data,
      Number(sessionStorage.getItem(USER_ID_KEY))
    );
    toastMessage(response);
  };

  const updateCollection = async (data: any) => {
    const { id, created_by, collection_date, ...filterData } = data;
    const payload = {
      id: id,
      data: filterData
    };
    const response = await CollectionService.update(
      payload,
      Number(sessionStorage.getItem(USER_ID_KEY))
    );
    toastMessage(response);
  };

  const toastMessage = (response: AxiosResponse) => {
    if (response.status === STATUS_CODE.STATUS_200) {
      iziToast.success({
        title: TOAST_DEFAULTS.SUCCESS_TITLE,
        message: response?.data?.info
      });
      handleOnCloseModal();
      handleRefreshCollection(true)
    } else {
      iziToast.error({
        title: TOAST_DEFAULTS.INFO_TITLE,
        message: response?.data?.info
      });
    }
  };

  const handleOnCloseModal = () => {
    dispatch(CollectionSlice.clearCollection());
    dispatch(CollectionSlice.setIsAddCollection(false));
    dispatch(CollectionSlice.setIsEditCollection(false));
  };

  useEffect(() => {}, [loading, collection]);

  return (
    <>
      <div className='form-section'>
        <TopPanel panelType='breadcrumb'>
          <div>
            {title} Collection from <b>{currentCustomerCode}</b>
          </div>
        </TopPanel>
        <div className='chit-form'>
          <Input
            inputId='collection_amount'
            placeholder='Enter Amount'
            required
            value={collection.collection_amount}
            onChange={handleOnChange}
            message="Ex, 1000"
          />
          <Input
            inputId='description'
            placeholder='Enter description'
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
          <Button type='ghost' label='Cancel' onClick={handleOnCloseModal} />
          <Button
            type='primary'
            label={isEditCollection ? 'Update' : 'Create'}
            onClick={handleOnSubmit}
          />
        </div>
      </div>
    </>
  );
};

export default Collection;
