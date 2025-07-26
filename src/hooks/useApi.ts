import { useState, useEffect } from 'react';
import { ApiResponse, checkApiHealth } from '../services/api';

export interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useApi<T>(
  apiCall: () => Promise<ApiResponse<T>>,
  dependencies: any[] = [],
  fallbackData?: T
): UseApiState<T> {
  const [data, setData] = useState<T | null>(fallbackData || null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Check if API is available
      const isApiAvailable = await checkApiHealth();
      if (!isApiAvailable && fallbackData) {
        console.warn('API not available, using fallback data');
        setData(fallbackData);
        setLoading(false);
        return;
      }
      
      const response = await apiCall();
      
      if (response.success && response.data) {
        setData(response.data);
      } else {
        const errorMessage = response.error || 'An error occurred';
        setError(errorMessage);
        
        // Use fallback data if API fails
        if (fallbackData) {
          console.warn('API call failed, using fallback data:', errorMessage);
          setData(fallbackData);
        }
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      
      // Use fallback data if API fails
      if (fallbackData) {
        console.warn('API call failed, using fallback data:', errorMessage);
        setData(fallbackData);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, dependencies);

  return {
    data,
    loading,
    error,
    refetch: fetchData
  };
}

// Hook for API mutations (POST, PUT, DELETE)
export function useApiMutation<T, P = any>() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = async (
    apiCall: (params: P) => Promise<ApiResponse<T>>
  ) => {
    return async (params: P): Promise<{ success: boolean; data?: T; error?: string }> => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await apiCall(params);
        
        if (response.success) {
          return { success: true, data: response.data };
        } else {
          setError(response.error || 'An error occurred');
          return { success: false, error: response.error };
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
        setError(errorMessage);
        return { success: false, error: errorMessage };
      } finally {
        setLoading(false);
      }
    };
  };

  return {
    mutate,
    loading,
    error,
    clearError: () => setError(null)
  };
}

// Hook for checking API connectivity
export function useApiHealth() {
  const [isOnline, setIsOnline] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkHealth = async () => {
      setChecking(true);
      const health = await checkApiHealth();
      setIsOnline(health);
      setChecking(false);
    };

    checkHealth();
    
    // Check every 30 seconds
    const interval = setInterval(checkHealth, 30000);
    return () => clearInterval(interval);
  }, []);

  return { isOnline, checking };
}