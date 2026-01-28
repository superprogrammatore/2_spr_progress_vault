import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  RotateCcw,
  CheckCircle,
  Circle
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Step {
  title: string;
  description: string;
  icon?: React.ReactNode;
  codeExample?: string;
  tip?: string;
}

interface StepByStepGuideProps {
  title: string;
  description?: string;
  steps: Step[];
  variant?: 'info' | 'success' | 'accent';
}

const variantStyles = {
  info: {
    active: 'border-info bg-info/10',
    icon: 'bg-info text-info-foreground',
    dot: 'bg-info',
  },
  success: {
    active: 'border-success bg-success/10',
    icon: 'bg-success text-success-foreground',
    dot: 'bg-success',
  },
  accent: {
    active: 'border-accent bg-accent/10',
    icon: 'bg-accent text-accent-foreground',
    dot: 'bg-accent',
  },
};

export const StepByStepGuide: React.FC<StepByStepGuideProps> = ({
  title,
  description,
  steps,
  variant = 'info',
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const goToStep = (step: number) => {
    if (step >= 0 && step < steps.length) {
      setCurrentStep(step);
    }
  };

  const handleAutoPlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      return;
    }
    
    setIsPlaying(true);
    setCurrentStep(0);
    
    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step >= steps.length) {
        clearInterval(interval);
        setIsPlaying(false);
      } else {
        setCurrentStep(step);
      }
    }, 2000);
  };

  const reset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };

  return (
    <Card className="border-border/50 overflow-hidden">
      <CardHeader className="pb-3 border-b border-border/50">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base">{title}</CardTitle>
            {description && (
              <p className="text-xs text-muted-foreground mt-1">{description}</p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-8 gap-1.5"
              onClick={handleAutoPlay}
            >
              <Play className={cn("h-3.5 w-3.5", isPlaying && "animate-pulse")} />
              {isPlaying ? 'Stop' : 'Auto'}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={reset}
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        {/* Progress dots */}
        <div className="flex items-center justify-center gap-2 mb-4">
          {steps.map((_, index) => (
            <button
              key={index}
              onClick={() => goToStep(index)}
              className={cn(
                'h-2.5 w-2.5 rounded-full transition-all',
                index === currentStep
                  ? variantStyles[variant].dot + ' scale-125'
                  : index < currentStep
                  ? 'bg-muted-foreground/50'
                  : 'bg-border'
              )}
            />
          ))}
        </div>

        {/* Current step */}
        <div className={cn(
          'rounded-lg border-2 p-4 transition-all animate-scale-in',
          variantStyles[variant].active
        )}>
          <div className="flex items-start gap-3">
            <div className={cn(
              'flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold',
              variantStyles[variant].icon
            )}>
              {currentStep + 1}
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-sm">{steps[currentStep].title}</h4>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                {steps[currentStep].description}
              </p>
              
              {steps[currentStep].codeExample && (
                <div className="mt-3 rounded-md bg-background/80 border border-border/50 p-2">
                  <code className="text-[10px] font-mono text-muted-foreground whitespace-pre-wrap">
                    {steps[currentStep].codeExample}
                  </code>
                </div>
              )}
              
              {steps[currentStep].tip && (
                <div className="mt-3 rounded-md bg-accent/10 border border-accent/20 p-2">
                  <p className="text-[10px] text-accent">
                    💡 <strong>Consiglio:</strong> {steps[currentStep].tip}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-4">
          <Button
            variant="outline"
            size="sm"
            disabled={currentStep === 0}
            onClick={() => goToStep(currentStep - 1)}
            className="gap-1"
          >
            <ChevronLeft className="h-4 w-4" />
            Precedente
          </Button>
          <span className="text-xs text-muted-foreground">
            {currentStep + 1} di {steps.length}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={currentStep === steps.length - 1}
            onClick={() => goToStep(currentStep + 1)}
            className="gap-1"
          >
            Successivo
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Steps overview */}
        <div className="mt-4 pt-4 border-t border-border/50">
          <p className="text-[10px] uppercase tracking-wide text-muted-foreground mb-2">
            Tutti i passaggi:
          </p>
          <div className="space-y-1.5">
            {steps.map((step, index) => (
              <button
                key={index}
                onClick={() => goToStep(index)}
                className={cn(
                  'w-full flex items-center gap-2 p-2 rounded-md text-left transition-colors',
                  index === currentStep
                    ? 'bg-muted'
                    : 'hover:bg-muted/50'
                )}
              >
                {index <= currentStep ? (
                  <CheckCircle className={cn(
                    'h-3.5 w-3.5',
                    index === currentStep ? 'text-info' : 'text-success'
                  )} />
                ) : (
                  <Circle className="h-3.5 w-3.5 text-muted-foreground/50" />
                )}
                <span className={cn(
                  'text-xs',
                  index === currentStep ? 'font-medium' : 'text-muted-foreground'
                )}>
                  {step.title}
                </span>
              </button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
