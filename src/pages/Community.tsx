import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Users, MessageCircle, Calendar, Plus, Share2, Search, Send, ArrowLeft, Paperclip, MoreVertical } from "lucide-react";
import { usePageLoading } from "@/hooks/use-page-loading";
import { GenericPageSkeleton } from "@/components/ui/page-skeleton";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";
import { GroupDetailsDialog } from "@/components/community/GroupDetailsDialog";
import { MediaShareDialog } from "@/components/community/MediaShareDialog";
import { GroupSettingsDialog } from "@/components/community/GroupSettingsDialog";
import { EnhancedChatMessage } from "@/components/community/EnhancedChatMessage";
import { useToast } from "@/hooks/use-toast";

const Community = () => {
  const isLoading = usePageLoading();
  const isMobile = useIsMobile();
  const { toast } = useToast();
  
  const [selectedSemester, setSelectedSemester] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [newGroupName, setNewGroupName] = useState("");
  const [newGroupDescription, setNewGroupDescription] = useState("");
  const [newGroupSemester, setNewGroupSemester] = useState("");
  const [chatMode, setChatMode] = useState(false);
  const [showGroupDetails, setShowGroupDetails] = useState(false);
  const [showMediaShare, setShowMediaShare] = useState(false);
  const [showGroupSettings, setShowGroupSettings] = useState(false);

  const semesters = [
    "Semester 1", "Semester 2", "Semester 3", "Semester 4", 
    "Semester 5", "Semester 6", "Semester 7", "Semester 8"
  ];

  const groups = [
    { 
      id: "1",
      name: "Computer Science - Sem 3", 
      members: 24, 
      active: true, 
      semester: "Semester 3",
      description: "Discussion group for CS third semester students",
      link: "https://community.com/cs-sem3",
      lastMessage: "Hey everyone! Anyone solved the algorithm assignment?",
      lastMessageTime: "10:40 AM",
      createdAt: "2024-01-15",
      icon: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=400&fit=crop&crop=face"
    },
    { 
      id: "2",
      name: "Mathematics - Sem 2", 
      members: 18, 
      active: false, 
      semester: "Semester 2",
      description: "Math study group for second semester",
      link: "https://community.com/math-sem2",
      lastMessage: "Thanks for the calculus notes!",
      lastMessageTime: "Yesterday",
      createdAt: "2024-01-10",
      icon: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop&crop=face"
    },
    { 
      id: "3",
      name: "Physics Lab - Sem 4", 
      members: 31, 
      active: true, 
      semester: "Semester 4",
      description: "Physics lab discussion and help",
      link: "https://community.com/physics-sem4",
      lastMessage: "Lab report submission deadline is tomorrow",
      lastMessageTime: "2:15 PM",
      createdAt: "2024-01-20",
      icon: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=400&fit=crop&crop=face"
    },
    { 
      id: "4",
      name: "Engineering Drawing - Sem 1", 
      members: 45, 
      active: true, 
      semester: "Semester 1",
      description: "Help with technical drawing assignments",
      link: "https://community.com/ed-sem1",
      lastMessage: "Can someone explain projection methods?",
      lastMessageTime: "9:30 AM",
      createdAt: "2024-01-05",
      icon: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=400&h=400&fit=crop&crop=face"
    }
  ];

  const messages = [
    { 
      id: "1", 
      groupId: "1", 
      type: "text" as const,
      sender: "John Doe", 
      message: "Hey everyone! Anyone solved the algorithm assignment?", 
      time: "10:30 AM", 
      avatar: "JD",
      readCount: 15,
      totalMembers: 24
    },
    { 
      id: "2", 
      groupId: "1", 
      type: "text" as const,
      sender: "Jane Smith", 
      message: "Yes! I can help with that. Which part are you stuck on?", 
      time: "10:35 AM", 
      avatar: "JS",
      readCount: 12,
      totalMembers: 24
    },
    { 
      id: "3", 
      groupId: "1", 
      type: "text" as const,
      sender: "You", 
      message: "Thanks Jane! I'm having trouble with the sorting algorithm.", 
      time: "10:40 AM", 
      avatar: "YU",
      readCount: 8,
      totalMembers: 24
    },
    { 
      id: "system-1", 
      groupId: "1", 
      type: "system" as const,
      sender: "System", 
      message: "Alex Chen joined the group", 
      time: "10:45 AM", 
      avatar: "SY"
    },
    { 
      id: "4", 
      groupId: "2", 
      type: "text" as const,
      sender: "Mike Johnson", 
      message: "Thanks for the calculus notes!", 
      time: "Yesterday", 
      avatar: "MJ",
      readCount: 18,
      totalMembers: 18
    },
    { 
      id: "5", 
      groupId: "3", 
      type: "text" as const,
      sender: "Sarah Wilson", 
      message: "Lab report submission deadline is tomorrow", 
      time: "2:15 PM", 
      avatar: "SW",
      readCount: 25,
      totalMembers: 31
    },
    { 
      id: "6", 
      groupId: "4", 
      type: "text" as const,
      sender: "Alex Chen", 
      message: "Can someone explain projection methods?", 
      time: "9:30 AM", 
      avatar: "AC",
      readCount: 30,
      totalMembers: 45
    }
  ];

  const filteredGroups = groups.filter(group => {
    const matchesSemester = selectedSemester === "all" || group.semester === selectedSemester;
    const matchesSearch = group.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         group.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSemester && matchesSearch;
  });

  const handleCreateGroup = () => {
    // In a real app, this would create the group via API
    console.log("Creating group:", { newGroupName, newGroupDescription, newGroupSemester });
    setNewGroupName("");
    setNewGroupDescription("");
    setNewGroupSemester("");
  };

  const handleSendMessage = () => {
    if (newMessage.trim() && activeChat) {
      // In a real app, this would send the message via API
      console.log("Sending message:", newMessage, "to group:", activeChat);
      setNewMessage("");
    }
  };

  const handleMediaShare = (type: string, content: any) => {
    // In a real app, this would upload and send the media
    console.log("Sharing media:", type, content);
    
    // Add system message for media sharing
    if (type === 'files') {
      console.log(`Shared ${content.length} file(s)`);
    } else if (type === 'location') {
      console.log("Shared location:", content.text);
    }
  };

  const copyGroupLink = (link: string) => {
    navigator.clipboard.writeText(link);
    toast({
      title: "Link copied!",
      description: "Group invite link has been copied to clipboard.",
    });
  };

  const handleUpdateGroup = (groupId: string, updates: any) => {
    // In a real app, this would update the group via API
    console.log("Updating group:", groupId, updates);
    toast({
      title: "Group updated!",
      description: "Group settings have been saved successfully.",
    });
  };

  const handleDeleteGroup = (groupId: string) => {
    // In a real app, this would delete the group via API
    console.log("Deleting group:", groupId);
    toast({
      title: "Group deleted",
      description: "The group has been permanently deleted.",
    });
  };

  const handlePromoteToAdmin = (groupId: string, memberId: string) => {
    // In a real app, this would promote the member via API
    console.log("Promoting member to admin:", { groupId, memberId });
  };

  const handleDemoteFromAdmin = (groupId: string, memberId: string) => {
    // In a real app, this would demote the admin via API
    console.log("Demoting admin to member:", { groupId, memberId });
  };

  const handleJoinChat = (groupId: string) => {
    setActiveChat(groupId);
    setChatMode(true);
    // Reset dialog states when entering chat mode
    setShowGroupDetails(false);
    setShowMediaShare(false);
    setShowGroupSettings(false);
  };

  const handleBackToMain = () => {
    setChatMode(false);
    setActiveChat(null);
    // Reset dialog states when going back to main view
    setShowGroupDetails(false);
    setShowMediaShare(false);
    setShowGroupSettings(false);
  };

  if (isLoading) {
    return <GenericPageSkeleton />
  }

  if (chatMode) {
    // WhatsApp-style chat interface
    return (
      <div className="h-[calc(100vh-8rem)] flex flex-col md:flex-row overflow-hidden">
        {/* Left Panel - Groups List */}
        <div className={`${isMobile ? 'w-full' : 'w-1/3'} border-r bg-background flex flex-col`}>
          {/* Header */}
          <div className="p-4 border-b">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" onClick={handleBackToMain}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <h2 className="text-lg font-semibold">Study Groups</h2>
            </div>
          </div>
          
          {/* Search */}
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search groups..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Groups List */}
          <ScrollArea className="flex-1">
            <div className="space-y-1">
              {filteredGroups.map((group) => (
                <div
                  key={group.id}
                  className={`p-4 cursor-pointer hover:bg-muted/50 border-b ${
                    activeChat === group.id ? 'bg-muted' : ''
                  }`}
                  onClick={() => setActiveChat(group.id)}
                >
                 <div className="flex items-start gap-3">
                     {group.icon ? (
                       <img 
                         src={group.icon} 
                         alt={`${group.name} icon`}
                         className="w-12 h-12 rounded-full object-cover cursor-pointer hover:opacity-80 transition-opacity"
                         onClick={(e) => {
                           e.stopPropagation();
                           setShowGroupDetails(true);
                         }}
                       />
                     ) : (
                       <div 
                         className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center cursor-pointer hover:bg-primary/20 transition-colors"
                         onClick={(e) => {
                           e.stopPropagation();
                           setShowGroupDetails(true);
                         }}
                       >
                         <Users className="h-6 w-6 text-primary" />
                       </div>
                     )}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium truncate">{group.name}</h3>
                        <span className="text-xs text-muted-foreground">{group.lastMessageTime}</span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate mt-1">
                        {group.lastMessage}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant={group.active ? "default" : "secondary"} className="text-xs">
                          {group.active ? "Active" : "Inactive"}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{group.members} members</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Right Panel - Chat Area */}
        {!isMobile && (
          <div className="flex-1 flex flex-col min-w-0">
            {activeChat ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b bg-background">
                  <div className="flex items-center justify-between">
                     <div className="flex items-center gap-3">
                       {groups.find(g => g.id === activeChat)?.icon ? (
                         <img 
                           src={groups.find(g => g.id === activeChat)?.icon} 
                           alt={`${groups.find(g => g.id === activeChat)?.name} icon`}
                           className="w-10 h-10 rounded-full object-cover cursor-pointer hover:opacity-80 transition-opacity"
                           onClick={(e) => {
                             e.stopPropagation();
                             setShowGroupDetails(true);
                           }}
                         />
                       ) : (
                         <div 
                           className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center cursor-pointer hover:bg-primary/20 transition-colors"
                           onClick={(e) => {
                             e.stopPropagation();
                             setShowGroupDetails(true);
                           }}
                         >
                           <Users className="h-5 w-5 text-primary" />
                         </div>
                       )}
                       <div>
                         <h3 className="font-medium">{groups.find(g => g.id === activeChat)?.name}</h3>
                         <p className="text-sm text-muted-foreground">
                           {groups.find(g => g.id === activeChat)?.members} members • {groups.find(g => g.id === activeChat)?.semester}
                         </p>
                       </div>
                     </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => copyGroupLink(groups.find(g => g.id === activeChat)?.link || "")}
                      >
                        <Share2 className="h-4 w-4 mr-1" />
                        Share
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => setShowGroupSettings(true)}
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Messages Area */}
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-2">
                    {messages.filter(m => m.groupId === activeChat).map((message) => (
                      <EnhancedChatMessage
                        key={message.id}
                        id={message.id}
                        type={message.type}
                        sender={message.sender}
                        avatar={message.avatar}
                        message={message.message}
                        time={message.time}
                        isOwn={message.sender === 'You'}
                        readCount={message.readCount}
                        totalMembers={message.totalMembers}
                      />
                    ))}
                  </div>
                </ScrollArea>

                {/* Message Input */}
                <div className="p-4 border-t bg-background">
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowMediaShare(true)}
                    >
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <Input
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="flex-1"
                    />
                    <Button onClick={handleSendMessage}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <MessageCircle className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-xl font-medium mb-2">Select a Group</h3>
                  <p className="text-muted-foreground">Choose a study group to start chatting</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Mobile Chat View */}
        {isMobile && activeChat && (
          <div className="absolute inset-0 bg-background z-50 flex flex-col">
            {/* Chat Header */}
            <div className="p-3 border-b bg-background flex-shrink-0">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={() => setActiveChat(null)} className="flex-shrink-0">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                 {groups.find(g => g.id === activeChat)?.icon ? (
                   <img 
                     src={groups.find(g => g.id === activeChat)?.icon} 
                     alt={`${groups.find(g => g.id === activeChat)?.name} icon`}
                     className="w-7 h-7 rounded-full object-cover cursor-pointer hover:opacity-80 transition-opacity flex-shrink-0"
                     onClick={(e) => {
                       e.stopPropagation();
                       setShowGroupDetails(true);
                     }}
                   />
                 ) : (
                   <div 
                     className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center cursor-pointer hover:bg-primary/20 transition-colors flex-shrink-0"
                     onClick={(e) => {
                       e.stopPropagation();
                       setShowGroupDetails(true);
                     }}
                   >
                     <Users className="h-3 w-3 text-primary" />
                   </div>
                 )}
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium truncate text-sm">{groups.find(g => g.id === activeChat)?.name}</h3>
                  <p className="text-xs text-muted-foreground truncate">
                    {groups.find(g => g.id === activeChat)?.members} members
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => copyGroupLink(groups.find(g => g.id === activeChat)?.link || "")}
                  className="flex-shrink-0 px-2"
                >
                  <Share2 className="h-3 w-3" />
                </Button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-hidden">
              <ScrollArea className="h-full">
                <div className="p-3 space-y-2">
                  {messages.filter(m => m.groupId === activeChat).map((message) => (
                    <EnhancedChatMessage
                      key={message.id}
                      id={message.id}
                      type={message.type}
                      sender={message.sender}
                      avatar={message.avatar}
                      message={message.message}
                      time={message.time}
                      isOwn={message.sender === 'You'}
                      readCount={message.readCount}
                      totalMembers={message.totalMembers}
                    />
                  ))}
                </div>
              </ScrollArea>
            </div>

            {/* Message Input */}
            <div className="p-3 border-t bg-background flex-shrink-0 safe-area-bottom">
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowMediaShare(true)}
                  className="flex-shrink-0"
                >
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Input
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} className="flex-shrink-0">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Chat Dialogs - Available in chat mode */}
        <GroupDetailsDialog
          isOpen={showGroupDetails}
          onClose={() => setShowGroupDetails(false)}
          group={groups.find(g => g.id === activeChat) || groups[0]}
          onPromoteToAdmin={handlePromoteToAdmin}
          onDemoteFromAdmin={handleDemoteFromAdmin}
          currentUserRole="admin"
        />
        
        <MediaShareDialog
          isOpen={showMediaShare}
          onClose={() => setShowMediaShare(false)}
          onShare={handleMediaShare}
        />

        <GroupSettingsDialog
          isOpen={showGroupSettings}
          onClose={() => setShowGroupSettings(false)}
          group={groups.find(g => g.id === activeChat) || groups[0]}
          onUpdateGroup={handleUpdateGroup}
          onDeleteGroup={handleDeleteGroup}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Community</h1>
          <p className="text-muted-foreground">Connect with fellow students by semester</p>
        </div>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Group
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Study Group</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="groupName">Group Name</Label>
                  <Input
                    id="groupName"
                    placeholder="e.g., Computer Science - Sem 3"
                    value={newGroupName}
                    onChange={(e) => setNewGroupName(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="groupDescription">Description</Label>
                  <Textarea
                    id="groupDescription"
                    placeholder="Describe what this group is for..."
                    value={newGroupDescription}
                    onChange={(e) => setNewGroupDescription(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="groupSemester">Semester</Label>
                  <Select value={newGroupSemester} onValueChange={setNewGroupSemester}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select semester" />
                    </SelectTrigger>
                    <SelectContent>
                      {semesters.map((semester) => (
                        <SelectItem key={semester} value={semester}>
                          {semester}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleCreateGroup} className="w-full">
                  Create Group
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards - Mobile optimized */}
      <div className={`grid gap-4 ${isMobile ? 'grid-cols-3' : 'grid-cols-1 md:grid-cols-3'}`}>
        <Card className={isMobile ? 'p-3' : ''}>
          <CardHeader className={`pb-3 ${isMobile ? 'pb-2' : ''}`}>
            <CardTitle className={`flex items-center gap-2 ${isMobile ? 'text-sm flex-col gap-1' : 'text-lg'}`}>
              <Users className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'}`} />
              {!isMobile && "My Groups"}
            </CardTitle>
          </CardHeader>
          <CardContent className={isMobile ? 'p-0 pt-2' : ''}>
            <div className={`font-bold ${isMobile ? 'text-xl text-center' : 'text-3xl'}`}>5</div>
            {!isMobile && <p className="text-sm text-muted-foreground">joined</p>}
          </CardContent>
        </Card>
        
        <Card className={isMobile ? 'p-3' : ''}>
          <CardHeader className={`pb-3 ${isMobile ? 'pb-2' : ''}`}>
            <CardTitle className={`flex items-center gap-2 ${isMobile ? 'text-sm flex-col gap-1' : 'text-lg'}`}>
              <MessageCircle className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'}`} />
              {!isMobile && "Messages"}
            </CardTitle>
          </CardHeader>
          <CardContent className={isMobile ? 'p-0 pt-2' : ''}>
            <div className={`font-bold ${isMobile ? 'text-xl text-center' : 'text-3xl'}`}>12</div>
            {!isMobile && <p className="text-sm text-muted-foreground">unread</p>}
          </CardContent>
        </Card>

        <Card className={isMobile ? 'p-3' : ''}>
          <CardHeader className={`pb-3 ${isMobile ? 'pb-2' : ''}`}>
            <CardTitle className={`flex items-center gap-2 ${isMobile ? 'text-sm flex-col gap-1' : 'text-lg'}`}>
              <Calendar className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'}`} />
              {!isMobile && "Events"}
            </CardTitle>
          </CardHeader>
          <CardContent className={isMobile ? 'p-0 pt-2' : ''}>
            <div className={`font-bold ${isMobile ? 'text-xl text-center' : 'text-3xl'}`}>3</div>
            {!isMobile && <p className="text-sm text-muted-foreground">upcoming</p>}
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="groups" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="groups">Study Groups</TabsTrigger>
          <TabsTrigger value="chat" onClick={() => setChatMode(true)}>Group Chat</TabsTrigger>
        </TabsList>

        <TabsContent value="groups" className="space-y-4">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search groups..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedSemester} onValueChange={setSelectedSemester}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by semester" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Semesters</SelectItem>
                {semesters.map((semester) => (
                  <SelectItem key={semester} value={semester}>
                    {semester}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Groups List */}
          <div className="space-y-3">
            {filteredGroups.map((group) => (
              <Card key={group.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-medium">{group.name}</h3>
                        <Badge variant={group.active ? "default" : "secondary"}>
                          {group.active ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{group.description}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{group.members} members</span>
                        <span>{group.semester}</span>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => copyGroupLink(group.link)}
                      >
                        <Share2 className="h-4 w-4 mr-1" />
                        Share
                      </Button>
                      <Button 
                        size="sm"
                        onClick={() => handleJoinChat(group.id)}
                      >
                        Join & Chat
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Enhanced Chat Dialogs */}
      <GroupDetailsDialog
        isOpen={showGroupDetails}
        onClose={() => setShowGroupDetails(false)}
        group={groups.find(g => g.id === activeChat) || groups[0]}
        onPromoteToAdmin={handlePromoteToAdmin}
        onDemoteFromAdmin={handleDemoteFromAdmin}
        currentUserRole="admin"
      />
      
      <MediaShareDialog
        isOpen={showMediaShare}
        onClose={() => setShowMediaShare(false)}
        onShare={handleMediaShare}
      />
    </div>
  );
};

export default Community;