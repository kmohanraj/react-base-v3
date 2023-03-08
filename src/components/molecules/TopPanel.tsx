import React, { FC } from 'react';
import 'styles/top-panel.scss';

type TopPanelType = {
  panelType: string;
  children: React.ReactNode;
};

const TopPanel: FC<TopPanelType> = ({ panelType, children }) => {
  return <div className={panelType}>{children}</div>;
};

export default TopPanel;
