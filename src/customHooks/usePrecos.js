import { useState, useEffect } from "react";
import { getPrecos } from "../services/precosService";

export const usePrecos = () => {
  const [precos, setPrecos] = useState({});

  useEffect(() => {
    (async function() {
      const { data: precos } = await getPrecos();
      setPrecos(precos);
    })();
  }, []);

  return { precos, setPrecos };
};
