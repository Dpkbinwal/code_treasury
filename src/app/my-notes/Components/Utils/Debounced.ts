import React, { useEffect, useState } from 'react'

interface DebouncedValueProps<T> {
    value: T;
    delay: number;
  }

const useDebounced = <T,>({value,delay}:DebouncedValueProps<T>):T => {
    const [debouncedValue,setDebouncedValue] = useState<T>(value);
    useEffect(()=>{
       const handler= setTimeout(()=>{
            setDebouncedValue(value);

        },delay);

        return ()=> clearTimeout(handler);
    },[value,delay])

  return debouncedValue;
}

export default useDebounced;