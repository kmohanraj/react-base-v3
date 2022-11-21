import Button from 'components/atoms/Button';
import Table from 'components/atoms/Table';
import TopPanel from 'components/molecules/TopPanel';
import { useDispatch } from 'react-redux';
import { setIsAddOrgBtnClicked } from 'store/slice/organizations.slice';
import organizationData from 'mockData/organizations.json';
import Pagination from 'components/atoms/Pagination';
import { useState } from 'react';

const columns = [
  { title: 'Organization Name', dataProperty: 'organization_name' },
  { title: 'Organization Email', dataProperty: 'organization_email' },
  { title: 'Branch Limit', dataProperty: 'branch_limit' },
  { title: 'Phone', dataProperty: 'phone' },
  { title: 'Status', dataProperty: 'status' },
];

const OrganizationTable = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [perPageSize, setPerPageSize] = useState(10);

  const hanldeOnEdit = (data: any) => {
    console.log('edit', data);
  };

  const handleOnRemove = (id: number) => {
    console.log('remove -item', id);
  };

  const start = currentPage * perPageSize - perPageSize
  const end = start + perPageSize;
  const pageListData = organizationData.slice(start, end)

  return (
    <>
      <TopPanel panelType='top-panel'>
        <span className='top-panel-entity'>No Results</span>
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
        totalPageRecords={organizationData.length}
        currentPage={currentPage}
        maxVisibleButton={3}
        setCurrentPage={setCurrentPage}
        setPerPageSize={setPerPageSize}
      />
    </>
  );
};
export default OrganizationTable;
