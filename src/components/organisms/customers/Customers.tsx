import { FC, Suspense, lazy } from 'react';
import type { RootState } from 'store';
import { useSelector } from 'react-redux';
import AddCustomer from './AddCustomer';
const CustomerTable = lazy(() => import('./CustomerTable'));

const Customers: FC = () => {
  const { isAddCustomer } = useSelector((state: RootState) => state.customer);

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        {!isAddCustomer ? <CustomerTable /> : <AddCustomer />}
      </Suspense>
    </>
  );
};
export default Customers;
