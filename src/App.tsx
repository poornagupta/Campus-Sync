import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { HelmetProvider } from 'react-helmet-async';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Timetable from "./pages/Timetable";
import Pomodoro from "./pages/Pomodoro";
import Calculators from "./pages/Calculators";
import Tasks from "./pages/Tasks";
import Notes from "./pages/Notes";
import MusicPlayer from "./pages/MusicPlayer";
import Fitness from "./pages/Fitness";
import Expenses from "./pages/Expenses";
import Community from "./pages/Community";
import MyCourses from "./pages/MyCourses";
import CourseCatalog from "./pages/CourseCatalog";
import Assignments from "./pages/Assignments";
import ClassSchedule from "./pages/ClassSchedule";
import ExamSchedule from "./pages/ExamSchedule";
import Events from "./pages/Events";
import AboutUs from "./pages/AboutUs";
import AskAI from "./pages/AskAI";
import News from "./pages/News";
import Wikipedia from "./pages/Wikipedia";
import Motivation from "./pages/Motivation";
import Meditation from "./pages/Meditation";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import StudentProfile from "./pages/StudentProfile";
import AcademicProgress from "./pages/AcademicProgress";
import ViewMarks from "./pages/ViewMarks";
import StudentID from "./pages/StudentID";
import BillingPayments from "./pages/BillingPayments";

import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <ThemeProvider defaultTheme="light" storageKey="campussync-ui-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            {/* Login page without sidebar */}
            <Route path="/login" element={<Login />} />
            
            {/* Pages with sidebar layout */}
            <Route path="/*" element={
              <SidebarProvider>
                <div className="min-h-screen flex w-full">
                  <AppSidebar />
                  <main className="flex-1">
                    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                      <SidebarTrigger className="-ml-1" />
                      <div className="ml-auto flex items-center gap-2">
                        <ThemeToggle />
                      </div>
                    </header>
                    <div className="flex-1 space-y-4 p-4 md:p-8">
                      <Routes>
                        <Route path="/" element={<Index />} />
                        <Route path="/timetable" element={<Timetable />} />
                        <Route path="/pomodoro" element={<Pomodoro />} />
                        <Route path="/calculators" element={<Calculators />} />
                        <Route path="/tasks" element={<Tasks />} />
                        <Route path="/notes" element={<Notes />} />
                        <Route path="/music" element={<MusicPlayer />} />
                        <Route path="/fitness" element={<Fitness />} />
                        <Route path="/expenses" element={<Expenses />} />
                        <Route path="/community" element={<Community />} />
                        <Route path="/courses/my-courses" element={<MyCourses />} />
                        <Route path="/courses/catalog" element={<CourseCatalog />} />
                        <Route path="/courses/assignments" element={<Assignments />} />
                        <Route path="/schedule/classes" element={<ClassSchedule />} />
                        <Route path="/schedule/exams" element={<ExamSchedule />} />
                        <Route path="/schedule/events" element={<Events />} />
                        <Route path="/about" element={<AboutUs />} />
                        <Route path="/ask-ai" element={<AskAI />} />
                        <Route path="/news" element={<News />} />
                        <Route path="/wikipedia" element={<Wikipedia />} />
                        <Route path="/motivation" element={<Motivation />} />
                        <Route path="/meditation" element={<Meditation />} />
                        <Route path="/blog" element={<Blog />} />
                        <Route path="/blog/:id" element={<BlogPost />} />
                        <Route path="/student-profile" element={<StudentProfile />} />
                        <Route path="/academic-progress" element={<AcademicProgress />} />
                        <Route path="/view-marks" element={<ViewMarks />} />
                        <Route path="/student-id" element={<StudentID />} />
                        <Route path="/billing-payments" element={<BillingPayments />} />
                        
                        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </div>
                  </main>
                </div>
              </SidebarProvider>
            } />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;