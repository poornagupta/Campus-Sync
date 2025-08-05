import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { 
  Users, 
  Target, 
  Award, 
  Zap, 
  Shield, 
  Globe,
  Code,
  Lightbulb,
  Heart,
  Star,
  ArrowRight,
  Linkedin,
  Quote,
  TrendingUp,
  BarChart3,
  Calendar,
  BookOpen,
  ChevronUp,
  ChevronDown,
  Sparkles,
  Rocket,
  Phone,
  Mail,
  MapPin,
  Send,
  HelpCircle,
  Users2,
  GraduationCap,
  Smartphone
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";

const AboutUs = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const teamMembers = [
    {
      name: "Alex Chen",
      role: "CEO & Founder",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      linkedin: "#"
    },
    {
      name: "Sarah Johnson",
      role: "CTO",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b734?w=300&h=300&fit=crop&crop=face",
      linkedin: "#"
    },
    {
      name: "Marcus Rodriguez",
      role: "Lead Developer",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
      linkedin: "#"
    },
    {
      name: "Elena Petrov",
      role: "UX Designer",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
      linkedin: "#"
    },
    {
      name: "James Wilson",
      role: "Product Manager",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop&crop=face",
      linkedin: "#"
    },
    {
      name: "Priya Sharma",
      role: "Data Scientist",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&crop=face",
      linkedin: "#"
    }
  ];

  const features = [
    {
      icon: Code,
      title: "Built for Students",
      description: "Custom-built tools for academic success, designed by students for students with real-world needs in mind."
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Optimized performance ensures your academic tools are always ready when you need them most."
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your academic data is protected with enterprise-grade security and privacy measures."
    },
    {
      icon: Globe,
      title: "Always Accessible",
      description: "Access your academic hub from anywhere, on any device, with seamless synchronization."
    },
    {
      icon: Lightbulb,
      title: "Smart Features",
      description: "AI-powered insights and automation to help you study smarter, not harder."
    },
    {
      icon: Heart,
      title: "Community Driven",
      description: "Built with feedback from thousands of students to create the perfect academic companion."
    }
  ];

  const stats = [
    { number: "10K+", label: "Active Students" },
    { number: "50+", label: "Universities" },
    { number: "99.9%", label: "Uptime" },
    { number: "24/7", label: "Support" }
  ];

  const testimonials = [
    {
      name: "Emily Chen",
      role: "Computer Science Student",
      university: "Stanford University",
      content: "CampusSync completely transformed how I manage my academic life. The integrated tools make everything so much easier!",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b734?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Marcus Johnson",
      role: "Business Major",
      university: "Harvard University",
      content: "The best student platform I've ever used. It keeps me organized and helps me stay on top of all my assignments.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Sofia Rodriguez",
      role: "Engineering Student",
      university: "MIT",
      content: "Amazing platform! The grade calculator and timetable features are exactly what I needed for academic success.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "David Kim",
      role: "Pre-Med Student",
      university: "Johns Hopkins",
      content: "CampusSync's study tools and progress tracking have been game-changers for my medical school preparation.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Jessica Williams",
      role: "Liberal Arts Major",
      university: "Yale University",
      content: "Love how intuitive and comprehensive this platform is. It's like having a personal academic assistant!",
      rating: 5,
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Alex Thompson",
      role: "Graduate Student",
      university: "UC Berkeley",
      content: "The collaborative features and smart notifications keep me connected with my study groups effortlessly.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face"
    }
  ];

  const faqs = [
    {
      question: "What is CampusSync?",
      answer: "CampusSync is a comprehensive student management platform designed to streamline academic life through integrated tools for scheduling, task management, grade tracking, and collaboration."
    },
    {
      question: "Is CampusSync free to use?",
      answer: "We offer a free tier with essential features for all students. Premium plans are available with advanced features for enhanced productivity and collaboration."
    },
    {
      question: "How secure is my data?",
      answer: "We use enterprise-grade security measures including end-to-end encryption, secure cloud storage, and regular security audits to protect your academic information."
    },
    {
      question: "Can I sync data across devices?",
      answer: "Yes! CampusSync automatically syncs your data across all your devices in real-time, ensuring you always have access to your latest information."
    },
    {
      question: "Do you offer customer support?",
      answer: "We provide 24/7 customer support through multiple channels including email, live chat, and our comprehensive help center."
    },
    {
      question: "How do I get started?",
      answer: "Simply sign up with your email address, verify your account, and start exploring our intuitive dashboard. We also offer guided tours for new users."
    }
  ];

  const scrollRef = useRef<HTMLDivElement>(null);
  const teamScrollRef = useRef<HTMLDivElement>(null);
  
  const chartData = [
    { month: "Jan", students: 2400, satisfaction: 92 },
    { month: "Feb", students: 3200, satisfaction: 94 },
    { month: "Mar", students: 4100, satisfaction: 96 },
    { month: "Apr", students: 5300, satisfaction: 95 },
    { month: "May", students: 6800, satisfaction: 97 },
    { month: "Jun", students: 8200, satisfaction: 98 }
  ];

  const scrollTeam = (direction: 'left' | 'right') => {
    const container = teamScrollRef.current;
    if (!container) return;
    
    const scrollAmount = 350; // Width of one card plus gap
    const currentScroll = container.scrollLeft;
    
    if (direction === 'left') {
      container.scrollTo({
        left: currentScroll - scrollAmount,
        behavior: 'smooth'
      });
    } else {
      container.scrollTo({
        left: currentScroll + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent!",
      description: "Thank you for reaching out. We'll get back to you soon.",
    });
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  useEffect(() => {
    // Testimonials scroll effect (right to left) - Desktop only
    const testimonialContainer = scrollRef.current;
    if (testimonialContainer && window.innerWidth >= 768) { // Only on desktop
      let animationId: number;
      let scrollSpeed = 1;

      const scrollTestimonials = () => {
        if (testimonialContainer) {
          testimonialContainer.scrollLeft += scrollSpeed;
          
          // Reset scroll when reaching the end
          if (testimonialContainer.scrollLeft >= testimonialContainer.scrollWidth - testimonialContainer.clientWidth) {
            testimonialContainer.scrollLeft = 0;
          }
        }
        animationId = requestAnimationFrame(scrollTestimonials);
      };

      animationId = requestAnimationFrame(scrollTestimonials);

      // Pause on hover
      const handleMouseEnter = () => {
        cancelAnimationFrame(animationId);
      };

      const handleMouseLeave = () => {
        animationId = requestAnimationFrame(scrollTestimonials);
      };

      testimonialContainer.addEventListener('mouseenter', handleMouseEnter);
      testimonialContainer.addEventListener('mouseleave', handleMouseLeave);

      const cleanup = () => {
        cancelAnimationFrame(animationId);
        testimonialContainer.removeEventListener('mouseenter', handleMouseEnter);
        testimonialContainer.removeEventListener('mouseleave', handleMouseLeave);
      };

      return cleanup;
    }
  }, []);

  useEffect(() => {
    // Team horizontal scroll effect (left to right - CHANGED DIRECTION) - Desktop only
    const teamContainer = teamScrollRef.current;
    if (teamContainer && window.innerWidth >= 768) { // Only on desktop
      let teamAnimationId: number;
      let teamScrollSpeed = -0.5; // NEGATIVE speed for left to right movement

      const scrollTeamCards = () => {
        if (teamContainer) {
          teamContainer.scrollLeft += teamScrollSpeed;
          
          // Reset scroll when reaching the beginning
          if (teamContainer.scrollLeft <= 0) {
            teamContainer.scrollLeft = teamContainer.scrollWidth - teamContainer.clientWidth;
          }
        }
        teamAnimationId = requestAnimationFrame(scrollTeamCards);
      };

      teamAnimationId = requestAnimationFrame(scrollTeamCards);

      // Pause on hover
      const handleTeamMouseEnter = () => {
        cancelAnimationFrame(teamAnimationId);
      };

      const handleTeamMouseLeave = () => {
        teamAnimationId = requestAnimationFrame(scrollTeamCards);
      };

      teamContainer.addEventListener('mouseenter', handleTeamMouseEnter);
      teamContainer.addEventListener('mouseleave', handleTeamMouseLeave);

      const cleanup = () => {
        cancelAnimationFrame(teamAnimationId);
        teamContainer.removeEventListener('mouseenter', handleTeamMouseEnter);
        teamContainer.removeEventListener('mouseleave', handleTeamMouseLeave);
      };

      return cleanup;
    }
  }, []);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Enhanced Mission Section */}
      <section className="relative px-4 pb-12 md:pb-16 lg:pb-20 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-32 h-32 md:w-64 md:h-64 lg:w-96 lg:h-96 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-24 h-24 md:w-48 md:h-48 lg:w-80 lg:h-80 bg-gradient-to-tl from-primary/8 via-primary/3 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 md:w-32 md:h-32 bg-gradient-to-r from-primary/5 to-primary/10 rounded-full blur-2xl" />
        
        <div className="mx-auto max-w-7xl relative">
          <div className="grid gap-8 md:gap-12 lg:gap-16 lg:grid-cols-2 lg:items-center">
            <div className="space-y-6 md:space-y-8 lg:space-y-10">
              <div className="space-y-6 md:space-y-8">
                <Badge variant="outline" className="mb-2 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/30 backdrop-blur-sm">
                  <Target className="mr-2 h-4 w-4" />
                  Our Mission
                </Badge>
                
                <div className="space-y-4 md:space-y-6">
                  <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-[1.1]">
                    Revolutionizing
                    <br />
                    <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                      Academic Excellence
                    </span>
                  </h1>
                  
                  <div className="space-y-4 md:space-y-5 lg:space-y-6">
                    <p className="text-lg md:text-xl lg:text-2xl font-medium text-foreground/90 leading-relaxed">
                      Empowering students worldwide with cutting-edge technology that transforms academic management into an intuitive, efficient, and enjoyable experience.
                    </p>
                    
                    <div className="w-12 h-1 bg-gradient-to-r from-primary to-primary/60 rounded-full"></div>
                    
                    <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl">
                      We believe every student deserves access to tools that amplify their capabilities, foster collaboration, 
                      and provide insights that drive academic success. Our commitment extends beyond software – we're building 
                      a community that celebrates learning and achievement.
                    </p>
                  </div>
                </div>
                
                {/* Enhanced Mission Values */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
                  <div className="group flex items-center gap-3 p-4 rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 hover:border-primary/40 transition-all duration-300">
                    <div className="p-2 rounded-lg bg-primary/20 group-hover:bg-primary/30 transition-colors">
                      <Award className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm">Innovation</div>
                      <div className="text-xs text-muted-foreground">Cutting-edge solutions</div>
                    </div>
                  </div>
                  
                  <div className="group flex items-center gap-3 p-4 rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 hover:border-primary/40 transition-all duration-300">
                    <div className="p-2 rounded-lg bg-primary/20 group-hover:bg-primary/30 transition-colors">
                      <Globe className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm">Accessibility</div>
                      <div className="text-xs text-muted-foreground">For every student</div>
                    </div>
                  </div>
                  
                  <div className="group flex items-center gap-3 p-4 rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 hover:border-primary/40 transition-all duration-300">
                    <div className="p-2 rounded-lg bg-primary/20 group-hover:bg-primary/30 transition-colors">
                      <Shield className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm">Reliability</div>
                      <div className="text-xs text-muted-foreground">Always dependable</div>
                    </div>
                  </div>
                </div>

                {/* Enhanced Mission Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                  {stats.map((stat, index) => (
                    <div key={index} className="group text-center p-4 md:p-6 rounded-xl bg-gradient-to-br from-card via-card/95 to-muted/20 border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300">
                      <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary group-hover:scale-110 transition-transform duration-300">{stat.number}</div>
                      <div className="text-sm md:text-base text-muted-foreground mt-1">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="space-y-4 md:space-y-6 lg:space-y-8">
              {/* Enhanced Growth Chart */}
              <Card className="p-4 md:p-6 lg:p-8 border-primary/20 bg-gradient-to-br from-card via-card/95 to-muted/20 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                <CardContent className="p-0">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
                    <div>
                      <h3 className="font-bold flex items-center gap-3 text-lg md:text-xl">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <TrendingUp className="h-5 w-5 text-primary" />
                        </div>
                        Student Growth
                      </h3>
                      <p className="text-sm md:text-base text-muted-foreground mt-1">Monthly active users</p>
                    </div>
                    <Badge variant="secondary" className="bg-gradient-to-r from-primary/10 to-primary/20 text-primary border-primary/30">
                      +24% this month
                    </Badge>
                  </div>
                  <div className="space-y-4 md:space-y-5">
                    {chartData.slice(-3).map((data, index) => (
                      <div key={data.month} className="flex items-center gap-4">
                        <div className="w-8 md:w-10 text-sm font-semibold text-muted-foreground">{data.month}</div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm md:text-base font-semibold">{data.students.toLocaleString()} students</span>
                            <span className="text-sm text-primary font-bold">{data.satisfaction}%</span>
                          </div>
                          <Progress value={(data.students / 10000) * 100} className="h-2 md:h-3" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Enhanced Quick Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                <Card className="group p-4 md:p-6 border-primary/20 bg-gradient-to-br from-card to-muted/20 hover:shadow-lg hover:border-primary/40 transition-all duration-300">
                  <CardContent className="p-0">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-primary/10 to-primary/20 border border-primary/30 group-hover:scale-110 transition-transform duration-300">
                        <BookOpen className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <div className="text-xl md:text-2xl font-bold text-primary">50K+</div>
                        <div className="text-sm text-muted-foreground">Assignments Completed</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="group p-4 md:p-6 border-primary/20 bg-gradient-to-br from-card to-muted/20 hover:shadow-lg hover:border-primary/40 transition-all duration-300">
                  <CardContent className="p-0">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-primary/10 to-primary/20 border border-primary/30 group-hover:scale-110 transition-transform duration-300">
                        <Calendar className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <div className="text-xl md:text-2xl font-bold text-primary">98%</div>
                        <div className="text-sm text-muted-foreground">On-Time Delivery</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Enhanced Achievement Highlights */}
              <Card className="p-6 md:p-8 border-primary/20 bg-gradient-to-br from-primary/5 via-primary/8 to-primary/15 hover:shadow-xl transition-all duration-300">
                <CardContent className="p-0">
                  <div className="flex items-start gap-4 md:gap-6">
                    <div className="p-3 md:p-4 rounded-xl bg-gradient-to-br from-primary/20 to-primary/30 border border-primary/40 shadow-lg">
                      <Sparkles className="h-6 w-6 md:h-7 md:w-7 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold mb-3 text-lg md:text-xl text-foreground">Award-Winning Platform</h4>
                      <p className="text-sm md:text-base text-muted-foreground mb-4 leading-relaxed">
                        Recognized as "Best Student Management Platform 2024" by EdTech Innovation Awards and trusted by universities worldwide for delivering exceptional academic experiences.
                      </p>
                      <div className="flex flex-wrap items-center gap-2 md:gap-3">
                        <Badge variant="secondary" className="bg-gradient-to-r from-primary/10 to-primary/20 text-primary border-primary/30 font-medium">
                          🏆 EdTech Winner
                        </Badge>
                        <Badge variant="secondary" className="bg-gradient-to-r from-primary/10 to-primary/20 text-primary border-primary/30 font-medium">
                          ⭐ Student Choice
                        </Badge>
                        <Badge variant="secondary" className="bg-gradient-to-r from-primary/10 to-primary/20 text-primary border-primary/30 font-medium">
                          💡 Innovation Award
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="relative px-4 pt-12 md:pt-16 lg:pt-20 bg-gradient-to-b from-background via-muted/5 to-background overflow-hidden">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 md:mb-12 lg:mb-16 text-center relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 md:-translate-y-8 w-16 h-16 md:w-24 md:h-24 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full blur-xl" />
            <Badge variant="outline" className="mb-3 md:mb-4 lg:mb-6 relative z-10 bg-background/80 backdrop-blur-sm text-xs md:text-sm">
              <Rocket className="mr-2 h-3 w-3 md:h-4 md:w-4" />
              Why Choose CampusSense?
            </Badge>
            <h2 className="mb-3 md:mb-4 lg:mb-6 text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold relative z-10">
              The Future of
              <br />
              <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                Academic Excellence
              </span>
            </h2>
            <p className="mx-auto max-w-3xl text-xs md:text-sm lg:text-base text-muted-foreground relative z-10 px-4 leading-relaxed">
              Experience award-winning technology designed to transform how students learn, collaborate, and succeed in their academic journey.
            </p>
          </div>
          
          {/* Enhanced Feature Cards with Mobile-Optimized Layouts */}
          <div className="grid gap-4 md:gap-6 lg:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-12 lg:grid-rows-3">
            {/* REDUCED HEIGHT: Large feature card - Built for Students */}
            <Card className="md:col-span-2 lg:col-span-8 lg:row-span-1 group relative overflow-hidden border-primary/20 hover:shadow-2xl transition-all duration-500"
                  style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8)), url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}>
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-primary/20 dark:from-background/90 dark:via-background/70 dark:to-background/50" />
              <CardContent className="p-4 md:p-6 h-full flex flex-col relative z-10 min-h-[200px] md:min-h-[240px]">
                <div className="flex flex-col md:flex-row md:items-start gap-3 md:gap-4 mb-4">
                  <div className="p-2 md:p-3 rounded-xl bg-gradient-to-br from-primary/30 to-primary/20 group-hover:scale-110 transition-transform duration-300 backdrop-blur-sm w-fit">
                    <Code className="h-5 w-5 md:h-6 md:w-6 lg:h-7 lg:w-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-2 text-lg md:text-xl lg:text-2xl font-bold text-white">Built for Students</h3>
                    <p className="text-white/90 leading-relaxed text-xs md:text-sm lg:text-base">
                      Meticulously crafted by students, for students. Every feature addresses real academic challenges.
                    </p>
                  </div>
                </div>
                <div className="mt-auto grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
                  <div className="p-2 md:p-3 rounded-lg bg-white/10 border border-white/20 backdrop-blur-sm">
                    <div className="text-xs md:text-sm font-medium text-white">Student-Centric Design</div>
                    <div className="text-xs text-white/80 mt-1">By students, for students</div>
                  </div>
                  <div className="p-2 md:p-3 rounded-lg bg-white/10 border border-white/20 backdrop-blur-sm">
                    <div className="text-xs md:text-sm font-medium text-white">Real-World Solutions</div>
                    <div className="text-xs text-white/80 mt-1">Addressing actual needs</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Medium feature cards - Mobile responsive */}
            <Card className="lg:col-span-4 group relative overflow-hidden border-primary/20 hover:shadow-xl transition-all duration-300">
              <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-primary/15 to-transparent rounded-full blur-lg" />
              <CardContent className="p-4 md:p-6 relative z-10">
                <div className="mb-3 md:mb-4 inline-flex h-10 w-10 md:h-12 md:w-12 lg:h-14 lg:w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 group-hover:scale-110 transition-transform">
                  <Zap className="h-5 w-5 md:h-6 md:w-6 lg:h-7 lg:w-7 text-primary" />
                </div>
                <h3 className="mb-2 md:mb-3 text-lg md:text-xl font-bold">Lightning Fast</h3>
                <p className="text-xs md:text-sm text-muted-foreground mb-3 md:mb-4 leading-relaxed">
                  Experience blazing-fast performance with optimized infrastructure.
                </p>
                <div className="flex items-center gap-2 text-xs text-primary font-medium">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  99.9% Uptime Guaranteed
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-4 group relative overflow-hidden border-primary/20 hover:shadow-xl transition-all duration-300">
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-primary/15 to-transparent rounded-full blur-lg" />
              <CardContent className="p-4 md:p-6 relative z-10">
                <div className="mb-3 md:mb-4 inline-flex h-10 w-10 md:h-12 md:w-12 lg:h-14 lg:w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 group-hover:scale-110 transition-transform">
                  <Shield className="h-5 w-5 md:h-6 md:w-6 lg:h-7 lg:w-7 text-primary" />
                </div>
                <h3 className="mb-2 md:mb-3 text-lg md:text-xl font-bold">Secure & Private</h3>
                <p className="text-xs md:text-sm text-muted-foreground mb-3 md:mb-4 leading-relaxed">
                  Enterprise-grade security protecting your academic data.
                </p>
                <div className="flex items-center gap-2 text-xs text-primary font-medium">
                  <Shield className="w-3 h-3" />
                  Bank-Level Encryption
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-4 group relative overflow-hidden border-primary/20 hover:shadow-xl transition-all duration-300">
              <CardContent className="p-4 md:p-6">
                <div className="mb-3 md:mb-4 inline-flex h-10 w-10 md:h-12 md:w-12 lg:h-14 lg:w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 group-hover:scale-110 transition-transform">
                  <Globe className="h-5 w-5 md:h-6 md:w-6 lg:h-7 lg:w-7 text-primary" />
                </div>
                <h3 className="mb-2 md:mb-3 text-lg md:text-xl font-bold">Always Accessible</h3>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                  Access from anywhere, on any device, with seamless synchronization.
                </p>
              </CardContent>
            </Card>

            <Card className="lg:col-span-4 group relative overflow-hidden border-primary/20 hover:shadow-xl transition-all duration-300">
              <CardContent className="p-4 md:p-6">
                <div className="mb-3 md:mb-4 inline-flex h-10 w-10 md:h-12 md:w-12 lg:h-14 lg:w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 group-hover:scale-110 transition-transform">
                  <Lightbulb className="h-5 w-5 md:h-6 md:w-6 lg:h-7 lg:w-7 text-primary" />
                </div>
                <h3 className="mb-2 md:mb-3 text-lg md:text-xl font-bold">Smart Features</h3>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                  AI-powered insights and automation for smarter studying.
                </p>
              </CardContent>
            </Card>

            <Card className="lg:col-span-4 group relative overflow-hidden border-primary/20 hover:shadow-xl transition-all duration-300">
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-primary/15 to-transparent rounded-full blur-lg" />
              <CardContent className="p-4 md:p-6 relative z-10">
                <div className="mb-3 md:mb-4 inline-flex h-10 w-10 md:h-12 md:w-12 lg:h-14 lg:w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 group-hover:scale-110 transition-transform">
                  <Heart className="h-5 w-5 md:h-6 md:w-6 lg:h-7 lg:w-7 text-primary" />
                </div>
                <h3 className="mb-2 md:mb-3 text-lg md:text-xl font-bold">Community Driven</h3>
                <p className="text-xs md:text-sm text-muted-foreground mb-3 md:mb-4 leading-relaxed">
                  Built with feedback from thousands of students worldwide.
                </p>
                <div className="flex items-center gap-2 text-xs text-primary font-medium">
                  <Users2 className="w-3 h-3" />
                  10K+ Student Contributors
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-4 group relative overflow-hidden border-primary/20 hover:shadow-xl transition-all duration-300">
              <div className="absolute top-0 right-0 w-18 h-18 bg-gradient-to-bl from-primary/15 to-transparent rounded-full blur-lg" />
              <CardContent className="p-4 md:p-6 relative z-10">
                <div className="mb-3 md:mb-4 inline-flex h-10 w-10 md:h-12 md:w-12 lg:h-14 lg:w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 group-hover:scale-110 transition-transform">
                  <GraduationCap className="h-5 w-5 md:h-6 md:w-6 lg:h-7 lg:w-7 text-primary" />
                </div>
                <h3 className="mb-2 md:mb-3 text-lg md:text-xl font-bold">Academic Excellence</h3>
                <p className="text-xs md:text-sm text-muted-foreground mb-3 md:mb-4 leading-relaxed">
                  Proven to improve academic performance and graduation rates.
                </p>
                <div className="flex items-center gap-2 text-xs text-primary font-medium">
                  <TrendingUp className="w-3 h-3" />
                  +15% Grade Improvement
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-4 group relative overflow-hidden border-primary/20 hover:shadow-xl transition-all duration-300">
              <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-primary/15 to-transparent rounded-full blur-lg" />
              <CardContent className="p-4 md:p-6 relative z-10">
                <div className="mb-3 md:mb-4 inline-flex h-10 w-10 md:h-12 md:w-12 lg:h-14 lg:w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 group-hover:scale-110 transition-transform">
                  <Smartphone className="h-5 w-5 md:h-6 md:w-6 lg:h-7 lg:w-7 text-primary" />
                </div>
                <h3 className="mb-2 md:mb-3 text-lg md:text-xl font-bold">Mobile First</h3>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                  Designed for mobile with native-like performance on all devices.
                </p>
                <div className="flex items-center gap-2 text-xs text-primary font-medium mt-3 md:mt-4">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  Cross-Platform Compatible
                </div>
              </CardContent>
            </Card>

          </div>
        </div>
      </section>

      {/* Team Section with LEFT TO RIGHT movement */}
      <section className="px-4 pb-6 md:pb-8 lg:pb-10 overflow-hidden">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 md:mb-16 lg:mb-20 text-center py-8 md:py-12 lg:py-16">
            <Badge variant="outline" className="mb-6 md:mb-8 text-sm md:text-base bg-background/80 backdrop-blur-sm border-primary/30">
              <Users className="mr-2 h-4 w-4 md:h-5 md:w-5" />
              Our Team
            </Badge>
            <h2 className="mb-6 md:mb-8 text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight">
              Meet the Innovators
            </h2>
            <p className="mx-auto max-w-3xl text-base md:text-lg lg:text-xl text-muted-foreground px-6 leading-relaxed">
              Passionate educators and technologists working together to transform the student experience.
            </p>
          </div>
          
          <div className="relative">
            {/* Mobile: Grid Layout, Desktop: Horizontal Scrollable Container */}
            <div className="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4">
              {teamMembers.map((member, index) => (
                <Card key={index} className="group overflow-hidden border-border/50 transition-all hover:border-primary/50 hover:shadow-xl bg-gradient-to-br from-background to-muted/20">
                  <CardContent className="p-0">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4">
                      <div className="mb-4">
                        <h3 className="mb-2 text-lg font-bold group-hover:text-primary transition-colors">{member.name}</h3>
                        <p className="text-primary font-medium mb-2 text-sm">{member.role}</p>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {index === 0 && "Visionary leader with 10+ years in EdTech, passionate about revolutionizing student experiences through innovative technology solutions."}
                          {index === 1 && "Technical architect driving our platform's cutting-edge infrastructure and ensuring scalable, secure solutions for millions of students."}
                          {index === 2 && "Full-stack expert crafting seamless user experiences with clean, efficient code that powers our award-winning platform."}
                          {index === 3 && "Design innovator creating intuitive interfaces that make complex academic management feel effortless and enjoyable."}
                          {index === 4 && "Strategic product leader translating student needs into powerful features that drive academic success and engagement."}
                          {index === 5 && "AI specialist developing intelligent insights that help students make data-driven decisions about their academic journey."}
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                        <Button variant="ghost" size="sm" className="p-2 h-auto text-primary hover:text-primary/80 hover:bg-primary/10">
                          <Linkedin className="h-3 w-3" />
                          <span className="sr-only">LinkedIn profile</span>
                        </Button>
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-2.5 w-2.5 fill-primary text-primary" />
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Desktop: Horizontal Scrollable Container */}
            <div 
              ref={teamScrollRef}
              className="hidden md:flex gap-4 md:gap-6 overflow-x-hidden pb-4"
              style={{ scrollBehavior: 'smooth' }}
            >
              {/* Duplicate team members for seamless loop */}
              {[...teamMembers, ...teamMembers].map((member, index) => (
                <Card key={index} className="flex-shrink-0 w-72 sm:w-80 md:w-96 group overflow-hidden border-border/50 transition-all hover:border-primary/50 hover:shadow-xl bg-gradient-to-br from-background to-muted/20">
                  <CardContent className="p-0">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4 md:p-6">
                      <div className="mb-4">
                        <h3 className="mb-2 text-lg md:text-xl font-bold group-hover:text-primary transition-colors">{member.name}</h3>
                        <p className="text-primary font-medium mb-2 text-sm md:text-base">{member.role}</p>
                        <p className={`text-xs md:text-sm text-muted-foreground leading-relaxed ${
                          (index % teamMembers.length) === 5 ? 'italic' : ''
                        }`}>
                          {(index % teamMembers.length) === 0 && "Visionary leader with 10+ years in EdTech, passionate about revolutionizing student experiences through innovative technology solutions."}
                          {(index % teamMembers.length) === 1 && "Technical architect driving our platform's cutting-edge infrastructure and ensuring scalable, secure solutions for millions of students."}
                          {(index % teamMembers.length) === 2 && "Full-stack expert crafting seamless user experiences with clean, efficient code that powers our award-winning platform."}
                          {(index % teamMembers.length) === 3 && "Design innovator creating intuitive interfaces that make complex academic management feel effortless and enjoyable."}
                          {(index % teamMembers.length) === 4 && "Strategic product leader translating student needs into powerful features that drive academic success and engagement."}
                          {(index % teamMembers.length) === 5 && "AI specialist developing intelligent insights that help students make data-driven decisions about their academic journey."}
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                        <Button variant="ghost" size="sm" className="p-2 h-auto text-primary hover:text-primary/80 hover:bg-primary/10">
                          <Linkedin className="h-3 w-3 md:h-4 md:w-4" />
                          <span className="sr-only">LinkedIn profile</span>
                        </Button>
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-2.5 w-2.5 md:h-3 md:w-3 fill-primary text-primary" />
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Gradient fade effects - only show on desktop */}
            <div className="hidden md:block absolute top-0 left-0 bottom-0 w-8 md:w-16 bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
            <div className="hidden md:block absolute top-0 right-0 bottom-0 w-8 md:w-16 bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="px-4 py-12 md:py-16 lg:py-20 overflow-hidden">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 md:mb-12 lg:mb-16 text-center">
            <Badge variant="outline" className="mb-3 md:mb-4 text-xs md:text-sm">
              <Quote className="mr-2 h-3 w-3 md:h-4 md:w-4" />
              Student Testimonials
            </Badge>
            <h2 className="mb-3 md:mb-4 text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold">What Students Say About Us</h2>
            <p className="mx-auto max-w-2xl text-xs md:text-sm lg:text-base text-muted-foreground px-4 leading-relaxed">
              Hear from real students who have transformed their academic experience with CampusSync.
            </p>
          </div>
          
          {/* Mobile: Grid Layout, Desktop: Horizontal Scrollable Container */}
          <div className="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-border/50 bg-gradient-to-br from-card/80 to-muted/30 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                <CardContent className="p-4">
                  <div className="mb-3 flex items-center gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-primary text-primary" />
                    ))}
                  </div>
                  <Quote className="mb-3 h-4 w-4 text-primary/20" />
                  <p className="mb-4 text-xs leading-relaxed text-muted-foreground italic">
                    "{testimonial.content}"
                  </p>
                  <div className="border-t border-border/50 pt-3 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-gradient-to-br from-primary/20 to-primary/10">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-xs">{testimonial.name}</h4>
                      <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                      <p className="text-xs text-primary font-medium">{testimonial.university}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Desktop: Horizontal Scrollable Container */}
          <div 
            ref={scrollRef}
            className="hidden md:flex gap-3 md:gap-4 lg:gap-6 overflow-x-hidden"
            style={{ scrollBehavior: 'smooth' }}
          >
            {/* Duplicate testimonials for seamless loop */}
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <Card key={index} className="flex-shrink-0 w-64 sm:w-72 md:w-80 border-border/50 bg-gradient-to-br from-card/80 to-muted/30 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                <CardContent className="p-4 md:p-5 lg:p-6">
                  <div className="mb-3 md:mb-4 flex items-center gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 md:h-4 md:w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <Quote className="mb-3 md:mb-4 h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6 text-primary/20" />
                  <p className="mb-4 md:mb-6 text-xs md:text-sm leading-relaxed text-muted-foreground italic">
                    "{testimonial.content}"
                  </p>
                  <div className="border-t border-border/50 pt-3 md:pt-4 flex items-center gap-3">
                    <div className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full overflow-hidden bg-gradient-to-br from-primary/20 to-primary/10">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-xs md:text-sm">{testimonial.name}</h4>
                      <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                      <p className="text-xs text-primary font-medium">{testimonial.university}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="px-4 py-12 md:py-16 lg:py-20 bg-gradient-to-b from-background to-muted/20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 md:mb-12 lg:mb-16 text-center">
            <Badge variant="outline" className="mb-3 md:mb-4 text-xs md:text-sm">
              <Phone className="mr-2 h-3 w-3 md:h-4 md:w-4" />
              Contact Us
            </Badge>
            <h2 className="mb-3 md:mb-4 text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold">Get in Touch</h2>
            <p className="mx-auto max-w-2xl text-xs md:text-sm lg:text-base text-muted-foreground px-4 leading-relaxed">
              Have questions or need support? We're here to help you make the most of your academic journey.
            </p>
          </div>

          <div className="grid gap-6 md:gap-8 lg:gap-12 lg:grid-cols-2">
            {/* Contact Form */}
            <Card className="border-primary/20 bg-gradient-to-br from-background to-muted/10">
              <CardContent className="p-4 md:p-6 lg:p-8">
                <div className="mb-4 md:mb-6">
                  <h3 className="text-lg md:text-xl font-bold mb-2">Send us a Message</h3>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    Fill out the form below and we'll get back to you within 24 hours.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-xs md:text-sm">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        required
                        className="text-xs md:text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-xs md:text-sm">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                        required
                        className="text-xs md:text-sm"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-xs md:text-sm">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="What's this about?"
                      required
                      className="text-xs md:text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-xs md:text-sm">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us how we can help you..."
                      rows={5}
                      required
                      className="text-xs md:text-sm resize-none"
                    />
                  </div>

                  <Button type="submit" className="w-full group text-xs md:text-sm">
                    <Send className="mr-2 h-3 w-3 md:h-4 md:w-4" />
                    Send Message
                    <ArrowRight className="ml-2 h-3 w-3 md:h-4 md:w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </form>

                {/* Contact Info */}
                <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-border/50">
                  <div className="grid gap-3 md:gap-4 sm:grid-cols-2">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <Mail className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                      <div>
                        <div className="text-xs md:text-sm font-medium">Email</div>
                        <div className="text-xs text-muted-foreground">support@campussync.com</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <Phone className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                      <div>
                        <div className="text-xs md:text-sm font-medium">Phone</div>
                        <div className="text-xs text-muted-foreground">+1 (555) 123-4567</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* FAQ Section */}
            <Card className="border-primary/20 bg-gradient-to-br from-background to-muted/10">
              <CardContent className="p-4 md:p-6 lg:p-8">
                <div className="mb-4 md:mb-6">
                  <h3 className="text-lg md:text-xl font-bold mb-2 flex items-center gap-2">
                    <HelpCircle className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                    Frequently Asked Questions
                  </h3>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    Quick answers to common questions about CampusSync.
                  </p>
                </div>

                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left text-xs md:text-sm hover:text-primary">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>

                {/* Quick Contact */}
                <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-border/50">
                  <div className="text-center">
                    <p className="text-xs md:text-sm text-muted-foreground mb-3 md:mb-4">
                      Can't find what you're looking for?
                    </p>
                    <Button variant="outline" size="sm" className="text-xs md:text-sm">
                      Contact Support
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

    </div>
  );
};

export default AboutUs;