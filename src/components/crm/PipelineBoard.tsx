import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Clock, Target, TrendingUp } from 'lucide-react';
import { Candidate } from '@/types';
import { mockCandidates, statusConfig, stageOrder } from '@/data/mockData';
import { cn } from '@/lib/utils';

interface CandidateCardProps {
  candidate: Candidate;
  onClick: (candidate: Candidate) => void;
}

function CandidateCard({ candidate, onClick }: CandidateCardProps) {
  const daysSinceActivity = candidate.lastActivity 
    ? Math.floor((Date.now() - candidate.lastActivity.getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  return (
    <Card 
      className="card-soft hover-lift cursor-pointer mb-3 animate-fade-in"
      onClick={() => onClick(candidate)}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h4 className="font-medium text-foreground">{candidate.name}</h4>
            <p className="text-sm text-muted-foreground">
              {candidate.currentTitle} at {candidate.currentCompany}
            </p>
          </div>
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <Avatar className="h-6 w-6">
            <AvatarImage src={candidate.referrer?.avatar} />
            <AvatarFallback className="text-xs">
              {candidate.referrer?.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <span className="text-xs text-muted-foreground">
            {candidate.referrer?.name}
          </span>
        </div>

        <div className="flex items-center justify-between mb-3">
          <div className="flex gap-2">
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

        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">
            {candidate.job?.title}
          </span>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock className="h-3 w-3" />
            {daysSinceActivity}d ago
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mt-2">
          {candidate.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

interface PipelineBoardProps {
  onCandidateClick: (candidate: Candidate) => void;
}

export function PipelineBoard({ onCandidateClick }: PipelineBoardProps) {
  const [candidates] = useState(mockCandidates);

  const candidatesByStage = stageOrder.reduce((acc, stage) => {
    acc[stage] = candidates.filter(c => c.status === stage);
    return acc;
  }, {} as Record<string, Candidate[]>);

  return (
    <div className="flex gap-6 overflow-x-auto pb-4">
      {stageOrder.map((stage) => {
        const stageCandidates = candidatesByStage[stage] || [];
        const config = statusConfig[stage as keyof typeof statusConfig];
        
        return (
          <div key={stage} className="flex-shrink-0 w-80">
            <div className="mb-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <div className={cn("h-3 w-3 rounded-full", 
                    stage === 'new' && "bg-blue-500",
                    stage === 'screen' && "bg-yellow-500", 
                    stage === 'hm_review' && "bg-purple-500",
                    stage === 'onsite' && "bg-orange-500",
                    stage === 'offer' && "bg-green-500",
                    stage === 'hired' && "bg-emerald-500",
                    stage === 'rejected' && "bg-red-500"
                  )} />
                  {config.label}
                </h3>
                <Badge variant="secondary">
                  {stageCandidates.length}
                </Badge>
              </div>
            </div>

            <div className="space-y-3 min-h-[400px]">
              {stageCandidates.map((candidate) => (
                <CandidateCard
                  key={candidate.id}
                  candidate={candidate}
                  onClick={onCandidateClick}
                />
              ))}
              
              {stageCandidates.length === 0 && (
                <div className="text-center text-muted-foreground py-8">
                  <p className="text-sm">No candidates in this stage</p>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}