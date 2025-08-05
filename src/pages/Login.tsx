import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useIsMobile } from "@/hooks/use-mobile"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  User, 
  Chrome, 
  GraduationCap, 
  ArrowRight,
  CheckCircle,
  Shield,
  Zap,
  Globe
} from "lucide-react"
import { SEO } from "@/components/SEO"
import loginHero from "@/assets/login-hero.jpg"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [name, setName] = useState("")
  const [collegeName, setCollegeName] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formStep, setFormStep] = useState(1)
  const navigate = useNavigate()
  const isMobile = useIsMobile()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsLoading(false)
    navigate("/")
  }

  const nextStep = () => {
    if (isSignUp && formStep === 1) {
      setFormStep(2)
    }
  }

  const prevStep = () => {
    if (formStep === 2) {
      setFormStep(1)
    }
  }

  const features = [
    { icon: CheckCircle, text: "Track academic progress seamlessly", color: "text-green-500" },
    { icon: Globe, text: "Connect with students worldwide", color: "text-blue-500" },
    { icon: Zap, text: "AI-powered study recommendations", color: "text-yellow-500" },
    { icon: Shield, text: "Secure & privacy-focused platform", color: "text-purple-500" }
  ]

  return (
    <>
      <SEO 
        title={isSignUp ? "Create Account" : "Sign In"}
        description={isSignUp ? "Join CampusSync and transform your academic journey with our comprehensive student management platform." : "Welcome back to CampusSync. Continue your academic journey."}
        keywords="student login, campus sync, academic platform, student management, university app"
      />
      
      <div className="min-h-screen flex flex-col lg:flex-row">
        {/* Left Section - Hero & Branding */}
        <div className="relative lg:w-1/2 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 flex flex-col justify-center px-8 lg:px-16 py-12 lg:py-24">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(45deg,transparent_35%,rgba(255,255,255,0.05)_50%,transparent_65%)]"></div>
          </div>
          
          {/* Content */}
          <div className="relative z-10 max-w-lg">
            {/* Logo & Brand */}
            <div className="mb-8">
              <div className="inline-flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <GraduationCap className="h-6 w-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-white">CampusSync</h1>
              </div>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
                Trusted by 50,000+ students
              </Badge>
            </div>

            {/* Main Heading */}
            <div className="mb-8">
              <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
                Your Academic Journey
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-orange-200">
                  Starts Here
                </span>
              </h2>
              <p className="text-xl text-blue-100 leading-relaxed">
                Join thousands of students who've transformed their academic experience with our comprehensive platform.
              </p>
            </div>

            {/* Features */}
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3 text-white">
                  <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                    <feature.icon className={`h-4 w-4 ${feature.color}`} />
                  </div>
                  <span className="font-medium">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/20">
              <div>
                <div className="text-2xl font-bold text-white">50K+</div>
                <div className="text-sm text-blue-200">Active Students</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">98%</div>
                <div className="text-sm text-blue-200">Satisfaction Rate</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">24/7</div>
                <div className="text-sm text-blue-200">Support</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Form */}
        <div className="lg:w-1/2 flex items-center justify-center p-6 lg:p-12 bg-background">
          <div className="w-full max-w-md space-y-6">
            {/* Form Header */}
            <div className="text-center space-y-2">
              <h3 className="text-2xl lg:text-3xl font-bold tracking-tight">
                {isSignUp ? "Create Account" : "Welcome Back"}
              </h3>
              <p className="text-muted-foreground">
                {isSignUp 
                  ? "Start your academic transformation today"
                  : "Continue your learning journey"
                }
              </p>
              {isSignUp && (
                <div className="flex items-center justify-center gap-2 mt-4">
                  <div className={`w-3 h-3 rounded-full transition-colors ${formStep === 1 ? 'bg-primary' : 'bg-muted'}`} />
                  <div className={`w-3 h-3 rounded-full transition-colors ${formStep === 2 ? 'bg-primary' : 'bg-muted'}`} />
                </div>
              )}
            </div>

            {/* Form Card */}
            <Card className="border-0 shadow-xl bg-card">
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  {isSignUp ? (
                    <>
                      {/* Step 1: Personal Information */}
                      {formStep === 1 && (
                        <div className="space-y-4 animate-in slide-in-from-right duration-300">
                          <div className="space-y-2">
                            <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
                            <div className="relative">
                              <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                              <Input
                                id="name"
                                type="text"
                                placeholder="Enter your full name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="pl-10 h-12 transition-all focus:ring-2 focus:ring-primary/20"
                                required
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
                            <div className="relative">
                              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                              <Input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="pl-10 h-12 transition-all focus:ring-2 focus:ring-primary/20"
                                required
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="collegeName" className="text-sm font-medium">College/University</Label>
                            <div className="relative">
                              <GraduationCap className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                              <Input
                                id="collegeName"
                                type="text"
                                placeholder="Enter your college or university"
                                value={collegeName}
                                onChange={(e) => setCollegeName(e.target.value)}
                                className="pl-10 h-12 transition-all focus:ring-2 focus:ring-primary/20"
                                required
                              />
                            </div>
                          </div>

                          <Button 
                            type="button" 
                            onClick={nextStep}
                            className="w-full h-12 font-medium"
                            disabled={!name || !email || !collegeName}
                          >
                            Continue
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      )}

                      {/* Step 2: Security */}
                      {formStep === 2 && (
                        <div className="space-y-4 animate-in slide-in-from-right duration-300">
                          <div className="space-y-2">
                            <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                            <div className="relative">
                              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                              <Input 
                                id="password" 
                                type={showPassword ? "text" : "password"}
                                placeholder="Create a strong password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="pl-10 pr-10 h-12 transition-all focus:ring-2 focus:ring-primary/20"
                                required 
                              />
                              <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                              >
                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              </button>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="confirmPassword" className="text-sm font-medium">Confirm Password</Label>
                            <div className="relative">
                              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                              <Input 
                                id="confirmPassword" 
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm your password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="pl-10 pr-10 h-12 transition-all focus:ring-2 focus:ring-primary/20"
                                required 
                              />
                              <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                              >
                                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              </button>
                            </div>
                          </div>

                          <div className="flex gap-3">
                            <Button 
                              type="button" 
                              variant="outline"
                              onClick={prevStep}
                              className="flex-1 h-12"
                            >
                              Back
                            </Button>
                            <Button 
                              type="submit" 
                              className="flex-1 h-12 font-medium"
                              disabled={isLoading || !password || !confirmPassword || password !== confirmPassword}
                            >
                              {isLoading ? (
                                <div className="flex items-center gap-2">
                                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                  Creating Account...
                                </div>
                              ) : (
                                "Create Account"
                              )}
                            </Button>
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    /* Login Form */
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="pl-10 h-12 transition-all focus:ring-2 focus:ring-primary/20"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                          <Link
                            to="/forgot-password"
                            className="text-xs text-primary hover:underline transition-colors"
                          >
                            Forgot password?
                          </Link>
                        </div>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input 
                            id="password" 
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="pl-10 pr-10 h-12 transition-all focus:ring-2 focus:ring-primary/20"
                            required 
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full h-12 font-medium"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                            Signing In...
                          </div>
                        ) : (
                          "Sign In"
                        )}
                      </Button>
                    </div>
                  )}

                  {/* Divider */}
                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <Separator className="w-full" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                    </div>
                  </div>

                  {/* Social Login */}
                  <Button 
                    type="button"
                    variant="outline" 
                    className="w-full h-12 font-medium hover:bg-muted/50 transition-all"
                  >
                    <Chrome className="mr-2 h-4 w-4" />
                    Continue with Google
                  </Button>
                </form>

                {/* Toggle between login/signup */}
                <div className="mt-6 text-center">
                  <p className="text-sm text-muted-foreground">
                    {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
                    <button
                      onClick={() => {
                        setIsSignUp(!isSignUp)
                        setFormStep(1)
                      }}
                      className="font-medium text-primary hover:underline transition-colors"
                    >
                      {isSignUp ? "Sign in" : "Sign up"}
                    </button>
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Terms for signup */}
            {isSignUp && (
              <p className="text-xs text-center text-muted-foreground px-4">
                By creating an account, you agree to our{" "}
                <Link to="/terms" className="underline hover:text-foreground transition-colors">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="underline hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </p>
            )}

            {/* Security Badge */}
            <div className="flex items-center justify-center gap-2 pt-4">
              <Shield className="h-4 w-4 text-green-500" />
              <span className="text-xs text-muted-foreground">256-bit SSL encryption</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}