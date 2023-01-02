import TopPanel from "components/molecules/TopPanel";
import arrowBack from 'assets/images/back_button.svg';
import editIcon from 'assets/images/edit.svg';
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

const CollectionDetails = () => {
  const dispatch = useDispatch();
  const { isEditCollectionBtnClicked} = useSelector((state: RootState) => state.collection)
  
  const collectionDetails = [
    {
      id: 1,
      amount: useItToRupees('1000'),
      collection_date: `12/12/2023`
    },
    {
      id: 2,
      amount: useItToRupees('1000'),
      collection_date: `12/12/2023`
    },
    {
      id: 3,
      amount: useItToRupees('1000'),
      collection_date: `12/12/2023`
    },
    {
      id: 4,
      amount: useItToRupees('1000'),
      collection_date: `12/12/2023`
    },
    {
      id: 5,
      amount: useItToRupees('1000'),
      collection_date: `12/12/2023`
    }
  ]

  const handleOnCheckCondition = () => {
    dispatch(GroupSlice.setIsCollectionDetail(false))
    dispatch(CustomerSlice.setCurrentCustomerCode(''))
  }

  const handleOnModal = () => {
    dispatch(GroupSlice.setIsModalShow(true))
    // dispatch(CollectionSlice.setIsEditCollectionBtnClicked(true))
  }

  const handleOnCloseModal = () => {
    dispatch(GroupSlice.setIsModalShow(false))
    dispatch(CollectionSlice.setIsEditCollectionBtnClicked(false))
  }

  const handleOnEdit = (id: number) => {
    console.log('ID', id)
    dispatch(GroupSlice.setIsModalShow(true))
    dispatch(CollectionSlice.setIsEditCollectionBtnClicked(true))
  }

  return (
    <>
      <TopPanel panelType="breadcrumb">
        <img
          src={arrowBack}
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
        {collectionDetails.map((collection: any) => (
          <section className="collection-details__item">
            <div>
              <div>Collected Amount: <span>{collection.amount}</span></div>
              <div>Collection Date: <span>{collection.collection_date}</span></div>
            </div>
            <div>
            <button
                className='collection-details__btn'
                onClick={() => handleOnEdit(collection.id)}
              >
                <img src={editIcon} alt="Edit" />
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
