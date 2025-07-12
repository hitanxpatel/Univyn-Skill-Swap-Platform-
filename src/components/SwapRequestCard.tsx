import { Clock, Check, X, Star, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
  };
  offeredSkill: string;
  requestedSkill: string;
  message: string;
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
  createdAt: string;
}

interface SwapRequestCardProps {
  request: SwapRequest;
  currentUserId: string;
  onAccept?: (requestId: string) => void;
  onReject?: (requestId: string) => void;
  onDelete?: (requestId: string) => void;
  onRate?: (requestId: string, rating: number) => void;
}

export const SwapRequestCard = ({ 
  request, 
  currentUserId, 
  onAccept, 
  onReject, 
  onDelete,
  onRate 
}: SwapRequestCardProps) => {
  const isReceived = request.toUser.name !== request.fromUser.name; // This would be based on actual user IDs
  const otherUser = isReceived ? request.fromUser : request.toUser;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-warning/10 text-warning border-warning/20';
      case 'accepted': return 'bg-success/10 text-success border-success/20';
      case 'rejected': return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'completed': return 'bg-primary/10 text-primary border-primary/20';
      default: return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  return (
    <Card className="hover:shadow-card transition-all duration-200 border-0 bg-gradient-to-br from-background to-muted/20">
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10 ring-2 ring-primary/10">
              <AvatarImage src={otherUser.avatar} alt={otherUser.name} />
              <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                {otherUser.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium">{otherUser.name}</h3>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>{request.createdAt}</span>
                {request.fromUser.rating && (
                  <>
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span>{request.fromUser.rating}</span>
                  </>
                )}
              </div>
            </div>
          </div>
          
          <Badge variant="outline" className={getStatusColor(request.status)}>
            {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
          </Badge>
        </div>

        {/* Swap Details */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
            <div className="text-center">
              <Badge variant="secondary" className="bg-primary/10 text-primary mb-1">
                {request.offeredSkill}
              </Badge>
              <p className="text-xs text-muted-foreground">
                {isReceived ? 'They offer' : 'You offer'}
              </p>
            </div>
            
            <div className="flex items-center space-x-2 text-muted-foreground">
              <div className="h-px w-8 bg-border" />
              <MessageSquare className="h-4 w-4" />
              <div className="h-px w-8 bg-border" />
            </div>
            
            <div className="text-center">
              <Badge variant="outline" className="bg-accent/10 text-accent mb-1">
                {request.requestedSkill}
              </Badge>
              <p className="text-xs text-muted-foreground">
                {isReceived ? 'You offer' : 'They offer'}
              </p>
            </div>
          </div>

          {/* Message */}
          <div className="p-3 bg-background/50 rounded-lg border border-border/50">
            <p className="text-sm text-foreground/80">{request.message}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-2">
          {request.status === 'pending' && isReceived && (
            <>
              <Button 
                variant="success" 
                size="sm" 
                className="flex-1"
                onClick={() => onAccept?.(request.id)}
              >
                <Check className="h-4 w-4 mr-2" />
                Accept
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1"
                onClick={() => onReject?.(request.id)}
              >
                <X className="h-4 w-4 mr-2" />
                Reject
              </Button>
            </>
          )}
          
          {request.status === 'pending' && !isReceived && (
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1"
              onClick={() => onDelete?.(request.id)}
            >
              <X className="h-4 w-4 mr-2" />
              Delete Request
            </Button>
          )}

          {request.status === 'accepted' && (
            <div className="flex-1">
              <Badge variant="outline" className="bg-success/10 text-success w-full justify-center py-2">
                <Check className="h-4 w-4 mr-2" />
                Swap Accepted - Contact {otherUser.name}
              </Badge>
            </div>
          )}

          {request.status === 'completed' && (
            <Button 
              variant="accent" 
              size="sm" 
              className="flex-1"
              onClick={() => onRate?.(request.id, 5)}
            >
              <Star className="h-4 w-4 mr-2" />
              Rate Experience
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};