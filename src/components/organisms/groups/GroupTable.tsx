import Button from 'components/atoms/Button';
import Table from 'components/atoms/Table';
import TopPanel from 'components/molecules/TopPanel';
import { useDispatch } from 'react-redux';
import { setIsAddGroupBtnClicked } from 'store/slice/groups.slice';
import groupsData from 'mockData/groups.json';
import { useState } from 'react';
import Pagination from 'components/atoms/Pagination';

const columns = [
  // { title: 'Group Name', dataProperty: 'group_name'},
  { title: 'Group Code', dataProperty: 'group_code' },
  { title: 'Chit Amount', dataProperty: 'chit_amount' },
  { title: 'Customers', dataProperty: 'total_customers' },
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

  const start = currentPage * perPageSize - perPageSize
  const end = start + perPageSize;
  const datas = groupsData.slice(start, end)

  const hanldeOnEdit = (id: number) => {
    console.log('edit', id);
  };

  const handleOnRemove = (data: any) => {
    console.log('remove -item', data);
  };

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
