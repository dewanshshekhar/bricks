# Brick Broker Real Estate Platform

A modern real estate platform built with React, TypeScript, and Tailwind CSS, featuring a comprehensive admin dashboard and property management system.

## 🚀 Features

### Frontend Features
- **Modern React Architecture**: Built with React 18, TypeScript, and Vite
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Admin Dashboard**: Complete analytics and management interface
- **Property Management**: CRUD operations for properties
- **Agent Management**: Agent approval and management system
- **Authentication**: Role-based access control (Admin, Agent, User)
- **Real-time Updates**: API integration with fallback data
- **Interactive UI**: Swiper sliders, modals, and animations

### Backend Integration
- **RESTful API**: Complete integration with backend endpoints
- **Authentication**: JWT-based authentication system
- **File Uploads**: Support for property images and profile pictures
- **Error Handling**: Comprehensive error handling with fallbacks
- **API Health Monitoring**: Real-time API connectivity status

## 🛠 Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Sliders**: Swiper.js
- **State Management**: React Hooks
- **API Client**: Fetch API with custom service layer

## 📡 API Integration

### Backend Endpoints

The application integrates with the following backend endpoints:

#### Authentication
- `POST /login` - User/Agent/Admin login
- `POST /logout` - Logout user
- `GET /is-authenticated` - Check authentication status
- `POST /send-reset-otp` - Send password reset OTP
- `POST /reset-password` - Reset password with OTP
- `POST /send-otp` - Send verification OTP
- `POST /verify-otp` - Verify OTP

#### Profile Management
- `GET /profile` - Get authenticated user profile
- `POST /profile/register-user` - Register new user
- `POST /profile/register-agent` - Register new agent

#### Property Management
- `GET /api/properties/all` - Get all properties
- `GET /api/properties/search` - Search properties with filters
- `POST /api/properties` - Add new property (Agent/Admin)
- `PUT /api/properties/{id}` - Update property
- `DELETE /api/properties/{id}` - Delete property

#### Admin Management
- `GET /admin/pending-agents` - Get pending agent approvals
- `PUT /admin/approve-agent/{id}` - Approve agent
- `PUT /admin/reject-agent/{id}` - Reject agent
- `GET /admin/metrics/counts` - Get dashboard metrics
- `GET /admin/metrics/properties-by-month` - Properties by month data
- `GET /admin/metrics/properties-by-city` - Properties by city data
- `GET /admin/metrics/properties-by-type` - Properties by type data
- `GET /admin/metrics/top-agents` - Top performing agents

### API Configuration

1. **Environment Setup**:
   ```bash
   # Copy the .env file and update the API URL
   cp .env.example .env
   ```

2. **Update API Base URL**:
   ```env
   VITE_API_BASE_URL=http://localhost:8080
   ```

3. **API Services**:
   - `AuthService` - Authentication operations
   - `AdminService` - Admin dashboard and management
   - `PropertyService` - Property CRUD operations

### API Features

- **Automatic Fallbacks**: Uses demo data when API is unavailable
- **Error Handling**: Comprehensive error handling with user feedback
- **Loading States**: Loading indicators for all API operations
- **Health Monitoring**: Real-time API connectivity status
- **Token Management**: Automatic JWT token handling
- **File Uploads**: Support for FormData uploads

## 🔧 Setup Instructions

### Prerequisites
- Node.js 18+ 
- Backend API running on `http://localhost:8080`

### Installation

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Configure Environment**:
   ```bash
   # Update .env file with your backend URL
   VITE_API_BASE_URL=http://localhost:8080
   ```

3. **Start Development Server**:
   ```bash
   npm run dev
   ```

### Backend Connection

1. **Start your backend server** on `http://localhost:8080`

2. **Test API connectivity** - The admin dashboard will show API status:
   - 🟢 **API Connected**: Real backend data
   - 🔴 **Using Demo Data**: Fallback when API unavailable

3. **Admin Login Credentials**:
   - Email: `admin@brickbroker.in`
   - Password: `admin123`

### API Testing

Use the provided Postman collection to test all endpoints:

1. Import `brickbroker-complete-postman-collection.json`
2. Set `baseUrl` variable to `http://localhost:8080`
3. Test authentication and get JWT token
4. Test all admin and property endpoints

## 📱 Admin Dashboard Features

### Analytics Dashboard (`/admin/analytics`)
- **Real-time Metrics**: Properties, agents, revenue, visitors
- **Property Overview**: Status tracking and performance
- **API Health Status**: Live connectivity monitoring
- **Interactive Filters**: Sort and filter data
- **Quick Actions**: Navigate to management sections

### Agent Management (`/admin/pending-agents`)
- **Agent Approvals**: Review and approve new agents
- **Agent Details**: View complete agent profiles
- **Document Verification**: Check submitted documents
- **Bulk Actions**: Approve/reject multiple agents
- **Search & Filter**: Find agents by specialization

### Property Management (`/admin/property-management`)
- **Property CRUD**: Create, read, update, delete properties
- **Status Management**: Publish, draft, pending states
- **Image Uploads**: Multiple property images
- **Agent Assignment**: Assign properties to agents
- **Advanced Filters**: Search by type, status, location

### Request Management (`/admin/requests`)
- **Customer Inquiries**: Manage buyer requests
- **Property Requests**: Handle property submissions
- **Agent Applications**: Process new agent requests
- **Response Tracking**: Track inquiry responses

## 🔐 Authentication & Authorization

### Role-Based Access
- **Admin**: Full platform access
- **Agent**: Property management and customer interaction
- **User/Buyer**: Property browsing and inquiries

### Security Features
- JWT token authentication
- Protected routes with role validation
- Automatic token refresh
- Secure logout with token cleanup

## 🎨 UI/UX Features

- **Apple-level Design**: Premium aesthetics and micro-interactions
- **Responsive Layout**: Mobile-first design approach
- **Loading States**: Skeleton screens and spinners
- **Error Boundaries**: Graceful error handling
- **Accessibility**: WCAG compliant components
- **Performance**: Optimized images and lazy loading

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Environment Variables
```env
VITE_API_BASE_URL=https://your-api-domain.com
VITE_NODE_ENV=production
```

## 📞 Support

For technical support or questions about the API integration:
- Check the API health status in admin dashboard
- Review browser console for detailed error messages
- Ensure backend server is running and accessible
- Verify JWT tokens are being stored correctly

## 🔄 API Integration Status

The application supports both **API Mode** and **Demo Mode**:

- **API Mode**: Connects to real backend at `http://localhost:8080`
- **Demo Mode**: Uses static data for demonstration
- **Automatic Fallback**: Switches to demo data if API unavailable
- **Health Monitoring**: Real-time API connectivity status

Toggle between modes in the sign-in page or check the API status indicator in the admin dashboard.