import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PipelineBoard } from '@/components/crm/PipelineBoard';
import { CandidateDrawer } from '@/components/crm/CandidateDrawer';
import { 
  Filter, 
  Download, 
  LayoutGrid, 
  List, 
  Search,
  Users,
  Clock,
  Target,
  TrendingUp
} from 'lucide-react';
import { Candidate } from '@/types';
import { mockCandidates } from '@/data/mockData';

export default function RecruiterCRM() {
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'kanban' | 'table'>('kanban');

  const handleCandidateClick = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setDrawerOpen(true);
  };

  const stats = {
    totalCandidates: mockCandidates.length,
    activeReferrals: mockCandidates.filter(c => c.status !== 'hired' && c.status !== 'rejected').length,
    avgFitScore: Math.round(mockCandidates.reduce((sum, c) => sum + c.scores.fit, 0) / mockCandidates.length),
    slaBreach: mockCandidates.filter(c => {
      const daysSince = c.lastActivity ? 
        Math.floor((Date.now() - c.lastActivity.getTime()) / (1000 * 60 * 60 * 24)) : 0;
      return daysSince > 5;
    }).length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Recruiter CRM</h1>
        <p className="text-muted-foreground">
          Manage your referral pipeline and candidate relationships
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="card-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Candidates</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCandidates}</div>
            <p className="text-xs text-muted-foreground">
              +2 from last week
            </p>
          </CardContent>
        </Card>

        <Card className="card-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Pipeline</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeReferrals}</div>
            <p className="text-xs text-muted-foreground">
              In progress referrals
            </p>
          </CardContent>
        </Card>

        <Card className="card-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Fit Score</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.avgFitScore}%</div>
            <p className="text-xs text-accent">
              +5% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="card-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">SLA Breach</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{stats.slaBreach}</div>
            <p className="text-xs text-muted-foreground">
              Need attention
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button variant="outline" size="sm">
            <Search className="h-4 w-4 mr-2" />
            Saved Views
          </Button>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center bg-muted rounded-lg p-1">
            <Button 
              variant={viewMode === 'kanban' ? 'default' : 'ghost'} 
              size="sm"
              onClick={() => setViewMode('kanban')}
              className="h-8"
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button 
              variant={viewMode === 'table' ? 'default' : 'ghost'} 
              size="sm"
              onClick={() => setViewMode('table')}
              className="h-8"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
          
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Pipeline Board */}
      <Card className="card-soft">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Candidate Pipeline</CardTitle>
              <CardDescription>
                Drag and drop to move candidates through stages
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Badge variant="outline" className="badge-primary">
                3 New
              </Badge>
              <Badge variant="outline" className="badge-warning">
                2 SLA Risk
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {viewMode === 'kanban' ? (
            <PipelineBoard onCandidateClick={handleCandidateClick} />
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Table view coming soon</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Candidate Drawer */}
      <CandidateDrawer
        candidate={selectedCandidate}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </div>
  );
}