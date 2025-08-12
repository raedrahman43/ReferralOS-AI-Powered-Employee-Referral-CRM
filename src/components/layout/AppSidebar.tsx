import {
  Users,
  UserCheck,
  Briefcase,
  Target,
  Trophy,
  BarChart3,
  CreditCard,
  Settings,
  HelpCircle,
  Home,
  Search,
  Plus,
  Bell
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const navigationItems = [
  { title: 'Home', url: '/', icon: Home },
  { title: 'Recruiter CRM', url: '/crm', icon: Users },
  { title: 'Referrals', url: '/referrals', icon: UserCheck },
  { title: 'Candidates', url: '/candidates', icon: Users },
  { title: 'Jobs', url: '/jobs', icon: Briefcase },
  { title: 'Campaigns', url: '/campaigns', icon: Target },
  { title: 'Leaderboard', url: '/leaderboard', icon: Trophy },
  { title: 'Analytics', url: '/analytics', icon: BarChart3 },
  { title: 'Finance', url: '/finance', icon: CreditCard },
  { title: 'Admin', url: '/admin', icon: Settings },
  { title: 'Help', url: '/help', icon: HelpCircle },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';

  return (
    <Sidebar className={cn(
      "border-r border-border transition-all duration-300",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-hover rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">R</span>
          </div>
          {!collapsed && (
            <div>
              <h1 className="font-semibold text-foreground">ReferralOS</h1>
              <p className="text-xs text-muted-foreground">Recruiting CRM</p>
            </div>
          )}
        </div>
      </div>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        cn(
                          "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                          "hover:bg-muted text-foreground",
                          isActive && "bg-primary text-primary-foreground hover:bg-primary/90"
                        )
                      }
                    >
                      <item.icon className="h-4 w-4 flex-shrink-0" />
                      {!collapsed && (
                        <span className="text-base font-semibold">{item.title}</span>
                      )}
                      {!collapsed && item.title === 'Finance' && (
                        <Badge variant="outline" className="ml-auto badge-warning">
                          3
                        </Badge>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}