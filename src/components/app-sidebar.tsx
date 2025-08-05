import * as React from "react"
import {
  LayoutDashboard,
  Calendar,
  Timer,
  Calculator,
  CheckSquare,
  FileText,
  Music,
  Dumbbell,
  DollarSign,
  Users,
  GraduationCap,
  BookOpen,
  BookMarked,
  ClipboardList,
  CalendarDays,
  CalendarClock,
  CalendarX,
  Bot,
  Brain,
  Zap,
  Globe,
  PenTool,
  Newspaper,
} from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "John Student",
    email: "john@university.edu",
    avatar: "/placeholder.svg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: "Courses",
      url: "/courses",
      icon: BookOpen,
      items: [
        {
          title: "My Courses",
          url: "/courses/my-courses",
        },
        {
          title: "Course Catalog",
          url: "/courses/catalog",
        },
        {
          title: "Assignments",
          url: "/courses/assignments",
        },
      ],
    },
    {
      title: "Schedule",
      url: "/schedule",
      icon: Calendar,
      items: [
        {
          title: "Daily Planner",
          url: "/schedule/classes",
        },
        {
          title: "Exam Schedule",
          url: "/schedule/exams",
        },
        {
          title: "Events",
          url: "/schedule/events",
        },
      ],
    },
    {
      title: "Timetable",
      url: "/timetable",
      icon: CalendarDays,
    },
    {
      title: "Pomodoro",
      url: "/pomodoro",
      icon: Timer,
    },
    {
      title: "Calculators",
      url: "/calculators",
      icon: Calculator,
    },
    {
      title: "Tasks",
      url: "/tasks",
      icon: CheckSquare,
    },
    {
      title: "Notes",
      url: "/notes",
      icon: FileText,
    },
    {
      title: "Music Player",
      url: "/music",
      icon: Music,
    },
    {
      title: "Fitness",
      url: "/fitness",
      icon: Dumbbell,
    },
    {
      title: "Expenses",
      url: "/expenses",
      icon: DollarSign,
    },
    {
      title: "Community",
      url: "/community",
      icon: Users,
    },
    {
      title: "About Us",
      url: "/about",
      icon: Users,
    },
  ],
  navSecondary: [],
  projects: [
    {
      name: "Ask AI",
      url: "/ask-ai",
      icon: Bot,
    },
    {
      name: "Meditation",
      url: "/meditation", 
      icon: Brain,
    },
    {
      name: "Motivation",
      url: "/motivation",
      icon: Zap,
    },
    {
      name: "Wikipedia",
      url: "/wikipedia",
      icon: Globe,
    },
    {
      name: "Blog",
      url: "/blog",
      icon: PenTool,
    },
    {
      name: "News",
      url: "/news",
      icon: Newspaper,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <NavLink to="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <GraduationCap className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">CampusSync</span>
                  <span className="truncate text-xs">Student Portal</span>
                </div>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}