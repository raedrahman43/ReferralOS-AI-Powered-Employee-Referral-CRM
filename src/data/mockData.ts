import { User, Candidate, Job, Referral, Activity, Task, Campaign } from '@/types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    email: 'sarah.chen@company.com',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
    role: 'recruiter',
    department: 'Talent',
    team: 'Engineering Recruiting'
  },
  {
    id: '2',
    name: 'Marcus Rodriguez',
    email: 'marcus.r@company.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    role: 'employee',
    department: 'Engineering',
    team: 'Backend Platform'
  },
  {
    id: '3',
    name: 'Emily Watson',
    email: 'emily.watson@company.com',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    role: 'hiring_manager',
    department: 'Engineering',
    team: 'Frontend'
  }
];

export const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Senior Frontend Engineer',
    reqId: 'ENG-2024-001',
    department: 'Engineering',
    hiringManagerId: '3',
    hiringManager: mockUsers[2],
    location: 'San Francisco, CA',
    headcount: 2,
    bounty: 5000,
    status: 'open',
    description: 'We are looking for a senior frontend engineer to join our team.',
    requirements: ['React', 'TypeScript', '5+ years experience'],
    sla: {
      screen: 3,
      interview: 7,
      offer: 14
    },
    createdAt: new Date('2024-01-15')
  },
  {
    id: '2',
    title: 'Product Manager',
    reqId: 'PM-2024-003',
    department: 'Product',
    hiringManagerId: '3',
    location: 'Remote',
    headcount: 1,
    bounty: 3000,
    status: 'open',
    sla: {
      screen: 5,
      interview: 10,
      offer: 21
    },
    createdAt: new Date('2024-01-20')
  }
];

export const mockCandidates: Candidate[] = [
  {
    id: '1',
    name: 'Alex Thompson',
    email: 'alex.thompson@gmail.com',
    phone: '+1-555-0123',
    currentTitle: 'Senior Software Engineer',
    currentCompany: 'TechCorp',
    location: 'San Francisco, CA',
    linkedinUrl: 'https://linkedin.com/in/alexthompson',
    tags: ['React', 'TypeScript', 'Node.js'],
    status: 'screen',
    scores: {
      fit: 92,
      relationship: 85
    },
    referrerId: '2',
    referrer: mockUsers[1],
    jobId: '1',
    job: mockJobs[0],
    ownerId: '1',
    owner: mockUsers[0],
    lastActivity: new Date('2024-01-25'),
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-25')
  },
  {
    id: '2',
    name: 'Jordan Kim',
    email: 'jordan.kim@example.com',
    currentTitle: 'Product Manager',
    currentCompany: 'StartupXYZ',
    location: 'New York, NY',
    tags: ['Product Strategy', 'B2B SaaS', 'Analytics'],
    status: 'new',
    scores: {
      fit: 88,
      relationship: 70
    },
    referrerId: '2',
    referrer: mockUsers[1],
    jobId: '2',
    lastActivity: new Date('2024-01-24'),
    createdAt: new Date('2024-01-24'),
    updatedAt: new Date('2024-01-24')
  },
  {
    id: '3',
    name: 'Taylor Brown',
    email: 'taylor.brown@company.com',
    currentTitle: 'Frontend Developer',
    currentCompany: 'WebTech Solutions',
    location: 'Austin, TX',
    tags: ['Vue.js', 'CSS', 'UX'],
    status: 'hm_review',
    scores: {
      fit: 78,
      relationship: 90
    },
    referrerId: '2',
    jobId: '1',
    lastActivity: new Date('2024-01-23'),
    createdAt: new Date('2024-01-18'),
    updatedAt: new Date('2024-01-23')
  }
];

export const mockReferrals: Referral[] = [
  {
    id: '1',
    candidateId: '1',
    candidate: mockCandidates[0],
    referrerId: '2',
    referrer: mockUsers[1],
    jobId: '1',
    job: mockJobs[0],
    relationship: 'Former colleague at TechCorp, worked together for 2 years',
    status: 'accepted',
    bonusAmount: 5000,
    bonusStatus: 'pending',
    submittedAt: new Date('2024-01-20')
  },
  {
    id: '2',
    candidateId: '2',
    candidate: mockCandidates[1],
    referrerId: '2',
    referrer: mockUsers[1],
    jobId: '2',
    relationship: 'University friend, strong product background',
    status: 'pending',
    submittedAt: new Date('2024-01-24')
  }
];

export const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'note',
    candidateId: '1',
    userId: '1',
    user: mockUsers[0],
    title: 'Initial screening call completed',
    description: 'Great technical background, strong communication skills. Moving to next round.',
    createdAt: new Date('2024-01-25')
  },
  {
    id: '2',
    type: 'email',
    candidateId: '1',
    userId: '1',
    title: 'Follow-up email sent',
    description: 'Sent technical assessment details',
    createdAt: new Date('2024-01-24')
  }
];

export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Schedule technical interview',
    description: 'Coordinate with hiring manager for Alex Thompson',
    assignedTo: '1',
    assignee: mockUsers[0],
    candidateId: '1',
    candidate: mockCandidates[0],
    dueDate: new Date('2024-01-28'),
    completed: false,
    priority: 'high',
    createdAt: new Date('2024-01-25')
  },
  {
    id: '2',
    title: 'Review Jordan Kim resume',
    assignedTo: '1',
    dueDate: new Date('2024-01-26'),
    completed: false,
    priority: 'medium',
    createdAt: new Date('2024-01-24')
  }
];

export const mockCampaigns: Campaign[] = [
  {
    id: '1',
    name: 'Q1 Engineering Push',
    description: 'Focused hiring campaign for engineering roles',
    targetAudience: {
      departments: ['Engineering'],
      locations: ['San Francisco', 'Remote']
    },
    jobIds: ['1'],
    jobs: [mockJobs[0]],
    message: 'Help us grow the engineering team! $5K bonus for successful hires.',
    incentive: '$5,000 referral bonus',
    status: 'active',
    metrics: {
      sent: 245,
      opened: 180,
      referrals: 12,
      hires: 2
    },
    createdAt: new Date('2024-01-15'),
    scheduledAt: new Date('2024-01-15')
  }
];

export const statusConfig = {
  new: { label: 'New', color: 'bg-blue-100 text-blue-800' },
  screen: { label: 'Screen', color: 'bg-yellow-100 text-yellow-800' },
  hm_review: { label: 'HM Review', color: 'bg-purple-100 text-purple-800' },
  onsite: { label: 'Onsite', color: 'bg-orange-100 text-orange-800' },
  offer: { label: 'Offer', color: 'bg-green-100 text-green-800' },
  hired: { label: 'Hired', color: 'bg-emerald-100 text-emerald-800' },
  rejected: { label: 'Rejected', color: 'bg-red-100 text-red-800' }
};

export const stageOrder = ['new', 'screen', 'hm_review', 'onsite', 'offer', 'hired', 'rejected'];