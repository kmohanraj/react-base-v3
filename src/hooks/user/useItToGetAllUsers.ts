import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import UserService from "service/user.service";
import { setUsersData } from "store/slice/users.slice";

const useItToGetAllUsers = (userId: number): [boolean] => {

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true)
    UserService.getAll(userId).then((response: any) => {
      console.log('users--------', response.info)
      dispatch(setUsersData(response?.info))
      setLoading(false)
    }).catch((response: any) => {
      setLoading(false)
      console.log(response.info)
    })
  }, [])

  return [loading]
}

export default useItToGetAllUsers;
