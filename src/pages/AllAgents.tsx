import React, { useState } from 'react';
import { Star, Phone, Mail, Search } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import LoadMoreButton from '../components/LoadMoreButton';
import MobileSliderModal from '../components/MobileSliderModal';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const allAgents = [
  {
    name: 'Suraj Adhwariya',
    role: 'Senior Agent',
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300',
    sales: '150+ Properties Sold',
    rating: 4.9,
    phone: '+91 95992 71680',
    email: 'suraj@brickbroker.in',
    specialization: 'Luxury Properties',
    experience: '8 years'
  },
  {
    name: 'Priya Sharma',
    role: 'Property Consultant',
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300',
    sales: '120+ Properties Sold',
    rating: 4.8,
    phone: '+91 98765 43210',
    email: 'priya@brickbroker.in',
    specialization: 'Residential Properties',
    experience: '6 years'
  },
  {
    name: 'Rahul Gupta',
    role: 'Investment Advisor',
    image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300',
    sales: '200+ Properties Sold',
    rating: 5.0,
    phone: '+91 87654 32109',
    email: 'rahul@brickbroker.in',
    specialization: 'Investment Properties',
    experience: '10 years'
  },
  {
    name: 'Anjali Verma',
    role: 'Luxury Specialist',
    image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=300',
    sales: '80+ Properties Sold',
    rating: 4.7,
    phone: '+91 76543 21098',
    email: 'anjali@brickbroker.in',
    specialization: 'Luxury Homes',
    experience: '5 years'
  },
  {
    name: 'Vikash Kumar',
    role: 'Commercial Expert',
    image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=300',
    sales: '90+ Properties Sold',
    rating: 4.6,
    phone: '+91 65432 10987',
    email: 'vikash@brickbroker.in',
    specialization: 'Commercial Properties',
    experience: '7 years'
  },
  {
    name: 'Neha Singh',
    role: 'Residential Advisor',
    image: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=300',
    sales: '110+ Properties Sold',
    rating: 4.8,
    phone: '+91 54321 09876',
    email: 'neha@brickbroker.in',
    specialization: 'Family Homes',
    experience: '4 years'
  },
  {
    name: 'Amit Patel',
    role: 'Senior Consultant',
    image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=300',
    sales: '95+ Properties Sold',
    rating: 4.5,
    phone: '+91 43210 98765',
    email: 'amit@brickbroker.in',
    specialization: 'New Projects',
    experience: '6 years'
  },
  {
    name: 'Kavya Reddy',
    role: 'Property Advisor',
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300',
    sales: '75+ Properties Sold',
    rating: 4.4,
    phone: '+91 32109 87654',
    email: 'kavya@brickbroker.in',
    specialization: 'Apartments',
    experience: '3 years'
  }
];

const AllAgents = () => {
  const [displayedAgents, setDisplayedAgents] = useState(allAgents.slice(0, 8));
  const [isLoading, setIsLoading] = useState(false);
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);
  const [modalInitialIndex, setModalInitialIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('rating');
  const [filteredAgents, setFilteredAgents] = useState(allAgents);

  // Filter and sort agents based on search term and sort option
  React.useEffect(() => {
    let filtered = allAgents.filter(agent =>
      agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sort agents
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'experience':
          return parseInt(b.experience) - parseInt(a.experience);
        case 'sales':
          return parseInt(b.sales) - parseInt(a.sales);
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    setFilteredAgents(filtered);
    setDisplayedAgents(filtered.slice(0, 8));
  }, [searchTerm, sortBy]);

  const handleLoadMore = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      const currentCount = displayedAgents.length;
      const nextBatch = filteredAgents.slice(0, currentCount + 4);
      setDisplayedAgents(nextBatch);
      setIsLoading(false);
    }, 1000);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };

  const handleMobileCardClick = (index: number) => {
    if (window.innerWidth <= 768) {
      setModalInitialIndex(index);
      setIsMobileModalOpen(true);
    }
  };

  const renderAgentCard = (agent: any, index: number) => (
    <div 
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
      onClick={() => handleMobileCardClick(index)}
    >
      <img
        src={agent.image}
        alt={agent.name}
        className="w-full h-48 object-cover"
      />
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-[#484848]">{agent.name}</h3>
          <div className="flex items-center gap-1">
            <div className="p-1 border border-yellow-200 rounded-lg">
              <Star size={12} className="fill-yellow-400 text-yellow-400" />
            </div>
            <span className="text-xs text-[#7A7A7A]">{agent.rating}</span>
          </div>
        </div>
        
        <p className="text-[#BC8664] font-medium text-sm mb-1">{agent.role}</p>
        <p className="text-[#7A7A7A] text-xs mb-2">{agent.specialization}</p>
        <p className="text-[#7A7A7A] text-xs mb-2">{agent.experience} experience</p>
        <p className="text-[#BC8664] text-xs font-medium mb-3">{agent.sales}</p>
        
        <div className="space-y-1 mb-3">
          <div className="flex items-center gap-2 text-xs text-[#7A7A7A]">
            <div className="p-1 border border-gray-200 rounded-lg">
              <Phone size={10} />
            </div>
            <span>{agent.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#7A7A7A]">
            <div className="p-1 border border-gray-200 rounded-lg">
              <Mail size={10} />
            </div>
            <span>{agent.email}</span>
          </div>
        </div>
        
        <button className="w-full bg-[#BC8664] hover:bg-[#A0734F] text-white py-2 rounded-lg font-medium transition-colors text-sm">
          Contact Agent
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-[#F9F8F3] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-[#484848] mb-6">
              All Our Agents
            </h1>
            <p className="text-xl text-[#7A7A7A] max-w-3xl mx-auto mb-8">
              Browse through our complete team of real estate professionals
            </p>
            
            {/* Search Bar */}
            <div className="max-w-md mx-auto">
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 p-1 border border-gray-200 rounded-lg">
                  <Search className="text-[#7A7A7A]" size={16} />
                </div>
                <input
                  type="text"
                  placeholder="Search agents by name or specialization"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full pl-14 pr-4 py-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-[#BC8664] focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Agents Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-[#484848]">
              {filteredAgents.length} Agents Available
            </h2>
            <select
              value={sortBy}
              onChange={handleSortChange}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#BC8664] focus:border-transparent"
            >
              <option value="rating">Sort by: Rating</option>
              <option value="experience">Experience: Most to Least</option>
              <option value="sales">Sales: Highest to Lowest</option>
              <option value="name">Name: A to Z</option>
            </select>
          </div>

          {/* Agents Slider */}
          <div className="relative mb-8">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={24}
              slidesPerView={1}
              speed={400}
              grabCursor={true}
              touchRatio={1}
              touchAngle={45}
              simulateTouch={true}
              allowTouchMove={true}
              resistance={true}
              resistanceRatio={0.85}
              longSwipes={true}
              longSwipesRatio={0.5}
              longSwipesMs={300}
              followFinger={true}
              threshold={10}
              navigation={{
                nextEl: '.all-agents-next',
                prevEl: '.all-agents-prev',
              }}
              pagination={{
                clickable: true,
                el: '.all-agents-pagination',
                dynamicBullets: true,
                dynamicMainBullets: 3,
              }}
              autoplay={{
                delay: 4500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
                waitForTransition: true,
              }}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 24,
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 24,
                },
              }}
              className="all-agents-swiper"
            >
              {displayedAgents.map((agent, index) => (
                <SwiperSlide key={index}>
                  {renderAgentCard(agent, index)}
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom Navigation Buttons */}
            <button className="all-agents-prev absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-white hover:bg-[#BC8664] text-[#BC8664] hover:text-white rounded-full shadow-lg transition-all duration-300 ease-in-out border border-gray-200 hover:border-[#BC8664] hover:scale-110 active:scale-95">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15,18 9,12 15,6"></polyline>
              </svg>
            </button>
            <button className="all-agents-next absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-white hover:bg-[#BC8664] text-[#BC8664] hover:text-white rounded-full shadow-lg transition-all duration-300 ease-in-out border border-gray-200 hover:border-[#BC8664] hover:scale-110 active:scale-95">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9,18 15,12 9,6"></polyline>
              </svg>
            </button>

            {/* Custom Pagination */}
            <div className="all-agents-pagination flex justify-center mt-8 gap-2"></div>
          </div>

          {/* Load More Button */}
          <LoadMoreButton
            onLoadMore={handleLoadMore}
            isLoading={isLoading}
            currentCount={displayedAgents.length}
            totalCount={filteredAgents.length}
            itemType="agents"
          />
        </div>
      </section>

      {/* Mobile Slider Modal */}
      <MobileSliderModal
        isOpen={isMobileModalOpen}
        onClose={() => setIsMobileModalOpen(false)}
        items={displayedAgents}
        initialIndex={modalInitialIndex}
        renderItem={renderAgentCard}
        title="Agent Profile"
      />

    </div>
  );
};

export default AllAgents;