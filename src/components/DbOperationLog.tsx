import React from 'react';
import { DbOperation } from '@/hooks/useProgress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { 
  Database, 
  ArrowDownToLine, 
  ArrowUpFromLine, 
  Trash2,
  HelpCircle,
  Lightbulb
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface DbOperationLogProps {
  operations: DbOperation[];
  onClear: () => void;
}

const operationExplanations: Record<string, string> = {
  SELECT: 'SELECT = "Dammi i dati". È come chiedere al bibliotecario di trovare un libro specifico.',
  UPDATE: 'UPDATE = "Modifica i dati". È come correggere un errore in un documento già salvato.',
  INSERT: 'INSERT = "Aggiungi nuovi dati". È come aggiungere una nuova pagina a un quaderno.',
  DELETE: 'DELETE = "Cancella i dati". È come strappare una pagina dal quaderno.',
};

export const DbOperationLog: React.FC<DbOperationLogProps> = ({
  operations,
  onClear,
}) => {
  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('it-IT', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  const getOperationExplanation = (query: string): string => {
    const op = query.split(' ')[0].toUpperCase();
    return operationExplanations[op] || 'Operazione sul database';
  };

  return (
    <div className="flex h-full flex-col rounded-lg border border-border/50 bg-card">
      {/* Header */}
      <div className="border-b border-border/50 p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Database className="h-4 w-4 text-info" />
            <h3 className="text-sm font-semibold">📜 Log Operazioni</h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClear}
            className="h-7 text-xs text-muted-foreground hover:text-foreground"
          >
            <Trash2 className="mr-1 h-3 w-3" />
            Pulisci
          </Button>
        </div>
        <p className="text-[10px] text-muted-foreground mt-1">
          Qui vedi TUTTE le operazioni che l'app fa sul database in tempo reale
        </p>
      </div>

      {/* Intro tip */}
      <div className="border-b border-border/50 bg-accent/5 p-2">
        <div className="flex items-start gap-2">
          <Lightbulb className="h-3.5 w-3.5 text-accent mt-0.5 shrink-0" />
          <p className="text-[10px] text-muted-foreground">
            <strong className="text-accent">Consiglio:</strong> Clicca "Guadagna +10 XP" e guarda 
            comparire una nuova riga qui. Quella è la "query" che salva i tuoi dati!
          </p>
        </div>
      </div>

      <ScrollArea className="flex-1 p-2">
        {operations.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted/50 mb-3">
              <Database className="h-8 w-8 text-muted-foreground/50" />
            </div>
            <p className="text-sm font-medium text-muted-foreground">
              Nessuna operazione ancora
            </p>
            <p className="mt-2 text-[11px] text-muted-foreground/70 max-w-[200px]">
              Clicca un pulsante a sinistra (es: "Guadagna +10 XP") per vedere 
              le operazioni del database apparire qui!
            </p>
            <div className="mt-4 text-4xl animate-bounce">👈</div>
          </div>
        ) : (
          <div className="space-y-2">
            {operations.map((op, index) => (
              <div
                key={op.id}
                className={cn(
                  'log-entry rounded-lg border bg-muted/30 p-3 transition-all',
                  op.type === 'write' 
                    ? 'log-write border-success/30 hover:border-success/50' 
                    : 'log-read border-info/30 hover:border-info/50',
                  index === 0 && 'animate-slide-up ring-2 ring-offset-2 ring-offset-background',
                  index === 0 && op.type === 'write' ? 'ring-success/50' : 'ring-info/50'
                )}
              >
                {/* Header row */}
                <div className="flex items-center gap-2">
                  <div className={cn(
                    'flex h-6 w-6 items-center justify-center rounded-full',
                    op.type === 'write' ? 'bg-success/20' : 'bg-info/20'
                  )}>
                    {op.type === 'write' ? (
                      <ArrowDownToLine className="h-3.5 w-3.5 text-success" />
                    ) : (
                      <ArrowUpFromLine className="h-3.5 w-3.5 text-info" />
                    )}
                  </div>
                  <div>
                    <span
                      className={cn(
                        'text-[10px] font-bold uppercase block',
                        op.type === 'write' ? 'text-success' : 'text-info'
                      )}
                    >
                      {op.type === 'write' ? 'SCRITTURA' : 'LETTURA'}
                    </span>
                    <span className="text-[9px] text-muted-foreground">
                      {op.type === 'write' 
                        ? 'Dati inviati al database' 
                        : 'Dati ricevuti dal database'}
                    </span>
                  </div>
                  <span className="ml-auto text-[10px] text-muted-foreground bg-muted px-2 py-0.5 rounded">
                    {formatTime(op.timestamp)}
                  </span>
                </div>

                {/* Operation badges */}
                <div className="mt-2 flex items-center gap-1.5 flex-wrap">
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="rounded-full bg-primary/20 px-2 py-0.5 text-[10px] font-semibold text-primary cursor-help">
                          {op.operation}
                        </span>
                      </TooltipTrigger>
                      <TooltipContent side="top" className="max-w-[200px]">
                        <p className="text-xs">{getOperationExplanation(op.query)}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  {op.column && (
                    <span className="rounded-full bg-accent/20 px-2 py-0.5 text-[10px] font-medium text-accent flex items-center gap-1">
                      → colonna: <strong>{op.column}</strong>
                    </span>
                  )}
                </div>

                {/* Query code block */}
                <div className="code-block mt-2 p-2 rounded-md bg-background/80 border border-border/30">
                  <p className="text-[9px] text-muted-foreground/70 mb-1 uppercase tracking-wide">
                    Query SQL (quello che si fa in un vero database):
                  </p>
                  <code className="text-[10px] leading-relaxed text-foreground/80 font-mono break-all">
                    {op.query}
                  </code>
                </div>

                {/* Beginner explanation for first item */}
                {index === 0 && (
                  <div className="mt-2 rounded-md bg-accent/10 border border-accent/20 p-2">
                    <p className="text-[9px] text-accent">
                      💡 <strong>Questa è l'ultima operazione!</strong> È apparsa perché hai appena 
                      interagito con l'app. Il codice simile a questo viene eseguito ogni volta.
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </ScrollArea>

      {/* Legend - più esplicativa */}
      <div className="border-t border-border/50 p-3">
        <p className="text-[9px] text-muted-foreground/70 text-center mb-2">
          Cosa significano i colori:
        </p>
        <div className="flex items-center justify-center gap-6 text-[10px]">
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-1.5 cursor-help">
                  <div className="h-3 w-3 rounded-full bg-success" />
                  <span className="text-success font-medium">Scrittura</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">Dati salvati nel database (UPDATE, INSERT)</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-1.5 cursor-help">
                  <div className="h-3 w-3 rounded-full bg-info" />
                  <span className="text-info font-medium">Lettura</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">Dati letti dal database (SELECT)</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
};
