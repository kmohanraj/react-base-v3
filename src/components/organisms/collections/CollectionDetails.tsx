import TopPanel from "components/molecules/TopPanel";
import * as Icons from 'constants/icons';
import { useDispatch, useSelector } from "react-redux";
import * as GroupSlice from "store/slice/groups.slice";
import * as CollectionSlice from 'store/slice/collection.slice';
import * as CustomerSlice from 'store/slice/customers.slice';
import 'styles/collection-details.scss';
import useItToRupees from "hooks/common/useItToRupees";
import Button from "components/atoms/Button";
import Modal from "components/atoms/Modal";
import Collection from "./Collection";
import { RootState } from "store";
import { initialCollection } from 'store/initialStates/collection.initialState';
import useToGetCollections from "hooks/collection/useToGetCollections";
import CONSTANTS from "constants/constants";
import { useEffect } from "react";
import moment from "moment";

const CollectionDetails = () => {
  const dispatch = useDispatch();
  const { collectionsData, isEditCollectionBtnClicked} = useSelector((state: RootState) => state.collection)
  const { selected_manage } = useSelector((state: RootState) => state.manage_customer)
  const currentUserID = sessionStorage.getItem(CONSTANTS.SESSION_STORAGE.USER_ID_KEY)
  const [loading] = useToGetCollections(Number(currentUserID), Number(sessionStorage.getItem(CONSTANTS.SESSION_STORAGE.CURRENT_MANAGE_CUSTOMER_ID)))

  const handleOnCheckCondition = () => {
    dispatch(GroupSlice.setIsCollectionDetail(false))
    dispatch(CustomerSlice.setCurrentCustomerCode(''))
  }

  const handleOnModal = () => {
    dispatch(GroupSlice.setIsModalShow(true))
  }

  const handleOnCloseModal = () => {
    dispatch(GroupSlice.setIsModalShow(false))
    dispatch(CollectionSlice.setIsEditCollectionBtnClicked(false))
    dispatch(CollectionSlice.setCollection(initialCollection))
  }

  const handleOnEdit = (collection: any) => {
    console.log('ID', collection)
    dispatch(GroupSlice.setIsModalShow(true))
    dispatch(CollectionSlice.setIsEditCollectionBtnClicked(true))
    dispatch(CollectionSlice.setCollection(collection))
  }

  useEffect(() => {

  }, [loading])

  console.log("SSSSS", collectionsData)
  return (
    <>
      <TopPanel panelType="breadcrumb">
        <img
          src={Icons.backButton}
          alt='Back'
          onClick={handleOnCheckCondition}
        />
        <div>Collection Details </div>
      </TopPanel>
     
      <TopPanel panelType="top-panel">
        <span className='top-panel-entity'>Total Collection Amounts {useItToRupees('2000')}</span>
        <div className='top-panel-buttons'>
          <Button
            type='primary'
            label='Collect'
            onClick={handleOnModal}
          />
        </div>  
      </TopPanel>
      <section className="collection-details">
        {collectionsData.map((collection: any) => (
          <section className="collection-details__item">
            <div>
              <div>Amount: <span>{collection.collection_amount}</span></div>
              <div>Date: <span>{moment(collection.collection_date).format('DD/MM/YYYY, h:mm a')}</span></div>
            </div>
            <div>
            <button
                className='collection-details__btn'
                onClick={() => handleOnEdit(collection)}
              >
                <img src={Icons.edit} alt="Edit" />
              </button>
            </div>
          </section>
        ))}
      </section>
      <Modal onClose={handleOnCloseModal}>
        <Collection title={isEditCollectionBtnClicked ? 'Edit' : 'Add'} />
      </Modal>
    </>
  )
}

export default CollectionDetails;
