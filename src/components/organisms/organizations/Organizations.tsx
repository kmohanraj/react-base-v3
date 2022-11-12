import { FC } from "react";
import OrganizationTable from "./OrganizationTable";
import { useSelector } from "react-redux";
import type { RootState } from "store";
import AddOrganization from "./AddOrganization";

const Organizations: FC = () => {
  const { isAddOrgBtnClicked } = useSelector((state: RootState) => state.organization)
  
  return (
    <>
      { !isAddOrgBtnClicked ? (<OrganizationTable />) : <AddOrganization />}
    </>
  );
};
export default Organizations;
