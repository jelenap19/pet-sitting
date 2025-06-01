import { useState } from "react";
import axios from "../authorization/axiosConfig.js";

export function usePost(path) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const execute = async (payload, config = {}) => {
    setLoading(true);
    setError(null);
    const url = config.url || path;
    try {
      console.log("Executing POST request to:", url, "with payload:", payload);
      const res = await axios.post(url, payload, config);
      console.log("Response received:", res);
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
