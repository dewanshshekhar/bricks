import { apiRequest, ApiResponse, Property } from './api';

export interface PropertySearchParams {
  city?: string;
  state?: string;
  type?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  status?: string;
  featured?: boolean;
  page?: number;
  limit?: number;
}

export interface AddPropertyRequest {
  title: string;
  description: string;
  city: string;
  state: string;
  address: string;
  pincode: string;
  type: 'APARTMENT' | 'VILLA' | 'STUDIO' | 'PENTHOUSE' | 'TOWNHOUSE' | 'COMMERCIAL';
  listingType: 'Residential' | 'Commercial';
  status: 'PUBLISHED' | 'PENDING' | 'DRAFT';
  price: number;
  bedrooms: number;
  bathrooms: number;
  floors: number;
  yearBuilt: number;
  area: number;
  areaUnit: 'sqft' | 'sqm';
  featured: boolean;
}

export class PropertyService {
  // Get all properties
  static async getAllProperties(): Promise<ApiResponse<Property[]>> {
    return apiRequest<Property[]>('/api/properties/all');
  }

  // Search properties with filters
  static async searchProperties(params: PropertySearchParams): Promise<ApiResponse<Property[]>> {
    const queryParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        queryParams.append(key, value.toString());
      }
    });

    const queryString = queryParams.toString();
    const endpoint = `/api/properties/search${queryString ? `?${queryString}` : ''}`;
    
    return apiRequest<Property[]>(endpoint);
  }

  // Get property by ID
  static async getPropertyById(id: string): Promise<ApiResponse<Property>> {
    return apiRequest<Property>(`/api/properties/${id}`);
  }

  // Add new property (for agents/admin)
  static async addProperty(propertyData: AddPropertyRequest, images?: File[]): Promise<ApiResponse<Property>> {
    const formData = new FormData();
    formData.append('property', JSON.stringify(propertyData));
    
    if (images && images.length > 0) {
      images.forEach((image, index) => {
        formData.append('file', image);
      });
    }

    return apiRequest<Property>('/api/properties', {
      method: 'POST',
      headers: {}, // Don't set Content-Type for FormData
      body: formData
    });
  }

  // Update property (for agents/admin)
  static async updateProperty(id: string, propertyData: Partial<AddPropertyRequest>, images?: File[]): Promise<ApiResponse<Property>> {
    const formData = new FormData();
    formData.append('property', JSON.stringify(propertyData));
    
    if (images && images.length > 0) {
      images.forEach((image, index) => {
        formData.append('file', image);
      });
    }

    return apiRequest<Property>(`/api/properties/${id}`, {
      method: 'PUT',
      headers: {}, // Don't set Content-Type for FormData
      body: formData
    });
  }

  // Delete property
  static async deleteProperty(id: string): Promise<ApiResponse<any>> {
    return apiRequest<any>(`/api/properties/${id}`, {
      method: 'DELETE'
    });
  }

  // Get featured properties
  static async getFeaturedProperties(): Promise<ApiResponse<Property[]>> {
    return this.searchProperties({ featured: true });
  }

  // Get properties for sale
  static async getPropertiesForSale(): Promise<ApiResponse<Property[]>> {
    return this.searchProperties({ status: 'PUBLISHED', listingType: 'Residential' });
  }

  // Get properties for rent
  static async getPropertiesForRent(): Promise<ApiResponse<Property[]>> {
    return this.searchProperties({ status: 'PUBLISHED', listingType: 'Rental' });
  }

  // Update property status (if endpoint exists)
  static async updatePropertyStatus(id: string, status: 'PUBLISHED' | 'PENDING' | 'DRAFT' | 'SOLD'): Promise<ApiResponse<any>> {
    return apiRequest<any>(`/api/properties/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status })
    });
  }

  // Toggle featured status (if endpoint exists)
  static async toggleFeatured(id: string, featured: boolean): Promise<ApiResponse<any>> {
    return apiRequest<any>(`/api/properties/${id}/featured`, {
      method: 'PUT',
      body: JSON.stringify({ featured })
    });
  }
}