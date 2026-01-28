import React, { useState } from 'react';
import { HelpCircle } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface BeginnerTooltipProps {
  term: string;
  explanation: string;
  analogy?: string;
  children?: React.ReactNode;
  className?: string;
}

export const BeginnerTooltip: React.FC<BeginnerTooltipProps> = ({
  term,
  explanation,
  analogy,
  children,
  className,
}) => {
  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className={cn(
            'inline-flex items-center gap-1 cursor-help border-b border-dashed border-info/50 text-info',
            className
          )}>
            {children || term}
            <HelpCircle className="h-3 w-3" />
          </span>
        </TooltipTrigger>
        <TooltipContent 
          side="top" 
          className="max-w-xs p-3 bg-card border-border/50"
        >
          <div className="space-y-2">
            <p className="font-medium text-sm text-foreground">{term}</p>
            <p className="text-xs text-muted-foreground">{explanation}</p>
            {analogy && (
              <div className="rounded-md bg-accent/10 p-2 mt-2">
                <p className="text-[10px] text-accent font-medium">💡 Pensa a...</p>
                <p className="text-xs text-accent/90">{analogy}</p>
              </div>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
