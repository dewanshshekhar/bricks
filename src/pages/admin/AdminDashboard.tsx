
import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { AdminService } from '../../services/adminService';
import { AdminMetrics } from '../../services/api';
import { BarChart3, Users, Home, TrendingUp, DollarSign, Eye } from 'lucide-react';

const StatCard = ({ icon: Icon, title, value, color }: any) => (
  <div className="flex items-center p-4 border rounded-lg shadow-sm bg-white hover:shadow transition">
    <div className={`p-3 rounded-full text-white ${color}`}>
      <Icon size={20} />
    </div>
    <div className="ml-4">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-lg font-semibold text-gray-800">{value}</p>
    </div>
  </div>
);

const AdminDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [metrics, setMetrics] = useState<AdminMetrics | null>(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      const response = await AdminService.getMetricsCounts();
      if (response.success && response.data) {
        setMetrics(response.data);
        setError(null);
      } else {
        setError(response.error || 'Failed to load metrics');
      }
      setIsLoading(false);
    };

    fetchMetrics();
  }, []);

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

        {isLoading ? (
          <p>Loading metrics...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <StatCard icon={Home} title="Total Properties" value={metrics?.totalProperties} color="bg-blue-500" />
            <StatCard icon={Users} title="Total Agents" value={metrics?.totalAgents} color="bg-green-500" />
            <StatCard icon={Users} title="Total Users" value={metrics?.totalUsers} color="bg-teal-500" />
            <StatCard icon={BarChart3} title="Pending Agents" value={metrics?.pendingAgents} color="bg-yellow-500" />
            <StatCard icon={TrendingUp} title="Published Properties" value={metrics?.publishedProperties} color="bg-indigo-500" />
            <StatCard icon={TrendingUp} title="Sold Properties" value={metrics?.soldProperties} color="bg-purple-500" />
            <StatCard icon={DollarSign} title="Monthly Revenue" value={`₹ ${metrics?.monthlyRevenue?.toLocaleString()}`} color="bg-rose-500" />
            <StatCard icon={Eye} title="Website Visitors" value={metrics?.websiteVisitors} color="bg-gray-600" />
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
