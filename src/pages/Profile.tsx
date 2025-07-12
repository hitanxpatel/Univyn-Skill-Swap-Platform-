import { useState } from "react";
import { 
  Edit, 
  Save, 
  X, 
  Plus, 
  MapPin, 
  Clock, 
  Eye, 
  EyeOff,
  Star,
  Settings,
  Camera
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

export const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "John Doe",
    location: "San Francisco, CA",
    bio: "Passionate about learning and sharing knowledge through skill exchanges.",
    avatar: "",
    skillsOffered: ["Photoshop", "Web Design", "Photography"],
    skillsWanted: ["Excel", "Public Speaking", "Guitar"],
    availability: "Weekends",
    isPublic: true,
    rating: 4.8,
    completedSwaps: 12
  });

  const [newSkillOffered, setNewSkillOffered] = useState("");
  const [newSkillWanted, setNewSkillWanted] = useState("");

  const handleSave = () => {
    setIsEditing(false);
    // Here you would save to your backend
    console.log("Saving profile:", profile);
  };

  const addSkillOffered = () => {
    if (newSkillOffered.trim()) {
      setProfile(prev => ({
        ...prev,
        skillsOffered: [...prev.skillsOffered, newSkillOffered.trim()]
      }));
      setNewSkillOffered("");
    }
  };

  const addSkillWanted = () => {
    if (newSkillWanted.trim()) {
      setProfile(prev => ({
        ...prev,
        skillsWanted: [...prev.skillsWanted, newSkillWanted.trim()]
      }));
      setNewSkillWanted("");
    }
  };

  const removeSkillOffered = (skillToRemove: string) => {
    setProfile(prev => ({
      ...prev,
      skillsOffered: prev.skillsOffered.filter(skill => skill !== skillToRemove)
    }));
  };

  const removeSkillWanted = (skillToRemove: string) => {
    setProfile(prev => ({
      ...prev,
      skillsWanted: prev.skillsWanted.filter(skill => skill !== skillToRemove)
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/10 to-primary/5 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              User Profile
            </h1>
            <p className="text-muted-foreground">Manage your skills and preferences</p>
          </div>
          <Button
            variant={isEditing ? "outline" : "default"}
            onClick={() => isEditing ? setIsEditing(false) : setIsEditing(true)}
          >
            {isEditing ? <X className="h-4 w-4 mr-2" /> : <Edit className="h-4 w-4 mr-2" />}
            {isEditing ? "Cancel" : "Edit Profile"}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card className="border-0 shadow-card bg-background/80 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="h-5 w-5" />
                  <span>Basic Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Avatar and Name */}
                <div className="flex items-start space-x-4">
                  <div className="relative">
                    <Avatar className="h-20 w-20 ring-4 ring-primary/10">
                      <AvatarImage src={profile.avatar} alt={profile.name} />
                      <AvatarFallback className="bg-gradient-primary text-primary-foreground text-2xl">
                        {profile.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    {isEditing && (
                      <Button
                        variant="accent"
                        size="icon"
                        className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full"
                      >
                        <Camera className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <div className="flex-1 space-y-2">
                    <div>
                      <Label>Name</Label>
                      {isEditing ? (
                        <Input
                          value={profile.name}
                          onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                          className="mt-1"
                        />
                      ) : (
                        <p className="text-lg font-medium">{profile.name}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div>
                  <Label>Location</Label>
                  {isEditing ? (
                    <div className="relative mt-1">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        value={profile.location}
                        onChange={(e) => setProfile(prev => ({ ...prev, location: e.target.value }))}
                        className="pl-10"
                        placeholder="City, State"
                      />
                    </div>
                  ) : (
                    <div className="flex items-center space-x-1 text-muted-foreground mt-1">
                      <MapPin className="h-4 w-4" />
                      <span>{profile.location}</span>
                    </div>
                  )}
                </div>

                {/* Bio */}
                <div>
                  <Label>Bio</Label>
                  {isEditing ? (
                    <Textarea
                      value={profile.bio}
                      onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                      className="mt-1 resize-none"
                      rows={3}
                      placeholder="Tell others about yourself..."
                    />
                  ) : (
                    <p className="text-muted-foreground mt-1">{profile.bio}</p>
                  )}
                </div>

                {/* Availability */}
                <div>
                  <Label>Availability</Label>
                  {isEditing ? (
                    <Select 
                      value={profile.availability} 
                      onValueChange={(value) => setProfile(prev => ({ ...prev, availability: value }))}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Weekends">Weekends</SelectItem>
                        <SelectItem value="Evenings">Evenings</SelectItem>
                        <SelectItem value="Weekdays">Weekdays</SelectItem>
                        <SelectItem value="Flexible">Flexible</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <div className="flex items-center space-x-1 mt-1">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <Badge variant="outline" className="bg-success/10 text-success">
                        {profile.availability}
                      </Badge>
                    </div>
                  )}
                </div>

                {/* Privacy */}
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center space-x-2">
                    {profile.isPublic ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                    <Label>Public Profile</Label>
                  </div>
                  {isEditing ? (
                    <Switch
                      checked={profile.isPublic}
                      onCheckedChange={(checked) => setProfile(prev => ({ ...prev, isPublic: checked }))}
                    />
                  ) : (
                    <Badge variant={profile.isPublic ? "default" : "secondary"}>
                      {profile.isPublic ? "Public" : "Private"}
                    </Badge>
                  )}
                </div>

                {isEditing && (
                  <Button onClick={handleSave} className="w-full" size="lg">
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Skills Offered */}
            <Card className="border-0 shadow-card bg-background/80 backdrop-blur">
              <CardHeader>
                <CardTitle>Skills Offered</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {profile.skillsOffered.map((skill, index) => (
                    <Badge 
                      key={index} 
                      variant="secondary" 
                      className="bg-primary/10 text-primary border-primary/20 relative group"
                    >
                      {skill}
                      {isEditing && (
                        <button
                          onClick={() => removeSkillOffered(skill)}
                          className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      )}
                    </Badge>
                  ))}
                </div>
                
                {isEditing && (
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Add a skill you offer..."
                      value={newSkillOffered}
                      onChange={(e) => setNewSkillOffered(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addSkillOffered()}
                      className="flex-1"
                    />
                    <Button onClick={addSkillOffered} variant="outline">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Skills Wanted */}
            <Card className="border-0 shadow-card bg-background/80 backdrop-blur">
              <CardHeader>
                <CardTitle>Skills Wanted</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {profile.skillsWanted.map((skill, index) => (
                    <Badge 
                      key={index} 
                      variant="outline" 
                      className="bg-accent/10 text-accent border-accent/20 relative group"
                    >
                      {skill}
                      {isEditing && (
                        <button
                          onClick={() => removeSkillWanted(skill)}
                          className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      )}
                    </Badge>
                  ))}
                </div>
                
                {isEditing && (
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Add a skill you want..."
                      value={newSkillWanted}
                      onChange={(e) => setNewSkillWanted(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addSkillWanted()}
                      className="flex-1"
                    />
                    <Button onClick={addSkillWanted} variant="outline">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Stats Sidebar */}
          <div className="space-y-6">
            {/* Profile Stats */}
            <Card className="border-0 shadow-card bg-gradient-to-br from-primary/5 to-accent/5">
              <CardHeader>
                <CardTitle>Profile Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1 mb-1">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="text-2xl font-bold">{profile.rating}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Average Rating</p>
                </div>
                
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{profile.completedSwaps}</div>
                  <p className="text-sm text-muted-foreground">Completed Swaps</p>
                </div>

                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">{profile.skillsOffered.length}</div>
                  <p className="text-sm text-muted-foreground">Skills Offered</p>
                </div>

                <div className="text-center">
                  <div className="text-2xl font-bold text-success">{profile.skillsWanted.length}</div>
                  <p className="text-sm text-muted-foreground">Skills Wanted</p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-0 shadow-card bg-background/80 backdrop-blur">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  View My Requests
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Browse Users
                </Button>
                <Button variant="accent" className="w-full justify-start">
                  Create New Swap
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};