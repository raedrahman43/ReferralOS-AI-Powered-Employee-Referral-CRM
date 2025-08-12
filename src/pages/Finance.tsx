import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  DollarSign, 
  TrendingUp, 
  Clock, 
  CheckCircle,
  Download,
  Filter,
  MoreHorizontal
} from 'lucide-react';

const payoutData = [
  {
    id: '1',
    employee: 'Marcus Rodriguez',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    candidate: 'Alex Thompson',
    role: 'Senior Frontend Engineer',
    amount: 5000,
    status: 'pending',
    eligibleDate: '2024-02-15',
    submittedDate: '2024-01-20'
  },
  {
    id: '2',
    employee: 'Sarah Kim',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
    candidate: 'Jordan Smith',
    role: 'Product Manager',
    amount: 3000,
    status: 'approved',
    eligibleDate: '2024-01-30',
    submittedDate: '2024-01-15'
  }
];

export default function Finance() {
  const stats = {
    totalPayouts: 127500,
    pendingApprovals: 15000,
    thisMonth: 42000,
    avgBonus: 3750
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Finance</h1>
        <p className="text-muted-foreground">
          Manage referral payouts and bonus approvals
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="card-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Payouts</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalPayouts.toLocaleString()}</div>
            <p className="text-xs text-accent">
              Year to date
            </p>
          </CardContent>
        </Card>

        <Card className="card-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">${stats.pendingApprovals.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              3 bonuses pending
            </p>
          </CardContent>
        </Card>

        <Card className="card-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.thisMonth.toLocaleString()}</div>
            <p className="text-xs text-accent">
              +25% vs last month
            </p>
          </CardContent>
        </Card>

        <Card className="card-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Bonus</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.avgBonus.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Per successful hire
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
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export to Payroll
          </Button>
          <Button className="btn-gradient">
            Bulk Approve
          </Button>
        </div>
      </div>

      {/* Payout Table */}
      <Card className="card-soft">
        <CardHeader>
          <CardTitle>Payout Queue</CardTitle>
          <CardDescription>
            Review and approve referral bonuses for payment
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Candidate</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Eligible Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payoutData.map((payout) => (
                <TableRow key={payout.id} className="hover:bg-muted/50">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={payout.avatar} />
                        <AvatarFallback>
                          {payout.employee.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{payout.employee}</p>
                        <p className="text-sm text-muted-foreground">Engineering</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{payout.candidate}</p>
                      <p className="text-sm text-muted-foreground">Referred candidate</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{payout.role}</p>
                      <p className="text-sm text-muted-foreground">ENG-2024-001</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-lg font-bold text-accent">
                      ${payout.amount.toLocaleString()}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={
                        payout.status === 'pending' ? 'badge-warning' :
                        payout.status === 'approved' ? 'badge-success' :
                        'badge-primary'
                      }
                    >
                      {payout.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-muted-foreground">
                      {new Date(payout.eligibleDate).toLocaleDateString()}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      {payout.status === 'pending' && (
                        <Button size="sm" className="btn-success h-8">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Approve
                        </Button>
                      )}
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

      {/* Payout Policy */}
      <Card className="card-soft">
        <CardHeader>
          <CardTitle>Payout Policy</CardTitle>
          <CardDescription>
            Current referral bonus structure and eligibility requirements
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3">Bonus Structure</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Engineering (L4+):</span>
                  <span className="font-medium">$5,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Product/Design:</span>
                  <span className="font-medium">$3,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Sales/Marketing:</span>
                  <span className="font-medium">$2,500</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Other roles:</span>
                  <span className="font-medium">$1,500</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">Eligibility Requirements</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-accent" />
                  <span>90-day probation period completion</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-accent" />
                  <span>Referrer employed at submission time</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-accent" />
                  <span>No hiring manager conflicts</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-accent" />
                  <span>Role filled within 6 months</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}