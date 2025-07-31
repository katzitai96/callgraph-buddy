import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { FolderOpen, Play, Database, Globe, Code, ArrowRight } from "lucide-react";

const Index = () => {
  const [projectPath, setProjectPath] = useState("");
  const [selectedEntry, setSelectedEntry] = useState("");
  const [services, setServices] = useState([
    { name: "user-frontend", type: "Angular", path: "/frontend", files: 15 },
    { name: "user-service", type: "Spring Boot", path: "/user-service", files: 8 },
    { name: "order-service", type: "Spring Boot", path: "/order-service", files: 12 },
  ]);

  // Mock call flow data
  const mockCallFlow = [
    {
      id: 1,
      service: "user-frontend",
      file: "user.component.ts",
      function: "onLoginClick()",
      type: "entry",
      details: "Button click handler"
    },
    {
      id: 2,
      service: "user-frontend",
      file: "auth.service.ts",
      function: "login(credentials)",
      type: "internal",
      details: "Validates input and prepares request"
    },
    {
      id: 3,
      service: "user-frontend",
      file: "http.service.ts",
      function: "POST /api/auth/login",
      type: "api_call",
      details: "REST call to user-service",
      target: "user-service"
    },
    {
      id: 4,
      service: "user-service",
      file: "AuthController.java",
      function: "login(@RequestBody)",
      type: "endpoint",
      details: "Receives login request"
    },
    {
      id: 5,
      service: "user-service",
      file: "AuthService.java",
      function: "authenticate()",
      type: "internal",
      details: "Business logic for authentication"
    },
    {
      id: 6,
      service: "user-service",
      file: "UserRepository.java",
      function: "findByEmail()",
      type: "database",
      details: "Database query to find user"
    }
  ];

  const getStepIcon = (type: string) => {
    switch (type) {
      case "entry": return <Play className="h-4 w-4" />;
      case "api_call": return <Globe className="h-4 w-4" />;
      case "database": return <Database className="h-4 w-4" />;
      default: return <Code className="h-4 w-4" />;
    }
  };

  const getStepColor = (type: string) => {
    switch (type) {
      case "entry": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "api_call": return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      case "database": return "bg-green-500/20 text-green-400 border-green-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="border-b border-border pb-4">
          <h1 className="text-3xl font-bold text-foreground">Microservice Call Stack Visualizer</h1>
          <p className="text-muted-foreground mt-2">
            Trace function calls across Angular frontends and Spring Boot services
          </p>
        </div>

        {/* Project Setup */}
        <Card className="bg-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FolderOpen className="h-5 w-5" />
              Project Configuration
            </CardTitle>
            <CardDescription>
              Import your microservices project folder containing Angular and Spring Boot services
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="project-path">Project Root Path</Label>
              <Input
                id="project-path"
                placeholder="/path/to/your/microservices-project"
                value={projectPath}
                onChange={(e) => setProjectPath(e.target.value)}
                className="font-mono"
              />
            </div>
            <Button className="w-full" variant="default">
              Analyze Project Structure
            </Button>
          </CardContent>
        </Card>

        {/* Services Overview */}
        <Card className="bg-card">
          <CardHeader>
            <CardTitle>Discovered Services</CardTitle>
            <CardDescription>
              Automatically detected Angular and Spring Boot services
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              {services.map((service) => (
                <div key={service.name} className="p-4 border border-border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-foreground">{service.name}</h3>
                    <Badge variant="secondary">{service.type}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">{service.path}</p>
                  <p className="text-xs text-muted-foreground">{service.files} files analyzed</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Entry Point Selection */}
        <Card className="bg-card">
          <CardHeader>
            <CardTitle>Entry Point Selection</CardTitle>
            <CardDescription>
              Choose a function or UI action to trace its execution flow
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="entry-point">Entry Point</Label>
              <Input
                id="entry-point"
                placeholder="e.g., UserComponent.onLoginClick() or OrderComponent.submitOrder()"
                value={selectedEntry}
                onChange={(e) => setSelectedEntry(e.target.value)}
                className="font-mono"
              />
            </div>
            <Button variant="default">
              <Play className="h-4 w-4 mr-2" />
              Trace Call Flow
            </Button>
          </CardContent>
        </Card>

        {/* Call Flow Visualization */}
        <Card className="bg-card">
          <CardHeader>
            <CardTitle>Call Flow Trace</CardTitle>
            <CardDescription>
              Interactive visualization of the complete execution path
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockCallFlow.map((step, index) => (
                <div key={step.id} className="flex items-start gap-4">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full border ${getStepColor(step.type)}`}>
                    {getStepIcon(step.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline" className="text-xs">
                        {step.service}
                      </Badge>
                      <code className="text-sm text-muted-foreground">{step.file}</code>
                    </div>
                    <div className="font-mono text-sm text-foreground mb-1">
                      {step.function}
                    </div>
                    <p className="text-xs text-muted-foreground">{step.details}</p>
                    {step.target && (
                      <div className="flex items-center gap-1 mt-1 text-xs text-purple-400">
                        <ArrowRight className="h-3 w-3" />
                        <span>→ {step.target}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
