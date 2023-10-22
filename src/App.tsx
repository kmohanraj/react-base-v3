import React, { useLayoutEffect } from 'react';
import Routes from 'routes/Routes';
import iziToast, { IziToastPosition } from 'izitoast';
import CONSTANTS from 'constants/constants';
import 'izitoast/dist/css/iziToast.min.css';

const { POSITION, TIMEOUT, DISPLAY_MODE } = CONSTANTS.TOAST_DEFAULTS

const App = () => {
  const handleSize = () => {
    const footerHeight = document.getElementsByTagName('footer')[0]?.clientHeight
    document.documentElement.style.setProperty('--fh', `${footerHeight}px`)
  }

  useLayoutEffect(() => {
    handleSize();
    window.addEventListener('resize', handleSize)
    return () => window.removeEventListener('resize', handleSize)
  }, [])

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
