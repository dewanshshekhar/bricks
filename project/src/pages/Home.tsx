import React from 'react';
import Hero from '../components/Hero';
import PropertyTypes from '../components/PropertyTypes';
import FeaturedProperties from '../components/FeaturedProperties';
import Areas from '../components/Areas';
import News from '../components/News';
import VideoSection from '../components/VideoSection';
import Testimonials from '../components/Testimonials';
import MeetOurAgents from '../components/MeetOurAgents';

const Home = () => {
  return (
    <>
      <Hero />
      <PropertyTypes />
      <FeaturedProperties />
      <Areas />
      <News />
      <VideoSection />
      <Testimonials />
      <MeetOurAgents />
    </>
  );
};

export default Home;