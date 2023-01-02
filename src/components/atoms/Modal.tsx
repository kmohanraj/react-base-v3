import { FC } from "react";
import 'styles/modal.scss';
import closeIcon from 'assets/images/close.svg';
import { ModalType } from "types/components.types";
import cx from 'classnames';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { setIsModalShow } from "store/slice/groups.slice";

const Modal: FC<ModalType> = ({onClose, children}) => {
  const { isModalShow } = useSelector((state: RootState) => state.group)
  const dispatch = useDispatch();

  // const handlOnCloseModal = () => {
  //   dispatch(setIsModalShow(false))
  // }
  const isActiveClass = cx('chit-modal', { active: isModalShow })
  return (
    <div className={isActiveClass}>
      <div className="chit-modal-content">
        <img 
          src={closeIcon} 
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