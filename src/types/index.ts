export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'recruiter' | 'employee' | 'hiring_manager' | 'finance' | 'admin';
  department?: string;
  team?: string;
}

export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone?: string;
  currentTitle?: string;
  currentCompany?: string;
  location?: string;
  linkedinUrl?: string;
  resumeUrl?: string;
  tags: string[];
  status: 'new' | 'screen' | 'hm_review' | 'onsite' | 'offer' | 'hired' | 'rejected';
  scores: {
    fit: number;
    relationship: number;
  };
  referrerId?: string;
  referrer?: User;
  jobId?: string;
  job?: Job;
  ownerId?: string;
  owner?: User;
  lastActivity?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Job {
  id: string;
  title: string;
  reqId: string;
  department: string;
  hiringManagerId: string;
  hiringManager?: User;
  location: string;
  headcount: number;
  bounty: number;
  status: 'open' | 'paused' | 'closed';
  description?: string;
  requirements?: string[];
  sla: {
    screen: number; // days
    interview: number;
    offer: number;
  };
  createdAt: Date;
}

export interface Referral {
  id: string;
  candidateId: string;
  candidate?: Candidate;
  referrerId: string;
  referrer?: User;
  jobId?: string;
  job?: Job;
  relationship: string;
  notes?: string;
  status: 'pending' | 'accepted' | 'rejected';
  bonusAmount?: number;
  bonusStatus?: 'pending' | 'approved' | 'paid';
  submittedAt: Date;
}

export interface Activity {
  id: string;
  type: 'note' | 'email' | 'call' | 'task' | 'stage_change' | 'interview';
  candidateId?: string;
  userId: string;
  user?: User;
  title: string;
  description?: string;
  metadata?: Record<string, any>;
  createdAt: Date;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  assignedTo: string;
  assignee?: User;
  candidateId?: string;
  candidate?: Candidate;
  dueDate?: Date;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
}

export interface Campaign {
  id: string;
  name: string;
  description?: string;
  targetAudience: {
    departments?: string[];
    locations?: string[];
    teams?: string[];
  };
  jobIds: string[];
  jobs?: Job[];
  message: string;
  incentive?: string;
  status: 'draft' | 'active' | 'paused' | 'completed';
  metrics: {
    sent: number;
    opened: number;
    referrals: number;
    hires: number;
  };
  createdAt: Date;
  scheduledAt?: Date;
}

export interface Analytics {
  timeToFirstTouch: number;
  referralToInterviewRate: number;
  referralToHireRate: number;
  costPerHire: number;
  totalReferrals: number;
  totalHires: number;
  slaBreach: number;
  period: string;
}