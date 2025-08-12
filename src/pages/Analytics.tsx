import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Target, 
  Clock, 
  DollarSign,
  Download,
  Calendar
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, FunnelChart, Funnel, LabelList } from 'recharts';

const funnelData = [
  { name: 'Referrals Submitted', value: 100, fill: '#3B82F6' },
  { name: 'Initial Screen', value: 75, fill: '#10B981' },
  { name: 'HM Interview', value: 45, fill: '#F59E0B' },
  { name: 'Final Round', value: 25, fill: '#EF4444' },
  { name: 'Offers', value: 15, fill: '#8B5CF6' },
  { name: 'Hires', value: 12, fill: '#06B6D4' }
];

const monthlyData = [
  { month: 'Jan', referrals: 45, hires: 8, cost: 12000 },
  { month: 'Feb', referrals: 52, hires: 12, cost: 15000 },
  { month: 'Mar', referrals: 38, hires: 6, cost: 9000 },
  { month: 'Apr', referrals: 61, hires: 14, cost: 18000 },
  { month: 'May', referrals: 55, hires: 11, cost: 14000 },
  { month: 'Jun', referrals: 67, hires: 16, cost: 20000 }
];

const sourceData = [
  { name: 'Referrals', value: 40, color: '#3B82F6' },
  { name: 'LinkedIn', value: 25, color: '#10B981' },
  { name: 'Job Boards', value: 20, color: '#F59E0B' },
  { name: 'Direct', value: 10, color: '#EF4444' },
  { name: 'Other', value: 5, color: '#8B5CF6' }
];

export default function Analytics() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
          <p className="text-muted-foreground">
            Track referral performance and recruiting metrics
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Last 6 months
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="card-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Referral→Hire Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18.2%</div>
            <p className="text-xs text-accent flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              +2.1% from last quarter
            </p>
          </CardContent>
        </Card>

        <Card className="card-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Time to First Touch</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.3 days</div>
            <p className="text-xs text-accent flex items-center gap-1">
              <TrendingDown className="h-3 w-3" />
              -0.5 days faster
            </p>
          </CardContent>
        </Card>

        <Card className="card-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cost Per Hire</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,247</div>
            <p className="text-xs text-accent flex items-center gap-1">
              <TrendingDown className="h-3 w-3" />
              -15% vs other channels
            </p>
          </CardContent>
        </Card>

        <Card className="card-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Quality Score</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <p className="text-xs text-accent flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              High performance
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="funnel">Conversion Funnel</TabsTrigger>
          <TabsTrigger value="sources">Sources</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="card-soft">
              <CardHeader>
                <CardTitle>Monthly Performance</CardTitle>
                <CardDescription>
                  Referrals submitted vs successful hires
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="referrals" fill="#3B82F6" name="Referrals" />
                    <Bar dataKey="hires" fill="#10B981" name="Hires" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="card-soft">
              <CardHeader>
                <CardTitle>Hiring Sources</CardTitle>
                <CardDescription>
                  Distribution of successful hires by source
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={sourceData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({name, value}) => `${name}: ${value}%`}
                    >
                      {sourceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="funnel" className="space-y-6">
          <Card className="card-soft">
            <CardHeader>
              <CardTitle>Referral Conversion Funnel</CardTitle>
              <CardDescription>
                Track candidates through each stage of the hiring process
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {funnelData.map((stage, index) => {
                  const percentage = index === 0 ? 100 : Math.round((stage.value / funnelData[0].value) * 100);
                  const dropoff = index > 0 ? Math.round(((funnelData[index-1].value - stage.value) / funnelData[index-1].value) * 100) : 0;
                  
                  return (
                    <div key={stage.name} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{stage.name}</span>
                        <div className="flex items-center gap-3">
                          <span className="text-2xl font-bold">{stage.value}</span>
                          <Badge variant="outline" className="badge-primary">
                            {percentage}%
                          </Badge>
                          {index > 0 && (
                            <Badge variant="outline" className="badge-warning">
                              -{dropoff}% drop
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="w-full bg-muted rounded-full h-3">
                        <div 
                          className="h-3 rounded-full transition-all duration-300"
                          style={{ 
                            width: `${percentage}%`,
                            backgroundColor: stage.fill
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sources" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {sourceData.map((source) => (
              <Card key={source.name} className="card-soft">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {source.name}
                    <Badge style={{ backgroundColor: source.color, color: 'white' }}>
                      {source.value}%
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Hires:</span>
                      <span className="font-semibold">{Math.round(source.value * 0.67)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Cost per hire:</span>
                      <span className="font-semibold">${Math.round(1247 * (1 + (source.value - 40) * 0.01))}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Quality score:</span>
                      <span className="font-semibold">{Math.round(87 + (source.value - 40) * 0.5)}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <Card className="card-soft">
            <CardHeader>
              <CardTitle>Referral Trends</CardTitle>
              <CardDescription>
                Track referral volume and quality over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="referrals" 
                    stroke="#3B82F6" 
                    strokeWidth={3}
                    name="Referrals"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="hires" 
                    stroke="#10B981" 
                    strokeWidth={3}
                    name="Hires"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}