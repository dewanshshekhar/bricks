import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Phone, Mail, ArrowRight, Users } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const agents = [
  {
    name: 'Suraj Adhwariya',
    role: 'Senior Agent',
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300',
    sales: '150+ Properties Sold',
    rating: 4.9,
    phone: '+91 95992 71680',
    email: 'suraj@brickbroker.in',
    specialization: 'Luxury Properties'
  },
  {
    name: 'Priya Sharma',
    role: 'Property Consultant',
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300',
    sales: '120+ Properties Sold',
    rating: 4.8,
    phone: '+91 98765 43210',
    email: 'priya@brickbroker.in',
    specialization: 'Residential Properties'
  },
  {
    name: 'Rahul Gupta',
    role: 'Investment Advisor',
    image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300',
    sales: '200+ Properties Sold',
    rating: 5.0,
    phone: '+91 87654 32109',
    email: 'rahul@brickbroker.in',
    specialization: 'Investment Properties'
  },
  {
    name: 'Anjali Verma',
    role: 'Luxury Specialist',
    image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=300',
    sales: '80+ Properties Sold',
    rating: 4.7,
    phone: '+91 76543 21098',
    email: 'anjali@brickbroker.in',
    specialization: 'Luxury Homes'
  },
  {
    name: 'Vikash Kumar',
    role: 'Commercial Expert',
    image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=300',
    sales: '90+ Properties Sold',
    rating: 4.6,
    phone: '+91 65432 10987',
    email: 'vikash@brickbroker.in',
    specialization: 'Commercial Properties'
  },
  {
    name: 'Neha Singh',
    role: 'Residential Advisor',
    image: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=300',
    sales: '110+ Properties Sold',
    rating: 4.8,
    phone: '+91 54321 09876',
    email: 'neha@brickbroker.in',
    specialization: 'Family Homes'
  }
];

const MeetOurAgents = () => {
  return (
    <section className="bg-gradient-to-br from-gray-50 via-white to-gray-50 py-20 md:py-32 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-80 h-80 bg-gradient-to-r from-[#BC8664]/8 to-[#A0734F]/4 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-l from-[#BC8664]/6 to-[#A0734F]/3 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#BC8664]/10 to-[#A0734F]/10 backdrop-blur-sm border border-[#BC8664]/20 rounded-full px-6 py-2 mb-6 text-[#BC8664] text-sm font-medium">
            <Users size={16} className="animate-pulse" />
            Expert Team
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-[#484848] mb-6 leading-tight">
            Meet Our
            <span className="block bg-gradient-to-r from-[#BC8664] to-[#A0734F] bg-clip-text text-transparent">
              Expert Agents
            </span>
          </h2>
          
          <p className="text-xl text-[#7A7A7A] max-w-3xl mx-auto leading-relaxed">
            Our experienced team of real estate professionals is dedicated to helping you 
            find your perfect property with personalized service and expert guidance.
          </p>
        </div>

        {/* Agents Slider */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={32}
            slidesPerView={1}
            speed={600}
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
              nextEl: '.meet-agents-next',
              prevEl: '.meet-agents-prev',
            }}
            pagination={{
              clickable: true,
              el: '.meet-agents-pagination',
              dynamicBullets: true,
              dynamicMainBullets: 3,
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
              waitForTransition: true,
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
              1280: {
                slidesPerView: 4,
                spaceBetween: 32,
              },
            }}
            className="meet-agents-swiper pb-16"
          >
            {agents.map((agent, index) => (
              <SwiperSlide key={index}>
                <div className="group bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-[#BC8664]/30 transform hover:-translate-y-2 hover:scale-[1.02]">
                  {/* Agent Image */}
                  <div className="relative overflow-hidden">
                    <img
                      src={agent.image}
                      alt={agent.name}
                      className="w-full h-64 sm:h-72 object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Rating Badge */}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-[#BC8664] px-3 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                      <div className="p-1 border border-yellow-200 rounded-lg">
                        <Star size={10} className="fill-yellow-400 text-yellow-400" />
                      </div>
                      {agent.rating}
                    </div>

                    {/* Hover Contact Info */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl transform scale-90 group-hover:scale-100 transition-transform duration-300">
                        <div className="flex flex-col gap-2 text-center">
                          <a 
                            href={`tel:${agent.phone}`}
                            className="flex items-center gap-2 text-[#BC8664] hover:text-[#A0734F] transition-colors text-sm font-medium"
                          >
                            <div className="p-1 border border-[#BC8664]/30 rounded-lg">
                              <Phone size={12} />
                            </div>
                            Call Now
                          </a>
                          <a 
                            href={`mailto:${agent.email}`}
                            className="flex items-center gap-2 text-[#BC8664] hover:text-[#A0734F] transition-colors text-sm font-medium"
                          >
                            <div className="p-1 border border-[#BC8664]/30 rounded-lg">
                              <Mail size={12} />
                            </div>
                            Email
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Agent Details */}
                  <div className="p-6 relative">
                    {/* Glassmorphism Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm rounded-b-3xl"></div>
                    
                    <div className="relative z-10 text-center">
                      <h3 className="text-xl font-bold text-[#484848] mb-2 group-hover:text-[#BC8664] transition-colors">
                        {agent.name}
                      </h3>
                      
                      <p className="text-[#BC8664] font-medium mb-2">{agent.role}</p>
                      <p className="text-[#7A7A7A] text-sm mb-3">{agent.specialization}</p>
                      <p className="text-[#BC8664] text-sm font-medium mb-4">{agent.sales}</p>
                      
                      {/* Contact Button */}
                      <Link 
                        to="/agents"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-[#BC8664] to-[#A0734F] hover:from-[#A0734F] hover:to-[#8B5E3C] text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 group-hover:scale-105"
                      >
                        <span>View Profile</span>
                        <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>

                  {/* Floating Elements */}
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-[#BC8664]/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-ping"></div>
                  <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-[#BC8664]/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-ping delay-200"></div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <button className="meet-agents-prev absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-4 bg-white/90 hover:bg-white text-[#BC8664] rounded-full shadow-xl transition-all duration-300 border border-gray-200 hover:border-[#BC8664] hover:scale-110 active:scale-95 backdrop-blur-sm">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15,18 9,12 15,6"></polyline>
            </svg>
          </button>
          <button className="meet-agents-next absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-4 bg-white/90 hover:bg-white text-[#BC8664] rounded-full shadow-xl transition-all duration-300 border border-gray-200 hover:border-[#BC8664] hover:scale-110 active:scale-95 backdrop-blur-sm">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9,18 15,12 9,6"></polyline>
            </svg>
          </button>

          {/* Custom Pagination */}
          <div className="meet-agents-pagination flex justify-center mt-8 gap-2"></div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <Link 
            to="/agents"
            className="group bg-gradient-to-r from-[#BC8664] to-[#A0734F] hover:from-[#A0734F] hover:to-[#8B5E3C] text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 mx-auto"
          >
            <div className="p-2 bg-white/20 rounded-xl border border-white/30 group-hover:bg-white/30 transition-all">
              <Users size={20} />
            </div>
            Meet All Our Agents
          </Link>
        </div>
      </div>

      <style jsx>{`
        .meet-agents-swiper .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background: #BC8664;
          opacity: 0.25;
          transition: all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);
          border-radius: 50%;
          margin: 0 4px;
        }
        
        .meet-agents-swiper .swiper-pagination-bullet-active {
          opacity: 1;
          transform: scale(1.3);
          box-shadow: 0 0 0 2px rgba(188, 134, 100, 0.3);
        }
        
        .meet-agents-swiper .swiper-pagination-bullet:hover {
          opacity: 0.7;
          transform: scale(1.1);
        }
        
        .meet-agents-swiper .swiper-slide {
          height: auto;
          transition: transform 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);
        }
        
        .meet-agents-swiper .swiper-wrapper {
          transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
        }
      `}</style>
    </section>
  );
};

export default MeetOurAgents;