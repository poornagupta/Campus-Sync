import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ModernCalendar } from "@/components/ui/modern-calendar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { 
  CalendarClock, 
  Clock, 
  MapPin, 
  AlertTriangle, 
  CheckCircle, 
  Calendar as CalendarIcon,
  Plus,
  Edit,
  Trash2,
  BookOpen,
  GraduationCap,
  Target,
  Settings,
  School,
  FileText
} from "lucide-react";
import { usePageLoading } from "@/hooks/use-page-loading";
import { GenericPageSkeleton } from "@/components/ui/page-skeleton";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface Exam {
  id: string;
  course: string;
  code: string;
  type: string;
  date: string;
  time: string;
  location: string;
  duration: string;
  status: 'upcoming' | 'completed';
  studyProgress: number;
  topics: string[];
  grade?: string;
  instructor: string;
  description: string;
  semester: number;
}

interface Semester {
  id: number;
  name: string;
  examTypes: string[];
}

const ExamSchedule = () => {
  const isLoading = usePageLoading();
  const { toast } = useToast();

  const [semesters, setSemesters] = useState<Semester[]>([
    { id: 1, name: "1st Semester", examTypes: ["Mid Term", "End Term"] },
    { id: 2, name: "2nd Semester", examTypes: ["Mid Term", "End Term"] },
    { id: 3, name: "3rd Semester", examTypes: ["Mid Term", "End Term"] },
    { id: 4, name: "4th Semester", examTypes: ["Mid Term", "End Term"] },
    { id: 5, name: "5th Semester", examTypes: ["Mid Term", "End Term"] },
    { id: 6, name: "6th Semester", examTypes: ["Mid Term", "End Term"] },
    { id: 7, name: "7th Semester", examTypes: ["Mid Term", "End Term"] },
    { id: 8, name: "8th Semester", examTypes: ["Mid Term", "End Term"] }
  ]);

  const [exams, setExams] = useState<Exam[]>([
    {
      id: '1',
      course: "Computer Science Fundamentals",
      code: "CS101",
      type: "Mid Term",
      date: "2024-07-25",
      time: "09:00",
      location: "Tech Building 205",
      duration: "2",
      status: "upcoming",
      studyProgress: 65,
      topics: ["Arrays", "Linked Lists", "Stacks", "Queues"],
      instructor: "Dr. Smith",
      description: "Comprehensive exam covering data structures and basic algorithms",
      semester: 1
    },
    {
      id: '2',
      course: "Calculus I", 
      code: "MATH151",
      type: "End Term",
      date: "2024-07-30",
      time: "14:00",
      location: "Math Building 150",
      duration: "3",
      status: "upcoming",
      studyProgress: 40,
      topics: ["Derivatives", "Integrals", "Limits", "Applications"],
      instructor: "Prof. Johnson",
      description: "Final examination covering all course material",
      semester: 1
    },
    {
      id: '3',
      course: "Physics Laboratory",
      code: "PHYS201",
      type: "Mid Term",
      date: "2024-07-15",
      time: "10:00",
      location: "Science Hall 301",
      duration: "2",
      status: "completed",
      studyProgress: 100,
      grade: "A-",
      topics: ["Circuit Analysis", "Ohm's Law", "Measurements"],
      instructor: "Dr. Wilson",
      description: "Laboratory practical examination",
      semester: 2
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingExam, setEditingExam] = useState<Exam | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAddingExamToDate, setIsAddingExamToDate] = useState(false);
  const [isAddExamConfirmOpen, setIsAddExamConfirmOpen] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    course: '',
    code: '',
    type: '',
    date: '',
    time: '09:00',
    location: '',
    duration: '2',
    instructor: '',
    description: '',
    topics: '',
    semester: 1
  });

  // Settings form state
  const [settingsForm, setSettingsForm] = useState({
    semesterName: '',
    examTypes: '',
    editingSemester: null as number | null
  });

  const resetForm = () => {
    setFormData({
      course: '',
      code: '',
      type: '',
      date: '',
      time: '09:00',
      location: '',
      duration: '2',
      instructor: '',
      description: '',
      topics: '',
      semester: 1
    });
  };

  const resetSettingsForm = () => {
    setSettingsForm({
      semesterName: '',
      examTypes: '',
      editingSemester: null
    });
  };

  const handleAddExam = () => {
    setEditingExam(null);
    resetForm();
    setIsDialogOpen(true);
  };

  const handleAddExamToDate = (date: Date) => {
    setEditingExam(null);
    resetForm();
    setFormData(prev => ({ ...prev, date: format(date, 'yyyy-MM-dd') }));
    setIsAddingExamToDate(true);
    setIsDialogOpen(true);
  };

  const handleEditExam = (exam: Exam) => {
    setEditingExam(exam);
    setFormData({
      course: exam.course,
      code: exam.code,
      type: exam.type,
      date: exam.date,
      time: exam.time,
      location: exam.location,
      duration: exam.duration,
      instructor: exam.instructor,
      description: exam.description,
      topics: exam.topics.join(', '),
      semester: exam.semester
    });
    setIsDialogOpen(true);
  };

  const handleSaveExam = () => {
    if (!formData.course || !formData.date || !formData.time || !formData.location || !formData.type) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const examData: Exam = {
      id: editingExam?.id || Date.now().toString(),
      course: formData.course,
      code: formData.code,
      type: formData.type,
      date: formData.date,
      time: formData.time,
      location: formData.location,
      duration: formData.duration,
      status: 'upcoming',
      studyProgress: editingExam?.studyProgress || 0,
      topics: formData.topics.split(',').map(topic => topic.trim()).filter(Boolean),
      instructor: formData.instructor,
      description: formData.description,
      grade: editingExam?.grade,
      semester: formData.semester
    };

    if (editingExam) {
      setExams(prev => prev.map(exam => exam.id === editingExam.id ? examData : exam));
      toast({
        title: "Exam Updated",
        description: "Exam details have been successfully updated."
      });
    } else {
      setExams(prev => [...prev, examData]);
      toast({
        title: "Exam Added",
        description: "New exam has been added to your schedule."
      });
    }

    setIsDialogOpen(false);
    resetForm();
    setEditingExam(null);
    setIsAddingExamToDate(false);
  };

  const handleDeleteExam = (examId: string) => {
    setExams(prev => prev.filter(exam => exam.id !== examId));
    toast({
      title: "Exam Deleted",
      description: "Exam has been removed from your schedule."
    });
  };

  const updateStudyProgress = (examId: string, progress: number) => {
    setExams(prev => prev.map(exam => 
      exam.id === examId ? { ...exam, studyProgress: progress } : exam
    ));
  };

  // Semester management functions
  const handleAddSemester = () => {
    if (!settingsForm.semesterName || !settingsForm.examTypes) {
      toast({
        title: "Missing Information",
        description: "Please provide semester name and exam types.",
        variant: "destructive"
      });
      return;
    }

    const newSemester: Semester = {
      id: Math.max(...semesters.map(s => s.id), 0) + 1,
      name: settingsForm.semesterName,
      examTypes: settingsForm.examTypes.split(',').map(type => type.trim()).filter(Boolean)
    };

    setSemesters(prev => [...prev, newSemester]);
    resetSettingsForm();
    toast({
      title: "Semester Added",
      description: "New semester has been added successfully."
    });
  };

  const handleUpdateSemester = () => {
    if (!settingsForm.editingSemester || !settingsForm.semesterName || !settingsForm.examTypes) {
      return;
    }

    setSemesters(prev => prev.map(sem => 
      sem.id === settingsForm.editingSemester 
        ? { 
            ...sem, 
            name: settingsForm.semesterName,
            examTypes: settingsForm.examTypes.split(',').map(type => type.trim()).filter(Boolean)
          }
        : sem
    ));
    
    resetSettingsForm();
    toast({
      title: "Semester Updated",
      description: "Semester has been updated successfully."
    });
  };

  const handleEditSemester = (semester: Semester) => {
    setSettingsForm({
      semesterName: semester.name,
      examTypes: semester.examTypes.join(', '),
      editingSemester: semester.id
    });
  };

  const handleDeleteSemester = (semesterId: number) => {
    // Check if there are exams in this semester
    const examsInSemester = exams.filter(exam => exam.semester === semesterId);
    if (examsInSemester.length > 0) {
      toast({
        title: "Cannot Delete",
        description: "This semester has exams scheduled. Please remove all exams first.",
        variant: "destructive"
      });
      return;
    }

    setSemesters(prev => prev.filter(sem => sem.id !== semesterId));
    toast({
      title: "Semester Deleted",
      description: "Semester has been removed successfully."
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "upcoming":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "end term":
      case "final":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case "mid term":
      case "midterm":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
      case "quiz":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      default:
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':');
    const time = new Date();
    time.setHours(parseInt(hours), parseInt(minutes || '0'));
    return time.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getDaysUntilExam = (dateString: string) => {
    const examDate = new Date(dateString);
    const today = new Date();
    const diffTime = examDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const upcomingExams = exams.filter(exam => exam.status === "upcoming");
  const completedExams = exams.filter(exam => exam.status === "completed");

  // Calendar functionality
  const examDates = useMemo(() => {
    return exams.reduce((acc, exam) => {
      const date = new Date(exam.date);
      const dateKey = format(date, 'yyyy-MM-dd');
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(exam);
      return acc;
    }, {} as Record<string, Exam[]>);
  }, [exams]);

  const getExamsForDate = (date: Date) => {
    const dateKey = format(date, 'yyyy-MM-dd');
    return examDates[dateKey] || [];
  };

  // Group exams by semester and type
  const groupedCompletedExams = useMemo(() => {
    const grouped: Record<number, Record<string, Exam[]>> = {};
    
    completedExams.forEach(exam => {
      if (!grouped[exam.semester]) {
        grouped[exam.semester] = {};
      }
      if (!grouped[exam.semester][exam.type]) {
        grouped[exam.semester][exam.type] = [];
      }
      grouped[exam.semester][exam.type].push(exam);
    });
    
    return grouped;
  }, [completedExams]);

  if (isLoading) {
    return <GenericPageSkeleton />
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <CalendarClock className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Exam Schedule</h1>
            <p className="text-muted-foreground">Track your upcoming exams and results</p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <Button 
            variant="outline" 
            onClick={() => setIsSettingsOpen(true)} 
            className="flex items-center gap-2 justify-center"
            size="sm"
          >
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">Manage Semesters</span>
            <span className="sm:hidden">Settings</span>
          </Button>
          <Button onClick={handleAddExam} className="flex items-center gap-2 justify-center" size="sm">
            <Plus className="h-4 w-4" />
            Add Exam
          </Button>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-xl md:text-2xl font-bold">{exams.length}</div>
            <p className="text-xs text-muted-foreground">Total Exams</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-xl md:text-2xl font-bold text-blue-600">{upcomingExams.length}</div>
            <p className="text-xs text-muted-foreground">Upcoming</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-xl md:text-2xl font-bold text-green-600">{completedExams.length}</div>
            <p className="text-xs text-muted-foreground">Completed</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-xl md:text-2xl font-bold">
              {Math.round(upcomingExams.reduce((sum, exam) => sum + exam.studyProgress, 0) / upcomingExams.length || 0)}%
            </div>
            <p className="text-xs text-muted-foreground">Avg Study Progress</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          {upcomingExams.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-12">
                  <GraduationCap className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">No upcoming exams scheduled</p>
                  <Button onClick={handleAddExam}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Your First Exam
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            upcomingExams.map((exam) => {
              const daysUntil = getDaysUntilExam(exam.date);
              const isUrgent = daysUntil <= 3;
              const semester = semesters.find(s => s.id === exam.semester);
              
              return (
                <Card key={exam.id} className={`hover:shadow-md transition-shadow ${isUrgent ? 'border-orange-200' : ''}`}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-lg">{exam.course}</CardTitle>
                        <CardDescription>
                          {exam.code} • {exam.instructor} • {semester?.name}
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        {isUrgent && <AlertTriangle className="h-4 w-4 text-orange-500" />}
                        <Badge className={getTypeColor(exam.type)}>
                          {exam.type}
                        </Badge>
                        <Button variant="ghost" size="sm" onClick={() => handleEditExam(exam)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleDeleteExam(exam.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">{exam.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="h-4 w-4" />
                        <span>{formatDate(exam.date)}</span>
                        <span className={`text-sm ${isUrgent ? 'text-orange-600 font-medium' : 'text-muted-foreground'}`}>
                          ({daysUntil} days)
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{formatTime(exam.time)} ({exam.duration} hours)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{exam.location}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-sm">
                        <span>Study Progress</span>
                        <div className="flex items-center gap-2">
                          <span>{exam.studyProgress}%</span>
                           <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              const newProgress = prompt(`Update study progress for ${exam.course}:`, exam.studyProgress.toString());
                              if (newProgress && !isNaN(parseInt(newProgress))) {
                                updateStudyProgress(exam.id, Math.min(100, Math.max(0, parseInt(newProgress))));
                              }
                            }}
                          >
                            <Target className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all ${
                            exam.studyProgress >= 80 ? 'bg-green-500' : 
                            exam.studyProgress >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${exam.studyProgress}%` }}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Topics to Study:</h4>
                      <div className="flex flex-wrap gap-1">
                        {exam.topics.map((topic, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })
          )}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {completedExams.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-12">
                  <CheckCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No completed exams yet</p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Accordion type="multiple" className="w-full">
              {semesters.map((semester) => {
                const semesterExams = groupedCompletedExams[semester.id];
                if (!semesterExams || Object.keys(semesterExams).length === 0) return null;

                return (
                  <AccordionItem key={semester.id} value={`semester-${semester.id}`}>
                    <AccordionTrigger className="text-left">
                      <div className="flex items-center gap-2">
                        <School className="h-4 w-4" />
                        <span className="font-medium">{semester.name}</span>
                        <Badge variant="outline">
                          {Object.values(semesterExams).flat().length} exams
                        </Badge>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4 pt-2">
                        {Object.entries(semesterExams).map(([examType, exams]) => (
                          <div key={examType} className="space-y-2">
                            <div className="flex items-center gap-2 mb-3">
                              <FileText className="h-4 w-4" />
                              <h4 className="font-medium text-sm">{examType}</h4>
                              <Badge variant="secondary" className="text-xs">
                                {exams.length} exams
                              </Badge>
                            </div>
                            {exams.map((exam) => (
                              <Card key={exam.id} className="ml-6">
                                <CardContent className="pt-4">
                                  <div className="flex items-start justify-between">
                                    <div className="space-y-1">
                                      <div className="font-medium">{exam.course}</div>
                                      <div className="text-sm text-muted-foreground">{exam.code} • {exam.instructor}</div>
                                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                        <span className="flex items-center gap-1">
                                          <CalendarIcon className="h-3 w-3" />
                                          {formatDate(exam.date)}
                                        </span>
                                        <span className="flex items-center gap-1">
                                          <Clock className="h-3 w-3" />
                                          {formatTime(exam.time)}
                                        </span>
                                        <span className="flex items-center gap-1">
                                          <MapPin className="h-3 w-3" />
                                          {exam.location}
                                        </span>
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <CheckCircle className="h-4 w-4 text-green-500" />
                                      {exam.grade && (
                                        <Badge variant="outline">Grade: {exam.grade}</Badge>
                                      )}
                                    </div>
                                  </div>
                                  {exam.description && (
                                    <p className="text-sm text-muted-foreground mt-2">{exam.description}</p>
                                  )}
                                  {exam.topics.length > 0 && (
                                    <div className="mt-3">
                                      <div className="flex flex-wrap gap-1">
                                        {exam.topics.map((topic, index) => (
                                          <Badge key={index} variant="outline" className="text-xs">
                                            {topic}
                                          </Badge>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          )}
        </TabsContent>

        <TabsContent value="calendar">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Calendar View</CardTitle>
                <CardDescription>Click on dates to see exam details or add new exams</CardDescription>
              </CardHeader>
              <CardContent className="p-3">
                <ModernCalendar
                  selected={selectedDate}
                  onDateSelect={(date) => {
                    setSelectedDate(date);
                    if (date && getExamsForDate(date).length === 0) {
                      // Show custom dialog instead of browser confirm
                      setIsAddingExamToDate(true);
                      setIsDialogOpen(true);
                    }
                  }}
                  highlightedDates={exams.map(exam => new Date(exam.date))}
                  className="w-full"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>
                  {selectedDate ? format(selectedDate, 'MMMM dd, yyyy') : 'Select a Date'}
                </CardTitle>
                <CardDescription>
                  {selectedDate && getExamsForDate(selectedDate).length > 0 
                    ? `${getExamsForDate(selectedDate).length} exam(s) scheduled`
                    : 'No exams scheduled for this date'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                {selectedDate && getExamsForDate(selectedDate).length > 0 ? (
                  <div className="space-y-3">
                    {getExamsForDate(selectedDate).map((exam) => {
                      const semester = semesters.find(s => s.id === exam.semester);
                      return (
                        <div key={exam.id} className="p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                          <div className="flex items-start justify-between">
                            <div className="space-y-1">
                              <div className="font-medium">{exam.course}</div>
                              <div className="text-sm text-muted-foreground">
                                {exam.code} • {semester?.name}
                              </div>
                              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {formatTime(exam.time)}
                                </span>
                                <span className="flex items-center gap-1">
                                  <MapPin className="h-3 w-3" />
                                  {exam.location}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge className={getTypeColor(exam.type)} variant="outline">
                                {exam.type}
                              </Badge>
                              <Button variant="ghost" size="sm" onClick={() => handleEditExam(exam)}>
                                <Edit className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <BookOpen className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-muted-foreground mb-4">No exams on this date</p>
                    {selectedDate && (
                      <Button 
                        variant="outline" 
                        onClick={() => handleAddExamToDate(selectedDate)}
                        className="flex items-center gap-2"
                      >
                        <Plus className="h-4 w-4" />
                        Add Exam
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Add/Edit Exam Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingExam ? 'Edit Exam' : 'Add New Exam'}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="course">Course Name *</Label>
                <Input
                  id="course"
                  value={formData.course}
                  onChange={(e) => setFormData(prev => ({ ...prev, course: e.target.value }))}
                  placeholder="e.g., Computer Science Fundamentals"
                />
              </div>
              <div>
                <Label htmlFor="code">Course Code</Label>
                <Input
                  id="code"
                  value={formData.code}
                  onChange={(e) => setFormData(prev => ({ ...prev, code: e.target.value }))}
                  placeholder="e.g., CS101"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="semester">Semester *</Label>
                <Select 
                  value={formData.semester.toString()} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, semester: parseInt(value), type: '' }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {semesters.map((semester) => (
                      <SelectItem key={semester.id} value={semester.id.toString()}>
                        {semester.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="type">Exam Type *</Label>
                <Select 
                  value={formData.type} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select exam type" />
                  </SelectTrigger>
                  <SelectContent>
                    {(semesters.find(s => s.id === formData.semester)?.examTypes || []).map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="instructor">Instructor</Label>
                <Input
                  id="instructor"
                  value={formData.instructor}
                  onChange={(e) => setFormData(prev => ({ ...prev, instructor: e.target.value }))}
                  placeholder="e.g., Dr. Smith"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="date">Date *</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="time">Time *</Label>
                <Input
                  id="time"
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="duration">Duration (hours)</Label>
                <Select value={formData.duration} onValueChange={(value) => setFormData(prev => ({ ...prev, duration: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 hour</SelectItem>
                    <SelectItem value="1.5">1.5 hours</SelectItem>
                    <SelectItem value="2">2 hours</SelectItem>
                    <SelectItem value="2.5">2.5 hours</SelectItem>
                    <SelectItem value="3">3 hours</SelectItem>
                    <SelectItem value="4">4 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                placeholder="e.g., Tech Building 205"
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Brief description of the exam content"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="topics">Topics (comma-separated)</Label>
              <Textarea
                id="topics"
                value={formData.topics}
                onChange={(e) => setFormData(prev => ({ ...prev, topics: e.target.value }))}
                placeholder="e.g., Arrays, Linked Lists, Stacks, Queues"
                rows={2}
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button onClick={handleSaveExam} className="flex-1">
                {editingExam ? 'Update Exam' : 'Add Exam'}
              </Button>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Semester Management Dialog */}
      <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Manage Semesters & Exam Types</DialogTitle>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Add/Edit Semester</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="semesterName">Semester Name</Label>
                  <Input
                    id="semesterName"
                    value={settingsForm.semesterName}
                    onChange={(e) => setSettingsForm(prev => ({ ...prev, semesterName: e.target.value }))}
                    placeholder="e.g., 9th Semester"
                  />
                </div>
                <div>
                  <Label htmlFor="examTypes">Exam Types (comma-separated)</Label>
                  <Input
                    id="examTypes"
                    value={settingsForm.examTypes}
                    onChange={(e) => setSettingsForm(prev => ({ ...prev, examTypes: e.target.value }))}
                    placeholder="e.g., Mid Term, End Term, Quiz"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                {settingsForm.editingSemester ? (
                  <>
                    <Button onClick={handleUpdateSemester}>Update Semester</Button>
                    <Button variant="outline" onClick={resetSettingsForm}>Cancel</Button>
                  </>
                ) : (
                  <Button onClick={handleAddSemester}>Add Semester</Button>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Current Semesters</h3>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {semesters.map((semester) => (
                  <Card key={semester.id}>
                    <CardContent className="pt-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <div className="font-medium">{semester.name}</div>
                          <div className="text-sm text-muted-foreground">
                            Exam Types: {semester.examTypes.join(', ')}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleEditSemester(semester)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleDeleteSemester(semester.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ExamSchedule;