import React, { useState, useEffect } from 'react';
import { UserProgress, DbOperation } from '@/hooks/useProgress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BeginnerTooltip } from '@/components/BeginnerTooltip';
import { 
  Monitor, 
  Server, 
  Database, 
  ArrowRight,
  ArrowLeft,
  Info,
  HelpCircle,
  Smartphone,
  Cloud,
  HardDrive,
  Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface DatabaseSimulatorProps {
  progress: UserProgress | null;
  latestOperation: DbOperation | null;
}

interface Particle {
  id: string;
  type: 'read' | 'write';
}

export const DatabaseSimulator: React.FC<DatabaseSimulatorProps> = ({
  progress,
  latestOperation,
}) => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [highlightedColumn, setHighlightedColumn] = useState<string | null>(null);

  // Trigger particle animation when operation occurs
  useEffect(() => {
    if (latestOperation) {
      const newParticle: Particle = {
        id: latestOperation.id,
        type: latestOperation.type,
      };
      
      setParticles(prev => [...prev, newParticle]);
      
      if (latestOperation.column) {
        setHighlightedColumn(latestOperation.column);
      }

      setTimeout(() => {
        setParticles(prev => prev.filter(p => p.id !== newParticle.id));
      }, 1500);

      setTimeout(() => {
        setHighlightedColumn(null);
      }, 2000);
    }
  }, [latestOperation]);

  const columns = [
    { key: 'id', label: 'id', value: progress?.id.slice(0, 8) + '...' || '-', description: 'Identificatore unico (come un codice fiscale per i dati)' },
    { key: 'user_id', label: 'user_id', value: progress?.user_id.slice(0, 8) + '...' || '-', description: 'ID dell\'utente proprietario di questi dati' },
    { key: 'level', label: 'level', value: progress?.level || '-', description: 'Il tuo livello attuale' },
    { key: 'xp', label: 'xp', value: progress?.xp || '-', description: 'I tuoi punti esperienza' },
    { key: 'lessons_completed', label: 'lessons', value: progress?.lessons_completed || '-', description: 'Lezioni completate' },
    { key: 'total_lessons', label: 'total', value: progress?.total_lessons || '-', description: 'Totale lezioni disponibili' },
  ];

  return (
    <Card className="overflow-hidden border-border/50">
      <CardHeader className="border-b border-border/50 pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-base">
            <Database className="h-4 w-4 text-info" />
            🗄️ Simulatore Database
          </CardTitle>
          <span className="text-[10px] px-2 py-1 rounded-full bg-info/20 text-info">
            Visualizzazione in tempo reale
          </span>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          Guarda come i tuoi dati viaggiano dal browser al "database" e viceversa
        </p>
      </CardHeader>
      <CardContent className="p-4 space-y-6">
        {/* Spiegazione iniziale */}
        <div className="rounded-lg border border-accent/30 bg-accent/5 p-3">
          <div className="flex items-start gap-2">
            <Zap className="h-4 w-4 text-accent mt-0.5 shrink-0" />
            <div className="text-xs text-muted-foreground">
              <strong className="text-accent">Prova ora!</strong> Clicca "Guadagna +10 XP" e osserva le 
              <span className="text-success font-medium"> palline verdi</span> che viaggiano verso destra. 
              Quelle rappresentano i tuoi dati che vanno a salvarsi!
            </div>
          </div>
        </div>

        {/* Data Flow Diagram - più esplicativo */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              🚀 Viaggio dei Dati
            </h4>
          </div>
          <div className="relative flex items-center justify-between rounded-lg bg-muted/30 p-4 border border-border/50">
            {/* Frontend */}
            <div className="diagram-node flex flex-col items-center gap-2 relative">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-info/20 border-2 border-info/30">
                <Smartphone className="h-7 w-7 text-info" />
              </div>
              <div className="text-center">
                <span className="text-xs font-semibold block">Il tuo Browser</span>
                <span className="text-[9px] text-muted-foreground">Dove vedi l'app</span>
              </div>
            </div>

            {/* Arrow 1 with explanation */}
            <div className="relative flex-1 mx-3">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
                <span className="text-[9px] text-success bg-success/10 px-2 py-0.5 rounded-full">
                  SCRITTURA →
                </span>
              </div>
              <div className="h-1 w-full bg-gradient-to-r from-info/30 via-accent/50 to-accent/30 rounded-full" />
              <ArrowRight className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 text-accent" />
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
                <span className="text-[9px] text-info bg-info/10 px-2 py-0.5 rounded-full">
                  ← LETTURA
                </span>
              </div>
              
              {/* Particles */}
              {particles.map(particle => (
                <div
                  key={particle.id}
                  className={cn(
                    'absolute top-1/2 -translate-y-1/2 h-3 w-3 rounded-full shadow-lg',
                    particle.type === 'write' 
                      ? 'bg-success particle-write shadow-success/50' 
                      : 'bg-info particle-read shadow-info/50'
                  )}
                />
              ))}
            </div>

            {/* API/Logic */}
            <div className="diagram-node flex flex-col items-center gap-2">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-accent/20 border-2 border-accent/30">
                <Cloud className="h-7 w-7 text-accent" />
              </div>
              <div className="text-center">
                <span className="text-xs font-semibold block">Logica App</span>
                <span className="text-[9px] text-muted-foreground">Processa i dati</span>
              </div>
            </div>

            {/* Arrow 2 */}
            <div className="relative flex-1 mx-3">
              <div className="h-1 w-full bg-gradient-to-r from-accent/30 via-success/50 to-success/30 rounded-full" />
              <ArrowRight className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 text-success" />
              
              {/* Particles */}
              {particles.map(particle => (
                <div
                  key={`${particle.id}-2`}
                  className={cn(
                    'absolute top-1/2 -translate-y-1/2 h-3 w-3 rounded-full shadow-lg',
                    particle.type === 'write' 
                      ? 'bg-success particle-write shadow-success/50' 
                      : 'bg-info particle-read shadow-info/50'
                  )}
                  style={{ animationDelay: '0.2s' }}
                />
              ))}
            </div>

            {/* Database */}
            <div className="diagram-node flex flex-col items-center gap-2">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-success/20 border-2 border-success/30">
                <HardDrive className="h-7 w-7 text-success" />
              </div>
              <div className="text-center">
                <span className="text-xs font-semibold block">Database</span>
                <span className="text-[9px] text-muted-foreground">Salva i dati</span>
              </div>
            </div>
          </div>
        </div>

        {/* Database Table Visualization */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              📋 La Tua Tabella nel Database
            </h4>
            <span className="text-[9px] px-2 py-0.5 rounded bg-muted text-muted-foreground">
              user_progress
            </span>
          </div>
          <div className="overflow-x-auto rounded-lg border border-border/50">
            <table className="db-table w-full">
              <thead>
                <tr className="border-b border-border/50 bg-muted/50">
                  {columns.map(col => (
                    <th
                      key={col.key}
                      className="px-2 py-2 text-left text-[10px] font-mono font-medium text-muted-foreground"
                      title={col.description}
                    >
                      {col.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="bg-card/50">
                  {columns.map(col => (
                    <td
                      key={col.key}
                      className={cn(
                        'db-cell px-2 py-2.5 text-xs font-mono transition-all duration-300',
                        highlightedColumn === col.key && 'db-cell-write shimmer-effect bg-success/20 text-success font-bold'
                      )}
                    >
                      {col.value}
                      {highlightedColumn === col.key && (
                        <span className="ml-1 text-[9px] animate-pulse">✨</span>
                      )}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-[10px] text-muted-foreground text-center">
            👆 Questa è UNA riga della tabella. Ogni utente ha la sua riga con i propri dati.
          </p>
        </div>

        {/* Legend - più dettagliata */}
        <div className="rounded-lg border border-border/50 bg-gradient-to-br from-muted/30 to-muted/10 p-4">
          <div className="flex items-center gap-2 mb-3">
            <Info className="h-4 w-4 text-info" />
            <span className="text-xs font-semibold">📚 Legenda - Cosa significano i colori?</span>
          </div>
          <div className="grid gap-3">
            <div className="flex items-start gap-3 p-2 rounded-md bg-success/5 border border-success/20">
              <div className="h-4 w-4 rounded-full bg-success animate-pulse mt-0.5" />
              <div>
                <span className="text-xs font-medium text-success block">
                  Pallina VERDE = SCRITTURA
                </span>
                <span className="text-[10px] text-muted-foreground">
                  I dati vanno DAL browser AL database per essere salvati. Es: quando guadagni XP.
                </span>
              </div>
            </div>
            <div className="flex items-start gap-3 p-2 rounded-md bg-info/5 border border-info/20">
              <div className="h-4 w-4 rounded-full bg-info animate-pulse mt-0.5" />
              <div>
                <span className="text-xs font-medium text-info block">
                  Pallina BLU = LETTURA
                </span>
                <span className="text-[10px] text-muted-foreground">
                  I dati vanno DAL database AL browser per essere mostrati. Es: quando carichi la pagina.
                </span>
              </div>
            </div>
            <div className="flex items-start gap-3 p-2 rounded-md bg-accent/5 border border-accent/20">
              <div className="h-4 w-8 rounded bg-success/50 shimmer-effect mt-0.5" />
              <div>
                <span className="text-xs font-medium text-accent block">
                  Cella che LAMPEGGIA = Appena modificata
                </span>
                <span className="text-[10px] text-muted-foreground">
                  La colonna si illumina per mostrarti quale dato è stato appena aggiornato.
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
