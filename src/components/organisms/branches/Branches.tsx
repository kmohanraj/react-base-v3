import { FC, Suspense } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from 'store';
import AddBranch from './AddBranch';
import BranchTable from './BranchTable';

const Branches: FC = () => {
  const { isAddBranchButtonClicked } = useSelector(
    (state: RootState) => state.branch
  );
  return (
    <>
      <Suspense>
        {!isAddBranchButtonClicked ? <BranchTable /> : <AddBranch />}
      </Suspense>
    </>
  );
};

export default Branches;
