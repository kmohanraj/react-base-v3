import Button from 'components/atoms/Button';
import Table from 'components/atoms/Table';
import TopPanel from 'components/molecules/TopPanel';
import { useDispatch, useSelector } from 'react-redux';
import * as UserSlice from 'store/slice/users.slice';
import { useEffect, useState } from 'react';
import Pagination from 'components/atoms/Pagination';
import type { RootState } from 'store';
import useItToGetAllUsers from 'hooks/user/useItToGetAllUsers';
import CONSTANTS from 'constants/constants';
import ConfirmationModal from 'components/molecules/ConfirmationModal';
import userService from 'service/user.service';
import iziToast from 'izitoast';

const columns = [
  { title: 'Name', dataProperty: 'name' },
  { title: 'Email', dataProperty: 'email' },
  { title: 'Phone', dataProperty: 'phone' },
  { title: 'Role', dataProperty: 'roles', selector: 'name' },
  {
    title: 'Organization Name',
    dataProperty: 'organizations',
    selector: 'org_name'
  },
  { title: 'Branch Name', dataProperty: 'branches', selector: 'branch_name' },
  { title: 'Status', dataProperty: 'is_active'}
];

const { SESSION_STORAGE, ACTION_BTN, STATUS_CODE, TOAST_DEFAULTS } = CONSTANTS;

const UserTable = () => {
  const { usersData, isUserActive, isDeleteUser } = useSelector((state: RootState) => state.user);
  const currentUserID = sessionStorage.getItem(SESSION_STORAGE.USER_ID_KEY);
  const [isUsersLoading, handleRefreshUserTable] = useItToGetAllUsers(Number(currentUserID));
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [perPageSize, setPerPageSize] = useState(10);
  const [selectedUserId, setSelectedUserId] = useState<number>()
  const [actionMode, setActionMode] = useState<string>('')
  const [title, setTitle] = useState<string>('')
  const [status, setStatus] = useState<boolean>(false)
  const [userId, setUserId] = useState<number>()
  const [pageList, setPageList] = useState([])


  const handleOnEdit = (data: any) => {
    dispatch(UserSlice.setIsAddUser(true));
    dispatch(UserSlice.setUser(data));
    dispatch(UserSlice.setIsEditUser(true));
  };

  const handleOnRemove = (data: any) => {
    setUserId(data?.id)
    dispatch(UserSlice.setIsDelete(true))
    setActionMode('Delete')
  };

  const deleteUser = async () => {
    const response = await userService.remove(Number(userId), Number(currentUserID))
    if (response?.status === STATUS_CODE.STATUS_200) {
      iziToast.success({
        title: TOAST_DEFAULTS.SUCCESS_TITLE,
        message: response?.data?.info
      });
      dispatch(
        UserSlice.setUsersData(
          usersData.filter((ele: any) => ele.id !== userId)
        )
      );
      dispatch(UserSlice.setIsDelete(false));
    } else {
      iziToast.info({
        title: TOAST_DEFAULTS.SUCCESS_TITLE,
        message: response?.data?.info
      });
    }
  }

  const handleOnChangeStatus = (column: string, selectedItem: any) => {
    if (selectedItem?.id !== Number(currentUserID) && column === 'is_active') {
      dispatch(UserSlice.setIsUserActive(true))
      setSelectedUserId(selectedItem?.id)
      setActionMode(selectedItem?.is_active ? 'In Active' : 'Active');
      setTitle(selectedItem?.email)
      setStatus(selectedItem.is_active ? false : true)
    }
  }

  const handleOnStatus = async () => {
    const response = await userService.status(Number(selectedUserId), status, Number(currentUserID))
    if (response?.status === STATUS_CODE.STATUS_200) {
      iziToast.success({
        title: TOAST_DEFAULTS.SUCCESS_TITLE,
        message: response?.data?.info
      })
      dispatch(UserSlice.setIsUserActive(false))
      handleRefreshUserTable(true)
    } else {
      iziToast.info({
        title: TOAST_DEFAULTS.INFO_TITLE,
        message: response?.data?.info
      })
    }
  }
  
  const pagination = () => {
    const start = currentPage * perPageSize - perPageSize;
    const end = Number(start) + perPageSize;
    setPageList(usersData?.length ? usersData.slice(Number(start), end) : []);
  }

  useEffect(() => {
    pagination()
  }, [isUsersLoading, currentPage])

  return (
    <>
      <TopPanel panelType='top-panel'>
        <div className='top-panel-entity'>
          {usersData.length} {usersData.length > 1 ? 'users' : 'user'}
        </div>
        {/* <span className="top-panel-entity">No Results</span> */}
        <div className='top-panel-buttons'>
          <Button
            type='ghost'
            label='Export CSV'
            onClick={() => console.log('add organization')}
          />
          <Button
            type='primary'
            label='Add User'
            onClick={() => dispatch(UserSlice.setIsAddUser(true))}
          />
        </div>
      </TopPanel>
      <Table
        tableName='user-table'
        columns={columns}
        data={pageList}
        action={[ACTION_BTN.EDIT, ACTION_BTN.DELETE]}
        onEdit={handleOnEdit}
        onRemove={handleOnRemove}
        onChangeStatus={handleOnChangeStatus}
      />
      <Pagination
        perPage={perPageSize}
        totalPageRecords={usersData.length}
        currentPage={currentPage}
        maxVisibleButton={3}
        setCurrentPage={setCurrentPage}
        setPerPageSize={setPerPageSize}
      />
      <ConfirmationModal
        show={isUserActive || isDeleteUser}
        name={title}
        actionMode={actionMode}
        onClose={() =>{
          dispatch(UserSlice.setIsUserActive(false))
          dispatch(UserSlice.setIsDelete(false))
        }}
        onClick={isDeleteUser ? deleteUser : handleOnStatus }
      />
    </>
  );
};
export default UserTable;
