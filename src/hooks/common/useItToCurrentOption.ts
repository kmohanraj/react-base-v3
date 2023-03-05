import { useEffect, useState } from 'react';

const useItToCurrentOption = (options: any, value: any, isEdit: boolean) => {
  const [current, setCurrent] = useState<any>();

  useEffect(() => {
    if (isEdit) {
      setCurrent(options.filter((option: any) => option.id === value));
    } else {
      setCurrent(options[0]);
    }
  }, [current, isEdit, options, value]);
  return [current];
};

export default useItToCurrentOption;
