import { FC, lazy } from 'react';
import type { RootState } from 'store';
import { useSelector } from 'react-redux';
import AddCustomer from './AddCustomer';
const  CustomerTable = lazy(() => import('./CustomerTable'));

const Customers: FC = () => {
  const { isAddCustomerBtnClicked } = useSelector(
    (state: RootState) => state.customer
  );

  return <>{!isAddCustomerBtnClicked ? <CustomerTable /> : <AddCustomer />}</>;
};
export default Customers;
