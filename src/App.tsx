import React from 'react';
import Routes from 'routes/Routes';
import iziToast, { IziToastPosition } from 'izitoast';
import CONSTANTS from 'constants/constants';
import 'izitoast/dist/css/iziToast.min.css';

const { POSITION, TIMEOUT, DISPLAY_MODE } = CONSTANTS.TOAST_DEFAULTS
function App() {
  return (
    <React.Fragment>
      <>
        {iziToast.settings({
          position: POSITION as IziToastPosition,
          timeout: TIMEOUT,
          displayMode: DISPLAY_MODE
        })}
        <Routes />
      </>
    </React.Fragment>
  );
}

export default App;
