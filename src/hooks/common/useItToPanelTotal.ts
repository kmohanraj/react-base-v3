import { useEffect, useState } from 'react';

const useItToPanelTotal = (dataCount: number, name: string) => {
  const [checkDataCount, setCheckDataCount] = useState<string>('');
  useEffect(() => {
    setCheckDataCount(
      dataCount === 0
        ? 'No Results'
        : dataCount > 0
        ? `${dataCount} ${name}s`
        : `${dataCount} ${name}`
    );
  }, [dataCount, name]);
  return [checkDataCount];
};

export default useItToPanelTotal;
