import { FC, lazy } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from 'store';
import AddGroup from './AddGroup';
const GroupTable = lazy(() => import('./GroupTable'))

const Groups: FC = () => {
  const { isAddGroupBtnClicked } = useSelector(
    (state: RootState) => state.group
  );
  return <>{!isAddGroupBtnClicked ? <GroupTable /> : <AddGroup />}</>;
};
export default Groups;
