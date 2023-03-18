import Cards from 'components/atoms/Cards';
import { FC } from 'react';
import Table from 'components/atoms/Table';
import InfoBox from 'components/atoms/InfoBox';
import useItToRupees from 'hooks/common/useItToRupees';

const columns = [
  { title: 'Customer Code', dataProperty: 'customer_code' },
  { title: 'Group Code', dataProperty: 'group_code' },
  { title: 'Amount', dataProperty: 'collection_amount' },
  {
    title: 'Date',
    dataProperty: 'updated_at',
    isDate: true,
    isTime: true
  },
  { title: 'Created By', dataProperty: 'created_by' }
];

const data = [
  {
    customer_code: 'CS0923',
    group_code: 'FGS0342',
    collection_amount: '12',
    updated_at: '123',
    created_by: 'mohan'
  },
  {
    customer_code: 'CS0923',
    group_code: 'FGS0342',
    collection_amount: '12',
    updated_at: '123',
    created_by: 'mohan'
  }
];

const DashboardPage: FC = () => {
  const collectionData = [
    {
      id: 1,
      label: 'Today Collection',
      amount: useItToRupees('2000')
    },
    {
      id: 2,
      label: 'Total Collection',
      amount: useItToRupees('10000')
    },
    {
      id: 3,
      label: 'Today Expenses',
      amount: useItToRupees('40000')
    },
    {
      id: 4,
      label: 'Total Expenses',
      amount: useItToRupees('3000')
    }
  ];
  const userData = [
    {
      id: 1,
      label: 'Active Customers',
      amount: '2,400'
    },
    {
      id: 2,
      label: 'Active Branches',
      amount: '19'
    },
    {
      id: 3,
      label: 'Active Employees',
      amount: '170'
    }
  ];
  return (
    <div className='home-page'>
      <section className='col-4 collection-details'>
        <Cards cardData={collectionData} />
      </section>
      <section className='col-2'>
        <div className='collection-history'>
          <h4>Latest Collection</h4>
          <Table
            tableName='dashboard-collection'
            columns={columns}
            onEdit={() => {}}
            onRemove={() => {}}
            data={data}
          />
        </div>
        <section>
          <InfoBox />
          <InfoBox />
          <InfoBox />
        </section>
      </section>
      <section className='col-3'>
        <Cards cardData={userData} />
      </section>
    </div>
  );
};

export default DashboardPage;
