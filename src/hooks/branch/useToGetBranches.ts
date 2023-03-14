import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import BranchService from 'service/branch.service';
import { setBranchesData, setBranchOption } from 'store/slice/branches.slice';

const useToGetBranches = (userId: number): [boolean] => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    BranchService.getAll(userId)
      .then((response: any) => {
        // const columnData = response?.info.map((ele: any) => ({
        //   id: ele.id,
        //   branch_name: ele.branch_name,
        //   branch_code: ele.branch_code,
        //   organization_id: ele.organizations.org_name

        // }))
        dispatch(setBranchesData(response?.info));
        const branchOption = response?.info.map((ele: any) => ({
          id: ele.id,
          label: ele.branch_name
        }));
        dispatch(setBranchOption(branchOption));
        setLoading(false);
      })
      .catch((response) => {
        setLoading(false);
        return response;
      });
  }, [dispatch, userId]);
  return [loading];
};

export default useToGetBranches;
