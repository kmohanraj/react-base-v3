import React from "react";
import DataTable from "react-data-table-component";
import { ITableProps } from "types/components.types";
import Image from "../Image";
import * as Icons from "constants/icons";

const Table = (props: ITableProps) => {
  return (
    <>
      <DataTable
        title={props.title}
        columns={props.cols}
        data={props.data}
        pagination={props.isPaginated}
        progressPending={props.loading}
        fixedHeader={true}
        fixedHeaderScrollHeight="600px"
        onSelectedRowsChange={(row) =>
          props.selectedRows ? props.selectedRows(row.selectedRows) : null
        }
        onChangePage={(page: number) =>
          props.onPageChange ? props.onPageChange(page) : null
        }
        // sortIcon={
        // <Image
        //   src={Icons.arrow1}
        //   alt="sort_icon"
        //   width={"24px"}
        //   height={"24px"}
        //   className="p-1"
        // />
        // }
      />
    </>
  );
};

export default Table;
