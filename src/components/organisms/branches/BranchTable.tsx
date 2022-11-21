import Button from 'components/atoms/Button';
import Table from 'components/atoms/Table';
import TopPanel from 'components/molecules/TopPanel';
import { setIsAddBranchBtnClicked } from 'store/slice/branchs.slice';
import { useDispatch } from 'react-redux';
import Pagination from 'components/atoms/Pagination';
import { useState } from 'react';
import branchData from 'mockData/branch.json';

const columns = [
  { title: 'Branch Name', dataProperty: 'branch_name' },
  { title: 'Branch Code', dataProperty: 'branch_code' },
  { title: 'Location', dataProperty: 'location' },
  { title: 'Organization Name', dataProperty: 'organization_id' },
];

const BranchTable = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [perPageSize, setPerPageSize] = useState(10);

  const handleOnEdit = () => {
    console.log('edit-branch');
  };

  const handleOnRemove = () => {
    console.log('remove-branch');
  };

  // const onPageChanged = (page: any) => {
  //   setCurrentPage(page)
  // }

  const start = currentPage * perPageSize - perPageSize;
  const end = start + perPageSize;
  const pageListData = branchData.slice(start, end);

  return (
    <>
      <TopPanel panelType='top-panel'>
        <div className='top-panel-entity'>{branchData.length} {branchData.length > 1 ? 'Branches' : 'Branch'}</div>
        <div className='top-panel-buttons'>
          <Button
            type='ghost'
            label='Export CSV'
            onClick={() => console.log('add branch')}
          />
          <Button
            type='primary'
            label='Add Branch'
            onClick={() => dispatch(setIsAddBranchBtnClicked(true))}
          />
        </div>
      </TopPanel>
      <Table
        tableName='branch-table'
        columns={columns}
        data={pageListData}
        action={true}
        onEdit={handleOnEdit}
        onRemove={handleOnRemove}
      />
      <Pagination
        perPage={perPageSize}
        totalPageRecords={branchData.length}
        currentPage={currentPage}
        // onPageChanged={(page: any) => onPageChanged(page) }
        maxVisibleButton={3}
        setCurrentPage={setCurrentPage}
        setPerPageSize={setPerPageSize}
      />
    </>
  );
};

export default BranchTable;
