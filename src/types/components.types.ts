import React from 'react';
import { TableColumn } from 'react-data-table-component';


export interface IErrorProps {
  title?: string;
  message?: string;
}

export type ModalType = {
  children: React.ReactNode;
  onClose: () => void;
  show: boolean;
  className?: string;
  isCloseIcon?: boolean;
};

export type CollectionProps = {
  title?: string;
  onClose?: () => void;
}

export interface ISelectOption {
  id: number;
  label: string
}

export interface ITableProps {
  title?: string;
  cols: TableColumn<any>[];
  loading: boolean;
  isPaginated?: boolean;
  totalRowCount?: number;
  onPageChange?: (page: number) => void;
  selectedRows?: (selectedRowsData: any[]) => void;
  onPageRowsChange?: (newPageRowCount: number, page: number) => void;
  data: any[];
}
