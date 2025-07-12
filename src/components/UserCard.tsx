import { MapPin, Star, Clock, MessageSquare, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserCardProps {
  user: {
    id: string;
    name: string;
    location?: string;
    avatar?: string;
    rating: number;
    skillsOffered: string[];
    skillsWanted: string[];
    availability: string;
    isOnline?: boolean;
  };
  onRequest?: (userId: string) => void;
  onMessage?: (userId: string) => void;
}

export const UserCard = ({ user, onRequest, onMessage }: UserCardProps) => {
  return (
    <Card className="group hover:shadow-card transition-all duration-300 hover:-translate-y-1 border-0 bg-gradient-to-br from-background to-muted/30">
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Avatar className="h-12 w-12 ring-2 ring-primary/20">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                  {user.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              {user.isOnline && (
                <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-success rounded-full border-2 border-background animate-pulse-glow" />
              )}
            </div>
            <div>
              <h3 className="font-semibold text-lg">{user.name}</h3>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                {user.location && (
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-3 w-3" />
                    <span>{user.location}</span>
                  </div>
                )}
                <div className="flex items-center space-x-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span>{user.rating}</span>
                </div>
              </div>
            </div>
          </div>
          
          <Badge variant="outline" className="bg-success/10 text-success border-success/20">
            <Clock className="h-3 w-3 mr-1" />
            {user.availability}
          </Badge>
        </div>

        {/* Skills Offered */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-foreground/80 mb-2">Skills Offered</h4>
          <div className="flex flex-wrap gap-1">
            {user.skillsOffered.slice(0, 3).map((skill, index) => (
              <Badge key={index} variant="secondary" className="text-xs bg-primary/10 text-primary border-primary/20">
                {skill}
              </Badge>
            ))}
            {user.skillsOffered.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{user.skillsOffered.length - 3}
              </Badge>
            )}
          </div>
        </div>

        {/* Skills Wanted */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-foreground/80 mb-2">Skills Wanted</h4>
          <div className="flex flex-wrap gap-1">
            {user.skillsWanted.slice(0, 3).map((skill, index) => (
              <Badge key={index} variant="outline" className="text-xs bg-accent/10 text-accent border-accent/20">
                {skill}
              </Badge>
            ))}
            {user.skillsWanted.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{user.skillsWanted.length - 3}
              </Badge>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-2 pt-2">
          <Button 
            variant="default" 
            size="sm" 
            className="flex-1"
            onClick={() => onRequest?.(user.id)}
          >
            Request Swap
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onMessage?.(user.id)}
          >
            <MessageSquare className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};