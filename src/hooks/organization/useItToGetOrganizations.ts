import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import organizationService from 'service/organization.service';
import {
  setIsOrgOptionLoading,
  setOrganizationOption,
  setOrganizationsData
} from 'store/slice/organizations.slice';

const useItToGetOrganizations = (userId: number): [boolean, (status: boolean) =>  void] => {
  const [loading, setLoading] = useState(false);
  const [triggerRefresh, setIsTriggerRefresh] = useState<boolean>(false)
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    organizationService
      .getAll(userId)
      .then((response: any) => {
        dispatch(setOrganizationsData(response?.info));
        const data = response?.info.filter(
          (ele: any) => ele.is_active !== false
        );
        const orgOptions = data.map((ele: any) => ({
          id: ele.id,
          label: ele.org_name
        }));
        dispatch(setOrganizationOption(orgOptions));
        dispatch(setIsOrgOptionLoading(false));
        setLoading(false);
        setIsTriggerRefresh(false)
      })
      .then((err: any) => {
        setLoading(false);
        setIsTriggerRefresh(false)
      });
  }, [dispatch, userId, triggerRefresh]);

  const handleRefreshUserTable = (status: boolean) =>  setIsTriggerRefresh(status)

  return [loading, handleRefreshUserTable];
};
export default useItToGetOrganizations;
