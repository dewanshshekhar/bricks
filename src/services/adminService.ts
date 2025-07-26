import { apiRequest, ApiResponse, Agent, AdminMetrics, PropertyByMonth, PropertyByCity, PropertyByType, TopAgent } from './api';

export class AdminService {
  // Get pending agents for approval - matches /admin/pending-agents endpoint
  static async getPendingAgents(): Promise<ApiResponse<Agent[]>> {
    return apiRequest<Agent[]>('/admin/pending-agents');
  }

  // Approve an agent - matches /admin/approve-agent/{id} endpoint
  static async approveAgent(agentId: string): Promise<ApiResponse<any>> {
    return apiRequest<any>(`/admin/approve-agent/${agentId}`, {
      method: 'PUT'
    });
  }

  // Reject an agent - matches /admin/reject-agent/{id} endpoint
  static async rejectAgent(agentId: string): Promise<ApiResponse<any>> {
    return apiRequest<any>(`/admin/reject-agent/${agentId}`, {
      method: 'PUT'
    });
  }

  // Get admin dashboard metrics/counts - matches /admin/metrics/counts endpoint
  static async getMetricsCounts(): Promise<ApiResponse<AdminMetrics>> {
    return apiRequest<AdminMetrics>('/admin/metrics/counts');
  }

  // Get properties by month data - matches /admin/metrics/properties-by-month endpoint
  static async getPropertiesByMonth(): Promise<ApiResponse<PropertyByMonth[]>> {
    return apiRequest<PropertyByMonth[]>('/admin/metrics/properties-by-month');
  }

  // Get properties by city data - matches /admin/metrics/properties-by-city endpoint
  static async getPropertiesByCity(): Promise<ApiResponse<PropertyByCity[]>> {
    return apiRequest<PropertyByCity[]>('/admin/metrics/properties-by-city');
  }

  // Get properties by type data - matches /admin/metrics/properties-by-type endpoint
  static async getPropertiesByType(): Promise<ApiResponse<PropertyByType[]>> {
    return apiRequest<PropertyByType[]>('/admin/metrics/properties-by-type');
  }

  // Get top performing agents - matches /admin/metrics/top-agents endpoint
  static async getTopAgents(): Promise<ApiResponse<TopAgent[]>> {
    return apiRequest<TopAgent[]>('/admin/metrics/top-agents');
  }

  // Get all agents (for management)
  static async getAllAgents(): Promise<ApiResponse<Agent[]>> {
    return apiRequest<Agent[]>('/admin/pending-agents'); // Using existing endpoint for now
  }

  // Update agent status
  static async updateAgentStatus(agentId: string, status: 'APPROVED' | 'REJECTED' | 'PENDING'): Promise<ApiResponse<any>> {
    if (status === 'APPROVED') {
      return this.approveAgent(agentId);
    } else if (status === 'REJECTED') {
      return this.rejectAgent(agentId);
    } else {
      return { success: false, error: 'Invalid status' };
    }
  }

  // Delete agent (if needed in future)
  static async deleteAgent(agentId: string): Promise<ApiResponse<any>> {
    return apiRequest<any>(`/admin/delete-agent/${agentId}`, {
      method: 'DELETE'
    });
  }

  // Get admin dashboard summary
  static async getDashboardSummary(): Promise<ApiResponse<{
    metrics: AdminMetrics;
    recentProperties: any[];
    pendingAgents: Agent[];
    recentActivity: any[];
  }>> {
    // Combine multiple API calls for dashboard
    try {
      const [metricsResponse, agentsResponse] = await Promise.all([
        this.getMetricsCounts(),
        this.getPendingAgents()
      ]);
      
      if (metricsResponse.success && agentsResponse.success) {
        return {
          success: true,
          data: {
            metrics: metricsResponse.data!,
            recentProperties: [], // Will be populated from PropertyService
            pendingAgents: agentsResponse.data!,
            recentActivity: []
          }
        };
      } else {
        return {
          success: false,
          error: metricsResponse.error || agentsResponse.error || 'Failed to fetch dashboard data'
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch dashboard data'
      };
    }
  }
}