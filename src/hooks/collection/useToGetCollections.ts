import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as CollectionService from 'service/collection.service';
import * as CollectionSlice from 'store/slice/collection.slice';

const useToGetCollections = (userId: number, manage_id: number): [boolean] => {
  const [loading, setLoading] = useState<boolean>(false)
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true)
    CollectionService.getAll(userId, manage_id).then((response: any) => {
      dispatch(CollectionSlice.setCollectionsData(response?.info))
    }).catch((err) => {
      console.log('err', err?.info)
      setLoading(false)
    })
  }, [])
  return [loading]
}

export default useToGetCollections;