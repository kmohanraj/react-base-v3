import { FC } from "react";
import TopPanel from "components/molecules/TopPanel";
import Button from "components/atoms/Button";

const Customers: FC = () => {
  return (
    <>
     <TopPanel panelType="top-panel">
        <span className="top-panel-entity">No Results</span>
        <div className="top-panel-buttons">
          <Button type='ghost' label='Export CSV' onClick={() => console.log('add branch')} />
          <Button type='primary' label='Add Customer' onClick={() => console.log('add customer')} />
        </div>
      </TopPanel>
    </>
  )
}
export default Customers;
