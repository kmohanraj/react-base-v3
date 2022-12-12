import Button from 'components/atoms/Button';
import Table from 'components/atoms/Table';
import TopPanel from 'components/molecules/TopPanel';
import { setBranch, setIsAddBranchBtnClicked, setIsEditBranchBtnClicked } from 'store/slice/branchs.slice';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from 'components/atoms/Pagination';
import { useEffect, useState } from 'react';
import useToGetBranches from 'hooks/branch/useToGetBranches';
import type { RootState } from 'store';
import CONSTANTS from 'constants/constants';

const columns = [
  { title: 'Branch Name', dataProperty: 'branch_name' },
  { title: 'Branch Code', dataProperty: 'branch_code' },
  { title: 'Organization Name', dataProperty: 'organization_id' },
];

const BranchTable = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [perPageSize, setPerPageSize] = useState(10);
  const currentUserID = sessionStorage.getItem(CONSTANTS.SESSION_STORAGE.USER_ID_KEY)

  const [loading] = useToGetBranches(Number(currentUserID));
  const { branchesData } = useSelector((state: RootState) => state.branch)


  const handleOnEdit = (data: any) => {
    dispatch(setIsEditBranchBtnClicked(true))
    dispatch(setIsAddBranchBtnClicked(true))
    dispatch(setBranch(branchesData.filter((ele: any) => ele.id === data.id)[0]))
  };

  const handleOnRemove = () => {
    console.log('remove-branch');
  };

  // const onPageChanged = (page: any) => {
  //   setCurrentPage(page)
  // }

  const start = currentPage * perPageSize - perPageSize;
  const end = start + perPageSize;
  const pageListData = branchesData.slice(start, end);

  useEffect(() => {

  }, [loading])

  return (
    <>
      <TopPanel panelType='top-panel'>
        <div className='top-panel-entity'>{branchesData.length} {branchesData.length > 1 ? 'Branches' : 'Branch'}</div>
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
        totalPageRecords={branchesData.length}
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
