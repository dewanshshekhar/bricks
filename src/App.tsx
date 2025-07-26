import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Properties from './pages/Properties';
import ForSale from './pages/ForSale';
import ForRent from './pages/ForRent';
import FeaturedProperties from './pages/FeaturedPropertiesPage';
import Agents from './pages/Agents';
import AllAgents from './pages/AllAgents';
import TopRatedAgents from './pages/TopRatedAgents';
import About from './pages/About';
import OurStory from './pages/OurStory';
import WhyChooseUs from './pages/WhyChooseUs';
import Contact from './pages/Contact';
import SignIn from './pages/SignIn';
import PropertyDetail from './pages/PropertyDetail';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminAnalytics from './pages/admin/AdminAnalytics';
import AdminRequests from './pages/admin/AdminRequests';
import AdminPropertyManagement from './pages/admin/AdminPropertyManagement';
import AdminProperties from './pages/admin/AdminProperties';
import AdminPendingAgents from './pages/admin/AdminPendingAgents';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/properties/for-sale" element={<ForSale />} />
          <Route path="/properties/for-rent" element={<ForRent />} />
          <Route path="/properties/featured" element={<FeaturedProperties />} />
          <Route path="/property/:slug" element={<PropertyDetail />} />
          <Route path="/agents" element={<Agents />} />
          <Route path="/agents/all" element={<AllAgents />} />
          <Route path="/agents/top-rated" element={<TopRatedAgents />} />
          <Route path="/about" element={<About />} />
          <Route path="/about/our-story" element={<OurStory />} />
          <Route path="/about/why-choose-us" element={<WhyChooseUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signin" element={<SignIn />} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={
            <ProtectedRoute requiredRole="admin">
              <AdminAnalytics />
            </ProtectedRoute>
          } />
          <Route path="/admin/analytics" element={
            <ProtectedRoute requiredRole="admin">
              <AdminAnalytics />
            </ProtectedRoute>
          } />
          <Route path="/admin/requests" element={
            <ProtectedRoute requiredRole="admin">
              <AdminRequests />
            </ProtectedRoute>
          } />
          <Route path="/admin/property-management" element={
            <ProtectedRoute requiredRole="admin">
              <AdminPropertyManagement />
            </ProtectedRoute>
          } />
          <Route path="/admin/properties" element={
            <ProtectedRoute requiredRole="admin">
              <AdminProperties />
            </ProtectedRoute>
          } />
          <Route path="/admin/pending-agents" element={
            <ProtectedRoute requiredRole="admin">
              <AdminPendingAgents />
            </ProtectedRoute>
          } />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;