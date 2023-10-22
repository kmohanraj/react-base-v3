import React, { FC } from "react";
import 'styles/no-record.scss';
interface INoRecord {
  message: string
}

const NoRecord: FC<INoRecord> = ({ message }) => {
  return (
    <div className="no-record">{message}</div>
  )
}

export default NoRecord;
