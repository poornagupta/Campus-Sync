import React, { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Send, Bot, User, BookOpen, Calculator, Clock, Lightbulb } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface Message {
  id: string
  content: string
  role: 'user' | 'assistant'
  timestamp: Date
}

interface SuggestionCard {
  title: string
  subtitle: string
  icon: React.ReactNode
  prompt: string
}

const AskAI = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  const suggestions: SuggestionCard[] = [
    {
      title: "Study Techniques",
      subtitle: "Effective Learning Methods",
      icon: <BookOpen className="h-5 w-5" />,
      prompt: "What are the most effective study techniques for college students?"
    },
    {
      title: "Math Help",
      subtitle: "Problem Solving Tips",
      icon: <Calculator className="h-5 w-5" />,
      prompt: "Can you help me understand calculus concepts better?"
    },
    {
      title: "Time Management",
      subtitle: "Academic Balance",
      icon: <Clock className="h-5 w-5" />,
      prompt: "How can I better manage my time between studies and other activities?"
    },
    {
      title: "Research Tips",
      subtitle: "Academic Writing",
      icon: <Lightbulb className="h-5 w-5" />,
      prompt: "What are the best practices for academic research and citation?"
    }
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async (messageContent: string = input) => {
    if (!messageContent.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: messageContent,
      role: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      // Simulate AI response for demo purposes
      // In a real app, you would integrate with an AI service like OpenAI, Anthropic, etc.
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000))
      
      const responses = [
        `Great question about ${messageContent}! As a student, I'd recommend breaking this topic down into smaller, manageable parts. Start by creating an outline of the key concepts you need to understand.`,
        `This is an excellent academic topic to explore! I suggest starting with fundamental concepts and then building up to more complex ideas. Consider using active learning techniques like summarizing key points in your own words.`,
        `That's a thoughtful question! For effective studying, try the Pomodoro Technique - study for 25 minutes, then take a 5-minute break. This helps maintain focus and retention.`,
        `Excellent inquiry! I recommend using multiple learning resources - textbooks, online courses, academic journals, and discussion groups. Cross-referencing information helps deepen understanding.`,
        `This topic would benefit from a systematic approach. Create a study schedule, set specific learning goals, and regularly test your understanding through practice problems or self-quizzing.`
      ]
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)]

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: randomResponse,
        role: 'assistant',
        timestamp: new Date()
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('Error generating response:', error)
      toast({
        title: "Error",
        description: "Failed to get response from AI. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage()
  }

  const handleSuggestionClick = (prompt: string) => {
    sendMessage(prompt)
  }

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] max-w-4xl mx-auto">
      {messages.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center space-y-8 p-6">
          {/* Welcome Section */}
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
              <Bot className="h-8 w-8 text-primary" />
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-semibold text-foreground">
                Hi, Student! 👋
              </h1>
              <p className="text-xl text-foreground/80">
                How can I help you with your studies today?
              </p>
              <p className="hidden sm:block text-sm text-muted-foreground max-w-md mx-auto italic">
                Ready to assist you with anything you need, from answering academic questions 
                to providing study tips and research guidance. Let's get started!
              </p>
            </div>
          </div>

          {/* Suggestion Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
            {suggestions.map((suggestion, index) => (
              <Card 
                key={index} 
                className={`cursor-pointer hover:bg-accent/50 transition-colors ${
                  index === 3 ? 'hidden md:block' : ''
                }`}
                onClick={() => handleSuggestionClick(suggestion.prompt)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      {suggestion.icon}
                    </div>
                    <div className="space-y-1 min-w-0">
                      <h3 className="font-medium text-sm text-foreground">
                        {suggestion.title}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {suggestion.subtitle}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto space-y-4 p-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start space-x-3 ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {message.role === 'assistant' && (
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-primary/10">
                    <Bot className="h-4 w-4 text-primary" />
                  </AvatarFallback>
                </Avatar>
              )}
              
              <div
                className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                <span className="text-xs opacity-70 mt-1 block">
                  {message.timestamp.toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </span>
              </div>

              {message.role === 'user' && (
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-secondary">
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          
          {isLoading && (
            <div className="flex items-start space-x-3">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-primary/10">
                  <Bot className="h-4 w-4 text-primary" />
                </AvatarFallback>
              </Avatar>
              <div className="bg-muted rounded-2xl px-4 py-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      )}

      {/* Input Section */}
      <div className="border-t bg-background p-4">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything about your studies..."
            className="flex-1"
            disabled={isLoading}
          />
          <Button 
            type="submit" 
            size="icon"
            disabled={isLoading || !input.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  )
}

export default AskAI