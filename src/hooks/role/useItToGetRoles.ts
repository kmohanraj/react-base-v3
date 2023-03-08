import { useEffect, useState } from 'react';
import getRoles from 'service/role.service';
import { useDispatch } from 'react-redux';
import { setRoles } from 'store/slice/role.slice';
import { toast } from 'components/atoms/Toast';

const useItToGetRoles = (userId: number): [boolean] => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getRoles(userId)
      .then((response: any) => {
        const roles = response?.info.map((ele: any) => ({
          id: ele.id,
          label: ele.name
        }));
        dispatch(setRoles(roles));
        setLoading(false);
        // toast.info({title: 'success', message: 'success'})
      })
      .catch((response: any) => {
        setLoading(false);
        console.log('response', response.info);
      });
  }, []);
  return [loading];
};

export default useItToGetRoles;
