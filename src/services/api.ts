// Base API configuration and utilities
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Updated interfaces to match backend API structure
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: 'ADMIN' | 'AGENT' | 'USER';
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'ADMIN' | 'AGENT' | 'USER';
  profilePicture?: string;
  createdAt: string;
  updatedAt: string;
}

export interface RegisterUserRequest {
  name: string;
  email: string;
  password: string;
  phone: string;
}

export interface RegisterAgentRequest {
  name: string;
  email: string;
  password: string;
  phone: string;
  experience?: string;
  specialization?: string;
  previousCompany?: string;
  bio?: string;
}

export interface Property {
  id: string;
  title: string;
  description: string;
  city: string;
  state: string;
  address: string;
  pincode: string;
  type: 'APARTMENT' | 'VILLA' | 'STUDIO' | 'PENTHOUSE' | 'TOWNHOUSE' | 'COMMERCIAL';
  listingType: 'Residential' | 'Commercial';
  status: 'PUBLISHED' | 'PENDING' | 'DRAFT' | 'SOLD';
  price: number;
  bedrooms: number;
  bathrooms: number;
  floors: number;
  yearBuilt: number;
  area: number;
  areaUnit: 'sqft' | 'sqm';
  featured: boolean;
  images?: string[];
  agent?: {
    id: string;
    name: string;
    email: string;
    phone: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Agent {
  id: string;
  name: string;
  email: string;
  phone: string;
  experience?: string;
  specialization?: string;
  rating?: number;
  location?: string;
  previousCompany?: string;
  salesRecord?: string;
  bio?: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  documents?: string[];
  profilePicture?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AdminMetrics {
  totalProperties: number;
  totalAgents: number;
  totalUsers: number;
  pendingAgents: number;
  publishedProperties: number;
  soldProperties: number;
  monthlyRevenue: number;
  websiteVisitors: number;
}

export interface PropertyByMonth {
  month: string;
  count: number;
}

export interface PropertyByCity {
  city: string;
  count: number;
}

export interface PropertyByType {
  type: string;
  count: number;
}

export interface TopAgent {
  id: string;
  name: string;
  email: string;
  propertiesSold: number;
  totalRevenue: number;
  rating: number;
}

// Error response interface
export interface ApiError {
  message: string;
  status: number;
  timestamp: string;
}

// Utility function to get auth headers
export const getAuthHeaders = (): HeadersInit => {
  const token = localStorage.getItem('adminToken') || localStorage.getItem('userToken');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

// Utility function to get auth headers for FormData
export const getAuthHeadersForFormData = (): HeadersInit => {
  const token = localStorage.getItem('adminToken') || localStorage.getItem('userToken');
  return {
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

// Utility function to handle API responses
export const handleApiResponse = async <T>(response: Response): Promise<ApiResponse<T>> => {
  try {
    // Check if response has content
    const contentType = response.headers.get('content-type');
    let data;
    
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }
    
    if (!response.ok) {
      return {
        success: false,
        error: (typeof data === 'object' ? data.message || data.error : data) || `HTTP ${response.status}: ${response.statusText}`,
        data: data
      };
    }
    
    return {
      success: true,
      data: typeof data === 'object' ? data : { message: data },
      message: typeof data === 'object' ? data.message : undefined
    };
  } catch (error) {
    return {
      success: false,
      error: 'Failed to parse response',
      data: undefined
    };
  }
};

// Generic API request function
export const apiRequest = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> => {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    
    // Determine headers based on body type
    let headers = options.headers || {};
    if (!(options.body instanceof FormData)) {
      headers = {
        ...getAuthHeaders(),
        ...headers
      };
    } else {
      headers = {
        ...getAuthHeadersForFormData(),
        ...headers
      };
    }
    
    const response = await fetch(url, {
      ...options,
      headers
    });
    
    return handleApiResponse<T>(response);
  } catch (error) {
    console.error('API Request Error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Network error occurred'
    };
  }
};

// Utility function to check if API is available
export const checkApiHealth = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    return response.ok;
  } catch {
    return false;
  }
};