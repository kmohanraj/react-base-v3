import Button from 'components/atoms/Button';
import Table from 'components/atoms/Table';
import TopPanel from 'components/molecules/TopPanel';
import * as BranchSlice from 'store/slice/branches.slice';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from 'components/atoms/Pagination';
import { useEffect, useState } from 'react';
import useToGetBranches from 'hooks/branch/useToGetBranches';
import type { RootState } from 'store';
import CONSTANTS from 'constants/constants';
import BranchService from 'service/branch.service';
import iziToast from 'izitoast';
import ConfirmationModal from 'components/molecules/ConfirmationModal';

const columns = [
  { title: 'Branch Name', dataProperty: 'branch_name' },
  { title: 'Branch Code', dataProperty: 'branch_code' },
  {
    title: 'Organization Name',
    dataProperty: 'organizations',
    selector: 'org_name'
  }
];

const { SESSION_STORAGE, ACTION_BTN, STATUS_CODE, TOAST_DEFAULTS } = CONSTANTS;

const BranchTable = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [perPageSize, setPerPageSize] = useState(10);
  const currentUserID = sessionStorage.getItem(SESSION_STORAGE.USER_ID_KEY);
  const [title, setTitle] = useState<string>('');
  const [actionMode, setActionMode] = useState<string>('');
  const [branchId, setBranchId] = useState<number>();
  const [loading] = useToGetBranches(Number(currentUserID));
  const [pageList, setPageList] = useState([])
  const { branchesData, isDeleteBranchBtnClicked } = useSelector(
    (state: RootState) => state.branch
  );

  const handleOnEdit = (data: any) => {
    dispatch(BranchSlice.setIsEditBranchBtnClicked(true));
    dispatch(BranchSlice.setIsAddBranchBtnClicked(true));
    dispatch(
      BranchSlice.setBranch(
        branchesData.filter((ele: any) => ele.id === data.id)[0]
      )
    );
  };

  const handleOnDelete = async (data: any) => {
    dispatch(BranchSlice.setIsDeleteBranchBtnClicked(true));
    setBranchId(data.id);
    setTitle(data.branch_name);
    setActionMode('Delete');
  };

  const deleteBranch = async () => {
    const branch = await BranchService.remove(
      Number(branchId),
      Number(currentUserID)
    );
    if (branch?.status === STATUS_CODE.STATUS_200) {
      iziToast.success({
        title: TOAST_DEFAULTS.SUCCESS_TITLE,
        message: branch?.data?.info
      });
      dispatch(
        BranchSlice.setBranchesData(
          branchesData.filter((ele: any) => ele.id !== branchId)
        )
      );
      setPageList(pageList.filter((ele: any) => ele.id !== branchId))
      dispatch(BranchSlice.setIsDeleteBranchBtnClicked(false));
    } else {
      iziToast.info({
        title: TOAST_DEFAULTS.SUCCESS_TITLE,
        message: branch?.data?.info
      });
    }
  };

  // const onPageChanged = (page: any) => {
  //   setCurrentPage(page)
  // }

  const pagination = () => {
    const start = currentPage * perPageSize - perPageSize;
    const end = Number(start) + perPageSize;
    setPageList(branchesData?.length ? branchesData.slice(Number(start), end) : []);
  }

  useEffect(() => {
    pagination()
  }, [loading, currentPage]);

  return (
    <>
      <TopPanel panelType='top-panel'>
        <div className='top-panel-entity'>
          {branchesData?.length > 1 ? `${branchesData?.length} Branches` : `${branchesData?.length} Branch`}
        </div>
        <div className='top-panel-buttons'>
          <Button
            type='ghost'
            label='Export CSV'
            onClick={() => console.log('add branch')}
          />
          <Button
            type='primary'
            label='Add Branch'
            onClick={() => dispatch(BranchSlice.setIsAddBranchBtnClicked(true))}
          />
        </div>
      </TopPanel>
      <Table
        tableName='branch-table'
        columns={columns}
        data={pageList}
        action={[ACTION_BTN.EDIT, ACTION_BTN.DELETE]}
        onEdit={handleOnEdit}
        onRemove={handleOnDelete}
      />
      <Pagination
        perPage={perPageSize}
        totalPageRecords={branchesData?.length}
        currentPage={currentPage}
        // onPageChanged={(page: any) => onPageChanged(page) }
        maxVisibleButton={3}
        setCurrentPage={setCurrentPage}
        setPerPageSize={setPerPageSize}
      />
      <ConfirmationModal
        show={isDeleteBranchBtnClicked}
        name={title}
        actionMode={actionMode}
        onClose={() => {
          dispatch(BranchSlice.setIsDeleteBranchBtnClicked(false));
        }}
        onClick={deleteBranch}
      />
    </>
  );
};

export default BranchTable;
