import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Home, Bed, Bath, Square, Calendar, User, Phone, Mail, Heart, Share2, Play, ChevronLeft, ChevronRight, Clock, MessageSquare, Send } from 'lucide-react';

// Sample property data - in a real app, this would come from an API
const propertyData: { [key: string]: any } = {
  'luxury-apartment-dlf-phase-1': {
    id: 1,
    title: 'Luxury Apartment in DLF Phase 1',
    location: 'DLF Phase 1, Gurgaon',
    price: '₹1.2 Cr',
    type: 'Residential',
    area: '1850 sq ft',
    beds: 3,
    baths: 2,
    parking: 2,
    furnished: 'Semi-Furnished',
    possession: 'Ready to Move',
    availability: 'For Sale',
    images: [
      'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    description: 'Experience luxury living in this beautifully designed 3BHK apartment located in the prestigious DLF Phase 1. This property offers modern amenities, spacious rooms, and excellent connectivity to major business hubs in Gurugram.',
    features: [
      'Modular Kitchen',
      'Wooden Flooring',
      'Power Backup',
      'Lift',
      'Security',
      'Gym',
      'Swimming Pool',
      'Club House',
      'Garden',
      'Children Play Area'
    ],
    agent: {
      name: 'Suraj Adhwariya',
      role: 'Senior Agent',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300',
      phone: '+91 95992 71680',
      email: 'suraj@brickbroker.in',
      experience: '8 years'
    },
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  'modern-villa-golf-course': {
    id: 2,
    title: 'Modern Villa with Garden',
    location: 'Golf Course Road, Gurgaon',
    price: '₹2.1 Cr',
    type: 'Residential',
    area: '2500 sq ft',
    beds: 4,
    baths: 3,
    parking: 3,
    furnished: 'Fully Furnished',
    possession: 'Ready to Move',
    availability: 'For Sale',
    images: [
      'https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    description: 'Stunning modern villa with a beautiful garden, perfect for families who appreciate luxury and space. Located on the prestigious Golf Course Road with easy access to premium amenities and business districts.',
    features: [
      'Private Garden',
      'Modern Kitchen',
      'Marble Flooring',
      'Central AC',
      'Power Backup',
      'Security',
      'Covered Parking',
      'Servant Room',
      'Terrace Garden',
      'Premium Fittings'
    ],
    agent: {
      name: 'Priya Sharma',
      role: 'Property Consultant',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300',
      phone: '+91 98765 43210',
      email: 'priya@brickbroker.in',
      experience: '6 years'
    },
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  'premium-penthouse-mg-road': {
    id: 3,
    title: 'Premium Penthouse',
    location: 'MG Road, Gurgaon',
    price: '₹3.5 Cr',
    type: 'Residential',
    area: '3200 sq ft',
    beds: 5,
    baths: 4,
    parking: 4,
    furnished: 'Fully Furnished',
    possession: 'Ready to Move',
    availability: 'For Sale',
    images: [
      'https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    description: 'Exclusive penthouse offering panoramic city views and luxury amenities. This premium property features spacious rooms, modern design, and top-tier facilities for the discerning buyer.',
    features: [
      'Panoramic City Views',
      'Private Terrace',
      'Jacuzzi',
      'Home Theater',
      'Wine Cellar',
      'Smart Home Features',
      'Premium Appliances',
      'Concierge Service',
      'Valet Parking',
      'Sky Lounge Access'
    ],
    agent: {
      name: 'Rahul Gupta',
      role: 'Investment Advisor',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300',
      phone: '+91 87654 32109',
      email: 'rahul@brickbroker.in',
      experience: '10 years'
    },
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  'contemporary-studio-sohna': {
    id: 4,
    title: 'Contemporary Studio Apartment',
    location: 'Sohna Road, Gurgaon',
    price: '₹85 Lac',
    type: 'Residential',
    area: '850 sq ft',
    beds: 1,
    baths: 1,
    parking: 1,
    furnished: 'Semi-Furnished',
    possession: 'Ready to Move',
    availability: 'For Sale',
    images: [
      'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    description: 'Perfect studio apartment for young professionals and investors. Located on Sohna Road with excellent connectivity and modern amenities.',
    features: [
      'Open Layout',
      'Modern Kitchen',
      'Wooden Flooring',
      'Power Backup',
      'Security',
      'Gym',
      'Swimming Pool',
      'Parking',
      'Garden Area',
      'Metro Connectivity'
    ],
    agent: {
      name: 'Anjali Verma',
      role: 'Luxury Specialist',
      image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=300',
      phone: '+91 76543 21098',
      email: 'anjali@brickbroker.in',
      experience: '5 years'
    },
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  }
};

const PropertyDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showScheduleForm, setShowScheduleForm] = useState(false);
  const [visitType, setVisitType] = useState<'offline' | 'online' | null>(null);
  const [scheduleForm, setScheduleForm] = useState({
    name: '',
    email: '',
    phone: '',
    preferredDate: '',
    preferredTime: '',
    notes: ''
  });

  const property = slug ? propertyData[slug] : null;

  if (!property) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#484848] mb-4">Property Not Found</h1>
          <p className="text-[#7A7A7A] mb-8">The property you're looking for doesn't exist.</p>
          <Link to="/properties" className="bg-[#BC8664] hover:bg-[#A0734F] text-white px-8 py-3 rounded-lg font-medium transition-colors">
            View All Properties
          </Link>
        </div>
      </div>
    );
  }

  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Future integration: connect this data to admin and seller dashboards
    const visitRequest = {
      propertyId: property.id,
      propertyTitle: property.title,
      visitType,
      ...scheduleForm,
      agentId: property.agent.name,
      requestDate: new Date().toISOString(),
      status: 'pending'
    };
    
    console.log('Visit request submitted:', visitRequest);
    alert('Thank you! We\'ll get back to you shortly to confirm your visit.');
    setShowScheduleForm(false);
    setVisitType(null);
    setScheduleForm({ name: '', email: '', phone: '', preferredDate: '', preferredTime: '', notes: '' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setScheduleForm({
      ...scheduleForm,
      [e.target.name]: e.target.value
    });
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact-section');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM',
    '5:00 PM', '6:00 PM', '7:00 PM'
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Back Navigation */}
      <div className="bg-[#F9F8F3] py-4 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            to="/properties" 
            className="inline-flex items-center gap-2 text-[#BC8664] hover:text-[#A0734F] transition-colors"
          >
            <div className="p-1 border border-[#BC8664]/30 rounded-lg">
              <ArrowLeft size={16} />
            </div>
            Back to Properties
          </Link>
        </div>
      </div>

      {/* Property Image Slider */}
      <section className="relative">
        <div className="relative h-96 md:h-[500px] lg:h-[600px] overflow-hidden">
          <img
            src={property.images[currentImageIndex]}
            alt={property.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />
          
          {/* Navigation Arrows */}
          {property.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all duration-300 border border-gray-200 hover:border-[#BC8664]"
              >
                <ChevronLeft size={24} className="text-[#BC8664]" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all duration-300 border border-gray-200 hover:border-[#BC8664]"
              >
                <ChevronRight size={24} className="text-[#BC8664]" />
              </button>
            </>
          )}
          
          {/* Image Indicators */}
          {property.images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
              {property.images.map((_: any, index: number) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          )}

          {/* Action Buttons */}
          <div className="absolute top-4 right-4 flex gap-2">
            <button className="p-3 bg-white/90 hover:bg-white rounded-lg shadow-lg transition-colors border border-gray-200 hover:border-[#BC8664]">
              <Heart size={20} className="text-[#BC8664]" />
            </button>
            <button className="p-3 bg-white/90 hover:bg-white rounded-lg shadow-lg transition-colors border border-gray-200 hover:border-[#BC8664]">
              <Share2 size={20} className="text-[#BC8664]" />
            </button>
          </div>

          {/* Talk to Agent Button - Overlay */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <button
              onClick={scrollToContact}
              className="bg-[#BC8664] hover:bg-[#A0734F] text-white px-8 py-4 rounded-lg font-medium transition-colors shadow-lg flex items-center gap-2"
            >
              <div className="p-1 border border-white/30 rounded-lg">
                <Phone size={18} />
              </div>
              Talk to Agent
            </button>
          </div>
        </div>
      </section>

      {/* Property Details */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Basic Details */}
              <div className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-[#484848] mb-4">
                  {property.title}
                </h1>
                
                <div className="flex items-center gap-2 text-[#7A7A7A] mb-6">
                  <div className="p-1 border border-gray-200 rounded-lg">
                    <MapPin size={16} />
                  </div>
                  <span>{property.location}</span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                  <span className="text-3xl font-bold text-[#BC8664]">{property.price}</span>
                  <div className="flex gap-2">
                    <span className="bg-[#BC8664]/10 text-[#BC8664] px-4 py-2 rounded-full font-medium text-sm">
                      {property.type}
                    </span>
                    <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-medium text-sm">
                      {property.availability}
                    </span>
                  </div>
                </div>

                {/* Property Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="bg-[#F9F8F3] p-4 rounded-lg text-center border border-gray-100">
                    <div className="flex items-center justify-center mb-2">
                      <div className="p-2 border border-[#BC8664]/30 rounded-lg bg-[#BC8664]/10">
                        <Square size={20} className="text-[#BC8664]" />
                      </div>
                    </div>
                    <p className="text-sm text-[#7A7A7A]">Area</p>
                    <p className="font-semibold text-[#484848]">{property.area}</p>
                  </div>
                  <div className="bg-[#F9F8F3] p-4 rounded-lg text-center border border-gray-100">
                    <div className="flex items-center justify-center mb-2">
                      <div className="p-2 border border-[#BC8664]/30 rounded-lg bg-[#BC8664]/10">
                        <Bed size={20} className="text-[#BC8664]" />
                      </div>
                    </div>
                    <p className="text-sm text-[#7A7A7A]">Bedrooms</p>
                    <p className="font-semibold text-[#484848]">{property.beds}</p>
                  </div>
                  <div className="bg-[#F9F8F3] p-4 rounded-lg text-center border border-gray-100">
                    <div className="flex items-center justify-center mb-2">
                      <div className="p-2 border border-[#BC8664]/30 rounded-lg bg-[#BC8664]/10">
                        <Bath size={20} className="text-[#BC8664]" />
                      </div>
                    </div>
                    <p className="text-sm text-[#7A7A7A]">Bathrooms</p>
                    <p className="font-semibold text-[#484848]">{property.baths}</p>
                  </div>
                  <div className="bg-[#F9F8F3] p-4 rounded-lg text-center border border-gray-100">
                    <div className="flex items-center justify-center mb-2">
                      <div className="p-2 border border-[#BC8664]/30 rounded-lg bg-[#BC8664]/10">
                        <Home size={20} className="text-[#BC8664]" />
                      </div>
                    </div>
                    <p className="text-sm text-[#7A7A7A]">Parking</p>
                    <p className="font-semibold text-[#484848]">{property.parking}</p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-[#484848] mb-4">Description</h2>
                <p className="text-[#7A7A7A] leading-relaxed">{property.description}</p>
              </div>

              {/* Features */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-[#484848] mb-4">Features & Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {property.features.map((feature: string, index: number) => (
                    <div key={index} className="flex items-center gap-2 text-[#7A7A7A] p-2 bg-[#F9F8F3] rounded-lg border border-gray-100">
                      <div className="w-2 h-2 bg-[#BC8664] rounded-full flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Property Walkthrough Video */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 border border-[#BC8664]/30 rounded-lg bg-[#BC8664]/10">
                    <Play size={20} className="text-[#BC8664]" />
                  </div>
                  <h2 className="text-2xl font-bold text-[#484848]">🏠 Watch Full Property Tour</h2>
                </div>
                <div className="relative bg-gray-200 rounded-xl overflow-hidden aspect-video shadow-lg border border-gray-200">
                  <iframe
                    src={property.videoUrl}
                    title="Property Walkthrough"
                    className="w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Agent Card */}
              <div id="contact-section" className="bg-gradient-to-br from-white to-[#F9F8F3] rounded-2xl shadow-xl p-6 border border-[#BC8664]/10 mb-6 sticky top-4 overflow-hidden relative">
                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-[#BC8664]/5 rounded-full -translate-y-10 translate-x-10"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-[#BC8664]/3 rounded-full translate-y-8 -translate-x-8"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-[#BC8664]/10 rounded-lg border border-[#BC8664]/20">
                      <Calendar className="text-[#BC8664]" size={20} />
                    </div>
                    <h3 className="text-xl font-bold text-[#484848]">Schedule a Property Visit</h3>
                  </div>
                
                  <div className="flex items-center gap-4 mb-6 p-4 bg-white/60 rounded-xl border border-[#BC8664]/10">
                    <img
                      src={property.agent.image}
                      alt={property.agent.name}
                      className="w-16 h-16 rounded-full object-cover border-3 border-[#BC8664]/20 shadow-lg"
                    />
                    <div>
                      <h4 className="font-semibold text-[#484848]">{property.agent.name}</h4>
                      <p className="text-[#BC8664] text-sm font-medium">{property.agent.role}</p>
                      <p className="text-[#7A7A7A] text-sm">{property.agent.experience} experience</p>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-sm text-[#7A7A7A] p-3 bg-white/40 rounded-lg border border-[#BC8664]/5">
                      <div className="p-2 border border-[#BC8664]/20 rounded-lg bg-[#BC8664]/5">
                        <Phone size={14} className="text-[#BC8664]" />
                      </div>
                      <span className="font-medium">{property.agent.phone}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-[#7A7A7A] p-3 bg-white/40 rounded-lg border border-[#BC8664]/5">
                      <div className="p-2 border border-[#BC8664]/20 rounded-lg bg-[#BC8664]/5">
                        <Mail size={14} className="text-[#BC8664]" />
                      </div>
                      <span className="font-medium">{property.agent.email}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setShowScheduleForm(true)}
                    className="w-full bg-gradient-to-r from-[#BC8664] to-[#A0734F] hover:from-[#A0734F] hover:to-[#8B5E3C] text-white py-4 rounded-xl font-semibold transition-all duration-300 mb-3 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    <div className="p-2 border border-white/30 rounded-lg bg-white/10">
                      <Calendar size={18} />
                    </div>
                    📅 Schedule a Visit
                  </button>

                  <a
                    href={`tel:${property.agent.phone}`}
                    className="w-full border-2 border-[#BC8664] text-[#BC8664] hover:bg-[#BC8664] hover:text-white py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-3 hover:shadow-lg transform hover:-translate-y-0.5"
                  >
                    <div className="p-2 border border-current rounded-lg">
                      <Phone size={18} />
                    </div>
                    📞 Call Now
                  </a>
                </div>
              </div>

              {/* Property Quick Info */}
              <div className="bg-gradient-to-br from-[#F9F8F3] to-white rounded-2xl p-6 border border-[#BC8664]/10 shadow-lg">
                <h3 className="text-lg font-bold text-[#484848] mb-4">Quick Info</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-[#7A7A7A]">Furnished Status</span>
                    <span className="font-medium text-[#484848]">{property.furnished}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#7A7A7A]">Possession</span>
                    <span className="font-medium text-[#484848]">{property.possession}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#7A7A7A]">Property Type</span>
                    <span className="font-medium text-[#484848]">{property.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#7A7A7A]">Availability</span>
                    <span className="font-medium text-green-600">{property.availability}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Schedule Visit Modal */}
      {showScheduleForm && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-gradient-to-br from-[#FEFDFB] via-white to-[#F9F8F3] rounded-3xl shadow-2xl p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto border border-[#BC8664]/20 relative animate-slideUp" style={{
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
          }}>
            {/* Decorative header with enhanced gradient */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#BC8664] via-[#D4A574] to-[#A0734F] rounded-t-3xl"></div>
            
            {/* Subtle background pattern */}
            <div className="absolute inset-0 opacity-[0.02] rounded-3xl" style={{
              backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="%23BC8664"><circle cx="50" cy="50" r="25"/></svg>')`,
              backgroundSize: '40px 40px'
            }}></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-4 bg-gradient-to-br from-[#BC8664]/15 to-[#BC8664]/5 rounded-2xl border border-[#BC8664]/20 shadow-lg">
                  <Calendar className="text-[#BC8664]" size={28} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#484848] leading-tight">Schedule Property Visit</h3>
                  <p className="text-[#7A7A7A] text-sm mt-1">Choose your preferred way to explore this property</p>
                </div>
              </div>
            
              {/* Visit Type Selection */}
              {!visitType && (
                <div className="space-y-6 mb-6">
                  {/* Progress indicator */}
                  <div className="flex items-center justify-center mb-6">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-[#BC8664] rounded-full flex items-center justify-center text-white text-sm font-semibold">1</div>
                      <div className="w-12 h-1 bg-[#BC8664]/20 rounded-full"></div>
                      <div className="w-8 h-8 bg-[#BC8664]/20 rounded-full flex items-center justify-center text-[#BC8664] text-sm font-semibold">2</div>
                    </div>
                    <span className="ml-3 text-sm text-[#7A7A7A] font-medium">Step 1 of 2</span>
                  </div>
                  
                  <div className="text-center p-5 bg-gradient-to-r from-[#BC8664]/8 to-[#BC8664]/4 rounded-2xl border border-[#BC8664]/15 shadow-inner">
                    <p className="text-[#484848] font-semibold mb-2">Choose Your Visit Type</p>
                    <p className="text-sm text-[#666] leading-relaxed">Select how you'd like to explore this beautiful property</p>
                  </div>
                  
                  <div className="grid gap-5">
                    <button
                      type="button"
                      onClick={() => setVisitType('offline')}
                      className="w-full p-6 border-2 border-[#E5E5E5] rounded-2xl hover:border-[#BC8664] hover:bg-gradient-to-r hover:from-[#BC8664]/8 hover:to-[#BC8664]/4 transition-all duration-300 text-left flex items-center gap-5 group hover:shadow-xl transform hover:-translate-y-1 bg-white/60 backdrop-blur-sm"
                    >
                      <div className="p-4 bg-gradient-to-br from-[#BC8664]/15 to-[#BC8664]/5 rounded-2xl border border-[#BC8664]/20 group-hover:scale-110 transition-all duration-300 shadow-lg">
                        <div className="w-8 h-8 flex items-center justify-center">
                          <svg className="w-6 h-6 text-[#BC8664]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-[#484848] text-lg group-hover:text-[#BC8664] transition-colors mb-1">In-Person Visit</h4>
                        <p className="text-sm text-[#666] leading-relaxed">Visit the property location with our expert agent for a detailed walkthrough</p>
                      </div>
                      <div className="ml-auto opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <div className="w-7 h-7 bg-[#BC8664] rounded-full flex items-center justify-center shadow-lg">
                          <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                        </div>
                      </div>
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => setVisitType('online')}
                      className="w-full p-6 border-2 border-[#E5E5E5] rounded-2xl hover:border-[#BC8664] hover:bg-gradient-to-r hover:from-[#BC8664]/8 hover:to-[#BC8664]/4 transition-all duration-300 text-left flex items-center gap-5 group hover:shadow-xl transform hover:-translate-y-1 bg-white/60 backdrop-blur-sm"
                    >
                      <div className="p-4 bg-gradient-to-br from-[#BC8664]/15 to-[#BC8664]/5 rounded-2xl border border-[#BC8664]/20 group-hover:scale-110 transition-all duration-300 shadow-lg">
                        <div className="w-8 h-8 flex items-center justify-center">
                          <svg className="w-6 h-6 text-[#BC8664]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-[#484848] text-lg group-hover:text-[#BC8664] transition-colors mb-1">Virtual Tour</h4>
                        <p className="text-sm text-[#666] leading-relaxed">Live video call tour from the comfort of your home with real-time interaction</p>
                      </div>
                      <div className="ml-auto opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <div className="w-7 h-7 bg-[#BC8664] rounded-full flex items-center justify-center shadow-lg">
                          <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                        </div>
                      </div>
                    </button>
                  </div>
                  
                  <button
                    type="button"
                    onClick={() => setShowScheduleForm(false)}
                    className="w-full mt-6 border-2 border-[#E5E5E5] text-[#666] hover:text-[#484848] py-4 rounded-2xl font-semibold transition-all duration-300 hover:bg-[#F5F5F5] hover:border-[#D0D0D0] hover:shadow-md transform hover:-translate-y-0.5"
                  >
                    Cancel
                  </button>
                </div>
              )}
              
              {/* Visit Form */}
              {visitType && (
                <form onSubmit={handleScheduleSubmit} className="space-y-6">
                  {/* Progress indicator */}
                  <div className="flex items-center justify-center mb-6">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-[#BC8664] rounded-full flex items-center justify-center text-white text-sm font-semibold">✓</div>
                      <div className="w-12 h-1 bg-[#BC8664] rounded-full"></div>
                      <div className="w-8 h-8 bg-[#BC8664] rounded-full flex items-center justify-center text-white text-sm font-semibold">2</div>
                    </div>
                    <span className="ml-3 text-sm text-[#7A7A7A] font-medium">Step 2 of 2</span>
                  </div>

                  {/* Visit Type Display */}
                  <div className="bg-gradient-to-r from-[#BC8664]/12 to-[#BC8664]/6 p-5 rounded-2xl mb-6 flex items-center gap-4 border border-[#BC8664]/20 shadow-inner">
                    <div className="p-3 bg-gradient-to-br from-[#BC8664]/20 to-[#BC8664]/10 rounded-xl border border-[#BC8664]/25 shadow-lg">
                      {visitType === 'offline' ? (
                        <svg className="w-6 h-6 text-[#BC8664]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      ) : (
                        <svg className="w-6 h-6 text-[#BC8664]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      )}
                    </div>
                    <div className="flex-1">
                      <span className="font-bold text-[#BC8664] text-lg">
                        {visitType === 'offline' ? 'In-Person Visit' : 'Virtual Tour'}
                      </span>
                      <p className="text-sm text-[#666] mt-1">
                        {visitType === 'offline' ? 'At property location with our agent' : 'Live video call from anywhere'}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setVisitType(null)}
                      className="text-[#BC8664] hover:text-[#A0734F] text-sm font-semibold px-4 py-2 rounded-xl hover:bg-white/60 transition-all duration-300 border border-[#BC8664]/20 hover:border-[#BC8664]/40 shadow-sm hover:shadow-md"
                    >
                      Change
                    </button>
                  </div>

                  {/* Form Fields Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-bold text-[#484848] mb-3 flex items-center gap-3">
                        <div className="p-2 bg-[#BC8664]/10 rounded-xl border border-[#BC8664]/20">
                          <User size={16} className="text-[#BC8664]" />
                        </div>
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={scheduleForm.name}
                        onChange={handleInputChange}
                        className="w-full px-5 py-4 border-2 border-[#E5E5E5] rounded-2xl focus:ring-2 focus:ring-[#BC8664]/20 focus:border-[#BC8664] transition-all duration-300 bg-white/80 hover:bg-white shadow-sm hover:shadow-md text-[#484848] placeholder-[#999]"
                        placeholder="Enter your full name"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-bold text-[#484848] mb-3 flex items-center gap-3">
                        <div className="p-2 bg-[#BC8664]/10 rounded-xl border border-[#BC8664]/20">
                          <Mail size={16} className="text-[#BC8664]" />
                        </div>
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={scheduleForm.email}
                        onChange={handleInputChange}
                        className="w-full px-5 py-4 border-2 border-[#E5E5E5] rounded-2xl focus:ring-2 focus:ring-[#BC8664]/20 focus:border-[#BC8664] transition-all duration-300 bg-white/80 hover:bg-white shadow-sm hover:shadow-md text-[#484848] placeholder-[#999]"
                        placeholder="Enter your email"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-bold text-[#484848] mb-3 flex items-center gap-3">
                        <div className="p-2 bg-[#BC8664]/10 rounded-xl border border-[#BC8664]/20">
                          <Phone size={16} className="text-[#BC8664]" />
                        </div>
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={scheduleForm.phone}
                        onChange={handleInputChange}
                        className="w-full px-5 py-4 border-2 border-[#E5E5E5] rounded-2xl focus:ring-2 focus:ring-[#BC8664]/20 focus:border-[#BC8664] transition-all duration-300 bg-white/80 hover:bg-white shadow-sm hover:shadow-md text-[#484848] placeholder-[#999]"
                        placeholder="Enter your phone number"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-bold text-[#484848] mb-3 flex items-center gap-3">
                        <div className="p-2 bg-[#BC8664]/10 rounded-xl border border-[#BC8664]/20">
                          <Calendar size={16} className="text-[#BC8664]" />
                        </div>
                        Preferred Date *
                      </label>
                      <input
                        type="date"
                        name="preferredDate"
                        required
                        value={scheduleForm.preferredDate}
                        onChange={handleInputChange}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-5 py-4 border-2 border-[#E5E5E5] rounded-2xl focus:ring-2 focus:ring-[#BC8664]/20 focus:border-[#BC8664] transition-all duration-300 bg-white/80 hover:bg-white shadow-sm hover:shadow-md text-[#484848]"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-bold text-[#484848] mb-3 flex items-center gap-3">
                        <div className="p-2 bg-[#BC8664]/10 rounded-xl border border-[#BC8664]/20">
                          <Clock size={16} className="text-[#BC8664]" />
                        </div>
                        Preferred Time *
                      </label>
                      <select
                        name="preferredTime"
                        required
                        value={scheduleForm.preferredTime}
                        onChange={(e) => setScheduleForm({...scheduleForm, preferredTime: e.target.value})}
                        className="w-full px-5 py-4 border-2 border-[#E5E5E5] rounded-2xl focus:ring-2 focus:ring-[#BC8664]/20 focus:border-[#BC8664] transition-all duration-300 bg-white/80 hover:bg-white shadow-sm hover:shadow-md text-[#484848]"
                      >
                        <option value="">Select preferred time</option>
                        {timeSlots.map((time) => (
                          <option key={time} value={time}>{time}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-[#484848] mb-3 flex items-center gap-3">
                      <div className="p-2 bg-[#BC8664]/10 rounded-xl border border-[#BC8664]/20">
                        <MessageSquare size={16} className="text-[#BC8664]" />
                      </div>
                      Notes or Questions (Optional)
                    </label>
                    <textarea
                      name="notes"
                      rows={4}
                      value={scheduleForm.notes}
                      onChange={handleInputChange}
                      className="w-full px-5 py-4 border-2 border-[#E5E5E5] rounded-2xl focus:ring-2 focus:ring-[#BC8664]/20 focus:border-[#BC8664] transition-all duration-300 bg-white/80 hover:bg-white shadow-sm hover:shadow-md resize-none text-[#484848] placeholder-[#999]"
                      placeholder="Any specific questions or requirements..."
                    />
                  </div>
                  
                  <div className="flex gap-4 pt-6">
                    <button
                      type="button"
                      onClick={() => {
                        setShowScheduleForm(false);
                        setVisitType(null);
                      }}
                      className="flex-1 border-2 border-[#E5E5E5] text-[#666] hover:text-[#484848] py-4 rounded-2xl font-bold transition-all duration-300 hover:bg-[#F5F5F5] hover:border-[#D0D0D0] hover:shadow-md transform hover:-translate-y-0.5"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-[#BC8664] to-[#A0734F] hover:from-[#A0734F] hover:to-[#8B5E3C] text-white py-4 rounded-2xl font-bold transition-all duration-300 flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
                    >
                      <div className="p-2 bg-white/20 rounded-xl border border-white/30">
                        <Send size={18} />
                      </div>
                      Request Visit
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
};

export default PropertyDetail;