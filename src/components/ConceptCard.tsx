import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, Lightbulb, BookOpen, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ConceptCardProps {
  title: string;
  icon?: React.ReactNode;
  shortExplanation: string;
  fullExplanation?: string;
  realWorldExample?: string;
  variant?: 'info' | 'success' | 'accent' | 'warning';
  defaultExpanded?: boolean;
}

const variantStyles = {
  info: 'border-info/30 bg-info/5',
  success: 'border-success/30 bg-success/5',
  accent: 'border-accent/30 bg-accent/5',
  warning: 'border-warning/30 bg-warning/5',
};

const iconBgStyles = {
  info: 'bg-info/20 text-info',
  success: 'bg-success/20 text-success',
  accent: 'bg-accent/20 text-accent',
  warning: 'bg-warning/20 text-warning',
};

export const ConceptCard: React.FC<ConceptCardProps> = ({
  title,
  icon,
  shortExplanation,
  fullExplanation,
  realWorldExample,
  variant = 'info',
  defaultExpanded = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <Card className={cn('overflow-hidden transition-all', variantStyles[variant])}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className={cn('flex h-10 w-10 shrink-0 items-center justify-center rounded-lg', iconBgStyles[variant])}>
            {icon || <Lightbulb className="h-5 w-5" />}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <h4 className="font-semibold text-sm">{title}</h4>
              {(fullExplanation || realWorldExample) && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 px-2 text-xs"
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  {isExpanded ? (
                    <>
                      Nascondi <ChevronUp className="ml-1 h-3 w-3" />
                    </>
                  ) : (
                    <>
                      Approfondisci <ChevronDown className="ml-1 h-3 w-3" />
                    </>
                  )}
                </Button>
              )}
            </div>
            <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
              {shortExplanation}
            </p>
            
            {isExpanded && (
              <div className="mt-3 space-y-3 animate-fade-in">
                {fullExplanation && (
                  <div className="rounded-lg bg-background/50 p-3 border border-border/30">
                    <div className="flex items-center gap-2 mb-2">
                      <BookOpen className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                        Spiegazione dettagliata
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {fullExplanation}
                    </p>
                  </div>
                )}
                
                {realWorldExample && (
                  <div className="rounded-lg bg-accent/10 p-3 border border-accent/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="h-3.5 w-3.5 text-accent" />
                      <span className="text-[10px] font-medium uppercase tracking-wide text-accent">
                        Esempio nella vita reale
                      </span>
                    </div>
                    <p className="text-xs text-accent/90 leading-relaxed">
                      {realWorldExample}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
