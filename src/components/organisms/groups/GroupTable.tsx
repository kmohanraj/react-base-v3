import Button from 'components/atoms/Button';
import Table from 'components/atoms/Table';
import TopPanel from 'components/molecules/TopPanel';
import { useDispatch, useSelector } from 'react-redux';
import * as GroupSlice from 'store/slice/groups.slice';
import { useEffect, useState } from 'react';
import Pagination from 'components/atoms/Pagination';
import CONSTANTS from 'constants/constants';
import useItToGetGroups from 'hooks/group/useItToGetGroups';
import { RootState } from 'store';
import ManageCustomer from './ManageCustomer';
import ConfirmationModal from 'components/molecules/ConfirmationModal';
import { setIsModalShow } from 'store/slice/groups.slice';
import { remove } from 'service/group.service';
import iziToast from 'izitoast';


const { SESSION_STORAGE, ACTION_BTN, STATUS_CODE, TOAST_DEFAULTS } = CONSTANTS;

const columns = [
  // { title: 'Group Name', dataProperty: 'group_name'},
  { title: 'Group Code', dataProperty: 'group_code' },
  { title: 'Chit Amount', dataProperty: 'amount' },
  { title: 'Customers', dataProperty: 'total_members' },
  { title: 'Duration', dataProperty: 'duration' },
  { title: 'Active ', dataProperty: 'is_active' },
  { title: 'Is Started', dataProperty: 'is_started' },
  { title: 'Start Date', dataProperty: 'start_date' },
  { title: 'End Date', dataProperty: 'end_date' },
];

const GroupTable = () => {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [perPageSize, setPerPageSize] = useState(10);
  const [title, setTitle] = useState<string>('')
  const [actionMode, setActionMode] = useState<string>('')
  const [groupId, setGroupId] = useState<number>()

  const currentUserID = sessionStorage.getItem(SESSION_STORAGE.USER_ID_KEY)
  const [isGroupsDataLoading] = useItToGetGroups(Number(currentUserID))

  const { groupsData, isManageCustomerBtnClicked } = useSelector((state: RootState) => state.group)

  const start = currentPage * perPageSize - perPageSize
  const end = start + perPageSize;
  const groupList = groupsData.slice(start, end)

  const handleOnEdit = (data: any) => {
    dispatch(GroupSlice.setIsAddGroupBtnClicked(true))
    dispatch(GroupSlice.setIsEditGroupBtnClicked(true))
    dispatch(GroupSlice.setGroup(data))
    dispatch(GroupSlice.setSelectedGroup(data))
  };

  const handleOnRemove = (data: any) => {
    dispatch(setIsModalShow(true))
    setGroupId(data?.id)
    setTitle(data?.group_code)
    setActionMode('Delete')
  };

  const deleteGroup = async () => {
    const response = await remove(Number(groupId), Number(currentUserID))
    if (response?.status === STATUS_CODE.STATUS_200) {
      iziToast.info({
        title: TOAST_DEFAULTS.SUCCESS_TITLE,
        message: response?.data?.info
      })
      dispatch(GroupSlice.setGroupsData(groupsData.filter((ele: any) => ele.id !== groupId)))
      dispatch(setIsModalShow(false))
    } else {
      iziToast.info({
        title: TOAST_DEFAULTS.SUCCESS_TITLE,
        message: response?.data?.info
      })
    } 
  }
  
  const handleOnManageCustomer = (data: any) => {
    dispatch(GroupSlice.setGroup(data))
    dispatch(GroupSlice.setIsManageCustomerBtnClicked(true))
  }

  useEffect(() => {}, [isGroupsDataLoading])

  if (isManageCustomerBtnClicked) {
    return <ManageCustomer />
  }

  return (
    <>
      <TopPanel panelType='top-panel'>
        <div className='top-panel-entity'>{groupsData.length} {groupsData.length > 1 ? 'Groups' : 'Group'}</div>
        {/* <span className='top-panel-entity'>No Results</span> */}
        <div className='top-panel-buttons'>
          <Button
            type='ghost'
            label='Export CSV'
            onClick={() => console.log('export group')}
          />
          <Button
            type='primary'
            label='Add Group'
            onClick={() => dispatch(GroupSlice.setIsAddGroupBtnClicked(true))}
          />
        </div>
      </TopPanel>
      <Table
        tableName='group-table'
        columns={columns}
        data={groupList}
        action={[ACTION_BTN.EDIT, ACTION_BTN.DELETE, ACTION_BTN.ADD_GROUP]}
        onEdit={handleOnEdit}
        onRemove={handleOnRemove}
        onManageCustomer={handleOnManageCustomer}
      />
      <Pagination
        perPage={perPageSize}
        totalPageRecords={groupsData.length}
        currentPage={currentPage}
        maxVisibleButton={3}
        setCurrentPage={setCurrentPage}
        setPerPageSize={setPerPageSize}
      />
       <ConfirmationModal name={title} actionMode={actionMode} onCancel={() => {
        dispatch(GroupSlice.setIsModalShow(false))
      }} onClose={() => {
        dispatch(setIsModalShow(false))
      }} onClick={deleteGroup} />
    </>
  );
};
export default GroupTable;
