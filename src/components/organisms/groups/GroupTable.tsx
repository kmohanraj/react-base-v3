import Button from 'components/atoms/Button';
import Table from 'components/atoms/Table';
import TopPanel from 'components/molecules/TopPanel';
import { useDispatch } from 'react-redux';
import { setIsAddGroupBtnClicked } from 'store/slice/groups.slice';

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

const datas = [
  {
    id: 1,
    group_code: 'ASNOV01',
    chit_amount: '100000',
    total_customers: '10',
    duration: '10 months',
    is_active: 'Yes',
    is_started: 'No',
    start_date: '19/01/2022',
    end_date: '19/11/2022',
  },
  {
    id: 2,
    group_code: 'ASNOV01',
    chit_amount: '200000',
    total_customers: '20',
    duration: '20 months',
    is_active: 'Yes',
    is_started: 'Yes',
    start_date: '19/01/2022',
    end_date: '19/10/2023',
  },
];

const GroupTable = () => {
  const dispatch = useDispatch();
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
    </>
  );
};
export default GroupTable;
