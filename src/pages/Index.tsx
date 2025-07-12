import { useState } from "react";
import { Filter, Users, TrendingUp, Sparkles } from "lucide-react";
import { Header } from "@/components/Header";
import { UserCard } from "@/components/UserCard";
import { SwapRequestModal } from "@/components/SwapRequestModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

// Mock data
const mockUsers = [
  {
    id: "1",
    name: "Alice Johnson",
    location: "San Francisco, CA",
    avatar: "",
    rating: 4.9,
    skillsOffered: ["Photoshop", "UI Design", "Figma"],
    skillsWanted: ["React", "Python", "Photography"],
    availability: "Weekends",
    isOnline: true
  },
  {
    id: "2", 
    name: "Bob Smith",
    location: "New York, NY",
    avatar: "",
    rating: 4.7,
    skillsOffered: ["React", "JavaScript", "Node.js"],
    skillsWanted: ["UI Design", "Marketing", "Excel"],
    availability: "Evenings",
    isOnline: false
  },
  {
    id: "3",
    name: "Carol Davis",
    location: "Austin, TX", 
    avatar: "",
    rating: 4.8,
    skillsOffered: ["Photography", "Video Editing", "Adobe Premiere"],
    skillsWanted: ["Web Design", "SEO", "Social Media"],
    availability: "Flexible",
    isOnline: true
  },
  {
    id: "4",
    name: "David Wilson",
    location: "Seattle, WA",
    avatar: "",
    rating: 4.6,
    skillsOffered: ["Python", "Data Analysis", "Excel"],
    skillsWanted: ["Guitar", "Spanish", "Cooking"],
    availability: "Weekdays",
    isOnline: true
  },
  {
    id: "5",
    name: "Eva Chen",
    location: "Los Angeles, CA",
    avatar: "",
    rating: 4.9,
    skillsOffered: ["Marketing", "Content Writing", "SEO"],
    skillsWanted: ["Graphic Design", "Videography", "French"],
    availability: "Weekends",
    isOnline: false
  },
  {
    id: "6",
    name: "Frank Miller",
    location: "Chicago, IL",
    avatar: "",
    rating: 4.5,
    skillsOffered: ["Guitar", "Music Production", "Audio Editing"],
    skillsWanted: ["Programming", "Web Development", "Digital Art"],
    availability: "Evenings",
    isOnline: true
  }
];

const currentUserSkills = {
  skillsOffered: ["Web Development", "React", "JavaScript", "CSS"],
  skillsWanted: ["Photography", "Design", "Marketing", "Guitar"]
};

const Index = () => {
  const [selectedUser, setSelectedUser] = useState<typeof mockUsers[0] | null>(null);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const { toast } = useToast();

  const handleRequestSwap = (userId: string) => {
    const user = mockUsers.find(u => u.id === userId);
    if (user) {
      setSelectedUser(user);
      setIsRequestModalOpen(true);
    }
  };

  const handleMessageUser = (userId: string) => {
    toast({
      title: "Message Feature",
      description: "Direct messaging will be available soon!",
    });
  };

  const handleSubmitRequest = (request: any) => {
    toast({
      title: "Swap Request Sent!",
      description: `Your request to ${selectedUser?.name} has been sent successfully.`,
    });
    setSelectedUser(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/5 to-primary/5">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-gradient-accent/10 px-4 py-2 rounded-full mb-4">
            <Sparkles className="h-4 w-4 text-accent" />
            <span className="text-sm font-medium text-accent">Connect & Learn Together</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-hero bg-clip-text text-transparent">
              Exchange Skills,
            </span>
            <br />
            <span className="text-foreground">Build Communities</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Connect with talented individuals, share your expertise, and learn new skills through our vibrant skill-swapping community.
          </p>
          <div className="flex items-center justify-center space-x-4">
            <Button 
              variant="hero" 
              size="lg"
              onClick={() => document.getElementById('browse-members')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Start Swapping
            </Button>
           
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="border-0 shadow-card bg-gradient-to-br from-primary/5 to-primary-glow/5 text-center">
            <CardContent className="p-6">
              <Users className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-primary">500+</div>
              <p className="text-sm text-muted-foreground">Active Members</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-card bg-gradient-to-br from-accent/5 to-accent-glow/5 text-center">
            <CardContent className="p-6">
              <TrendingUp className="h-8 w-8 text-accent mx-auto mb-2" />
              <div className="text-2xl font-bold text-accent">1,200+</div>
              <p className="text-sm text-muted-foreground">Skills Exchanged</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-card bg-gradient-to-br from-success/5 to-success/10 text-center">
            <CardContent className="p-6">
              <Filter className="h-8 w-8 text-success mx-auto mb-2" />
              <div className="text-2xl font-bold text-success">50+</div>
              <p className="text-sm text-muted-foreground">Skill Categories</p>
            </CardContent>
          </Card>
        </div>

        {/* Filter Bar */}
        <div id="browse-members" className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold mb-2">Browse Skilled Members</h2>
            <p className="text-muted-foreground">Find the perfect skill exchange partner</p>
          </div>
          
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="bg-muted/50">
              {mockUsers.length} Members Found
            </Badge>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>

        {/* User Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockUsers.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              onRequest={handleRequestSwap}
              onMessage={handleMessageUser}
            />
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Load More Members
          </Button>
        </div>
      </main>

      {/* Swap Request Modal */}
      {selectedUser && (
        <SwapRequestModal
          isOpen={isRequestModalOpen}
          onClose={() => {
            setIsRequestModalOpen(false);
            setSelectedUser(null);
          }}
          targetUser={selectedUser}
          currentUser={currentUserSkills}
          onSubmit={handleSubmitRequest}
        />
      )}
    </div>
  );
};

export default Index;
