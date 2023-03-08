import Button from 'components/atoms/Button';
import Table from 'components/atoms/Table';
import TopPanel from 'components/molecules/TopPanel';
import { useDispatch, useSelector } from 'react-redux';
import * as OrgSlice from 'store/slice/organizations.slice';
import Pagination from 'components/atoms/Pagination';
import { useEffect, useState } from 'react';
import useItToGetOrganizations from 'hooks/organization/useItToGetOrganizations';
import { RootState } from 'store';
import CONSTANTS from 'constants/constants';
import ConfirmationModal from 'components/molecules/ConfirmationModal';
import organizationService from 'service/organization.service';
import iziToast from 'izitoast';

const columns = [
  { title: 'Organization Name', dataProperty: 'org_name' },
  { title: 'Organization Email', dataProperty: 'org_email' },
  { title: 'Branch Limit', dataProperty: 'branch_limit' },
  { title: 'Group Limit', dataProperty: 'group_limit' },
  { title: 'Phone', dataProperty: 'org_phone' },
  { title: 'Status', dataProperty: 'is_active' }
];

const { SESSION_STORAGE, ACTION_BTN, STATUS_CODE, TOAST_DEFAULTS } = CONSTANTS;

const OrganizationTable = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [perPageSize, setPerPageSize] = useState(30);
  const currentUserID = sessionStorage.getItem(SESSION_STORAGE.USER_ID_KEY);
  const [title, setTitle] = useState<string>('');
  const [actionMode, setActionMode] = useState<string>('');
  const [currentOrgId, setCurrentOrgId] = useState<number>()
  const [status, setStatus] = useState<boolean>(false)
  const [pageList, setPageList] = useState([])

  const [loading, handleRefreshOrgTable] = useItToGetOrganizations(Number(currentUserID));
  const { organizationsData, isDeleteOrg, isStatus } = useSelector(
    (state: RootState) => state.organization
  );

  const handleOnEdit = (data: any) => {
    dispatch(OrgSlice.setIsAddOrgBtnClicked(true));
    dispatch(OrgSlice.setOrganization(data));
    dispatch(OrgSlice.setIsEditOrgBtnClicked(true));
  };

  const handleOnRemove = (data: any) => {
    setCurrentOrgId(data?.id)
    dispatch(OrgSlice.setIsDeleteOrg(true))
    setTitle(data.org_name);
    setActionMode('Delete');
  };

  const deleteOrg = async () => {
    const response = await organizationService.remove(Number(currentOrgId), Number(currentUserID))
    if (response?.status === STATUS_CODE.STATUS_200) {
      iziToast.success({
        title: TOAST_DEFAULTS.SUCCESS_TITLE,
        message: response?.data?.info
      });
      dispatch(
        OrgSlice.setOrganizationsData(
          organizationsData.filter((ele: any) => ele.id !== currentOrgId)
        )
      );
      dispatch(OrgSlice.setIsDeleteOrg(false));
    } else {
      iziToast.info({
        title: TOAST_DEFAULTS.SUCCESS_TITLE,
        message: response?.data?.info
      });
    }
  }

  const handleOnChangeStatus = (column: string, selectedItem: any) => {
    if (column === 'is_active') {
      dispatch(OrgSlice.setIsStatus(true))
      setCurrentOrgId(selectedItem?.id)
      setStatus(selectedItem.is_active ? false : true)
      setActionMode(selectedItem.is_active ? 'In Active' : 'Active');
      setTitle(selectedItem.org_name);
    }
  };

  const handleOnStatus = async () => {
    const response = await organizationService.status(Number(currentOrgId), status, Number(currentUserID))
    if (response?.status === STATUS_CODE.STATUS_200) {
      iziToast.success({
        title: TOAST_DEFAULTS.SUCCESS_TITLE,
        message: response?.data?.info
      })
      dispatch(OrgSlice.setIsStatus(false))
      handleRefreshOrgTable(true)
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
    setPageList(organizationsData?.length ? organizationsData.slice(Number(start), end) : []);
  }

  useEffect(() => {
    pagination()
  },[loading]);

  return (
    <>
      <TopPanel panelType='top-panel'>
        <div className='top-panel-entity'>
          {organizationsData?.length}{' '}
          {organizationsData?.length > 1 ? 'Organizations' : 'Organization'}
        </div>
        <div className='top-panel-buttons'>
          <Button
            type='ghost'
            label='Export CSV'
            onClick={() => console.log('add organization')}
          />
          <Button
            type='primary'
            label='Add Organization'
            onClick={() => dispatch(OrgSlice.setIsAddOrgBtnClicked(true))}
          />
        </div>
      </TopPanel>
      <Table
        tableName='organization-table'
        columns={columns}
        data={pageList}
        action={[ACTION_BTN.EDIT, ACTION_BTN.DELETE]}
        onEdit={handleOnEdit}
        onRemove={handleOnRemove}
        onChangeStatus={handleOnChangeStatus}
      />
      <Pagination
        perPage={perPageSize}
        totalPageRecords={organizationsData?.length}
        currentPage={currentPage}
        maxVisibleButton={3}
        setCurrentPage={setCurrentPage}
        setPerPageSize={setPerPageSize}
      />
      <ConfirmationModal
        show={isDeleteOrg || isStatus}
        name={title}
        actionMode={actionMode}
        onClose={() => {
          dispatch(OrgSlice.setIsDeleteOrg(false));
          dispatch(OrgSlice.setIsStatus(false))
        }}
        onClick={isDeleteOrg ? deleteOrg : handleOnStatus}
      />
    </>
  );
};
export default OrganizationTable;
