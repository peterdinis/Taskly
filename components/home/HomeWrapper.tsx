import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, CheckCircle, Calendar, Flag, Users, Zap } from "lucide-react";
import Link from "next/link";
import { FC } from "react";
import Navigation from "../shared/Navigation";

const features = [
  {
    icon: CheckCircle,
    title: "Smart Task Management",
    description: "Organize your tasks with priorities, due dates, and projects"
  },
  {
    icon: Calendar,
    title: "Date & Time Planning", 
    description: "Schedule tasks and never miss important deadlines"
  },
  {
    icon: Flag,
    title: "Priority Levels",
    description: "Focus on what matters most with color-coded priorities"
  },
  {
    icon: Users,
    title: "Project Organization",
    description: "Keep work and personal tasks separate with custom projects"
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Built with modern technology for optimal performance"
  }
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Product Manager",
    content: "This app has completely transformed how I manage my daily tasks. The interface is clean and intuitive."
  },
  {
    name: "Mike Chen", 
    role: "Freelance Designer",
    content: "Finally, a todo app that doesn't get in the way. I can focus on my work instead of managing the tool."
  },
  {
    name: "Emma Davis",
    role: "Student",
    content: "Perfect for keeping track of assignments and deadlines. The priority system is a game-changer."
  }
];

const HomeWrapper: FC = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Organize Your Life, 
            <br />One Task at a Time
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            The powerful yet simple task management app that helps you stay focused, 
            meet deadlines, and achieve your goals with ease.
          </p>
          
          <div className="flex items-center justify-center gap-4 mb-12">
            <Button size="lg" asChild>
              <Link href="/app">Start Organizing</Link>
            </Button>
            <Button variant="outline" size="lg">
              Watch Demo
            </Button>
          </div>

          {/* Preview Image */}
          <div className="relative max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-8 rounded-2xl border">
              <div className="bg-background rounded-lg shadow-2xl p-6 border">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 bg-destructive rounded-full"></div>
                  <div className="w-3 h-3 bg-warning rounded-full"></div>
                  <div className="w-3 h-3 bg-success rounded-full"></div>
                </div>
                <div className="text-left space-y-3">
                  <div className="flex items-center gap-3 p-2 bg-muted/50 rounded">
                    <div className="w-4 h-4 border-2 border-primary rounded"></div>
                    <span className="text-sm">Complete project proposal</span>
                    <Flag className="h-3 w-3 text-priority-high ml-auto" />
                  </div>
                  <div className="flex items-center gap-3 p-2 bg-muted/30 rounded">
                    <div className="w-4 h-4 border-2 border-muted-foreground rounded"></div>
                    <span className="text-sm">Team meeting at 2 PM</span>
                    <Flag className="h-3 w-3 text-priority-medium ml-auto" />
                  </div>
                  <div className="flex items-center gap-3 p-2 bg-success-muted rounded opacity-60">
                    <Check className="w-4 h-4 text-success" />
                    <span className="text-sm line-through">Buy groceries</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Everything You Need to Stay Productive</h2>
            <p className="text-lg text-muted-foreground">
              Powerful features designed to help you manage tasks efficiently
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-none shadow-sm">
                <CardHeader>
                  <feature.icon className="h-10 w-10 text-primary mb-2" />
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Loved by Thousands of Users</h2>
            <p className="text-lg text-muted-foreground">
              See what our users say about TaskMaster
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-none shadow-sm">
                <CardContent className="pt-6">
                  <p className="text-muted-foreground mb-4">"{testimonial.content}"</p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Organized?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of users who have transformed their productivity with TaskMaster
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/app">Start Your Journey</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/50 py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="h-6 w-6 text-primary" />
                <span className="font-bold text-lg">TaskMaster</span>
              </div>
              <p className="text-muted-foreground">
                The ultimate task management solution for modern professionals.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <div className="space-y-2 text-muted-foreground">
                <p>Features</p>
                <p>Pricing</p>
                <p>Updates</p>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <div className="space-y-2 text-muted-foreground">
                <p>Help Center</p>
                <p>Contact Us</p>
                <p>Community</p>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <div className="space-y-2 text-muted-foreground">
                <p>About</p>
                <p>Blog</p>
                <p>Careers</p>
              </div>
            </div>
          </div>
          
          <div className="border-t mt-12 pt-8 text-center text-muted-foreground">
            <p>&copy; 2025 TaskMaster. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomeWrapper;