import React from 'react';

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

export type OrganizationType = {
  id: number;
  org_name: string;
  org_email: string;
  branch_limit: string;
  group_limit: string;
  org_logo: string;
  org_phone: string;
  org_address: string;
};

export type CollectionProps = {
  title?: string;
  onClose?: () => void;
}

export interface ISelectOption {
  id: number;
  label: string
}

export interface IManageCustomer {
  id: null;
  customer_id: null;
  customer_name: string;
  customer_code: string;
  group_id: null;
  collection_type_id: null;
  taken_amount: null;
  taken_at: null;
  taken_position: null;
}