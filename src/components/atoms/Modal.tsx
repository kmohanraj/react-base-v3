import { FC } from "react";
import 'styles/modal.scss';
import * as Icons from 'constants/icons';
import { ModalType } from "types/components.types";
import cx from 'classnames';
import { useSelector } from "react-redux";
import { RootState } from "store";

const Modal: FC<ModalType> = ({onClose, children}) => {
  const { isModalShow } = useSelector((state: RootState) => state.group)

  const isActiveClass = cx('chit-modal', { active: isModalShow })
  return (
    <div className={isActiveClass}>
      <div className="chit-modal-content">
        <img 
          src={Icons.close} 
          alt="" 
          className="close-btn" 
          onClick={onClose}
        />
        {children}
      </div>
    </div>
  )
}

export default Modal;