import { FC } from "react";
import { IErrorProps } from "types/components.types";
// import noRecord from 'assets/images/no-data.jpg';
import 'styles/error-page.scss';

const ErrorPage: FC<IErrorProps> = ({title, message}) => {
  return (
    <div className="error-page">
      <h1>{title}</h1>
      <h5>{message}</h5>
      {/* <h5>{message}<img src={noRecord} alt="No Records Found"/></h5> */}
    </div>
  )
}

export default ErrorPage