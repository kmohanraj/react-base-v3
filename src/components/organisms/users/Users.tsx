import { FC, Suspense, lazy } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from 'store';
import AddUser from './AddUser';
const UserTable = lazy(() => import('./UserTable'));

const Users: FC = () => {
  const { isAddUser } = useSelector((state: RootState) => state.user);

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        {!isAddUser ? <UserTable /> : <AddUser />}
      </Suspense>
    </>
  );
};
export default Users;
