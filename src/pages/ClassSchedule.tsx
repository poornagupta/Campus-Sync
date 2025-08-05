import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ModernCalendar } from "@/components/ui/modern-calendar";
import { 
  CalendarDays, 
  Clock, 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  ChevronLeft, 
  ChevronRight,
  MoreHorizontal,
  Calendar,
  Settings,
  Bell
} from "lucide-react";
import { usePageLoading } from "@/hooks/use-page-loading";
import { GenericPageSkeleton } from "@/components/ui/page-skeleton";
import { useToast } from "@/hooks/use-toast";
import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";

interface Event {
  id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  category: string;
  color: string;
  day: number; // 0-6 (Sunday-Saturday)
}

const DailyPlanner = () => {
  const isLoading = usePageLoading();
  const { toast } = useToast();
  
  // Current week calculation
  const [currentWeek, setCurrentWeek] = useState(() => {
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    return startOfWeek;
  });

  const [viewMode, setViewMode] = useState<'WEEK' | 'TODAY' | 'TOMORROW' | 'YESTERDAY'>('WEEK');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<{ day: number; time: string } | null>(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  // Sample events data
  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      title: 'Eulalia Daugherty',
      description: 'Some talks according upcoming project',
      startTime: '09:00',
      endTime: '10:30',
      category: 'Meeting',
      color: 'bg-blue-100 text-blue-800 border-l-4 border-l-blue-500',
      day: 2
    },
    {
      id: '2',
      title: 'Edward Powlowski',
      description: 'Monetize B2B portals',
      startTime: '08:00',
      endTime: '10:00',
      category: 'Work',
      color: 'bg-green-100 text-green-800 border-l-4 border-l-green-500',
      day: 3
    },
    {
      id: '3',
      title: 'Dirk Friesen',
      description: 'Monetize ubiquitous deliverables',
      startTime: '11:00',
      endTime: '12:30',
      category: 'Meeting',
      color: 'bg-green-100 text-green-800 border-l-4 border-l-green-500',
      day: 3
    },
    {
      id: '4',
      title: 'Pierson Name',
      description: 'Exploit sticky metrics',
      startTime: '10:00',
      endTime: '11:00',
      category: 'Personal',
      color: 'bg-red-100 text-red-800 border-l-4 border-l-red-500',
      day: 2
    },
    {
      id: '5',
      title: 'Gerard Parisian',
      description: 'Benchmark open-source technologies',
      startTime: '11:00',
      endTime: '12:00',
      category: 'Work',
      color: 'bg-green-100 text-green-800 border-l-4 border-l-green-500',
      day: 3
    }
  ]);

  // Time slots for entire day (24 hours)
  const timeSlots = Array.from({ length: 24 }, (_, i) => {
    return `${i.toString().padStart(2, '0')}:00`;
  });

  // Days of the week
  const weekDays = useMemo(() => {
    const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    return days.map((day, index) => {
      const date = new Date(currentWeek);
      date.setDate(currentWeek.getDate() + index);
      return {
        name: day,
        date: date.getDate(),
        fullDate: date,
        isToday: date.toDateString() === new Date().toDateString()
      };
    });
  }, [currentWeek]);

  // Navigation functions
  const goToPreviousWeek = () => {
    const newWeek = new Date(currentWeek);
    newWeek.setDate(currentWeek.getDate() - 7);
    setCurrentWeek(newWeek);
  };

  const goToNextWeek = () => {
    const newWeek = new Date(currentWeek);
    newWeek.setDate(currentWeek.getDate() + 7);
    setCurrentWeek(newWeek);
  };

  const goToToday = () => {
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    setCurrentWeek(startOfWeek);
    setViewMode('WEEK');
  };

  const goToSpecificDay = (mode: 'TODAY' | 'TOMORROW' | 'YESTERDAY') => {
    const now = new Date();
    let targetDate = new Date(now);
    
    if (mode === 'TOMORROW') {
      targetDate.setDate(now.getDate() + 1);
    } else if (mode === 'YESTERDAY') {
      targetDate.setDate(now.getDate() - 1);
    }
    
    setSelectedDate(targetDate);
    setViewMode(mode);
  };

  const getEventsForDate = (date: Date) => {
    const dayIndex = date.getDay();
    return events.filter(event => event.day === dayIndex);
  };

  const getDisplayedEvents = () => {
    if (viewMode === 'WEEK') {
      return events;
    }
    return getEventsForDate(selectedDate);
  };

  // Get events for a specific time slot and day
  const getEventsForSlot = (day: number, timeSlot: string) => {
    return events.filter(event => {
      if (event.day !== day) return false;
      
      const eventStartHour = parseInt(event.startTime.split(':')[0]);
      const slotHour = parseInt(timeSlot.split(':')[0]);
      const eventEndHour = parseInt(event.endTime.split(':')[0]);
      
      return slotHour >= eventStartHour && slotHour < eventEndHour;
    });
  };

  // Get today's events for sidebar
  const getTodayEvents = () => {
    const today = new Date();
    const todayDayIndex = today.getDay();
    return events.filter(event => event.day === todayDayIndex);
  };

  // Handle cell click
  const handleCellClick = (day: number, timeSlot: string) => {
    setSelectedTimeSlot({ day, time: timeSlot });
    setEditingEvent(null);
    setIsDialogOpen(true);
  };

  // Handle event edit
  const handleEditEvent = (event: Event) => {
    setEditingEvent(event);
    setIsDialogOpen(true);
  };

  // Handle event save
  const handleSaveEvent = (eventData: Partial<Event>) => {
    if (editingEvent) {
      // Update existing event
      setEvents(prev => prev.map(e => 
        e.id === editingEvent.id ? { ...e, ...eventData } : e
      ));
      toast({
        title: "Event Updated",
        description: "Your event has been successfully updated.",
      });
    } else if (selectedTimeSlot) {
      // Create new event
      const newEvent: Event = {
        id: Date.now().toString(),
        title: eventData.title || '',
        description: eventData.description || '',
        startTime: selectedTimeSlot.time,
        endTime: eventData.endTime || `${parseInt(selectedTimeSlot.time.split(':')[0]) + 1}:00`,
        category: eventData.category || 'Personal',
        color: eventData.color || 'bg-blue-100 text-blue-800 border-l-4 border-l-blue-500',
        day: selectedTimeSlot.day
      };
      setEvents(prev => [...prev, newEvent]);
      toast({
        title: "Event Created",
        description: "New event has been added to your calendar.",
      });
    }
    setIsDialogOpen(false);
    setEditingEvent(null);
    setSelectedTimeSlot(null);
  };

  // Handle event delete
  const handleDeleteEvent = (eventId: string) => {
    setEvents(prev => prev.filter(e => e.id !== eventId));
    toast({
      title: "Event Deleted",
      description: "Event has been removed from your calendar.",
    });
  };

  if (isLoading) {
    return <GenericPageSkeleton />
  }

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                C
              </div>
              <div>
                <h1 className="font-semibold text-lg">Daily Planner</h1>
                <p className="text-sm text-muted-foreground">My office events (Copy)</p>
              </div>
            </div>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Event name or task..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Bell className="h-4 w-4" />
            </Button>
            <Button onClick={() => setIsDialogOpen(true)} size="sm">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Navigation and View Controls */}
        <div className="flex items-center justify-between px-4 pb-4">
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === 'WEEK' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('WEEK')}
            >
              WEEK
            </Button>
            <Button
              variant={viewMode === 'TODAY' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => goToSpecificDay('TODAY')}
            >
              TODAY
            </Button>
            <Button
              variant={viewMode === 'TOMORROW' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => goToSpecificDay('TOMORROW')}
            >
              TOMORROW
            </Button>
            <Button
              variant={viewMode === 'YESTERDAY' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => goToSpecificDay('YESTERDAY')}
            >
              YESTERDAY
            </Button>
          </div>

          <div className="flex items-center gap-4">
            {viewMode === 'WEEK' && (
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={goToPreviousWeek}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={goToNextWeek}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
            
            <Button variant="outline" size="sm" onClick={goToToday}>
              Today
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setIsCalendarOpen(true)}
              className="text-sm font-medium hover:bg-accent"
            >
              {viewMode === 'WEEK' 
                ? currentWeek.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
                : selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
              }
              <Calendar className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Calendar Grid */}
        <div className="flex-1 overflow-auto">
          {viewMode === 'WEEK' ? (
            <div className="min-w-[800px]">
              {/* Days Header */}
              <div className="grid grid-cols-8 border-b sticky top-0 bg-background z-10">
                <div className="p-4 text-center border-r"></div>
                {weekDays.map((day, index) => (
                  <div key={index} className="p-4 text-center border-r">
                    <div className="text-sm text-muted-foreground">{day.name}</div>
                    <div className={cn(
                      "text-2xl font-bold mt-1",
                      day.isToday && "text-primary"
                    )}>
                      {day.date}
                    </div>
                  </div>
                ))}
              </div>

              {/* Time Grid */}
              {timeSlots.map((timeSlot) => (
                <div key={timeSlot} className="grid grid-cols-8 border-b min-h-[80px]">
                  {/* Time Label */}
                  <div className="p-4 border-r bg-muted/30 flex items-start justify-center">
                    <span className="text-sm font-medium text-muted-foreground">
                      {timeSlot}
                    </span>
                  </div>

                  {/* Day Columns */}
                  {weekDays.map((day, dayIndex) => {
                    const dayEvents = getEventsForSlot(dayIndex, timeSlot);
                    
                    return (
                      <div
                        key={dayIndex}
                        className="border-r p-2 cursor-pointer hover:bg-muted/50 transition-colors min-h-[80px]"
                        onClick={() => handleCellClick(dayIndex, timeSlot)}
                      >
                        {dayEvents.map((event) => (
                          <div
                            key={event.id}
                            className={cn(
                              "p-2 rounded-md mb-1 cursor-pointer hover:shadow-md transition-all",
                              event.color
                            )}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditEvent(event);
                            }}
                          >
                            <div className="font-medium text-sm truncate">
                              {event.title}
                            </div>
                            <div className="text-xs opacity-75 truncate">
                              {event.description}
                            </div>
                            <div className="text-xs opacity-75 mt-1">
                              {event.startTime} - {event.endTime}
                            </div>
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          ) : (
            /* Single Day View */
            <div className="p-6">
              <div className="max-w-4xl mx-auto">
                <div className="bg-card rounded-lg border p-6">
                  <h2 className="text-2xl font-bold mb-6">
                    {viewMode === 'TODAY' && 'Today\'s Events'}
                    {viewMode === 'TOMORROW' && 'Tomorrow\'s Events'}
                    {viewMode === 'YESTERDAY' && 'Yesterday\'s Events'}
                  </h2>
                  
                  <div className="space-y-4">
                    {getEventsForDate(selectedDate).length === 0 ? (
                      <div className="text-center py-12">
                        <CalendarDays className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">No events scheduled for this day</p>
                        <Button 
                          onClick={() => {
                            setSelectedTimeSlot({ day: selectedDate.getDay(), time: '09:00' });
                            setIsDialogOpen(true);
                          }} 
                          className="mt-4"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Event
                        </Button>
                      </div>
                    ) : (
                      getEventsForDate(selectedDate)
                        .sort((a, b) => a.startTime.localeCompare(b.startTime))
                        .map((event) => (
                          <div
                            key={event.id}
                            className={cn(
                              "p-4 rounded-lg cursor-pointer hover:shadow-md transition-all",
                              event.color
                            )}
                            onClick={() => handleEditEvent(event)}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="font-semibold text-lg mb-1">{event.title}</div>
                                <div className="text-sm opacity-75 mb-2">{event.description}</div>
                                <div className="flex items-center gap-4 text-sm opacity-75">
                                  <div className="flex items-center gap-1">
                                    <Clock className="h-4 w-4" />
                                    {event.startTime} - {event.endTime}
                                  </div>
                                  <Badge variant="secondary">{event.category}</Badge>
                                </div>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleEditEvent(event);
                                }}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Events Sidebar */}
        <div className="w-80 border-l bg-card p-4 overflow-auto">
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-2">
                {viewMode === 'WEEK' && `Today • ${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`}
                {viewMode === 'TODAY' && `Today • ${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`}
                {viewMode === 'TOMORROW' && `Tomorrow • ${new Date(Date.now() + 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`}
                {viewMode === 'YESTERDAY' && `Yesterday • ${new Date(Date.now() - 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`}
              </h3>
              <div className="space-y-3">
                {(() => {
                  const displayEvents = viewMode === 'WEEK' ? getTodayEvents() : getEventsForDate(selectedDate);
                  return displayEvents.length === 0 ? (
                    <p className="text-muted-foreground text-sm">No events for this day</p>
                  ) : (
                    displayEvents.map((event) => (
                      <div key={event.id} className="flex items-start gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                        <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm truncate">{event.title}</div>
                          <div className="text-xs text-muted-foreground">
                            {event.startTime} - {event.endTime}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1 truncate">
                            {event.description}
                          </div>
                        </div>
                      </div>
                    ))
                  );
                })()}
              </div>
            </div>

            {/* Upcoming Events - Only show in week view */}
            {viewMode === 'WEEK' && (
              <div>
                <h3 className="font-semibold text-lg mb-2">Upcoming</h3>
                <div className="space-y-3">
                  {events.slice(0, 5).map((event) => (
                    <div key={event.id} className="flex items-start gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-medium">
                        {event.title.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm truncate">{event.title}</div>
                        <div className="text-xs text-muted-foreground">
                          {weekDays[event.day]?.name} • {event.startTime} - {event.endTime}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1 truncate">
                          {event.description}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Button variant="ghost" className="w-full mt-4 text-sm">
                  8 more planned...
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Event Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingEvent ? 'Edit Event' : 'New Event'}
            </DialogTitle>
          </DialogHeader>
          <EventForm
            event={editingEvent}
            onSave={handleSaveEvent}
            onCancel={() => {
              setIsDialogOpen(false);
              setEditingEvent(null);
              setSelectedTimeSlot(null);
            }}
            onDelete={editingEvent ? () => handleDeleteEvent(editingEvent.id) : undefined}
          />
        </DialogContent>
      </Dialog>

      {/* Calendar Popup Dialog */}
      <Dialog open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
        <DialogContent className="max-w-md p-0">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle>Select Date</DialogTitle>
          </DialogHeader>
          <div className="p-6">
            <ModernCalendar
              selected={viewMode === 'WEEK' ? currentWeek : selectedDate}
              onDateSelect={(date) => {
                if (date) {
                  if (viewMode === 'WEEK') {
                    // Set the week containing the selected date
                    const startOfWeek = new Date(date);
                    startOfWeek.setDate(date.getDate() - date.getDay());
                    setCurrentWeek(startOfWeek);
                  } else {
                    setSelectedDate(date);
                  }
                }
                setIsCalendarOpen(false);
              }}
              highlightedDates={events.map(event => {
                // Convert event days to actual dates
                const baseDate = viewMode === 'WEEK' ? currentWeek : selectedDate;
                const eventDate = new Date(baseDate);
                eventDate.setDate(baseDate.getDate() - baseDate.getDay() + event.day);
                return eventDate;
              })}
              className="w-full"
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Event Form Component
const EventForm = ({ 
  event, 
  onSave, 
  onCancel,
  onDelete
}: { 
  event: Event | null;
  onSave: (event: Partial<Event>) => void;
  onCancel: () => void;
  onDelete?: () => void;
}) => {
  const [formData, setFormData] = useState({
    title: event?.title || '',
    description: event?.description || '',
    startTime: event?.startTime || '09:00',
    endTime: event?.endTime || '10:00',
    category: event?.category || 'Personal',
  });

  // Generate 24-hour time options
  const timeOptions = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, '0');
    return `${hour}:00`;
  });

  const categories = ['Meeting', 'Work', 'Personal', 'Study', 'Health', 'Social'];
  
  const categoryColors = {
    'Meeting': 'bg-blue-100 text-blue-800 border-l-4 border-l-blue-500',
    'Work': 'bg-green-100 text-green-800 border-l-4 border-l-green-500',
    'Personal': 'bg-purple-100 text-purple-800 border-l-4 border-l-purple-500',
    'Study': 'bg-orange-100 text-orange-800 border-l-4 border-l-orange-500',
    'Health': 'bg-red-100 text-red-800 border-l-4 border-l-red-500',
    'Social': 'bg-pink-100 text-pink-800 border-l-4 border-l-pink-500',
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;
    
    onSave({
      ...formData,
      color: categoryColors[formData.category as keyof typeof categoryColors]
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Event Title *</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
          placeholder="Enter event title"
          required
        />
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          placeholder="Add event description"
          rows={3}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="startTime">Start Time</Label>
          <Input
            id="startTime"
            type="time"
            value={formData.startTime}
            onChange={(e) => setFormData(prev => ({ ...prev, startTime: e.target.value }))}
          />
        </div>
        <div>
          <Label htmlFor="endTime">End Time</Label>
          <Input
            id="endTime"
            type="time"
            value={formData.endTime}
            onChange={(e) => setFormData(prev => ({ ...prev, endTime: e.target.value }))}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="category">Category</Label>
        <Select 
          value={formData.category} 
          onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {categories.map(category => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-2 pt-4">
        <Button type="submit" className="flex-1">
          {event ? 'Update Event' : 'Create Event'}
        </Button>
        {onDelete && (
          <Button 
            type="button" 
            variant="destructive" 
            onClick={() => {
              onDelete();
              onCancel();
            }}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default DailyPlanner;