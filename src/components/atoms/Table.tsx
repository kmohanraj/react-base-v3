import React, { FC, useState } from 'react';
import 'styles/table.scss';
import * as Icons from 'constants/icons';
import ErrorPage from 'components/atoms/ErrorPage';

type TableType = {
  tableName: string;
  columns: {
    title: string;
    dataProperty: any
    selector?: any
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
  const [selected, setSelected] = useState<number>();
  // const [deleteItem, setDeleteItem] = useState<number>()
  // const dispatch = useDispatch()

  const handleOnEdit = (selectedRow: any, selectedId: any) => {
    setSelected(selectedId);
    onEdit(selectedRow);
  };
  const handleOnRemove = (data: any) => {
    onRemove(data);
    // setDeleteItem(id)
    // dispatch(setIsModalShow(true));
  };

  // const handleOnCloseModal = () => {
  //   console.log('SSSS---close-modal',)
  //   dispatch(setIsModalShow(false));
  // }

  const handleOnManageCustomer = (selectedRow: any) => {
    onManageCustomer && onManageCustomer(selectedRow)
  }

  if (data.length === 0) {
    return <ErrorPage />
  }

  const manageData = (filterColumn: any, selector: string) => {
    if (typeof filterColumn === 'string') {
      return filterColumn ?? '-'
    } else if (filterColumn !== null && typeof filterColumn === 'object') {
      return filterColumn[selector]
    } else if (typeof filterColumn === 'boolean') {
      return filterColumn  === true ? 'Active' : 'In-Active'
    } else {
      return '-'
    }
  }

  return (
    <>
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
                  <td key={k} onClick={() => 
                    onChangeStatus && onChangeStatus(col.dataProperty, d)
                  }>
                    <>
                    {/* <span className='action-btn'>
                      <span className='edit-col edit' onClick={() => handleOnSelectRow()}><img src={editIcon} alt="" /></span>
                      <span className='edit-col delete' onClick={() => handleOnRemoveRow()}><img src={deleteIcon} alt="" /></span>
                    </span> */}
                    { manageData(d[col.dataProperty], col.selector)}
                    {/* {d[col.dataProperty]} */}
                    </>
                  </td>
                </>
              ))}
              {action && (
                <td className='actions'>
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
                      {ac === 'AddGroup' && (
                        <span onClick={() => handleOnManageCustomer(d)}>
                          <img src={Icons.addGroup} alt='Add Customer' />
                        </span>
                      )}
                    </>
                  ))}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {/* <Modal onClose={handleOnCloseModal}>
        <h1>Delete {deleteItem}</h1>
        <p>Are you sure you want to delete your {deleteItem}?</p>
        <div className='form-submit'>
          <Button
            type='ghost'
            label='Cancel'
            onClick={() => {} }
          />
          <Button
            type='primary'
            label='Delete'
            onClick={() => {}}
          />
        </div>
      </Modal> */}
    </>
  );
};

export default Table;
