import { lazy } from 'react';
import TopPanel from 'components/molecules/TopPanel';
import * as Icons from 'constants/icons';
import { useDispatch, useSelector } from 'react-redux';
import * as GroupSlice from 'store/slice/groups.slice';
import * as CollectionSlice from 'store/slice/collection.slice';
import * as CustomerSlice from 'store/slice/customers.slice';
import 'styles/collection-details.scss';
import useItToRupees from 'hooks/common/useItToRupees';
import Button from 'components/atoms/Button';
import Modal from 'components/atoms/Modal';
import { RootState } from 'store';
import useToGetCollections from 'hooks/collection/useToGetCollections';
import CONSTANTS from 'constants/constants';
import moment from 'moment';
const Collection = lazy(() => import('./Collection'));

const CollectionDetails = () => {
  const dispatch = useDispatch();
  const { collectionsData, isEditCollection, isAddCollection } = useSelector(
    (state: RootState) => state.collection
  );
  const { currentManageCustomerId } = useSelector(
    (state: RootState) => state.manage_customer
  );

  const [loading] = useToGetCollections(
    Number(sessionStorage.getItem(CONSTANTS.SESSION_STORAGE.USER_ID_KEY)),
    Number(currentManageCustomerId)
  );

  const handleOnCheckCondition = () => {
    dispatch(GroupSlice.setIsCollectionDetail(false));
    dispatch(CustomerSlice.setCurrentCustomerCode(''));
  };

  const handleOnAddCollection = () => {
    dispatch(CollectionSlice.setIsAddCollection(true));
  };

  const handleOnCloseModal = () => {
    dispatch(CollectionSlice.setIsAddCollection(false));
    dispatch(CollectionSlice.setIsEditCollection(false));
    dispatch(CollectionSlice.clearCollection());
  };

  const handleOnEdit = (collection: any) => {
    dispatch(CollectionSlice.setIsEditCollection(true));
    dispatch(CollectionSlice.setCollection(collection));
  };

  const totalCollection = () => {
    return collectionsData.reduce((acc: any, ele: any) => {
      return acc + Number(ele.collection_amount);
    }, 0);
  };

  return (
    <>
      <TopPanel panelType='breadcrumb'>
        <img
          src={Icons.backButton}
          alt='Back'
          onClick={handleOnCheckCondition}
        />
        <div>Collection Details </div>
      </TopPanel>

      <TopPanel panelType='top-panel'>
        <span className='top-panel-entity'>
          Total Collection Amounts {useItToRupees(totalCollection())}
        </span>
        <div className='top-panel-buttons'>
          <Button
            type='primary'
            label='Collect'
            onClick={handleOnAddCollection}
          />
        </div>
      </TopPanel>
      <section className='collection-details'>
        {collectionsData.map((collection: any, index: any) => (
          <section className='collection-details__item' key={index}>
            <div>
              <div>
                Amount: <span>{collection.collection_amount}</span>
              </div>
              <div>
                Date:{' '}
                <span>
                  {moment(collection.collection_date).format(
                    'DD/MM/YYYY, h:mm a'
                  )}
                </span>
              </div>
            </div>
            <div>
              <button
                className='collection-details__btn'
                onClick={() => handleOnEdit(collection)}
              >
                <img src={Icons.edit} alt='Edit' />
              </button>
            </div>
          </section>
        ))}
      </section>
      <Modal
        show={isAddCollection || isEditCollection}
        onClose={handleOnCloseModal}
      >
        <Collection title={isEditCollection ? 'Edit' : 'Add'} />
      </Modal>
    </>
  );
};

export default CollectionDetails;
