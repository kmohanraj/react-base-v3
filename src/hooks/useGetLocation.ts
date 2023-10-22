import React, { useEffect, useState } from "react";

const useGetLocation = () => {
  const [lat, setLat] = useState<any>(null)
  const [long, setLong] = useState<any>(null)
  
  useEffect(() => {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        setLat(position?.coords?.latitude)
        setLong(position.coords.longitude)
      })
    }
  })
  return [lat, long]
}

export default useGetLocation;