import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as groupService from 'service/group.service';
import { setGroupsData } from 'store/slice/groups.slice';

const useItToGetGroups = (userId: number): [boolean] => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    groupService
      .getAll(userId)
      .then((response: any) => {
        dispatch(setGroupsData(response?.info));
        // const orgOptions = response?.info.map((ele: any) => ({
        //   id: ele.id,
        //   label: ele.org_name
        // }))
        // dispatch(setOrganizationOption(orgOptions))
        // dispatch(setIsOrgOptionLoading(false))
        setLoading(false);
      })
      .then((err: any) => {
        // console.log(err);
        setLoading(false);
      });
  }, []);
  return [loading];
};
export default useItToGetGroups;
