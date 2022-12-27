import { useEffect, useState } from "react";

type toastConfig = {
  title: string,
  message: string
}

type toastProps = {
  info: toastConfig,
  success: toastConfig,
  error: toastConfig
}
const useToast = () => {

  const toast = {
    result: {
      title: '',
      message: ''
    },
    info: function (data: any) {
      console.log('$$$$$--------', data)
      setMessageValue(data)
      return  data.title + '' + data.message
    },
    error: (data: any) => {
      console.log('$$$$$--------', data)
      setMessageValue(data)
      return data.title + '' + data.message
    }
  }
  const [messageValue, setMessageValue] = useState<any>()

  useEffect(() => {
  
  }, [messageValue])

  return [messageValue, toast]
}

export default useToast;