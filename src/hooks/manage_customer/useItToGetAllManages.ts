import { useEffect, useState } from 'react';
import * as ManageService from 'service/manage_customer.service';
import * as ManageCustomerSlice from 'store/slice/manage_customer.slice';
import { useDispatch } from 'react-redux';

const useItToGetAllManages = (userId: number) => {
  const [loading, setLoading] = useState<boolean>(false)
  const dispatch = useDispatch()
  
  useEffect(() => {
    setLoading(true)
    ManageService.getAll(userId).then((response) => {
      console.log('RESPONSE', response.info)
      const result = response.info.map((ele: any) => ({
        id: ele.id,
        customer_name: ele.customers.customer_name,
        customer_code: ele.customers.customer_code,
        group_id: ele.group_id,
        taken_amount: ele.taken_amount,
        taken_at: ele.taken_at,
        taken_position: ele.taken_position
      }))
      dispatch(ManageCustomerSlice.setManageCustomers(result))
    }).catch((err: any) => {
      console.log(err)
      setLoading(false)
    })
  }, [])
  return [loading]
}

export default useItToGetAllManages;