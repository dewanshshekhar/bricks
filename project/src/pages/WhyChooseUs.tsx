import React from 'react';
import { Shield, Users, Award, Clock, Heart, TrendingUp, CheckCircle, Star } from 'lucide-react';

const WhyChooseUs = () => {
  const reasons = [
    {
      icon: Shield,
      title: 'Trusted & Reliable',
      description: 'With a proven track record and transparent processes, we ensure your real estate journey is secure and trustworthy.',
      features: ['100% Transparent Pricing', 'Legal Documentation Support', 'Verified Property Listings']
    },
    {
      icon: Users,
      title: 'Expert Team',
      description: 'Our experienced professionals bring deep market knowledge and personalized service to every transaction.',
      features: ['Certified Real Estate Experts', 'Local Market Specialists', '24/7 Customer Support']
    },
    {
      icon: Award,
      title: 'Award-Winning Service',
      description: 'Recognized for excellence in customer service and innovative real estate solutions.',
      features: ['Industry Recognition', 'Client Choice Awards', 'Excellence in Service']
    },
    {
      icon: Clock,
      title: 'Quick & Efficient',
      description: 'We value your time and ensure fast, efficient processes without compromising on quality.',
      features: ['Faster Property Searches', 'Quick Documentation', 'Streamlined Processes']
    },
    {
      icon: Heart,
      title: 'Client-Centric Approach',
      description: 'Your satisfaction is our priority. We go above and beyond to meet your unique needs.',
      features: ['Personalized Service', 'Post-Sale Support', 'Relationship Building']
    },
    {
      icon: TrendingUp,
      title: 'Market Leadership',
      description: 'Stay ahead with our market insights, trends analysis, and investment guidance.',
      features: ['Market Analysis', 'Investment Advice', 'Future Value Predictions']
    }
  ];

  const testimonialStats = [
    { number: '98%', label: 'Client Satisfaction Rate' },
    { number: '500+', label: 'Successful Transactions' },
    { number: '4.9/5', label: 'Average Rating' },
    { number: '24/7', label: 'Support Available' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-[#F9F8F3] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-[#484848] mb-6">
              Why Choose Brick Broker?
            </h1>
            <p className="text-xl text-[#7A7A7A] max-w-3xl mx-auto">
              Discover what makes us the preferred choice for real estate in Gurugram
            </p>
            
            <div className="mt-8 max-w-4xl mx-auto">
              <p className="text-2xl font-bold text-[#484848] mb-4">
                Brick Broker are the brightest and fastest growing real estate brokerage firm in Gurugram
              </p>
              <p className="text-lg text-[#7A7A7A]">
                What our clients say about our services after they buy or sell a home with our agency
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Reasons */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reasons.map((reason, index) => {
              const Icon = reason.icon;
              return (
                <div key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow border border-gray-100">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-[#BC8664]/10 rounded-full mb-6">
                    <div className="p-2 border border-[#BC8664]/30 rounded-lg">
                      <Icon size={24} className="text-[#BC8664]" />
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-[#484848] mb-4">{reason.title}</h3>
                  <p className="text-[#7A7A7A] mb-6">{reason.description}</p>
                  
                  <ul className="space-y-2">
                    {reason.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2 text-sm text-[#7A7A7A]">
                        <div className="p-1 border border-green-200 rounded-lg">
                          <CheckCircle size={12} className="text-green-500" />
                        </div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-[#BC8664] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">
              Our Track Record Speaks
            </h2>
            <p className="text-xl text-white/90">
              Numbers that demonstrate our commitment to excellence
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {testimonialStats.map((stat, index) => (
              <div key={index} className="text-center">
                <h3 className="text-4xl font-bold text-white mb-2">{stat.number}</h3>
                <p className="text-white/90">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#484848] mb-6">
              Our Simple Process
            </h2>
            <p className="text-xl text-[#7A7A7A]">
              How we make real estate transactions seamless for you
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Consultation', description: 'We understand your needs and preferences' },
              { step: '02', title: 'Property Search', description: 'Find the perfect properties matching your criteria' },
              { step: '03', title: 'Site Visits', description: 'Guided tours of shortlisted properties' },
              { step: '04', title: 'Closing', description: 'Complete documentation and key handover' }
            ].map((process, index) => (
              <div key={index} className="text-center relative">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#BC8664] text-white rounded-full mb-4 text-xl font-bold">
                  {process.step}
                </div>
                <h3 className="text-xl font-semibold text-[#484848] mb-2">{process.title}</h3>
                <p className="text-[#7A7A7A]">{process.description}</p>
                
                {index < 3 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-[#BC8664]/20 -translate-x-1/2"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#F9F8F3] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-[#484848] mb-6">
            Experience the Brick Broker Difference
          </h2>
          <p className="text-xl text-[#7A7A7A] mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied clients who chose us for their real estate needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-[#BC8664] hover:bg-[#A0734F] text-white px-8 py-3 rounded-lg font-medium transition-colors">
              Start Your Journey
            </button>
            <button className="border-2 border-[#BC8664] text-[#BC8664] hover:bg-[#BC8664] hover:text-white px-8 py-3 rounded-lg font-medium transition-colors">
              Contact Our Team
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhyChooseUs;