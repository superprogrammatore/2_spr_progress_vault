import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HelpCircle, Database } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface ProgressCardProps {
  title: string;
  value: number | string;
  subtitle?: string;
  icon: React.ReactNode;
  column: string;
  variant?: 'default' | 'success' | 'accent' | 'info';
  progress?: number;
  maxProgress?: number;
  explanation?: string;
}

const variantStyles = {
  default: 'border-border/50',
  success: 'border-success/30 gradient-success',
  accent: 'border-accent/30 gradient-accent',
  info: 'border-info/30 gradient-info',
};

const iconStyles = {
  default: 'bg-muted text-foreground',
  success: 'bg-success/20 text-success',
  accent: 'bg-accent/20 text-accent',
  info: 'bg-info/20 text-info',
};

const columnExplanations: Record<string, string> = {
  level: 'Questa è la colonna "level" nella tabella. Quando sali di livello, facciamo: UPDATE user_progress SET level = nuovo_valore',
  xp: 'Questa è la colonna "xp". Ogni volta che guadagni punti: UPDATE user_progress SET xp = xp + 10',
  lessons_completed: 'Colonna "lessons_completed". Quando completi una lezione: UPDATE user_progress SET lessons_completed = lessons_completed + 1',
};

export const ProgressCard: React.FC<ProgressCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  column,
  variant = 'default',
  progress,
  maxProgress,
  explanation,
}) => {
  const showProgress = progress !== undefined && maxProgress !== undefined;
  const progressPercent = showProgress ? Math.min((progress / maxProgress) * 100, 100) : 0;

  return (
    <Card className={cn(
      'relative overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-lg',
      variantStyles[variant]
    )}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-1.5">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {title}
          </CardTitle>
          {explanation && (
            <TooltipProvider delayDuration={100}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="text-muted-foreground/50 hover:text-muted-foreground transition-colors">
                    <HelpCircle className="h-3.5 w-3.5" />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-[200px] p-2">
                  <p className="text-xs">{explanation}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        <div className={cn('rounded-lg p-2', iconStyles[variant])}>
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold tracking-tight">{value}</div>
        {subtitle && (
          <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>
        )}
        
        {showProgress && (
          <div className="mt-3">
            <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
              <div
                className={cn(
                  'h-full transition-all duration-700 ease-out progress-animated',
                  variant === 'success' && 'bg-success',
                  variant === 'accent' && 'bg-accent',
                  variant === 'info' && 'bg-info',
                  variant === 'default' && 'bg-primary',
                )}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              {progress} / {maxProgress}
            </p>
          </div>
        )}

        {/* Database column indicator - più esplicativo */}
        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="mt-4 flex items-center gap-2 rounded-md border border-border/50 bg-muted/30 px-2 py-1.5 cursor-help hover:bg-muted/50 transition-colors">
                <Database className="h-3 w-3 text-info" />
                <div className="flex items-center gap-1">
                  <span className="font-mono text-[10px] text-muted-foreground">
                    Salvato in:
                  </span>
                  <code className="rounded bg-info/20 px-1.5 py-0.5 text-[10px] font-mono text-info font-semibold">
                    {column}
                  </code>
                </div>
              </div>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="max-w-[250px] p-3">
              <div className="space-y-2">
                <p className="font-medium text-xs">📍 Dove viene salvato?</p>
                <p className="text-[10px] text-muted-foreground">
                  {columnExplanations[column] || `Questo valore viene salvato nella colonna "${column}" della tabella del database.`}
                </p>
                <div className="rounded bg-muted p-2 mt-2">
                  <code className="text-[9px] font-mono text-muted-foreground">
                    tabella: user_progress<br/>
                    colonna: {column}
                  </code>
                </div>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardContent>
    </Card>
  );
};
