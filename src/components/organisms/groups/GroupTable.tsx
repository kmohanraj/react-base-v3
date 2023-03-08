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
import * as GroupService from 'service/group.service';
import iziToast from 'izitoast';
import { durationOptions } from 'constants/options';

const { SESSION_STORAGE, ACTION_BTN, STATUS_CODE, TOAST_DEFAULTS, ROLE } =
  CONSTANTS;

const columns = [
  { title: 'Group Code', dataProperty: 'group_code', },
  { title: 'Chit Amount', dataProperty: 'amount' },
  { title: 'Customers', dataProperty: 'total_members' },
  { title: 'Duration', dataProperty: 'duration', options: durationOptions },
  { title: 'Is Started', dataProperty: 'is_started', isDate: true },
  { title: 'Start Date', dataProperty: 'start_date', isDate: true },
  { title: 'End Date', dataProperty: 'end_date', isDate: true },
  { title: 'Active ', dataProperty: 'is_active' },
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
  const [pageList, setPageList] = useState([])

  const { groupsData, isManageCustomer, isDeleteGroup } = useSelector(
    (state: RootState) => state.group
  );

  const handleOnEdit = (data: any) => {
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
    const response = await GroupService.remove(Number(groupId), Number(currentUserID));
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
      return [ACTION_BTN.CREATE];
    } else {
      return [ACTION_BTN.EDIT, ACTION_BTN.DELETE, ACTION_BTN.CREATE];
    }
  };
  
  const pagination = () => {
    const start = currentPage * perPageSize - perPageSize;
    const end = Number(start) + perPageSize;
    setPageList(groupsData?.length ? groupsData.slice(Number(start), end) : []);
  }

  useEffect(() => {
    pagination()
  }, [isGroupsDataLoading, currentPage]);

  if (isManageCustomer) {
    return <ManageCustomer />;
  }

  return (
    <>
      <TopPanel panelType='top-panel'>
        <div className='top-panel-entity'>
          { groupsData?.length > 1 ? 'Groups' : 'Group'}
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
        data={pageList}
        action={checkActionPrivilege()}
        onEdit={handleOnEdit}
        onRemove={handleOnRemove}
        onManageCustomer={handleOnManageCustomer}
      />
      <Pagination
        perPage={perPageSize}
        totalPageRecords={groupsData?.length}
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
