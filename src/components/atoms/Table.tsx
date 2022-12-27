import React, { FC, useState } from 'react';
import 'styles/table.scss';
import editIcon from 'assets/images/edit.svg';
import deleteIcon from 'assets/images/delete.svg';

type TableType = {
  tableName: string;
  columns: {
    title: string;
    dataProperty: string;
  }[];
  data: any[];
  action?: true;
  onEdit: (data: any) => void;
  onRemove: (id: number) => void;
};

const Table: FC<TableType> = ({
  tableName,
  columns,
  data,
  action,
  onEdit,
  onRemove,
}) => {
  const [selected, setSelected] = useState<number>();

  const handleOnEdit = (selectedRow: any, selectedId: any) => {
    setSelected(selectedId);
    onEdit(selectedRow);
  };
  const handleOnRemove = (id: number) => {
    onRemove(id);
  };

  return (
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
          // <tr className={cx({ active: Number(selected) === i})} key={i} onClick={() => handleOnSelect(d, i)} >
          <tr key={j}>
            {columns.map((col, k) => (
              <>
                <td key={k}>
                  {/* <span className='action-btn'>
                    <span className='edit-col edit' onClick={() => handleOnSelectRow()}><img src={editIcon} alt="" /></span>
                    <span className='edit-col delete' onClick={() => handleOnRemoveRow()}><img src={deleteIcon} alt="" /></span>
                  </span> */}
                {d[col.dataProperty]}</td>
              </>
            ))}
            {action && (
              <td className='actions'>
                <span onClick={() => handleOnEdit(d, j)}>
                  <img src={editIcon} alt='Edit' />
                </span>
                <span onClick={() => handleOnRemove(d.id)}>
                  <img src={deleteIcon} alt='Delete' />
                </span>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
