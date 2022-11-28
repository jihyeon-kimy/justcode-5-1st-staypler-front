import ERROR_MESSAGE from '../assets/error-message';

const { useState } = require('react');

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function sendRequest(requestConfig, applyData) {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : 'GET',
        headers: requestConfig.headers ? requestConfig.headers : {},
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
      });

      const data = await response.json();

      if (
        response.status.toString()[0] === '4' ||
        data.status.toString()[0] === '4' ||
        data.status.toString()[0] === '5'
      ) {
        throw new Error(ERROR_MESSAGE[data.message] || '예상치 못한 오류');
      }

      applyData(data);
    } catch (error) {
      setError(error.message);
    }

    setIsLoading(false);
  }

  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useHttp;
