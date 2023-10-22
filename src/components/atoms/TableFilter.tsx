import React, { FC } from "react";
import Input from "./TextField";
import "styles/table-filter.scss";
import * as Icons from "constants/icons";

interface ITableFilter {
  inputId: string;
  placeholder: string;
  filterText: string;
  onChange: (value: string) => void;
  suffixOnClick: () => void;
}

const TableFilter: FC<ITableFilter> = ({
  inputId,
  placeholder,
  filterText,
  onChange,
  suffixOnClick,
}) => {
  return (
    <div className="filter-section">
      <Input
        inputId={inputId}
        placeholder={placeholder}
        value={filterText}
        onChange={(e) => onChange(e.target.value)}
        sufFixIcon={filterText ? Icons.close : Icons.search}
        suffixOnClick={suffixOnClick}
      />
    </div>
  );
};
export default TableFilter;
