import { useState } from "react";
import { X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface SwapRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetUser: {
    id: string;
    name: string;
    avatar?: string;
    skillsOffered: string[];
    skillsWanted: string[];
  };
  currentUser: {
    skillsOffered: string[];
    skillsWanted: string[];
  };
  onSubmit: (request: {
    offeredSkill: string;
    requestedSkill: string;
    message: string;
  }) => void;
}

export const SwapRequestModal = ({ 
  isOpen, 
  onClose, 
  targetUser, 
  currentUser, 
  onSubmit 
}: SwapRequestModalProps) => {
  const [offeredSkill, setOfferedSkill] = useState("");
  const [requestedSkill, setRequestedSkill] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    if (offeredSkill && requestedSkill && message) {
      onSubmit({ offeredSkill, requestedSkill, message });
      onClose();
      // Reset form
      setOfferedSkill("");
      setRequestedSkill("");
      setMessage("");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      
      <Card className="relative w-full max-w-md mx-4 bg-background shadow-elegant">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle className="text-xl">Create Swap Request</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Target User */}
          <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
            <Avatar className="h-10 w-10">
              <AvatarImage src={targetUser.avatar} alt={targetUser.name} />
              <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                {targetUser.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium">{targetUser.name}</h3>
              <p className="text-sm text-muted-foreground">Swap Request</p>
            </div>
          </div>

          {/* Your Offered Skill */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Choose one of your offered skills</label>
            <Select value={offeredSkill} onValueChange={setOfferedSkill}>
              <SelectTrigger>
                <SelectValue placeholder="Select a skill you offer" />
              </SelectTrigger>
              <SelectContent>
                {currentUser.skillsOffered.map((skill) => (
                  <SelectItem key={skill} value={skill}>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary" className="bg-primary/10 text-primary">
                        {skill}
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Requested Skill */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Choose one of their offered skills</label>
            <Select value={requestedSkill} onValueChange={setRequestedSkill}>
              <SelectTrigger>
                <SelectValue placeholder="Select a skill they offer" />
              </SelectTrigger>
              <SelectContent>
                {targetUser.skillsOffered.map((skill) => (
                  <SelectItem key={skill} value={skill}>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="bg-accent/10 text-accent">
                        {skill}
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Message</label>
            <Textarea
              placeholder="Tell them why you'd like to make this swap..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-[100px] resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex space-x-2 pt-2">
            <Button variant="outline" className="flex-1" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              variant="default" 
              className="flex-1"
              onClick={handleSubmit}
              disabled={!offeredSkill || !requestedSkill || !message}
            >
              <Send className="h-4 w-4 mr-2" />
              Send Request
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};