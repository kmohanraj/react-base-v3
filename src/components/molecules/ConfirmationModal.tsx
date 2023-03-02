import React, { FC } from 'react';
import Modal from 'components/atoms/Modal';
import Button from 'components/atoms/Button';
import 'styles/confirmation-modal.scss';

type ConfirmationType = {
  name: string;
  actionMode: string;
  onClose: () => void;
  onCancel: () => void;
  onClick: () => void
};

const ConfirmationModal: FC<ConfirmationType> = ({ name, actionMode, onClose, onCancel, onClick }) => {
  return (
    <>
      <Modal onClose={onClose}>
        <h3>Are you sure you want to {actionMode.toLowerCase()} the <b>{name}</b>?</h3>
        <div className='modal-action'>
          <Button
            type='primary'
            label={actionMode}
            onClick={onClick}
          />
          <Button
            type='ghost'
            label='Cancel'
            onClick={onCancel}
          />
        </div>
      </Modal>
    </>
  );
};

export default ConfirmationModal;
