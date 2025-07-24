import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'admin' | 'agent' | 'user';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole = 'admin' }) => {
  const token = localStorage.getItem('adminToken');
  const userRole = localStorage.getItem('userRole');

  // Check if user is authenticated
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  // Check if user has required role
  if (requiredRole && userRole !== requiredRole) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F9F8F3] via-[#FEFDFB] to-[#F5F4EF] flex items-center justify-center">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-red-200 p-8 text-center">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-red-600 mb-4">Access Restricted</h1>
            <p className="text-gray-600 mb-6">
              You don't have permission to access this area. This section is restricted to authorized administrators only.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button 
                onClick={() => window.history.back()}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-medium transition-colors"
              >
                Go Back
              </button>
              <button 
                onClick={() => window.location.href = '/'}
                className="flex-1 bg-gradient-to-r from-[#BC8664] to-[#A0734F] hover:from-[#A0734F] hover:to-[#8B5E3C] text-white px-6 py-3 rounded-xl font-medium transition-all"
              >
                Go Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;