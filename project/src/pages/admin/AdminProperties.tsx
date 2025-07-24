
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { PropertyService, Property } from '../../services/PropertyService';
import { Bed, Bath, MapPin, Square, Star } from 'lucide-react';

const AdminProperties = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState<Property[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProperties = async () => {
    setLoading(true);
    const response = await PropertyService.searchProperties({
      status: filterStatus || undefined,
      city: searchTerm || undefined,
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
  }, [searchTerm, filterStatus]);

  return (
    <AdminLayout>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Property Listings</h2>

        <div className="flex flex-wrap items-center gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by city"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border px-3 py-2 rounded w-full sm:w-auto"
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border px-3 py-2 rounded w-full sm:w-auto"
          >
            <option value="">All Status</option>
            <option value="PUBLISHED">Published</option>
            <option value="PENDING">Pending</option>
            <option value="DRAFT">Draft</option>
            <option value="SOLD">Sold</option>
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
              <div key={property.id} className="border p-4 rounded-lg shadow-sm bg-white">
                <h3 className="text-lg font-semibold text-[#484848]">{property.title}</h3>
                <p className="text-sm text-gray-600 mb-1">{property.city}, {property.state}</p>
                <p className="text-sm text-gray-600 mb-1 flex items-center gap-2"><MapPin size={14} />{property.address}</p>
                <div className="flex flex-wrap text-sm text-gray-600 gap-2 mt-2">
                  <span className="flex items-center gap-1"><Bed size={14} />{property.bedrooms} Beds</span>
                  <span className="flex items-center gap-1"><Bath size={14} />{property.bathrooms} Baths</span>
                  <span className="flex items-center gap-1"><Square size={14} />{property.area} {property.areaUnit}</span>
                  {property.featured && <span className="flex items-center text-yellow-500"><Star size={14} /> Featured</span>}
                </div>
                <p className="mt-3 text-[#BC8664] font-medium">₹ {property.price.toLocaleString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminProperties;
