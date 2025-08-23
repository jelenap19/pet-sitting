import { useState } from "react";
import axios from "../authorization/axiosConfig.js";


export function usePut(basePath) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = async (payload, config = {}) => {
    setLoading(true);
    setError(null);

    const url = config.url || basePath;

    try {
      const res = await axios.put(url, payload, config);
      setLoading(false);
      return res.data;
    } catch (err) {
      setError(err);
      setLoading(false);
      throw err;
    }
  };

  return { execute, loading, error };
}
