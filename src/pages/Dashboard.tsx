import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Users, 
  Target, 
  TrendingUp, 
  Clock, 
  Plus,
  ArrowRight,
  Award,
  DollarSign
} from 'lucide-react';
import { mockCandidates, mockReferrals, mockTasks } from '@/data/mockData';

export default function Dashboard() {
  const recentCandidates = mockCandidates.slice(0, 3);
  const urgentTasks = mockTasks.filter(t => !t.completed);
  
  const stats = {
    totalReferrals: mockReferrals.length,
    activeCandidates: mockCandidates.filter(c => c.status !== 'hired' && c.status !== 'rejected').length,
    avgFitScore: Math.round(mockCandidates.reduce((sum, c) => sum + c.scores.fit, 0) / mockCandidates.length),
    pendingTasks: urgentTasks.length
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Welcome back, Sarah!</h1>
          <p className="text-muted-foreground">
            Here's what's happening with your referral pipeline today.
          </p>
        </div>
        <Button className="btn-gradient">
          <Plus className="h-4 w-4 mr-2" />
          Quick Add
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="card-soft hover-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Referrals</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalReferrals}</div>
            <p className="text-xs text-accent">
              +2 this week
            </p>
          </CardContent>
        </Card>

        <Card className="card-soft hover-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Pipeline</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeCandidates}</div>
            <p className="text-xs text-muted-foreground">
              Active candidates
            </p>
          </CardContent>
        </Card>

        <Card className="card-soft hover-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Quality</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.avgFitScore}%</div>
            <p className="text-xs text-accent">
              High quality pipeline
            </p>
          </CardContent>
        </Card>

        <Card className="card-soft hover-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{stats.pendingTasks}</div>
            <p className="text-xs text-muted-foreground">
              Need attention
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="card-soft">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Recent Candidates
              <Button variant="ghost" size="sm">
                View All <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentCandidates.map((candidate) => (
              <div key={candidate.id} className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                <Avatar className="h-10 w-10">
                  <AvatarFallback>
                    {candidate.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-medium">{candidate.name}</p>
                  <p className="text-sm text-muted-foreground">{candidate.currentTitle}</p>
                  <div className="flex gap-2 mt-1">
                    <Badge variant="outline" className="badge-primary text-xs">
                      {candidate.scores.fit}% fit
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Urgent Tasks */}
        <Card className="card-soft">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Urgent Tasks
              <Badge variant="outline" className="badge-warning">
                {urgentTasks.length}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {urgentTasks.map((task) => (
              <div key={task.id} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                <div className={`p-1 rounded ${
                  task.priority === 'high' ? 'bg-destructive-light text-destructive' :
                  task.priority === 'medium' ? 'bg-warning-light text-warning' :
                  'bg-primary-light text-primary'
                }`}>
                  <Clock className="h-3 w-3" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">{task.title}</p>
                  <p className="text-xs text-muted-foreground">{task.description}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs text-muted-foreground">
                      Due {task.dueDate?.toLocaleDateString()}
                    </span>
                    <Badge variant="outline" className={
                      task.priority === 'high' ? 'badge-danger' :
                      task.priority === 'medium' ? 'badge-warning' : 
                      'badge-primary'
                    }>
                      {task.priority}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="card-soft">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common tasks and shortcuts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <Plus className="h-4 w-4 mr-2" />
              Add New Referral
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Users className="h-4 w-4 mr-2" />
              Review Pending Candidates
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Award className="h-4 w-4 mr-2" />
              Create Campaign
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <DollarSign className="h-4 w-4 mr-2" />
              Approve Payouts
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Performance Summary */}
      <Card className="card-soft">
        <CardHeader>
          <CardTitle>This Month's Performance</CardTitle>
          <CardDescription>
            Key metrics and achievements for January 2024
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-accent">12</div>
              <p className="text-sm text-muted-foreground">Referrals Submitted</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">8</div>
              <p className="text-sm text-muted-foreground">Moved to Interview</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-warning">3</div>
              <p className="text-sm text-muted-foreground">Offers Extended</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-destructive">2</div>
              <p className="text-sm text-muted-foreground">Successfully Hired</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}