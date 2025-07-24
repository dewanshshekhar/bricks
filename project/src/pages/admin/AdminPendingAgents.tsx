
import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { AdminService } from '../../services/adminService';
import { Agent } from '../../services/api';

const AdminPendingAgents: React.FC = () => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPendingAgents = async () => {
    setLoading(true);
    const response = await AdminService.getPendingAgents();
    if (response.success && response.data) {
      setAgents(response.data);
      setError(null);
    } else {
      setError(response.error || 'Failed to fetch agents');
    }
    setLoading(false);
  };

  const handleAction = async (id: string, status: 'APPROVED' | 'REJECTED') => {
    const response = await AdminService.updateAgentStatus(id, status);
    if (response.success) {
      fetchPendingAgents(); // Refresh list
    } else {
      alert(response.error || 'Action failed');
    }
  };

  useEffect(() => {
    fetchPendingAgents();
  }, []);

  return (
    <AdminLayout>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Pending Agent Approvals</h2>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : agents.length === 0 ? (
          <p>No pending agents found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agents.map(agent => (
              <div key={agent.id} className="border p-4 rounded-lg shadow-sm bg-white">
                <h3 className="text-lg font-semibold text-[#484848]">{agent.name}</h3>
                <p className="text-sm text-gray-600">Email: {agent.email}</p>
                <p className="text-sm text-gray-600">Phone: {agent.phone}</p>
                <p className="text-sm text-gray-600">Experience: {agent.experience || 'N/A'}</p>
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => handleAction(agent.id, 'APPROVED')}
                    className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleAction(agent.id, 'REJECTED')}
                    className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminPendingAgents;
