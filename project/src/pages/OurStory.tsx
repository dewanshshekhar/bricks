import React from 'react';
import { Calendar, Users, Award, TrendingUp } from 'lucide-react';

const OurStory = () => {
  const timeline = [
    {
      year: '2024',
      title: 'Brick Broker Founded',
      description: 'Started with a vision to transform real estate experience in Gurugram',
      icon: Calendar
    },
    {
      year: '2024',
      title: 'First 100 Properties',
      description: 'Successfully helped 100 families find their dream homes',
      icon: Users
    },
    {
      year: '2024',
      title: 'Award Recognition',
      description: 'Received "Best New Real Estate Agency" award',
      icon: Award
    },
    {
      year: '2024',
      title: 'Rapid Growth',
      description: 'Expanded to cover 25+ areas across Gurugram',
      icon: TrendingUp
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-[#F9F8F3] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-[#484848] mb-6">
              Our Story
            </h1>
            <p className="text-xl text-[#7A7A7A] max-w-3xl mx-auto">
              The journey of how Brick Broker became Gurugram's trusted real estate partner
            </p>
          </div>
        </div>
      </section>

      {/* Story Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <h2 className="text-4xl font-bold text-[#484848] mb-6">
                How It All Began
              </h2>
              <div className="space-y-4 text-[#7A7A7A]">
                <p>
                  In early 2024, our founder Suraj Adhwariya recognized a gap in the Gurugram real estate market. 
                  While the city was booming with new developments and opportunities, many buyers and sellers were 
                  struggling with outdated practices and lack of transparency.
                </p>
                <p>
                  With over a decade of combined experience in real estate, our founding team decided to create 
                  something different - an agency that would prioritize client relationships over quick transactions, 
                  transparency over hidden fees, and long-term satisfaction over short-term gains.
                </p>
                <p>
                  The name "Brick Broker" represents our commitment to building solid foundations - not just in the 
                  properties we help you find, but in the relationships we build with every client.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Our Beginning"
                className="rounded-2xl shadow-lg"
              />
            </div>
          </div>

          {/* Timeline */}
          <div className="mb-20">
            <h2 className="text-4xl font-bold text-[#484848] text-center mb-16">
              Our Journey So Far
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {timeline.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-[#BC8664]/10 rounded-full mb-4">
                      <div className="p-2 border border-[#BC8664]/30 rounded-lg">
                        <Icon size={24} className="text-[#BC8664]" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-[#BC8664] mb-2">{item.year}</h3>
                    <h4 className="text-lg font-semibold text-[#484848] mb-2">{item.title}</h4>
                    <p className="text-[#7A7A7A] text-sm">{item.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Vision for Future */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <img
                src="https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Our Future"
                className="rounded-2xl shadow-lg"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-4xl font-bold text-[#484848] mb-6">
                Looking Ahead
              </h2>
              <div className="space-y-4 text-[#7A7A7A]">
                <p>
                  As we continue to grow, our mission remains unchanged: to provide exceptional real estate 
                  services that make the buying and selling process as smooth and transparent as possible.
                </p>
                <p>
                  We're constantly innovating, whether it's through new technology to help clients visualize 
                  properties, expanded services to cover every aspect of real estate transactions, or simply 
                  finding new ways to exceed expectations.
                </p>
                <p>
                  Our goal is to become not just the largest, but the most trusted real estate agency in 
                  Gurugram - one satisfied client at a time.
                </p>
              </div>
              
              <div className="mt-8">
                <button className="bg-[#BC8664] hover:bg-[#A0734F] text-white px-8 py-3 rounded-lg font-medium transition-colors">
                  Join Our Journey
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurStory;