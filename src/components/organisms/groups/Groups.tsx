import { FC, Suspense, lazy } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from 'store';
import AddGroup from './AddGroup';
const GroupTable = lazy(() => import('./GroupTable'));

const Groups: FC = () => {
  const { isAddGroup } = useSelector((state: RootState) => state.group);
  return (
    <>
      <Suspense fallback={<>Loading...</>}>
        {!isAddGroup ? <GroupTable /> : <AddGroup />}
      </Suspense>
    </>
  );
};
export default Groups;
