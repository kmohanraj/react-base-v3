import { FC, useEffect } from 'react';
import useToast from 'hooks/useToast';
import 'styles/toast.scss';

// type toastConfig = {
//   title: string,
//   message: string
// }

let temp: any;

const toast = {
  result: {
    title: '',
    message: ''
  },
  info: function (data: any) {
    console.log('$$$$$--------', data);
    this.result = data;
    temp = data;
    return this;
  },
  error: function (data: any) {
    this.result = data;
    return data.title + '' + data.message;
  }
};

const Toast: FC = () => {
  // const [messageValue, toast] = useToast();
  console.log('SSSSS-0-----', temp);
  console.log('messageValue', toast.result);
  useEffect(() => {}, [toast]);
  return (
    <div className='toaster-notification'>
      <h5>Success</h5>
    </div>
  );
};
export { toast };
export default Toast;
