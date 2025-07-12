import { useState } from "react";
import { ArrowLeft, Inbox, Send, CheckCircle, XCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SwapRequestCard } from "@/components/SwapRequestCard";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

interface SwapRequest {
  id: string;
  fromUser: {
    name: string;
    avatar?: string;
    rating: number;
  };
  toUser: {
    name: string;
    avatar?: string;
    rating?: number;
  };
  offeredSkill: string;
  requestedSkill: string;
  message: string;
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
  createdAt: string;
}

// Mock data for swap requests
const mockRequests: SwapRequest[] = [
  {
    id: "1",
    fromUser: { name: "Alice Johnson", avatar: "", rating: 4.9 },
    toUser: { name: "You", avatar: "" },
    offeredSkill: "UI Design",
    requestedSkill: "React",
    message: "Hi! I'd love to learn React from you. I have 5 years of UI design experience and would be happy to help you improve your design skills in return!",
    status: "pending",
    createdAt: "2 hours ago"
  },
  {
    id: "2",
    fromUser: { name: "You", avatar: "", rating: 4.5 },
    toUser: { name: "Bob Smith", avatar: "", rating: 4.7 },
    offeredSkill: "JavaScript",
    requestedSkill: "Node.js",
    message: "Hey Bob! I noticed you're excellent with Node.js. I'd love to learn backend development from you and can teach you advanced JavaScript concepts in return.",
    status: "accepted",
    createdAt: "1 day ago"
  },
  {
    id: "3",
    fromUser: { name: "Carol Davis", avatar: "", rating: 4.8 },
    toUser: { name: "You", avatar: "" },
    offeredSkill: "Photography",
    requestedSkill: "Web Development",
    message: "I'm a professional photographer looking to transition into tech. Would you be interested in trading web dev lessons for photography sessions?",
    status: "pending",
    createdAt: "3 days ago"
  },
  {
    id: "4",
    fromUser: { name: "You", avatar: "", rating: 4.5 },
    toUser: { name: "Eva Chen", avatar: "", rating: 4.9 },
    offeredSkill: "CSS",
    requestedSkill: "Marketing",
    message: "Hi Eva! I'm looking to learn digital marketing strategies. I can help you with advanced CSS and modern styling techniques.",
    status: "rejected",
    createdAt: "1 week ago"
  },
  {
    id: "5",
    fromUser: { name: "David Wilson", avatar: "", rating: 4.6 },
    toUser: { name: "You", avatar: "" },
    offeredSkill: "Python",
    requestedSkill: "Frontend Development",
    message: "I'm a data scientist looking to learn frontend development. I can teach you Python and data analysis in exchange!",
    status: "completed",
    createdAt: "2 weeks ago"
  }
];

export const Requests = () => {
  const [requests, setRequests] = useState(mockRequests);
  const { toast } = useToast();

  const handleAccept = (requestId: string) => {
    setRequests(prev => 
      prev.map(req => 
        req.id === requestId ? { ...req, status: "accepted" as const } : req
      )
    );
    toast({
      title: "Request Accepted!",
      description: "You can now start your skill exchange.",
    });
  };

  const handleReject = (requestId: string) => {
    setRequests(prev => 
      prev.map(req => 
        req.id === requestId ? { ...req, status: "rejected" as const } : req
      )
    );
    toast({
      title: "Request Rejected",
      description: "The request has been declined.",
    });
  };

  const handleDelete = (requestId: string) => {
    setRequests(prev => prev.filter(req => req.id !== requestId));
    toast({
      title: "Request Deleted",
      description: "Your swap request has been removed.",
    });
  };

  const handleRate = (requestId: string, rating: number) => {
    toast({
      title: "Rating Submitted",
      description: `You rated this experience ${rating} stars.`,
    });
  };

  const receivedRequests = requests.filter(req => req.toUser.name === "You");
  const sentRequests = requests.filter(req => req.fromUser.name === "You");
  const pendingReceived = receivedRequests.filter(req => req.status === "pending");
  const pendingSent = sentRequests.filter(req => req.status === "pending");

  const getTabStats = (status: string, type: 'received' | 'sent') => {
    const list = type === 'received' ? receivedRequests : sentRequests;
    return list.filter(req => req.status === status).length;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/5 to-primary/5">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                Swap Requests
              </h1>
              <p className="text-muted-foreground">Manage your skill exchange requests</p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex items-center space-x-4">
            <Card className="border-0 shadow-card bg-warning/5">
              <CardContent className="p-4 text-center">
                <div className="text-lg font-bold text-warning">{pendingReceived.length}</div>
                <p className="text-xs text-muted-foreground">Pending</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-card bg-success/5">
              <CardContent className="p-4 text-center">
                <div className="text-lg font-bold text-success">
                  {getTabStats("accepted", "received") + getTabStats("accepted", "sent")}
                </div>
                <p className="text-xs text-muted-foreground">Active</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="received" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 bg-muted/50">
            <TabsTrigger value="received" className="flex items-center space-x-2">
              <Inbox className="h-4 w-4" />
              <span>Received ({receivedRequests.length})</span>
            </TabsTrigger>
            <TabsTrigger value="sent" className="flex items-center space-x-2">
              <Send className="h-4 w-4" />
              <span>Sent ({sentRequests.length})</span>
            </TabsTrigger>
          </TabsList>

          {/* Received Requests */}
          <TabsContent value="received" className="space-y-6">
            {/* Status Filter */}
            <div className="flex items-center space-x-2 mb-6">
              <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20">
                <Clock className="h-3 w-3 mr-1" />
                Pending ({getTabStats("pending", "received")})
              </Badge>
              <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                <CheckCircle className="h-3 w-3 mr-1" />
                Accepted ({getTabStats("accepted", "received")})
              </Badge>
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                <CheckCircle className="h-3 w-3 mr-1" />
                Completed ({getTabStats("completed", "received")})
              </Badge>
              <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">
                <XCircle className="h-3 w-3 mr-1" />
                Rejected ({getTabStats("rejected", "received")})
              </Badge>
            </div>

            <div className="space-y-4">
              {receivedRequests.length > 0 ? (
                receivedRequests.map((request) => (
                  <SwapRequestCard
                    key={request.id}
                    request={request}
                    currentUserId="current-user"
                    onAccept={handleAccept}
                    onReject={handleReject}
                    onRate={handleRate}
                  />
                ))
              ) : (
                <Card className="border-0 shadow-card bg-background/80 backdrop-blur">
                  <CardContent className="p-12 text-center">
                    <Inbox className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No Received Requests</h3>
                    <p className="text-muted-foreground mb-4">
                      You haven't received any swap requests yet.
                    </p>
                    <Link to="/">
                      <Button variant="default">Browse Members</Button>
                    </Link>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Sent Requests */}
          <TabsContent value="sent" className="space-y-6">
            {/* Status Filter */}
            <div className="flex items-center space-x-2 mb-6">
              <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20">
                <Clock className="h-3 w-3 mr-1" />
                Pending ({getTabStats("pending", "sent")})
              </Badge>
              <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                <CheckCircle className="h-3 w-3 mr-1" />
                Accepted ({getTabStats("accepted", "sent")})
              </Badge>
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                <CheckCircle className="h-3 w-3 mr-1" />
                Completed ({getTabStats("completed", "sent")})
              </Badge>
              <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">
                <XCircle className="h-3 w-3 mr-1" />
                Rejected ({getTabStats("rejected", "sent")})
              </Badge>
            </div>

            <div className="space-y-4">
              {sentRequests.length > 0 ? (
                sentRequests.map((request) => (
                  <SwapRequestCard
                    key={request.id}
                    request={request}
                    currentUserId="current-user"
                    onDelete={handleDelete}
                    onRate={handleRate}
                  />
                ))
              ) : (
                <Card className="border-0 shadow-card bg-background/80 backdrop-blur">
                  <CardContent className="p-12 text-center">
                    <Send className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No Sent Requests</h3>
                    <p className="text-muted-foreground mb-4">
                      You haven't sent any swap requests yet.
                    </p>
                    <Link to="/">
                      <Button variant="default">Find Someone to Swap With</Button>
                    </Link>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};