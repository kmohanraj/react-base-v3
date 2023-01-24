import { useEffect, useState } from "react"

const useItToRupees = (amount: string) => {
  const [rupees, setRupees] = useState<string>() 
  
  useEffect(() => {
    const et: string = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumSignificantDigits: 6
    }).format(Number(amount))

    setRupees(et)
  }, [amount]);
  return [rupees];
}

export default useItToRupees;