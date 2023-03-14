import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as CollectionService from 'service/collection.service';
import * as CollectionSlice from 'store/slice/collection.slice';

const useToGetCollections = (
  userId: number,
  manageCustomerId: number
): [boolean, (status: boolean) => void] => {
  const [loading, setLoading] = useState(false);
  const [triggerRefresh, setTriggerRefresh] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    CollectionService.getAll(userId, manageCustomerId)
      .then((response: any) => {
        dispatch(CollectionSlice.setCollectionsData(response?.info));
        setTriggerRefresh(false);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setTriggerRefresh(false);
      });
  }, [dispatch, manageCustomerId, userId, triggerRefresh]);

  const handleRefreshCollection = (status: boolean) =>
    setTriggerRefresh(status);

  return [loading, handleRefreshCollection];
};

export default useToGetCollections;
