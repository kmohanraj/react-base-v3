import Button from 'components/atoms/Button';
import Table from 'components/atoms/Table';
import TopPanel from 'components/molecules/TopPanel';
import { useDispatch, useSelector } from 'react-redux';
import { setIsAddOrgBtnClicked, setIsEditOrgBtnClicked, setOrganization } from 'store/slice/organizations.slice';
import Pagination from 'components/atoms/Pagination';
import { useEffect, useState } from 'react';
import useItToGetOrganizations from 'hooks/organization/useItToGetOrganizations';
import { RootState } from 'store';
import CONSTANTS from 'constants/constants';
import Modal from 'components/atoms/Modal';

const columns = [
  { title: 'Organization Name', dataProperty: 'org_name' },
  { title: 'Organization Email', dataProperty: 'org_email' },
  { title: 'Branch Limit', dataProperty: 'branch_limit' },
  { title: 'Phone', dataProperty: 'org_phone' },
  { title: 'Status', dataProperty: 'is_active' },
];

const OrganizationTable = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [perPageSize, setPerPageSize] = useState(30);
  const currentUserID = sessionStorage.getItem(CONSTANTS.SESSION_STORAGE.USER_ID_KEY)

  const [loading] = useItToGetOrganizations(Number(currentUserID));
  const { organizationsData } = useSelector((state: RootState) => state.organization)

  const hanldeOnEdit = (data: any) => {
    dispatch(setIsAddOrgBtnClicked(true))
    dispatch(setOrganization(data))
    dispatch(setIsEditOrgBtnClicked(true))
  };

  const handleOnRemove = (id: number) => {
    console.log('remove -item', id);
  };

  const start = currentPage * perPageSize - perPageSize
  const end = start + perPageSize;
  const pageListData = organizationsData.slice(start, end)

  useEffect(() => {
    
  }, [loading])

  return (
    <>
      <TopPanel panelType='top-panel'>
        <div className='top-panel-entity'>{organizationsData.length} {organizationsData.length > 1 ? 'Oranizations' : 'Organization'}</div>
        <div className='top-panel-buttons'>
          <Button
            type='ghost'
            label='Export CSV'
            onClick={() => console.log('add organization')}
          />
          <Button
            type='primary'
            label='Add Organization'
            onClick={() => dispatch(setIsAddOrgBtnClicked(true))}
          />
        </div>
      </TopPanel>
      {/* <Modal children={(<h1>SSD</h1>)} /> */}
      <Table
        tableName='organization-table'
        columns={columns}
        data={pageListData}
        action={true}
        onEdit={hanldeOnEdit}
        onRemove={handleOnRemove}
      />
      <Pagination
        perPage={perPageSize}
        totalPageRecords={organizationsData.length}
        currentPage={currentPage}
        maxVisibleButton={3}
        setCurrentPage={setCurrentPage}
        setPerPageSize={setPerPageSize}
      />
    </>
  );
};
export default OrganizationTable;