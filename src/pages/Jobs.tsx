import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  Briefcase, 
  Users, 
  DollarSign, 
  Calendar,
  Search,
  Filter,
  Plus,
  Share,
  MoreHorizontal,
  TrendingUp
} from 'lucide-react';
import { mockJobs } from '@/data/mockData';

export default function Jobs() {
  const stats = {
    openJobs: mockJobs.filter(j => j.status === 'open').length,
    totalHeadcount: mockJobs.reduce((sum, j) => sum + j.headcount, 0),
    avgBounty: Math.round(mockJobs.reduce((sum, j) => sum + j.bounty, 0) / mockJobs.length),
    referralHires: 8
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Jobs</h1>
          <p className="text-muted-foreground">
            Manage open positions and referral opportunities
          </p>
        </div>
        <Button className="btn-gradient">
          <Plus className="h-4 w-4 mr-2" />
          Add Job
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="card-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Positions</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.openJobs}</div>
            <p className="text-xs text-muted-foreground">
              Active hiring
            </p>
          </CardContent>
        </Card>

        <Card className="card-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Headcount</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalHeadcount}</div>
            <p className="text-xs text-muted-foreground">
              Positions to fill
            </p>
          </CardContent>
        </Card>

        <Card className="card-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Bounty</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.avgBounty.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Per successful referral
            </p>
          </CardContent>
        </Card>

        <Card className="card-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Referral Hires</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">{stats.referralHires}</div>
            <p className="text-xs text-accent">
              This quarter
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search jobs..." className="w-80 pl-10" />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Share className="h-4 w-4 mr-2" />
            Share to Team
          </Button>
        </div>
      </div>

      {/* Jobs Table */}
      <Card className="card-soft">
        <CardHeader>
          <CardTitle>Open Positions</CardTitle>
          <CardDescription>
            Current job openings and referral opportunities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Role</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Hiring Manager</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Headcount</TableHead>
                <TableHead>Bounty</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockJobs.map((job) => (
                <TableRow key={job.id} className="hover:bg-muted/50">
                  <TableCell>
                    <div>
                      <p className="font-medium">{job.title}</p>
                      <p className="text-sm text-muted-foreground">{job.reqId}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="badge-primary">
                      {job.department}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={job.hiringManager?.avatar} />
                        <AvatarFallback className="text-xs">
                          {job.hiringManager?.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{job.hiringManager?.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{job.location}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{job.headcount}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-lg font-bold text-accent">
                      ${job.bounty.toLocaleString()}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={
                        job.status === 'open' ? 'badge-success' :
                        job.status === 'paused' ? 'badge-warning' :
                        'badge-danger'
                      }
                    >
                      {job.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button size="sm" variant="outline" className="h-8">
                        <Share className="h-3 w-3 mr-1" />
                        Share
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Job Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="card-soft">
          <CardHeader>
            <CardTitle>Referral Performance by Role</CardTitle>
            <CardDescription>
              Success rates for different position types
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockJobs.map((job) => {
              const successRate = Math.floor(Math.random() * 30) + 15; // Mock data
              const referrals = Math.floor(Math.random() * 20) + 5;
              
              return (
                <div key={job.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div>
                    <p className="font-medium">{job.title}</p>
                    <p className="text-sm text-muted-foreground">{referrals} referrals submitted</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-accent">{successRate}%</div>
                    <p className="text-xs text-muted-foreground">success rate</p>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card className="card-soft">
          <CardHeader>
            <CardTitle>SLA Performance</CardTitle>
            <CardDescription>
              Time to fill metrics by role
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockJobs.map((job) => {
              const avgDays = Math.floor(Math.random() * 45) + 15; // Mock data
              const slaTarget = job.sla.offer;
              const performance = avgDays <= slaTarget ? 'good' : 'warning';
              
              return (
                <div key={job.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div>
                    <p className="font-medium">{job.title}</p>
                    <p className="text-sm text-muted-foreground">Target: {slaTarget} days</p>
                  </div>
                  <div className="text-right">
                    <div className={`text-lg font-bold ${
                      performance === 'good' ? 'text-accent' : 'text-warning'
                    }`}>
                      {avgDays} days
                    </div>
                    <p className="text-xs text-muted-foreground">avg time to fill</p>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}