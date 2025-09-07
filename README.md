# CampusSync - Comprehensive Educational Management Platform

## 🎓 Project Overview

CampusSync is a modern, comprehensive educational management platform designed to streamline academic operations for students, teachers, and administrators. Built with cutting-edge technologies, it provides a unified solution for managing all aspects of campus life.

**Live Demo**: https://lovable.dev/projects/8c8ba721-0263-4934-b067-fa6a90b9418b

## ✨ Key Features

### 👨‍🎓 Student Features
- **Academic Dashboard** - Overview of courses, grades, and assignments
- **Smart Timetable** - Interactive class schedule with mobile optimization
- **Assignment Management** - Track assignments and submissions
- **Grade Tracking** - View marks and academic progress
- **Expense Tracking** - Personal finance management
- **Study Tools** - Notes, calculators, and study materials
- **Wellness Features** - Meditation, fitness tracking, and Pomodoro timer
- **Community** - Chat groups and collaboration tools

### 👩‍🏫 Teacher Features
- **Teaching Dashboard** - Manage classes and student progress
- **Class Management** - View assigned classes and student lists
- **Assignment Creation** - Create and manage assignments
- **Grade Management** - Upload and manage student marks
- **Billing System** - Track payments and payroll
- **Exam Management** - Schedule and manage examinations
- **Student Analytics** - Track student performance

### 👨‍💼 Administrator Features
- **Admin Dashboard** - Complete system overview and analytics
- **Student Management** - Comprehensive student database
- **Teacher Management** - Teacher allocation and management
- **Course Planning** - Academic structure and course management
- **Billing System** - Financial management and billing
- **Exam Scheduling** - Centralized exam management
- **Announcement System** - Campus-wide communications
- **Academic Structure** - Branch and subject management

### 🛠 Universal Features
- **Role-Based Access Control** - Secure, role-specific interfaces
- **Responsive Design** - Optimized for all devices
- **Dark/Light Mode** - Theme switching capability
- **SEO Optimized** - Search engine friendly
- **Real-time Updates** - Live data synchronization
- **AI Assistant** - Integrated AI help system
- **Multi-media Support** - Music player and media sharing
- **Advanced Calculators** - CGPA, loan, and grade calculators

## 🚀 Technology Stack

### Frontend
- **React 18** - Modern React with hooks and context
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Modern component library
- **React Router v6** - Client-side routing
- **React Hook Form** - Form handling and validation
- **Zod** - Schema validation
- **Recharts** - Data visualization
- **Lucide React** - Icon library

### Backend & Services
- **Supabase** - Backend-as-a-Service
  - Authentication & Authorization
  - PostgreSQL Database
  - Real-time subscriptions
  - Edge Functions
- **AI Integration** - Custom AI assistant functionality

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **TypeScript** - Static type checking

## 📁 Project Structure

The project follows a modular architecture with clear separation of concerns:

```
src/
├── components/          # Reusable UI components
│   ├── admin/          # Admin-specific components
│   ├── auth/           # Authentication components
│   ├── billing/        # Billing system components
│   ├── dashboard/      # Dashboard components
│   ├── ui/             # Base UI components (shadcn/ui)
│   └── ...
├── pages/              # Page components
├── routes/             # Route configurations
│   ├── admin/          # Admin routes
│   ├── student/        # Student routes
│   ├── teacher/        # Teacher routes
│   └── common/         # Shared routes
├── hooks/              # Custom React hooks
├── contexts/           # React context providers
├── types/              # TypeScript type definitions
├── lib/                # Utility functions
└── assets/             # Static assets
```

For detailed project structure, see [FOLDER_STRUCTURE.md](./FOLDER_STRUCTURE.md)

## 🔧 Development Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
```bash
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Build for production**
```bash
npm run build
```

## 📝 Development Guidelines

### Code Style
- Use TypeScript for all components
- Follow consistent naming conventions
- Keep components small and focused
- Use Tailwind utility classes for styling
- Implement proper error handling

### Component Architecture
- Prefer composition over inheritance
- Use custom hooks for complex logic
- Implement proper TypeScript interfaces
- Follow the established folder structure

### State Management
- React Context for global state
- Custom hooks for feature-specific logic
- Local state for component-specific data

## 🎨 Editing Your Application

### Using Lovable (Recommended)
Simply visit the [Lovable Project](https://lovable.dev/projects/8c8ba721-0263-4934-b067-fa6a90b9418b) and start prompting. Changes made via Lovable will be committed automatically to this repo.

### Using Your Preferred IDE
You can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

### GitHub Codespaces
- Navigate to the main page of your repository
- Click on the "Code" button → "Codespaces" tab
- Click "New codespace" to launch the development environment

## 🚀 Deployment

### Lovable Hosting
Simply open [Lovable](https://lovable.dev/projects/8c8ba721-0263-4934-b067-fa6a90b9418b) and click on Share → Publish.

### Custom Domain
To connect a custom domain:
1. Navigate to Project > Settings > Domains
2. Click Connect Domain
3. Follow the setup instructions

Read more: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain)

## 📊 Features in Detail

### Authentication System
- Multi-role authentication (Student/Teacher/Admin)
- Secure JWT-based sessions
- Role-based route protection
- Mobile-optimized login flow

### Academic Management
- Comprehensive timetable system
- Assignment tracking and submission
- Grade management and analytics
- Exam scheduling and management

### Financial Management
- Student billing and payments
- Teacher payroll management
- Expense tracking and analytics
- Financial reporting

### Communication
- Announcement system
- Community chat features
- Real-time notifications
- Media sharing capabilities

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is built with Lovable and follows their terms of service.

## 🆘 Support

For questions or support:
- Check the [Lovable Documentation](https://docs.lovable.dev/)
- Join the [Lovable Discord Community](https://discord.com/channels/1119885301872070706/1280461670979993613)
- Review the project structure in [FOLDER_STRUCTURE.md](./FOLDER_STRUCTURE.md)
