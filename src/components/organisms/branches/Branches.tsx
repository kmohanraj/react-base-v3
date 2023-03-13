import { FC, lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from 'store';
import AddBranch from './AddBranch';
const BranchTable = lazy(() => import('./BranchTable'));

const Branches: FC = () => {
  const { isAddBranchBtnClicked } = useSelector(
    (state: RootState) => state.branch
  );
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        {!isAddBranchBtnClicked ? <BranchTable /> : <AddBranch />}
      </Suspense>
    </>
  );
};

export default Branches;
