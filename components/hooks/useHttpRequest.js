import { useState } from "react";

export default function useHttpRequest() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const sendRequest = async (requestConfig, fetchCallback) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : "GET",
        headers: requestConfig.headers ? requestConfig.headers : {},
        body: requestConfig.body,
      });
      if (!response.ok) {
        setError("HTTP error: " + response.status);
        throw new Error("HTTP error: " + response.status);
      }
      const data = await response.json();
      setData(data);
      fetchCallback(data);
    } catch (error) {
      setError("Couldn't get data :( Error: " + error);
    }
    setIsLoading(false);
  };

  return {
    isLoading,
    error,
    sendRequest,
    data,
  };
}
