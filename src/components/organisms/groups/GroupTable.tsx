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
import { remove } from 'service/group.service';
import iziToast from 'izitoast';
import useItToGetAllManages from 'hooks/manage_customer/useItToGetAllManages';

const { SESSION_STORAGE, ACTION_BTN, STATUS_CODE, TOAST_DEFAULTS, ROLE } =
  CONSTANTS;

const columns = [
  // { title: 'Group Name', dataProperty: 'group_name'},
  { title: 'Group Code', dataProperty: 'group_code' },
  { title: 'Chit Amount', dataProperty: 'amount' },
  { title: 'Customers', dataProperty: 'total_members' },
  { title: 'Duration', dataProperty: 'duration' },
  { title: 'Active ', dataProperty: 'is_active' },
  { title: 'Is Started', dataProperty: 'is_started' },
  { title: 'Start Date', dataProperty: 'start_date' },
  { title: 'End Date', dataProperty: 'end_date' }
];

const GroupTable = () => {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [perPageSize, setPerPageSize] = useState(10);
  const [title, setTitle] = useState<string>('');
  const [actionMode, setActionMode] = useState<string>('');
  const [groupId, setGroupId] = useState<number>();

  const currentUserID = sessionStorage.getItem(SESSION_STORAGE.USER_ID_KEY);
  const currentUserRole = sessionStorage.getItem(SESSION_STORAGE.ROLE_KEY);
  const [isGroupsDataLoading] = useItToGetGroups(Number(currentUserID));

  const { groupsData, isManageCustomer, isDeleteGroup } = useSelector(
    (state: RootState) => state.group
  );

  const start = currentPage * perPageSize - perPageSize;
  const end = start + perPageSize;
  const groupList = groupsData.slice(start, end);

  const handleOnEdit = (data: any) => {
    console.log('DATA!!!!!!!!!', data);
    // dispatch(GroupSlice.setIsAddGroup(true))
    dispatch(GroupSlice.setIsEditGroup(true));
    dispatch(GroupSlice.setGroup(data));
    dispatch(GroupSlice.setSelectedGroup(data));
  };

  const handleOnRemove = (data: any) => {
    dispatch(GroupSlice.setIsDeleteGroup(true));
    setGroupId(data?.id);
    setTitle(data?.group_code);
    setActionMode('Delete');
  };

  const deleteGroup = async () => {
    const response = await remove(Number(groupId), Number(currentUserID));
    if (response?.status === STATUS_CODE.STATUS_200) {
      iziToast.success({
        title: TOAST_DEFAULTS.SUCCESS_TITLE,
        message: response?.data?.info
      });
      dispatch(
        GroupSlice.setGroupsData(
          groupsData.filter((ele: any) => ele.id !== groupId)
        )
      );
      dispatch(GroupSlice.setIsDeleteGroup(false));
    } else {
      iziToast.info({
        title: TOAST_DEFAULTS.SUCCESS_TITLE,
        message: response?.data?.info
      });
    }
  };

  const handleOnManageCustomer = (data: any) => {
    dispatch(GroupSlice.setGroup(data));
    dispatch(GroupSlice.setIsManageCustomer(true));
  };

  const checkActionPrivilege = () => {
    if (Number(currentUserRole) === ROLE.EMPLOYEE_ID) {
      return [ACTION_BTN.ADD_GROUP];
    } else {
      return [ACTION_BTN.EDIT, ACTION_BTN.DELETE, ACTION_BTN.ADD_GROUP];
    }
  };

  useEffect(() => {}, [isGroupsDataLoading]);

  if (isManageCustomer) {
    return <ManageCustomer />;
  }

  return (
    <>
      <TopPanel panelType='top-panel'>
        <div className='top-panel-entity'>
          {groupsData.length} {groupsData.length > 1 ? 'Groups' : 'Group'}
        </div>
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
            onClick={() => dispatch(GroupSlice.setIsAddGroup(true))}
          />
        </div>
      </TopPanel>
      <Table
        tableName='group-table'
        columns={columns}
        data={groupList}
        action={checkActionPrivilege()}
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
      <ConfirmationModal
        show={isDeleteGroup}
        name={title}
        actionMode={actionMode}
        onClose={() => {
          dispatch(GroupSlice.setIsDeleteGroup(false));
        }}
        onClick={deleteGroup}
      />
    </>
  );
};
export default GroupTable;
