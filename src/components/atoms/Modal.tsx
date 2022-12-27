import { FC } from "react";
import 'styles/modal.scss';
import closeIcon from 'assets/images/close.svg';
import { ModalType } from "types/components.types";

const Modal: FC<ModalType> = ({children}) => {
  return (
    <div className="chit-modal show">
      <div className="modal-content">
        <img  src={closeIcon} alt="" />
        {children}
      </div>
    </div>
  )
}

export default Modal;