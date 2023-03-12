import React, { FC } from 'react';
import Modal from 'components/atoms/Modal';
import Button from 'components/atoms/Button';
import 'styles/confirmation-modal.scss';

type SessionType = {
  title: string;
  actionMode: string;
  onClick: () => void;
  show?: boolean;
  className?: string;
};

const SessionExpired: FC<SessionType> = ({
  title,
  actionMode,
  onClick,
  show,
  className,
}) => {
  return (
    <>
      {show && (
        <Modal show={show} onClose={() => {}} className={className} isCloseIcon={true}>
          <h3>{title}</h3>
          <div className='modal-action'>
            <Button type='primary' label={actionMode} onClick={onClick} />
          </div>
        </Modal>
      )}
    </>
  );
};

export default SessionExpired;
