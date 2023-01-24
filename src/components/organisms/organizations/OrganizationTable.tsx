import Button from 'components/atoms/Button';
import Table from 'components/atoms/Table';
import TopPanel from 'components/molecules/TopPanel';
import { useDispatch, useSelector } from 'react-redux';
import * as OrgSlice from 'store/slice/organizations.slice';
import { setIsModalShow } from 'store/slice/groups.slice';
import Pagination from 'components/atoms/Pagination';
import { useEffect, useState } from 'react';
import useItToGetOrganizations from 'hooks/organization/useItToGetOrganizations';
import { RootState } from 'store';
import CONSTANTS from 'constants/constants';
import ConfirmationModal from 'components/molecules/ConfirmationModal';

const columns = [
  { title: 'Organization Name', dataProperty: 'org_name' },
  { title: 'Organization Email', dataProperty: 'org_email' },
  { title: 'Branch Limit', dataProperty: 'branch_limit' },
  { title: 'Group Limit', dataProperty: 'group_limit'},
  { title: 'Phone', dataProperty: 'org_phone' },
  { title: 'Status', dataProperty: 'is_active' },
];

const { SESSION_STORAGE, ACTION_BTN } = CONSTANTS;

const OrganizationTable = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [perPageSize, setPerPageSize] = useState(30);
  const currentUserID = sessionStorage.getItem(SESSION_STORAGE.USER_ID_KEY)
  const [title, setTitle] = useState<string>('')
  const [actionMode, setActionMode] = useState<string>('')

  const [loading] = useItToGetOrganizations(Number(currentUserID));
  const { organizationsData } = useSelector((state: RootState) => state.organization)

  const handleOnEdit = (data: any) => {
    dispatch(OrgSlice.setIsAddOrgBtnClicked(true))
    dispatch(OrgSlice.setOrganization(data))
    dispatch(OrgSlice.setIsEditOrgBtnClicked(true))
  };

  const handleOnRemove = (data: any) => {
    dispatch(setIsModalShow(true))
    setTitle(data.org_name)
    setActionMode('Delete')
    console.log('remove -item', data.id);
  };
  const handleOnChangeStatus = (column: string, selectedItem: any) => {
    if(column === 'is_active') {
      setActionMode(selectedItem.is_active ? 'In Active' : 'Active')
      setTitle(selectedItem.org_name)
      dispatch(setIsModalShow(true))
    }
  }

  const start = currentPage * perPageSize - perPageSize
  const end = start + perPageSize;
  const pageListData = organizationsData.slice(start, end) ?? []

  useEffect(() => {
    
  }, [loading])

  return (
    <>
      <TopPanel panelType='top-panel'>
        <div className='top-panel-entity'>{organizationsData.length} {organizationsData.length > 1 ? 'Organizations' : 'Organization'}</div>
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
        data={pageListData}
        action={[ACTION_BTN.EDIT, ACTION_BTN.DELETE]}
        onEdit={handleOnEdit}
        onRemove={handleOnRemove}
        onChangeStatus={handleOnChangeStatus}
      />
      <Pagination
        perPage={perPageSize}
        totalPageRecords={organizationsData.length}
        currentPage={currentPage}
        maxVisibleButton={3}
        setCurrentPage={setCurrentPage}
        setPerPageSize={setPerPageSize}
      />
      <ConfirmationModal name={title} actionMode={actionMode} onCancel={() => {
        dispatch(setIsModalShow(false))
      }} onClose={() => {
        dispatch(setIsModalShow(false))
      }} onClick={() => {}} />
    </>
  );
};
export default OrganizationTable;