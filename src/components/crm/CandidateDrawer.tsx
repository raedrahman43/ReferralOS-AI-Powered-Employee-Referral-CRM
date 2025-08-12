import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import {
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  FileText,
  MessageSquare,
  Calendar,
  Target,
  TrendingUp,
  Clock,
  User
} from 'lucide-react';
import { Candidate } from '@/types';
import { mockActivities } from '@/data/mockData';
import { statusConfig } from '@/data/mockData';

interface CandidateDrawerProps {
  candidate: Candidate | null;
  open: boolean;
  onClose: () => void;
}

export function CandidateDrawer({ candidate, open, onClose }: CandidateDrawerProps) {
  if (!candidate) return null;

  const activities = mockActivities.filter(a => a.candidateId === candidate.id);
  const config = statusConfig[candidate.status as keyof typeof statusConfig];

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-[600px] sm:w-[600px] overflow-y-auto">
        <SheetHeader className="pb-6">
          <div className="flex items-start gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src="" />
              <AvatarFallback className="text-lg">
                {candidate.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <SheetTitle className="text-xl">{candidate.name}</SheetTitle>
              <SheetDescription className="text-base">
                {candidate.currentTitle} at {candidate.currentCompany}
              </SheetDescription>
              
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="outline" className={config.color}>
                  {config.label}
                </Badge>
                <Badge variant="outline" className="badge-primary">
                  <Target className="h-3 w-3 mr-1" />
                  {candidate.scores.fit}% fit
                </Badge>
                <Badge variant="outline" className="badge-success">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {candidate.scores.relationship}% rel
                </Badge>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            {candidate.email && (
              <div className="flex items-center gap-1">
                <Mail className="h-4 w-4" />
                {candidate.email}
              </div>
            )}
            {candidate.phone && (
              <div className="flex items-center gap-1">
                <Phone className="h-4 w-4" />
                {candidate.phone}
              </div>
            )}
            {candidate.location && (
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {candidate.location}
              </div>
            )}
          </div>
        </SheetHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="referral">Referral</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="interviews">Interviews</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <Card className="card-soft">
              <CardHeader>
                <CardTitle className="text-base">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Email:</span>
                  <span>{candidate.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Phone:</span>
                  <span>{candidate.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Location:</span>
                  <span>{candidate.location}</span>
                </div>
                {candidate.linkedinUrl && (
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">LinkedIn:</span>
                    <Button variant="outline" size="sm" className="h-7">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      View Profile
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="card-soft">
              <CardHeader>
                <CardTitle className="text-base">Skills & Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {candidate.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="card-soft">
              <CardHeader>
                <CardTitle className="text-base">Job Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Position:</span>
                  <span>{candidate.job?.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Req ID:</span>
                  <span>{candidate.job?.reqId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Hiring Manager:</span>
                  <span>{candidate.job?.hiringManager?.name}</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="referral" className="space-y-4">
            <Card className="card-soft">
              <CardHeader>
                <CardTitle className="text-base">Referral Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={candidate.referrer?.avatar} />
                    <AvatarFallback>
                      {candidate.referrer?.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{candidate.referrer?.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {candidate.referrer?.department} • {candidate.referrer?.team}
                    </p>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h4 className="font-medium mb-2">Relationship</h4>
                  <p className="text-sm text-muted-foreground">
                    Former colleague at TechCorp, worked together for 2 years. Strong technical collaboration and great culture fit.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="space-y-4">
            <div className="space-y-3">
              {activities.map((activity) => (
                <Card key={activity.id} className="card-soft">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-primary-light rounded-lg">
                        {activity.type === 'note' && <MessageSquare className="h-4 w-4 text-primary" />}
                        {activity.type === 'email' && <Mail className="h-4 w-4 text-primary" />}
                        {activity.type === 'call' && <Phone className="h-4 w-4 text-primary" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{activity.title}</h4>
                          <span className="text-xs text-muted-foreground">
                            {activity.createdAt.toLocaleDateString()}
                          </span>
                        </div>
                        {activity.description && (
                          <p className="text-sm text-muted-foreground mt-1">
                            {activity.description}
                          </p>
                        )}
                        <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                          <User className="h-3 w-3" />
                          {activity.user?.name}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="interviews" className="space-y-4">
            <Card className="card-soft">
              <CardContent className="p-6 text-center">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-medium mb-2">No interviews scheduled</h3>
                <p className="text-sm text-muted-foreground">
                  Schedule an interview to get started
                </p>
                <Button className="mt-4">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Interview
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex gap-2 pt-6 border-t border-border">
          <Button className="flex-1 btn-gradient">
            Advance Stage
          </Button>
          <Button variant="outline" className="flex-1">
            <Mail className="h-4 w-4 mr-2" />
            Email
          </Button>
          <Button variant="outline">
            <Calendar className="h-4 w-4" />
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}