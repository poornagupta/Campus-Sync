import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { usePageLoading } from "@/hooks/use-page-loading"
import { ProfileSkeleton } from "@/components/ui/profile-skeleton"
import { GraduationCap, MapPin, Calendar, Phone, Mail, Edit } from "lucide-react"
import { EditProfileDialog } from "@/components/profile/EditProfileDialog"
import { useToast } from "@/hooks/use-toast"

export default function StudentProfile() {
  const isLoading = usePageLoading()
  const { toast } = useToast()
  const navigate = useNavigate()
  const [editDialogOpen, setEditDialogOpen] = useState(false)

  const [student, setStudent] = useState({
    name: "John Student",
    email: "john@university.edu",
    phone: "+1 (555) 123-4567",
    studentId: "STU-2024-001",
    course: "Computer Science Engineering",
    year: "3rd Year",
    semester: "6th Semester",
    cgpa: "8.65",
    avatar: "/placeholder.svg",
    address: "123 University Street, Campus City, ST 12345",
    enrollmentDate: "August 2022",
    expectedGraduation: "May 2026",
    status: "Active"
  })

  const handleProfileUpdate = (updatedStudent: any) => {
    setStudent(updatedStudent)
  }

  const handleQuickAction = (action: string) => {
    switch (action) {
      case "transcripts":
        toast({
          title: "Generating Transcripts",
          description: "Your academic transcripts are being prepared for download."
        })
        // Simulate transcript generation
        setTimeout(() => {
          toast({
            title: "Transcripts Ready",
            description: "Your transcripts have been generated successfully."
          })
        }, 2000)
        break
      case "schedule":
        navigate("/class-schedule")
        break
      case "advisor":
        toast({
          title: "Contacting Advisor",
          description: "Opening communication channel with your academic advisor."
        })
        // Simulate advisor contact
        setTimeout(() => {
          const advisorEmail = "advisor@university.edu"
          window.open(`mailto:${advisorEmail}?subject=Student Inquiry - ${student.studentId}`)
        }, 1000)
        break
      case "update":
        setEditDialogOpen(true)
        break
      default:
        break
    }
  }

  if (isLoading) {
    return <ProfileSkeleton />
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Student Profile</h1>
          <p className="text-muted-foreground text-sm sm:text-base hidden sm:block">
            View and manage your academic profile information
          </p>
        </div>
        <Button onClick={() => setEditDialogOpen(true)} className="w-full sm:w-auto">
          <Edit className="mr-2 h-4 w-4" />
          <span className="hidden sm:inline">Edit Profile</span>
          <span className="sm:hidden">Edit</span>
        </Button>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Profile Overview */}
        <Card className="lg:col-span-1">
          <CardHeader className="text-center">
            <Avatar className="h-20 w-20 sm:h-24 sm:w-24 mx-auto mb-4">
              <AvatarImage src={student.avatar} alt={student.name} />
              <AvatarFallback className="text-lg">JS</AvatarFallback>
            </Avatar>
            <CardTitle className="text-lg sm:text-xl">{student.name}</CardTitle>
            <CardDescription>
              <Badge variant="secondary" className="mt-2">{student.status}</Badge>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2 text-sm">
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs sm:text-sm">{student.studentId}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs sm:text-sm break-all">{student.email}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs sm:text-sm">{student.phone}</span>
            </div>
            <div className="flex items-start gap-2 text-sm">
              <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
              <span className="text-xs sm:text-sm">{student.address}</span>
            </div>
          </CardContent>
        </Card>

        {/* Academic Information */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Academic Information</CardTitle>
            <CardDescription className="hidden sm:block">Your current academic status and progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground">Course</label>
                <p className="font-medium text-sm">{student.course}</p>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground">Current Year</label>
                <p className="font-medium text-sm">{student.year}</p>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground">Current Semester</label>
                <p className="font-medium text-sm">{student.semester}</p>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground">CGPA</label>
                <p className="font-medium text-primary text-sm">{student.cgpa}/10.0</p>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground">Enrollment Date</label>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <p className="font-medium text-sm">{student.enrollmentDate}</p>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground">Expected Graduation</label>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <p className="font-medium text-sm">{student.expectedGraduation}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">Quick Actions</CardTitle>
          <CardDescription className="hidden sm:block">Access your academic resources quickly</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
            <Button 
              variant="outline" 
              className="h-auto p-3 flex flex-col gap-1 text-xs sm:text-sm"
              onClick={() => handleQuickAction("transcripts")}
            >
              <GraduationCap className="h-4 w-4 sm:h-5 sm:w-5" />
              <span>Transcripts</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-auto p-3 flex flex-col gap-1 text-xs sm:text-sm"
              onClick={() => handleQuickAction("schedule")}
            >
              <Calendar className="h-4 w-4 sm:h-5 sm:w-5" />
              <span>Schedule</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-auto p-3 flex flex-col gap-1 text-xs sm:text-sm"
              onClick={() => handleQuickAction("advisor")}
            >
              <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
              <span>Advisor</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-auto p-3 flex flex-col gap-1 text-xs sm:text-sm"
              onClick={() => handleQuickAction("update")}
            >
              <Edit className="h-4 w-4 sm:h-5 sm:w-5" />
              <span>Update</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      <EditProfileDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        student={student}
        onSave={handleProfileUpdate}
      />
    </div>
  )
}