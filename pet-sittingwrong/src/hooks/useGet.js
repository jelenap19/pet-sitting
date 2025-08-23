import { useState, useEffect } from "react";
import axios from "../authorization/axiosConfig.js";

export const useGet = (route) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if(!route){
      setLoading(true);
      setData(null);
      return;
    }
    let isMounted = true;
    setLoading(true);
    setError(null);

    axios
      .get(`http://88.200.63.148:7000/api/${route}`)
      .then((res) => {
        if (isMounted) {
          setData(res.data);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err);
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [route]);

  
  return {data,loading, error} 
};
