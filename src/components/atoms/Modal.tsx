import { FC } from 'react';
import 'styles/modal.scss';
import * as Icons from 'constants/icons';
import { ModalType } from 'types/components.types';
import cx from 'classnames';

const Modal: FC<ModalType> = ({
  onClose,
  children,
  show,
  className,
  isCloseIcon
}) => {
  const isActiveClass = cx(`chit-modal ${className ?? ''}`, { active: show });
  return (
    <div className={isActiveClass}>
      <div className='chit-modal-content'>
        {isCloseIcon ?? (
          <img
            src={Icons.close}
            alt=''
            className='close-btn'
            onClick={onClose}
          />
        )}
        {children}
      </div>
    </div>
  );
};

export default Modal;
