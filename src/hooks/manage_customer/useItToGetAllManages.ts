import { useEffect, useState } from 'react';
import * as ManageService from 'service/manage_customer.service';
import * as ManageCustomerSlice from 'store/slice/manage_customer.slice';
import { useDispatch } from 'react-redux';

const useItToGetAllManages = (
  groupId: number,
  userId: number
): [boolean, (status: boolean) => void] => {
  const [loading, setLoading] = useState<boolean>(false);
  const [triggerRefresh, setTriggerRefresh] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    ManageService.getAll(groupId, userId)
      .then((response) => {
        const result = response.info.map((ele: any) => ({
          id: ele.id,
          customer_id: ele.customer_id,
          customer_name: ele.customers.customer_name,
          customer_code: ele.customers.customer_code,
          group_id: ele.group_id,
          collection_type_id: ele.collection_type_id,
          taken_amount: ele.taken_amount,
          taken_at: ele.taken_at,
          taken_position: ele.taken_position
        }));
        dispatch(ManageCustomerSlice.setManageCustomers(result));
        setTriggerRefresh(false);
        setLoading(false);
      })
      .catch((err: any) => {
        console.log(err);
        setLoading(false);
        setTriggerRefresh(false);
      });
  }, [dispatch, groupId, triggerRefresh, userId]);
  const handleRefreshManage = (status: boolean) => setTriggerRefresh(status);
  return [loading, handleRefreshManage];
};

export default useItToGetAllManages;
