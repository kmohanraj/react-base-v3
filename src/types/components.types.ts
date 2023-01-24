import React from 'react';

export interface IErrorProps {
  title?: string;
  message?: string;
}

export type ModalType = {
  children: React.ReactNode;
  onClose: () => void;
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
  title?: string
}