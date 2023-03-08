import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import UserService from 'service/user.service';
import { setUsersData } from 'store/slice/users.slice';

const useItToGetAllUsers = (
  userId: number
): [boolean, (status: boolean) => void] => {
  const [loading, setLoading] = useState(false);
  const [triggerRefresh, setTriggerRefresh] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    UserService.getAll(userId)
      .then((response: any) => {
        dispatch(setUsersData(response?.info));
        setLoading(false);
        setTriggerRefresh(false);
      })
      .catch((response: any) => {
        setLoading(false);
        setTriggerRefresh(false);
        console.log(response.info);
      });
  }, [dispatch, triggerRefresh, userId]);

  const handleRefreshUserTable = (status: boolean) => setTriggerRefresh(status);
  return [loading, handleRefreshUserTable];
};

export default useItToGetAllUsers;
