import React, { FC } from 'react';
import Modal from 'components/atoms/Modal';
import Button from 'components/atoms/Button';
import 'styles/confirmation-modal.scss';

type ConfirmationType = {
  name: string;
  actionMode: string;
  onClose: () => void;
  onClick: () => void;
  show?: boolean;
};

const ConfirmationModal: FC<ConfirmationType> = ({
  name,
  actionMode,
  onClose,
  onClick,
  show
}) => {
  return (
    <>
      {show && (
        <Modal show={show} onClose={onClose}>
          <h3>
            Are you sure you want to {actionMode.toLowerCase()} the{' '}
            <b>{name}</b>?
          </h3>
          <div className='modal-action'>
            <Button type='primary' label={actionMode} onClick={onClick} />
            <Button type='ghost' label='Cancel' onClick={onClose} />
          </div>
        </Modal>
      )}
    </>
  );
};

export default ConfirmationModal;
