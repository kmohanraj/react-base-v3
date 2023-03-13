import { FC, Suspense, lazy } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from 'store';
import AddOrganization from './AddOrganization';
const OrganizationTable = lazy(() => import('./OrganizationTable'));

const Organizations: FC = () => {
  const { isAddOrgBtnClicked } = useSelector(
    (state: RootState) => state.organization
  );

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        {!isAddOrgBtnClicked ? <OrganizationTable /> : <AddOrganization />}
      </Suspense>
    </>
  );
};
export default Organizations;
