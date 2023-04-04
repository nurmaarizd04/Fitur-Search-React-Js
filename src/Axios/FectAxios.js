import axios from "axios";
import { useEffect, useState } from "react";

function FectAxios(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(``);
  const [status, setStatus] = useState(true);

  // GET
  const getData = async () => {
    try {
      const response = await axios.get(url);
      if (status) {
        setData(response?.data);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      setError(error.message);
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
    return () => {
      setStatus(false);
    };
  }, [url]);

  return { data, loading, error };
}

export default FectAxios;
