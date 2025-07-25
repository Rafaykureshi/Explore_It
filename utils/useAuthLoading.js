import { useCallback, useState } from 'react';

export const useAuthLoading = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingType, setLoadingType] = useState('login');
  const [loadingMessage, setLoadingMessage] = useState('');

  const startLoading = useCallback((type = 'login', message = '') => {
    setLoadingType(type);
    setLoadingMessage(message);
    setIsLoading(true);
  }, []);

  const stopLoading = useCallback(() => {
    setIsLoading(false);
  }, []);

  const withLoading = useCallback(async (asyncFunction, type = 'login', message = '') => {
    try {
      startLoading(type, message);
      const result = await asyncFunction();
      return result;
    } catch (error) {
      throw error;
    } finally {
      stopLoading();
    }
  }, [startLoading, stopLoading]);

  return {
    isLoading,
    loadingType,
    loadingMessage,
    startLoading,
    stopLoading,
    withLoading
  };
};

export default useAuthLoading;