import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { ClipboardList, Calendar, Clock, FileText, CheckCircle, AlertCircle, XCircle } from "lucide-react";
import { usePageLoading } from "@/hooks/use-page-loading";
import { GenericPageSkeleton } from "@/components/ui/page-skeleton";
import { AssignmentDetailModal } from "@/components/assignments/AssignmentDetailModal";
import { useToast } from "@/hooks/use-toast";

const Assignments = () => {
  const isLoading = usePageLoading();
  const { toast } = useToast();
  const [selectedAssignment, setSelectedAssignment] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [assignments, setAssignments] = useState([
    {
      id: 1,
      title: "Data Structures Project",
      course: "CS301",
      dueDate: "2024-07-25",
      status: "pending",
      priority: "high",
      description: "Implement a binary search tree with insertion and deletion operations",
      submissionType: "Code + Report",
      maxPoints: 100,
      progress: 60
    },
    {
      id: 2,
      title: "Organic Chemistry Lab Report",
      course: "CHEM205",
      dueDate: "2024-07-22",
      status: "pending",
      priority: "medium",
      description: "Write a detailed report on the synthesis experiment",
      submissionType: "PDF Report",
      maxPoints: 50,
      progress: 80
    },
    {
      id: 3,
      title: "Literature Essay",
      course: "ENG205",
      dueDate: "2024-07-20",
      status: "submitted",
      priority: "low",
      description: "Analyze themes in contemporary world literature",
      submissionType: "Essay",
      maxPoints: 75,
      progress: 100,
      grade: "A-",
      feedback: "Excellent analysis of themes and writing style."
    },
    {
      id: 4,
      title: "Linear Algebra Problem Set",
      course: "MATH201",
      dueDate: "2024-07-18",
      status: "overdue",
      priority: "high",
      description: "Solve problems 1-20 from Chapter 5",
      submissionType: "Handwritten/PDF",
      maxPoints: 30,
      progress: 0
    },
    {
      id: 5,
      title: "Physics Lab Quiz",
      course: "PHYS201",
      dueDate: "2024-07-30",
      status: "pending",
      priority: "medium",
      description: "Online quiz covering laboratory procedures",
      submissionType: "Online Quiz",
      maxPoints: 25,
      progress: 0
    }
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "submitted":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "overdue":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "submitted":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "overdue":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      default:
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const getDaysUntilDue = (dateString: string) => {
    const dueDate = new Date(dateString);
    const today = new Date();
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const pendingAssignments = assignments.filter(a => a.status === "pending");
  const submittedAssignments = assignments.filter(a => a.status === "submitted");
  const overdueAssignments = assignments.filter(a => a.status === "overdue");

  const handleViewDetails = (assignment: any) => {
    setSelectedAssignment(assignment);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAssignment(null);
  };

  const handleSubmitAssignment = (assignmentId: number, files: File[]) => {
    setAssignments(prev => 
      prev.map(assignment => 
        assignment.id === assignmentId 
          ? { ...assignment, status: 'submitted', progress: 100 }
          : assignment
      )
    );
    toast({
      title: "Assignment submitted successfully",
      description: `${files.length} file(s) have been uploaded and submitted.`
    });
  };

  if (isLoading) {
    return <GenericPageSkeleton />
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <ClipboardList className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">Assignments</h1>
          <p className="text-muted-foreground">Track and manage your course assignments</p>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{assignments.length}</div>
            <p className="text-xs text-muted-foreground">Total Assignments</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-yellow-600">{pendingAssignments.length}</div>
            <p className="text-xs text-muted-foreground">Pending</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">{submittedAssignments.length}</div>
            <p className="text-xs text-muted-foreground">Submitted</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-red-600">{overdueAssignments.length}</div>
            <p className="text-xs text-muted-foreground">Overdue</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="submitted">Submitted</TabsTrigger>
          <TabsTrigger value="overdue">Overdue</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {assignments.map((assignment) => (
            <Card key={assignment.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">{assignment.title}</CardTitle>
                    <CardDescription>{assignment.course}</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(assignment.status)}
                    <Badge className={getStatusColor(assignment.status)}>
                      {assignment.status}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{assignment.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>Due: {formatDate(assignment.dueDate)}</span>
                    <span className="text-muted-foreground">
                      ({getDaysUntilDue(assignment.dueDate)} days)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    <span>{assignment.submissionType}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>Points: {assignment.maxPoints}</span>
                    {assignment.grade && (
                      <Badge variant="outline">Grade: {assignment.grade}</Badge>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Badge className={getPriorityColor(assignment.priority)}>
                    {assignment.priority} priority
                  </Badge>
                </div>

                {assignment.status !== "submitted" && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{assignment.progress}%</span>
                    </div>
                    <Progress value={assignment.progress} className="h-2" />
                  </div>
                )}

                {assignment.feedback && (
                  <div className="bg-muted p-3 rounded-lg">
                    <p className="text-sm"><strong>Feedback:</strong> {assignment.feedback}</p>
                  </div>
                )}

                <div className="flex gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleViewDetails(assignment)}
                  >
                    View Details
                  </Button>
                  {assignment.status === "submitted" && (
                    <Button variant="outline" size="sm">View Submission</Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          {pendingAssignments.map((assignment) => (
            <Card key={assignment.id} className="hover:shadow-md transition-shadow">
              {/* Same card structure as above */}
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">{assignment.title}</CardTitle>
                    <CardDescription>{assignment.course}</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(assignment.status)}
                    <Badge className={getStatusColor(assignment.status)}>
                      {assignment.status}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{assignment.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>Due: {formatDate(assignment.dueDate)}</span>
                    <span className="text-muted-foreground">
                      ({getDaysUntilDue(assignment.dueDate)} days)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    <span>{assignment.submissionType}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>Points: {assignment.maxPoints}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{assignment.progress}%</span>
                  </div>
                  <Progress value={assignment.progress} className="h-2" />
                </div>

                <div className="flex gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleViewDetails(assignment)}
                  >
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="submitted" className="space-y-4">
          {submittedAssignments.map((assignment) => (
            <Card key={assignment.id} className="hover:shadow-md transition-shadow">
              {/* Similar structure for submitted assignments */}
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">{assignment.title}</CardTitle>
                    <CardDescription>{assignment.course}</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(assignment.status)}
                    <Badge className={getStatusColor(assignment.status)}>
                      {assignment.status}
                    </Badge>
                    {assignment.grade && (
                      <Badge variant="outline">Grade: {assignment.grade}</Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{assignment.description}</p>
                
                {assignment.feedback && (
                  <div className="bg-muted p-3 rounded-lg">
                    <p className="text-sm"><strong>Feedback:</strong> {assignment.feedback}</p>
                  </div>
                )}

                <div className="flex gap-2">
                  <Button variant="outline" size="sm">View Submission</Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleViewDetails(assignment)}
                  >
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="overdue" className="space-y-4">
          {overdueAssignments.map((assignment) => (
            <Card key={assignment.id} className="border-red-200 hover:shadow-md transition-shadow">
              {/* Similar structure for overdue assignments */}
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg text-red-600">{assignment.title}</CardTitle>
                    <CardDescription>{assignment.course}</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(assignment.status)}
                    <Badge className={getStatusColor(assignment.status)}>
                      {assignment.status}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{assignment.description}</p>
                
                <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                  <p className="text-sm text-red-600 dark:text-red-400">
                    <strong>Overdue:</strong> This assignment was due on {formatDate(assignment.dueDate)}
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleViewDetails(assignment)}
                  >
                    View Details
                  </Button>
                  <Button variant="outline" size="sm">Contact Instructor</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      {selectedAssignment && (
        <AssignmentDetailModal
          assignment={selectedAssignment}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleSubmitAssignment}
        />
      )}
    </div>
  );
};

export default Assignments;