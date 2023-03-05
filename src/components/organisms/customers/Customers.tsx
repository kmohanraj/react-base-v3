import { FC, lazy } from 'react';
import type { RootState } from 'store';
import { useSelector } from 'react-redux';
import AddCustomer from './AddCustomer';
const CustomerTable = lazy(() => import('./CustomerTable'));

const Customers: FC = () => {
  const { isAddCustomer } = useSelector((state: RootState) => state.customer);

  return <>{!isAddCustomer ? <CustomerTable /> : <AddCustomer />}</>;
};
export default Customers;
