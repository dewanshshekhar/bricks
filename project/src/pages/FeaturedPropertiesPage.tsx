import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import PropertyCard from '../components/PropertyCard';
import SearchForm from '../components/SearchForm';
import LoadMoreButton from '../components/LoadMoreButton';
import MobileSliderModal from '../components/MobileSliderModal';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const allFeaturedProperties = [
  {
    id: 1,
    image: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=600',
    price: '₹1.2 Cr',
    title: 'Luxury Apartment in DLF Phase 1',
    location: 'DLF Phase 1, Gurgaon',
    beds: 3,
    baths: 2,
    area: '1850 sq ft',
    badge: 'Exclusive listing and special offer'
  },
  {
    id: 2,
    image: 'https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=600',
    price: '₹2.1 Cr',
    title: 'Modern Villa with Garden',
    location: 'Golf Course Road, Gurgaon',
    beds: 4,
    baths: 3,
    area: '2500 sq ft',
    badge: 'Exclusive listing and special offer'
  },
  {
    id: 3,
    image: 'https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&w=600',
    price: '₹3.5 Cr',
    title: 'Premium Penthouse',
    location: 'MG Road, Gurgaon',
    beds: 5,
    baths: 4,
    area: '3200 sq ft',
    badge: 'Exclusive listing and special offer'
  },
  {
    id: 4,
    image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=600',
    price: '₹85 Lac',
    title: 'Contemporary Studio Apartment',
    location: 'Sohna Road, Gurgaon',
    beds: 1,
    baths: 1,
    area: '850 sq ft',
    badge: 'Exclusive listing and special offer'
  },
  {
    id: 5,
    image: 'https://images.pexels.com/photos/302769/pexels-photo-302769.jpeg?auto=compress&cs=tinysrgb&w=600',
    price: '₹1.6 Cr',
    title: 'Elegant Townhouse',
    location: 'Dwarka Expressway, Gurgaon',
    beds: 3,
    baths: 3,
    area: '1950 sq ft',
    badge: 'Exclusive listing and special offer'
  },
  {
    id: 6,
    image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=600',
    price: '₹1.8 Cr',
    title: 'Spacious Family Home',
    location: 'Sector 57, Gurgaon',
    beds: 4,
    baths: 3,
    area: '2200 sq ft',
    badge: 'Exclusive listing and special offer'
  }
];

const FeaturedPropertiesPage = () => {
  const [displayedProperties, setDisplayedProperties] = useState(allFeaturedProperties.slice(0, 3));
  const [isLoading, setIsLoading] = useState(false);
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);
  const [modalInitialIndex, setModalInitialIndex] = useState(0);

  const handleLoadMore = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      const nextBatch = allFeaturedProperties.slice(displayedProperties.length, displayedProperties.length + 3);
      setDisplayedProperties(prev => [...prev, ...nextBatch]);
      setIsLoading(false);
    }, 1000);
  };

  const handleMobileCardClick = (index: number) => {
    if (window.innerWidth <= 768) {
      setModalInitialIndex(index);
      setIsMobileModalOpen(true);
    }
  };

  const renderPropertyCard = (property: any, index: number) => (
    <div onClick={() => handleMobileCardClick(index)}>
      <PropertyCard property={property} />
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-[#F9F8F3] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-[#484848] mb-6">
              Featured Properties
            </h1>
            <p className="text-xl text-[#7A7A7A] max-w-3xl mx-auto">
              Exclusive properties with special offers and premium locations
            </p>
          </div>
          <SearchForm />
        </div>
      </section>

      {/* Properties Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-[#484848]">
              {displayedProperties.length} Featured Properties
            </h2>
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#BC8664] focus:border-transparent">
              <option>Sort by: Latest</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Area: Largest First</option>
            </select>
          </div>

          {/* Properties Slider */}
          <div className="relative mb-8">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={32}
              slidesPerView={1}
              navigation={{
                nextEl: '.featured-page-next',
                prevEl: '.featured-page-prev',
              }}
              pagination={{
                clickable: true,
                el: '.featured-page-pagination',
              }}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 24,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 32,
                },
              }}
              className="featured-page-swiper"
            >
              {displayedProperties.map((property, index) => (
                <SwiperSlide key={property.id}>
                  {renderPropertyCard(property, index)}
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom Navigation Buttons */}
            <button className="featured-page-prev absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-white hover:bg-[#BC8664] text-[#BC8664] hover:text-white rounded-full shadow-lg transition-all duration-300 border border-gray-200 hover:border-[#BC8664]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15,18 9,12 15,6"></polyline>
              </svg>
            </button>
            <button className="featured-page-next absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-white hover:bg-[#BC8664] text-[#BC8664] hover:text-white rounded-full shadow-lg transition-all duration-300 border border-gray-200 hover:border-[#BC8664]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9,18 15,12 9,6"></polyline>
              </svg>
            </button>

            {/* Custom Pagination */}
            <div className="featured-page-pagination flex justify-center mt-8 gap-2"></div>
          </div>

          {/* Load More Button */}
          <LoadMoreButton
            onLoadMore={handleLoadMore}
            isLoading={isLoading}
            currentCount={displayedProperties.length}
            totalCount={allFeaturedProperties.length}
            itemType="featured properties"
          />
        </div>
      </section>

      {/* Mobile Slider Modal */}
      <MobileSliderModal
        isOpen={isMobileModalOpen}
        onClose={() => setIsMobileModalOpen(false)}
        items={displayedProperties}
        initialIndex={modalInitialIndex}
        renderItem={renderPropertyCard}
        title="Featured Property"
      />

      <style jsx>{`
        .featured-page-swiper .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background: #BC8664;
          opacity: 0.25;
          transition: all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);
          border-radius: 50%;
          margin: 0 4px;
        }
        
        .featured-page-swiper .swiper-pagination-bullet-active {
          opacity: 1;
          transform: scale(1.3);
          box-shadow: 0 0 0 2px rgba(188, 134, 100, 0.3);
        }
        
        .featured-page-swiper .swiper-pagination-bullet:hover {
          opacity: 0.7;
          transform: scale(1.1);
        }
        
        .featured-page-swiper .swiper-slide {
          height: auto;
          transition: transform 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);
        }
        
        .featured-page-swiper .swiper-wrapper {
          transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
        }
      `}</style>
    </div>
  );
};

export default FeaturedPropertiesPage;