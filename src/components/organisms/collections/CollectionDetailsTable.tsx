import { useEffect, useState } from 'react';
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
import Collection from './Collection';
import { RootState } from 'store';
import useToGetCollections from 'hooks/collection/useToGetCollections';
import CONSTANTS from 'constants/constants';
import Table from 'components/atoms/Table';
import Pagination from 'components/atoms/Pagination';
import ConfirmationModal from 'components/molecules/ConfirmationModal';
import * as CollectionService from 'service/collection.service';
import iziToast from 'izitoast';

const columns = [
  { title: 'Collection Amount', dataProperty: 'collection_amount' },
  { title: 'Description', dataProperty: 'description' },
  { title: 'Collection Date', dataProperty: 'updated_at', isDate: true, isTime: true },
  { title: 'Created By', dataProperty: 'created_by' },
  { title: 'Updated By', dataProperty: 'updated_by' },
]
const { ACTION_BTN, STATUS_CODE, TOAST_DEFAULTS } = CONSTANTS;
const CollectionDetailsTable = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [perPageSize, setPerPageSize] = useState(10);
  const [title, setTitle] = useState<string>('')
  const [actionMode, setActionMode] = useState<string>('')
  const [collectionId, setCollectionId] = useState<number>()
  const [pageList, setPageList] = useState([])
  const { collectionsData, isEditCollection, isAddCollection, isDeleteCollection } = useSelector(
    (state: RootState) => state.collection
  );
  const { selected_manage } = useSelector(
    (state: RootState) => state.manage_customer
  );
  const currentUserID = sessionStorage.getItem(
    CONSTANTS.SESSION_STORAGE.USER_ID_KEY
  );
  const [loading] = useToGetCollections(
    Number(currentUserID),
    Number(
      sessionStorage.getItem(
        CONSTANTS.SESSION_STORAGE.CURRENT_MANAGE_CUSTOMER_ID
      )
    )
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
  
  const handleOnDelete = (data: any) => {
    setCollectionId(data?.id)
    dispatch(CollectionSlice.setIsDeleteCollection(true))
    setActionMode('Delete')
    setTitle(data?.collection_amount)
  }

  const deleteCollection = async () => {
    console.log("delete-collection")
    const response = await CollectionService.remove(Number(collectionId), Number(currentUserID))
    if (response?.status === STATUS_CODE.STATUS_200) {
      iziToast.success({
        title: TOAST_DEFAULTS.SUCCESS_TITLE,
        message: response?.data?.info
      });
      dispatch(
        CollectionSlice.setCollectionsData(
          collectionsData.filter((ele: any) => ele.id !== collectionId)
        )
      );
      dispatch(CollectionSlice.setIsDeleteCollection(false));
    } else {
      iziToast.info({
        title: TOAST_DEFAULTS.SUCCESS_TITLE,
        message: response?.data?.info
      });
    }
  }
  const totalCollection = () => {
    return collectionsData.reduce((acc: any, ele: any) => {
      return acc + Number(ele.collection_amount);
    }, 0);
  };

  const pagination = () => {
    const start = currentPage * perPageSize - perPageSize;
    const end = Number(start) + perPageSize;
    setPageList(collectionsData?.length ? collectionsData.slice(Number(start), end) : []);
  }

  useEffect(() => {
    pagination()
  }, [loading, currentPage]);

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
      <Table
        tableName='collection-details-table'
        columns={columns}
        data={pageList}
        action={[ACTION_BTN.EDIT, ACTION_BTN.DELETE]}
        onEdit={handleOnEdit}
        onRemove={handleOnDelete}
      />
      <Pagination
        perPage={perPageSize}
        totalPageRecords={collectionsData?.length}
        currentPage={currentPage}
        // onPageChanged={(page: any) => onPageChanged(page) }
        maxVisibleButton={3}
        setCurrentPage={setCurrentPage}
        setPerPageSize={setPerPageSize}
      />
      <ConfirmationModal
        show={isDeleteCollection}
        name={title}
        actionMode={actionMode}
        onClose={() => {
          dispatch(CollectionSlice.setIsDeleteCollection(false));
        }}
        onClick={deleteCollection}
      />
      {/* <section className='collection-details'>
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
      </section> */}
      <Modal
        show={isAddCollection || isEditCollection}
        onClose={handleOnCloseModal}
      >
        <Collection title={isEditCollection ? 'Edit' : 'Add'} />
      </Modal>
    </>
  );
};

export default CollectionDetailsTable;
