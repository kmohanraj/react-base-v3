import { FC, Suspense } from "react";
import UserTable from "./UserTable";
import { useSelector } from "react-redux";
import type { RootState } from "store";
import AddUser from "./AddUser";

const Users: FC = () => {
  const { isAddUserBtnClicked } = useSelector((state: RootState) => state.user)

  return (
    <>
    <Suspense>
      {!isAddUserBtnClicked ? <UserTable /> : <AddUser /> }
    </Suspense>
    </>
  )
}
export default Users;
