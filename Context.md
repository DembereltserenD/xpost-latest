# xpost.mn Web Application Context

## Overview
xpost.mn is a modern news platform built with cutting-edge technologies to deliver a seamless news reading experience. The platform features real-time news updates, weather information, exchange data, and a sophisticated content management system.

## Tech Stack

### Frontend
- **Framework**: Nuxt.js 3 with TypeScript
- **UI Framework**: Nuxt's built-in design system
- **State Management**: Pinia (via useNewsStore)
- **Styling**: 
  - Tailwind CSS
  - Custom CSS modules
  - Dark/Light mode support

### Backend
- **Platform**: Supabase
  - Real-time database
  - Authentication
  - Storage
  - Serverless Functions

### AI Integration
- **Model**: Claude 3.5 Sonnet
  - Used for content processing and enhancement
  - Natural language understanding

## Core Features

### 1. News Management
- Featured news section (Онцлох мэдээ)
- Latest news grid (Сүүлийн үеийн мэдээ)
- Category-based news organization
- Infinite scroll with "Load More" functionality
- Responsive news grid layout

### 2. Weather Integration
- Real-time weather updates
- Temperature charts
- Weather forecasting
- Weather map visualization
- Weather tips and recommendations

### 3. User Interface
- Responsive design for all devices
- Dark/Light mode toggle
- Mobile-friendly navigation
- Sticky social media links
- Loading skeletons for better UX

### 4. Admin Dashboard
- Secure admin routes (/admin/*)
- Content management system
- Analytics and statistics
- User management

### 5. Authentication
- User registration and login
- Password recovery system
- Protected routes
- Role-based access control

## Project Structure

### Key Components
1. `app.vue`: Main application entry point
   - Layout management
   - Color mode handling
   - Route-based rendering

2. Core Components:
   - `Header.vue`: Navigation and weather widget
   - `FeaturedNews.vue`: Featured news display
   - `NewsGrid.vue`: News article grid
   - `WeatherMap.vue`: Interactive weather visualization
   - `Ticker.vue`: News ticker for latest updates

3. Admin Components:
   - `DashboardStats.vue`: Admin statistics
   - Various news management components

### Asset Organization
- `assets/css/`: Global styles and Tailwind configuration
- `components/`: Reusable Vue components
- `stores/`: Pinia state management
- `pages/`: Route components

## Development Workflow

### Local Development
```bash
npm install    # Install dependencies
npm run dev    # Start development server
```

### Production
```bash
npm run build    # Build for production
npm run preview  # Preview production build
```

## Future Enhancements
1. Enhanced AI Content Processing
   - Advanced article summarization using Claude 3.5 Sonnet
   - Automated content tagging and categorization
   - Smart content recommendations

2. Real-time News Notifications
   - Push notification system for breaking news
   - Custom notification preferences
   - Topic-based alert system

3. Personalized News Feed
   - AI-driven content personalization
   - User preference learning
   - Reading history-based recommendations

4. Advanced Exchange Rate Features
   - Real-time currency conversion
   - Historical exchange rate charts
   - Multi-currency support
   - Rate alerts and notifications

5. Community Features and Commenting System
   - User profiles and engagement metrics
   - Moderated commenting system
   - Social sharing integration
   - User reputation system

6. Enhanced Single News Article Experience
   - Rich media integration
   - Interactive content elements
   - Related articles suggestions
   - Reading time estimates
   - Audio versions of articles

7. Advanced Article Editing System
   - Real-time collaborative editing
   - Version control and revision history
   - Advanced formatting options
   - Multi-media asset management
   - AI-assisted content optimization

## Security Considerations
- Protected admin routes
- Secure authentication flow
- Environment variable management
- API key protection
- XSS prevention through Vue's template system

## Performance Optimizations
- Client-side rendering for dynamic content
- Server-side rendering for SEO
- Image optimization (via Supabase storage)
- Lazy loading of components
- Efficient state management

This context document serves as a comprehensive guide to the xpost.mn web application, its architecture, and its features. It should be updated as the application evolves and new features are added.
