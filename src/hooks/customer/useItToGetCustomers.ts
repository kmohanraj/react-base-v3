import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as customerService from 'service/customer.service';
import { setCustomersData } from 'store/slice/customers.slice';

const useItToGetCustomers = (userId: number): [boolean] => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    customerService
      .getAll(userId)
      .then((response: any) => {
        dispatch(setCustomersData(response?.info));
        // const orgOptions = response?.info.map((ele: any) => ({
        //   id: ele.id,
        //   label: ele.org_name
        // }))
        // dispatch(setOrganizationOption(orgOptions))
        // dispatch(setIsOrgOptionLoading(false))
        setLoading(false);
      })
      .then((err: any) => {
        console.log(err);
        setLoading(false);
      });
  }, []);
  return [loading];
};
export default useItToGetCustomers;
