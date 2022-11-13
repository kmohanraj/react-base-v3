import { FC } from 'react';
import type { RootState } from 'store';
import { useSelector } from 'react-redux';
import CustomerTable from './CustomerTable';
import AddCustomer from './AddCustomer';

const Customers: FC = () => {
  const { isAddCustomerBtnClicked } = useSelector(
    (state: RootState) => state.customer
  );

  return <>{!isAddCustomerBtnClicked ? <CustomerTable /> : <AddCustomer />}</>;
};
export default Customers;
