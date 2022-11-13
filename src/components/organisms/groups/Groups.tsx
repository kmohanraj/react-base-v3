import { FC } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from 'store';
import GroupTable from './GroupTable';
import AddGroup from './AddGroup';

const Groups: FC = () => {
  const { isAddGroupBtnClicked } = useSelector(
    (state: RootState) => state.group
  );

  return <>{!isAddGroupBtnClicked ? <GroupTable /> : <AddGroup />}</>;
};
export default Groups;
