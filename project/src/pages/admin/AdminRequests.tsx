import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { 
  FileText, 
  UserCheck, 
  Home, 
  MessageSquare,
  Check, 
  X, 
  Star, 
  Phone, 
  Mail, 
  MapPin, 
  Briefcase,
  Calendar,
  User,
  Search,
  Filter,
  MoreVertical,
  Eye,
  ChevronDown,
  ChevronRight,
  Clock,
  AlertCircle,
  CheckCircle,
  XCircle
} from 'lucide-react';

const AdminRequests = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('agents');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedSections, setExpandedSections] = useState({
    agents: true,
    properties: true,
    inquiries: true
  });

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    const role = localStorage.getItem('userRole');
    if (!token || role !== 'admin') {
      navigate('/admin/login');
      return;
    }
    
    // Simulate loading
    setTimeout(() => setIsLoading(false), 1000);
  }, [navigate]);

  const agentRequests = [
    {
      id: 1,
      name: 'Amit Patel',
      email: 'amit.patel@example.com',
      phone: '+91 98765 43210',
      experience: '5 years',
      specialization: 'Residential',
      rating: 4.5,
      location: 'Sector 14, Gurgaon',
      joinDate: '2024-01-15',
      previousCompany: 'ABC Realty',
      salesRecord: '150+ Properties',
      image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=300',
      documents: ['License', 'ID Proof', 'Experience Certificate'],
      bio: 'Experienced real estate professional with expertise in residential properties.',
      status: 'pending'
    },
    {
      id: 2,
      name: 'Kavya Reddy',
      email: 'kavya.reddy@example.com',
      phone: '+91 87654 32109',
      experience: '3 years',
      specialization: 'Commercial',
      rating: 4.2,
      location: 'DLF Phase 2, Gurgaon',
      joinDate: '2024-01-18',
      previousCompany: 'XYZ Properties',
      salesRecord: '80+ Properties',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300',
      documents: ['License', 'ID Proof', 'Experience Certificate'],
      bio: 'Specialized in commercial real estate with strong negotiation skills.',
      status: 'pending'
    }
  ];

  const propertyRequests = [
    {
      id: 1,
      title: 'Luxury Penthouse in Cyber City',
      agent: 'Rajesh Kumar',
      location: 'Cyber City, Gurgaon',
      price: '₹4.5 Cr',
      type: 'Penthouse',
      area: '3500 sq ft',
      beds: 4,
      baths: 3,
      image: 'https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&w=300',
      submittedDate: '2024-01-20',
      status: 'pending',
      description: 'Stunning penthouse with panoramic city views and premium amenities.'
    },
    {
      id: 2,
      title: 'Modern Apartment in DLF Phase 3',
      agent: 'Sneha Gupta',
      location: 'DLF Phase 3, Gurgaon',
      price: '₹1.8 Cr',
      type: 'Apartment',
      area: '2200 sq ft',
      beds: 3,
      baths: 2,
      image: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=300',
      submittedDate: '2024-01-22',
      status: 'pending',
      description: 'Contemporary apartment with modern amenities and excellent connectivity.'
    }
  ];

  const inquiryRequests = [
    {
      id: 1,
      senderName: 'Rohit Sharma',
      email: 'rohit.sharma@email.com',
      phone: '+91 98765 43210',
      message: 'I am interested in buying a 3BHK apartment in DLF Phase 1. Please contact me with available options.',
      requestType: 'Property Inquiry',
      propertyInterest: 'Luxury Apartment in DLF Phase 1',
      budget: '₹1-1.5 Cr',
      date: '2024-01-25',
      status: 'new'
    },
    {
      id: 2,
      senderName: 'Priya Agarwal',
      email: 'priya.agarwal@email.com',
      phone: '+91 87654 32109',
      message: 'Looking for commercial space for my business. Need around 2000 sq ft in good location.',
      requestType: 'Commercial Inquiry',
      propertyInterest: 'Commercial Space',
      budget: '₹50-80 Lac',
      date: '2024-01-24',
      status: 'responded'
    },
    {
      id: 3,
      senderName: 'Vikram Singh',
      email: 'vikram.singh@email.com',
      phone: '+91 76543 21098',
      message: 'Want to sell my villa in Golf Course Road. Please provide valuation and listing services.',
      requestType: 'Selling Inquiry',
      propertyInterest: 'Villa Sale',
      budget: 'N/A',
      date: '2024-01-23',
      status: 'in-progress'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'approved':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'new':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'responded':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'in-progress':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock size={12} />;
      case 'approved':
        return <CheckCircle size={12} />;
      case 'rejected':
        return <XCircle size={12} />;
      case 'new':
        return <AlertCircle size={12} />;
      case 'responded':
        return <CheckCircle size={12} />;
      case 'in-progress':
        return <Clock size={12} />;
      default:
        return <AlertCircle size={12} />;
    }
  };

  const handleAction = (action: string, type: string, id: number) => {
    switch (action) {
      case 'approve':
        if (window.confirm(`Are you sure you want to approve this ${type}?`)) {
          console.log(`Approve ${type}:`, id);
        }
        break;
      case 'reject':
        if (window.confirm(`Are you sure you want to reject this ${type}?`)) {
          console.log(`Reject ${type}:`, id);
        }
        break;
      case 'respond':
        console.log(`Respond to ${type}:`, id);
        break;
      case 'view':
        console.log(`View ${type}:`, id);
        break;
    }
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const tabs = [
    { id: 'agents', label: 'Agent Approvals', icon: UserCheck, count: agentRequests.length },
    { id: 'properties', label: 'Property Approvals', icon: Home, count: propertyRequests.length },
    { id: 'inquiries', label: 'Customer Inquiries', icon: MessageSquare, count: inquiryRequests.length }
  ];

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-32 sm:h-64">
          <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-[#BC8664]"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 sm:space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-gradient-to-r from-[#BC8664] to-[#A0734F] rounded-xl shadow-lg">
                <FileText size={24} className="text-white" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[#484848] to-[#BC8664] bg-clip-text text-transparent">
                Requests Management
              </h1>
            </div>
            <p className="text-[#7A7A7A] mt-1 sm:mt-2 text-sm sm:text-base">Review and manage all pending requests and approvals</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
          <div className="flex flex-col sm:flex-row border-b border-gray-200">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-4 sm:px-6 py-4 font-medium transition-all duration-300 min-h-[60px] ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-[#BC8664] to-[#A0734F] text-white shadow-lg'
                      : 'text-[#7A7A7A] hover:text-[#484848] hover:bg-gray-50'
                  }`}
                >
                  <div className={`p-2 rounded-lg transition-all ${
                    activeTab === tab.id
                      ? 'bg-white/20 border border-white/30'
                      : 'bg-gray-100 border border-gray-200'
                  }`}>
                    <Icon size={16} className={activeTab === tab.id ? 'text-white' : 'text-[#BC8664]'} />
                  </div>
                  <span className="text-sm sm:text-base">{tab.label}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                    activeTab === tab.id
                      ? 'bg-white/20 text-white'
                      : 'bg-[#BC8664]/10 text-[#BC8664]'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className="p-4 sm:p-6">
            {/* Agent Approval Requests */}
            {activeTab === 'agents' && (
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-[#484848]">Agent Approval Requests</h3>
                  <span className="text-sm text-[#7A7A7A]">{agentRequests.length} pending</span>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                  {agentRequests.map((agent) => (
                    <div key={agent.id} className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200 shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                      <div className="p-4 sm:p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={agent.image}
                              alt={agent.name}
                              className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-gray-200"
                            />
                            <div>
                              <h4 className="font-bold text-[#484848] text-base sm:text-lg">{agent.name}</h4>
                              <div className="flex items-center gap-2 mt-1">
                                <Star size={12} className="fill-yellow-400 text-yellow-400" />
                                <span className="text-sm text-[#7A7A7A]">{agent.rating}</span>
                                <span className="text-[#7A7A7A]">•</span>
                                <span className="text-sm text-[#7A7A7A]">{agent.experience}</span>
                              </div>
                            </div>
                          </div>
                          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(agent.status)}`}>
                            {getStatusIcon(agent.status)}
                            {agent.status}
                          </span>
                        </div>

                        <p className="text-sm text-[#7A7A7A] mb-4">{agent.bio}</p>

                        <div className="space-y-2 mb-4 text-sm">
                          <div className="flex items-center gap-2 text-[#7A7A7A]">
                            <Mail size={12} />
                            <span className="truncate">{agent.email}</span>
                          </div>
                          <div className="flex items-center gap-2 text-[#7A7A7A]">
                            <Phone size={12} />
                            <span>{agent.phone}</span>
                          </div>
                          <div className="flex items-center gap-2 text-[#7A7A7A]">
                            <MapPin size={12} />
                            <span>{agent.location}</span>
                          </div>
                          <div className="flex items-center gap-2 text-[#7A7A7A]">
                            <Briefcase size={12} />
                            <span>{agent.specialization} • {agent.salesRecord}</span>
                          </div>
                        </div>

                        <div className="mb-4">
                          <p className="text-sm font-medium text-[#484848] mb-2">Documents:</p>
                          <div className="flex flex-wrap gap-2">
                            {agent.documents.map((doc, index) => (
                              <span
                                key={index}
                                className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 border border-green-200"
                              >
                                <Check size={8} />
                                {doc}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="flex gap-3">
                          <button
                            onClick={() => handleAction('approve', 'agent', agent.id)}
                            className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm min-h-[40px]"
                          >
                            <Check size={14} />
                            Approve
                          </button>
                          <button
                            onClick={() => handleAction('reject', 'agent', agent.id)}
                            className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm min-h-[40px]"
                          >
                            <X size={14} />
                            Reject
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Property Approval Requests */}
            {activeTab === 'properties' && (
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-[#484848]">Property Approval Requests</h3>
                  <span className="text-sm text-[#7A7A7A]">{propertyRequests.length} pending</span>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                  {propertyRequests.map((property) => (
                    <div key={property.id} className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200 shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={property.image}
                          alt={property.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        <div className="absolute top-4 left-4">
                          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(property.status)}`}>
                            {getStatusIcon(property.status)}
                            {property.status}
                          </span>
                        </div>
                        <div className="absolute bottom-4 left-4 text-white">
                          <h4 className="font-bold text-lg">{property.title}</h4>
                          <p className="text-sm opacity-90">{property.location}</p>
                        </div>
                      </div>

                      <div className="p-4 sm:p-6">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-2xl font-bold text-[#BC8664]">{property.price}</span>
                          <span className="text-sm bg-gray-100 px-2 py-1 rounded-full text-[#7A7A7A]">{property.type}</span>
                        </div>

                        <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                          <div className="text-center">
                            <p className="text-[#7A7A7A]">Area</p>
                            <p className="font-medium text-[#484848]">{property.area}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-[#7A7A7A]">Beds</p>
                            <p className="font-medium text-[#484848]">{property.beds}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-[#7A7A7A]">Baths</p>
                            <p className="font-medium text-[#484848]">{property.baths}</p>
                          </div>
                        </div>

                        <p className="text-sm text-[#7A7A7A] mb-4">{property.description}</p>

                        <div className="flex items-center gap-2 mb-4 text-sm text-[#7A7A7A]">
                          <User size={12} />
                          <span>Agent: {property.agent}</span>
                          <span>•</span>
                          <Calendar size={12} />
                          <span>{new Date(property.submittedDate).toLocaleDateString()}</span>
                        </div>

                        <div className="flex gap-3">
                          <button
                            onClick={() => handleAction('view', 'property', property.id)}
                            className="flex-1 border border-[#BC8664] text-[#BC8664] hover:bg-[#BC8664] hover:text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 text-sm min-h-[40px]"
                          >
                            <Eye size={14} />
                            Preview
                          </button>
                          <button
                            onClick={() => handleAction('approve', 'property', property.id)}
                            className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm min-h-[40px]"
                          >
                            <Check size={14} />
                            Approve
                          </button>
                          <button
                            onClick={() => handleAction('reject', 'property', property.id)}
                            className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm min-h-[40px]"
                          >
                            <X size={14} />
                            Reject
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Customer Inquiries */}
            {activeTab === 'inquiries' && (
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-[#484848]">Customer Inquiries</h3>
                  <span className="text-sm text-[#7A7A7A]">{inquiryRequests.length} total</span>
                </div>
                
                <div className="space-y-4">
                  {inquiryRequests.map((inquiry) => (
                    <div key={inquiry.id} className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200 shadow-lg p-4 sm:p-6 hover:shadow-xl transition-all duration-300">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-[#BC8664] to-[#A0734F] rounded-full flex items-center justify-center text-white font-bold">
                              {inquiry.senderName.charAt(0)}
                            </div>
                            <div>
                              <h4 className="font-bold text-[#484848]">{inquiry.senderName}</h4>
                              <p className="text-sm text-[#7A7A7A]">{inquiry.requestType}</p>
                            </div>
                            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(inquiry.status)}`}>
                              {getStatusIcon(inquiry.status)}
                              {inquiry.status}
                            </span>
                          </div>

                          <div className="bg-gray-50 rounded-lg p-4 mb-4">
                            <p className="text-sm text-[#484848] leading-relaxed">{inquiry.message}</p>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2 text-[#7A7A7A]">
                                <Mail size={12} />
                                <span>{inquiry.email}</span>
                              </div>
                              <div className="flex items-center gap-2 text-[#7A7A7A]">
                                <Phone size={12} />
                                <span>{inquiry.phone}</span>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center gap-2 text-[#7A7A7A]">
                                <Home size={12} />
                                <span>{inquiry.propertyInterest}</span>
                              </div>
                              <div className="flex items-center gap-2 text-[#7A7A7A]">
                                <Calendar size={12} />
                                <span>{new Date(inquiry.date).toLocaleDateString()}</span>
                              </div>
                            </div>
                          </div>

                          {inquiry.budget !== 'N/A' && (
                            <div className="mt-3 flex items-center gap-2 text-sm">
                              <span className="font-medium text-[#484848]">Budget:</span>
                              <span className="text-[#BC8664] font-bold">{inquiry.budget}</span>
                            </div>
                          )}
                        </div>

                        <div className="flex flex-col gap-2 sm:w-32">
                          <button
                            onClick={() => handleAction('respond', 'inquiry', inquiry.id)}
                            className="bg-[#BC8664] hover:bg-[#A0734F] text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 text-sm min-h-[40px]"
                          >
                            <MessageSquare size={14} />
                            Respond
                          </button>
                          <button
                            onClick={() => handleAction('view', 'inquiry', inquiry.id)}
                            className="border border-gray-300 text-[#7A7A7A] hover:border-[#BC8664] hover:text-[#BC8664] py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 text-sm min-h-[40px]"
                          >
                            <Eye size={14} />
                            Details
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200 shadow-lg p-4 sm:p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <UserCheck size={20} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold text-[#484848] mb-1">{agentRequests.length}</h3>
            <p className="text-sm text-[#7A7A7A]">Agent Requests</p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200 shadow-lg p-4 sm:p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <Home size={20} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold text-[#484848] mb-1">{propertyRequests.length}</h3>
            <p className="text-sm text-[#7A7A7A]">Property Requests</p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200 shadow-lg p-4 sm:p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-[#BC8664] to-[#A0734F] rounded-full flex items-center justify-center mx-auto mb-3">
              <MessageSquare size={20} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold text-[#484848] mb-1">{inquiryRequests.length}</h3>
            <p className="text-sm text-[#7A7A7A]">Customer Inquiries</p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminRequests;