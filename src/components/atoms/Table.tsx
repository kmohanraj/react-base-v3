import React, { FC } from 'react';
import 'styles/table.scss';
import * as Icons from 'constants/icons';
import ErrorPage from 'components/atoms/ErrorPage';
import moment from 'moment';

type TableType = {
  tableName: string;
  columns: {
    title: string;
    dataProperty: any;
    selector?: any;
    isDate?: any;
    isTime?: any;
    options?: {};
  }[];
  data: any[];
  action?: string[];
  onEdit: (data: any) => void;
  onRemove: (id: number) => void;
  onManageCustomer?: (data: any) => void;
  onChangeStatus?: (columnName: string, selectedItem: any) => void;
};

const Table: FC<TableType> = ({
  tableName,
  columns,
  data,
  action,
  onEdit,
  onRemove,
  onManageCustomer,
  onChangeStatus
}) => {

  const handleOnEdit = (selectedRow: any, selectedId: any) => {
    onEdit(selectedRow);
  };
  const handleOnRemove = (data: any) => {
    onRemove(data);
  };

  const handleOnManageCustomer = (selectedRow: any) => {
    onManageCustomer && onManageCustomer(selectedRow);
  };

  if (data.length === 0) {
    return <ErrorPage />;
  }

  const manageData = (
    filterColumn: any,
    selector: string,
    isDate: boolean,
    isTime: boolean,
    options: any
  ) => {
    if (isDate) {
      return moment(filterColumn)
        .utcOffset(330)
        .format(isTime ? 'DD/MM/YYYY : hh:mm' : 'DD/MM/YYYY');
    } else if (typeof filterColumn === 'string') {
      return filterColumn ?? '';
    } else if (typeof filterColumn === 'number') {
      return (
        options &&
        options.filter((ele: any) => ele.id === filterColumn)[0].label
      );
    } else if (filterColumn !== null && typeof filterColumn === 'object') {
      return filterColumn[selector];
    } else if (typeof filterColumn === 'boolean') {
      return filterColumn === true ? (
        <span className='active'>Active</span>
      ) : (
        <span className='in-active'>In-Active</span>
      );
    } else {
      return '';
    }
  };

  return (
    <div className='table-wrapper'>
      <table className={`table ${tableName}`}>
        <thead>
          <tr>
            {columns.map((col, i) => (
              <th key={i}>{col.title}</th>
            ))}
            {action && <th className='action-head'>Action</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((d, j) => (
            <tr key={j}>
              {columns.map((col, k) => (
                <>
                  <td
                    key={col.dataProperty + k}
                    onClick={() =>
                      onChangeStatus && onChangeStatus(col.dataProperty, d)
                    }
                  >
                    <>
                      {manageData(
                        d[col.dataProperty],
                        col.selector,
                        col.isDate,
                        col.isTime,
                        col.options
                      )}
                    </>
                  </td>
                </>
              ))}
              {action && (
                <td className='actions'>
                  <div className='action-container'>
                    {action.map((ac: string) => (
                      <>
                        {ac === 'Edit' && (
                          <span onClick={() => handleOnEdit(d, j)}>
                            <img src={Icons.edit} alt='Edit' />
                          </span>
                        )}
                        {ac === 'Delete' && (
                          <span onClick={() => handleOnRemove(d)}>
                            <img src={Icons.deleteIcon} alt='Delete' />
                          </span>
                        )}
                        {ac === 'Create' && (
                          <span onClick={() => handleOnManageCustomer(d)}>
                            <img src={Icons.addGroup} alt='Manage Customer' />
                          </span>
                        )}
                      </>
                    ))}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
