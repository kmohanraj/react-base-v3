import Button from 'components/atoms/Button';
import Table from 'components/atoms/Table';
import TopPanel from 'components/molecules/TopPanel';
import { useDispatch, useSelector } from 'react-redux';
import { setGroup, setIsAddGroupBtnClicked, setIsEditGroupBtnClicked } from 'store/slice/groups.slice';
import { useEffect, useState } from 'react';
import Pagination from 'components/atoms/Pagination';
import CONSTANTS from 'constants/constants';
import useItToGetGroups from 'hooks/group/useItToGetGroups';
import { RootState } from 'store';


const { SESSION_STORAGE } = CONSTANTS;

const columns = [
  // { title: 'Group Name', dataProperty: 'group_name'},
  { title: 'Group Code', dataProperty: 'group_code' },
  { title: 'Chit Amount', dataProperty: 'amount' },
  { title: 'Customers', dataProperty: 'total_members' },
  { title: 'Duration', dataProperty: 'duration' },
  { title: 'Active ', dataProperty: 'is_active' },
  { title: 'Is Started', dataProperty: 'is_started' },
  { title: 'Start Date', dataProperty: 'start_date' },
  { title: 'End Date', dataProperty: 'end_date' },
];

const GroupTable = () => {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [perPageSize, setPerPageSize] = useState(10);

  const currentUserID = sessionStorage.getItem(SESSION_STORAGE.USER_ID_KEY)
  const [isGroupsDataLoading] = useItToGetGroups(Number(currentUserID))

  const { groupsData } = useSelector((state: RootState) => state.group)

  const start = currentPage * perPageSize - perPageSize
  const end = start + perPageSize;
  const datas = groupsData.slice(start, end)

  const hanldeOnEdit = (data: any) => {
    console.log('edit', data);
    dispatch(setIsAddGroupBtnClicked(true))
    dispatch(setIsEditGroupBtnClicked(true))
    dispatch(setGroup(data))
  };

  const handleOnRemove = (data: any) => {
    console.log('remove -item', data);
  };

  useEffect(() => {}, [isGroupsDataLoading])

  return (
    <>
      <TopPanel panelType='top-panel'>
        <span className='top-panel-entity'>No Results</span>
        <div className='top-panel-buttons'>
          <Button
            type='ghost'
            label='Export CSV'
            onClick={() => console.log('export group')}
          />
          <Button
            type='primary'
            label='Add Group'
            onClick={() => dispatch(setIsAddGroupBtnClicked(true))}
          />
        </div>
      </TopPanel>
      <Table
        tableName='group-table'
        columns={columns}
        data={datas}
        action={true}
        onEdit={hanldeOnEdit}
        onRemove={handleOnRemove}
      />
      <Pagination
        perPage={perPageSize}
        totalPageRecords={groupsData.length}
        currentPage={currentPage}
        maxVisibleButton={3}
        setCurrentPage={setCurrentPage}
        setPerPageSize={setPerPageSize}
      />
    </>
  );
};
export default GroupTable;
