import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import organizationService from 'service/organization.service';
import { setIsOrgOptionLoading, setOrganizationOption, setOrganizationsData } from 'store/slice/organizations.slice';

const useItToGetOrganizations = (userId: number): [boolean] => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    organizationService
      .getAll(userId)
      .then((response: any) => {
        dispatch(setOrganizationsData(response?.info));
        const orgOptions = response?.info.map((ele: any) => ({
          id: ele.id,
          label: ele.org_name
        }))
        dispatch(setOrganizationOption(orgOptions))
        dispatch(setIsOrgOptionLoading(false))
        setLoading(false);
      })
      .then((err: any) => {
        console.log(err);
        setLoading(false);
      });
  }, []);
  return [loading];
};
export default useItToGetOrganizations;
