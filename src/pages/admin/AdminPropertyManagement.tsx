
import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { PropertyService } from '../../services/propertyService';
import { Property } from '../../services/api';

const AdminPropertyManagement: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProperties = async () => {
    setLoading(true);
    const response = await PropertyService.searchProperties({
      status: statusFilter || undefined,
      type: typeFilter || undefined,
      city: search || undefined,
    });

    if (response.success && response.data) {
      setProperties(response.data);
      setError(null);
    } else {
      setError(response.error || 'Failed to fetch properties');
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchProperties();
  }, [search, statusFilter, typeFilter]);

  return (
    <AdminLayout>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Property Management</h2>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by city"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded px-4 py-2"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border rounded px-4 py-2"
          >
            <option value="">All Statuses</option>
            <option value="PUBLISHED">Published</option>
            <option value="PENDING">Pending</option>
            <option value="DRAFT">Draft</option>
            <option value="SOLD">Sold</option>
          </select>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="border rounded px-4 py-2"
          >
            <option value="">All Types</option>
            <option value="APARTMENT">Apartment</option>
            <option value="VILLA">Villa</option>
            <option value="STUDIO">Studio</option>
            <option value="PENTHOUSE">Penthouse</option>
            <option value="TOWNHOUSE">Townhouse</option>
            <option value="COMMERCIAL">Commercial</option>
          </select>
        </div>

        {loading ? (
          <p>Loading properties...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : properties.length === 0 ? (
          <p>No properties found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <div key={property.id} className="border rounded shadow p-4">
                <h3 className="text-lg font-semibold text-[#484848]">{property.title}</h3>
                <p className="text-sm text-gray-500">{property.city}, {property.state}</p>
                <p className="text-sm text-gray-600 mt-1">Price: ₹{property.price.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Type: {property.type}</p>
                <p className="text-sm text-gray-600">Status: {property.status}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminPropertyManagement;
