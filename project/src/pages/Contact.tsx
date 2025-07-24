import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      console.log('Contact form submitted:', formData);
      alert('Thank you for your message! We will get back to you soon.');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      details: ['+91 95992 71680', '+91 98765 43210'],
      description: 'Call us for immediate assistance'
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['info@brickbroker.in', 'support@brickbroker.in'],
      description: 'Send us your queries anytime'
    },
    {
      icon: MapPin,
      title: 'Office Address',
      details: ['UG 27A Signum 36 Signature Global', 'Sector 36 Sohna Gurgaon'],
      description: 'Visit our office for consultation'
    },
    {
      icon: Clock,
      title: 'Working Hours',
      details: ['Mon - Sat: 9:00 AM - 8:00 PM', 'Sunday: 10:00 AM - 6:00 PM'],
      description: 'We are here to help you'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-[#F9F8F3] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-[#484848] mb-6">
              Get In Touch
            </h1>
            <p className="text-xl text-[#7A7A7A] max-w-3xl mx-auto">
              Ready to find your dream property? Contact our expert team for personalized assistance
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <h2 className="text-3xl font-bold text-[#484848] mb-8">
                Contact Information
              </h2>
              
              <div className="space-y-8">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <div key={index} className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="p-3 bg-[#BC8664] rounded-lg border border-[#BC8664]/20">
                          <Icon className="text-white" size={24} />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#484848] mb-1">{info.title}</h3>
                        {info.details.map((detail, detailIndex) => (
                          <p key={detailIndex} className="text-[#7A7A7A] mb-1">{detail}</p>
                        ))}
                        <p className="text-sm text-[#BC8664]">{info.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Map placeholder */}
              <div className="mt-8 bg-gray-200 rounded-xl h-64 flex items-center justify-center">
                <div className="text-center">
                  <div className="p-3 bg-[#BC8664] rounded-lg border border-[#BC8664]/20 inline-block mb-4">
                    <MapPin className="text-white" size={24} />
                  </div>
                  <p className="text-[#7A7A7A]">Interactive Map</p>
                  <p className="text-sm text-[#BC8664]">Find us on Google Maps</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
                <h2 className="text-3xl font-bold text-[#484848] mb-8">
                  Send us a Message
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-[#484848] mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#BC8664] focus:border-transparent transition-colors"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#484848] mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#BC8664] focus:border-transparent transition-colors"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-[#484848] mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#BC8664] focus:border-transparent transition-colors"
                        placeholder="Enter your phone number"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#484848] mb-2">
                        Subject *
                      </label>
                      <select
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#BC8664] focus:border-transparent transition-colors"
                      >
                        <option value="">Select a subject</option>
                        <option value="buying">Buying Property</option>
                        <option value="selling">Selling Property</option>
                        <option value="renting">Renting Property</option>
                        <option value="investment">Investment Consultation</option>
                        <option value="general">General Inquiry</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#484848] mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      rows={6}
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#BC8664] focus:border-transparent transition-colors"
                      placeholder="Tell us about your requirements..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#BC8664] hover:bg-[#A0734F] disabled:bg-gray-400 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <div className="p-1 border border-white/30 rounded-lg">
                          <Send size={16} />
                        </div>
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Contact Section */}
      <section className="bg-[#BC8664] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Need Immediate Assistance?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Our team is available to help you with urgent queries and property viewings
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:+919599271680"
              className="bg-white text-[#BC8664] hover:bg-gray-100 px-8 py-3 rounded-lg font-medium transition-colors inline-flex items-center justify-center gap-2"
            >
              <div className="p-1 border border-[#BC8664]/30 rounded-lg">
                <Phone size={16} />
              </div>
              Call Now
            </a>
            <a 
              href="mailto:info@brickbroker.in"
              className="border-2 border-white text-white hover:bg-white hover:text-[#BC8664] px-8 py-3 rounded-lg font-medium transition-colors inline-flex items-center justify-center gap-2"
            >
              <div className="p-1 border border-white/30 rounded-lg">
                <Mail size={16} />
              </div>
              Email Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;