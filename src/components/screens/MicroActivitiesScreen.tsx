'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MICRO_ACTIVITIES } from '@/lib/constants';
import { ArrowLeft, Play, CheckCircle2, Droplet, Wind, Volume2, Move, Maximize2, Footprints, Hand } from 'lucide-react';

interface MicroActivitiesScreenProps {
  onBack: () => void;
}

export default function MicroActivitiesScreen({ onBack }: MicroActivitiesScreenProps) {
  const [completedActivities, setCompletedActivities] = useState<string[]>([]);
  const [activeActivity, setActiveActivity] = useState<string | null>(null);
  const [timer, setTimer] = useState<number>(0);

  const iconMap: Record<string, any> = {
    Droplet,
    Wind,
    Volume2,
    Move,
    Maximize2,
    Footprints,
    Hand
  };

  const startActivity = (activityId: string) => {
    const activity = MICRO_ACTIVITIES.find(a => a.id === activityId);
    if (!activity) return;

    setActiveActivity(activityId);
    setTimer(activity.duration);

    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          setCompletedActivities(prev => [...prev, activityId]);
          setActiveActivity(null);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const categoryColors = {
    hydration: 'from-blue-400 to-cyan-400',
    sensory: 'from-purple-400 to-pink-400',
    movement: 'from-green-400 to-emerald-400',
    breathing: 'from-orange-400 to-red-400'
  };

  const categoryLabels = {
    hydration: 'Hidratação',
    sensory: 'Sensorial',
    movement: 'Movimento',
    breathing: 'Respiração'
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-teal-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button
            onClick={onBack}
            variant="ghost"
            className="gap-2"
          >
            <ArrowLeft className="h-5 w-5" />
            Voltar
          </Button>
        </div>

        <div className="text-center space-y-2">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
            Micro-Atividades
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Pequenas ações que fazem grande diferença. Comece com uma de cada vez.
          </p>
        </div>

        {/* Progresso do Dia */}
        <Card className="p-6 bg-gradient-to-r from-green-100 to-teal-100 border-none">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Progresso de Hoje</h3>
              <p className="text-sm text-gray-600">
                {completedActivities.length} de {MICRO_ACTIVITIES.length} atividades concluídas
              </p>
            </div>
            <div className="text-4xl font-bold text-green-600">
              {completedActivities.length}/{MICRO_ACTIVITIES.length}
            </div>
          </div>
          <div className="mt-4 h-3 bg-white/50 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-green-500 to-teal-500 transition-all duration-500"
              style={{ width: `${(completedActivities.length / MICRO_ACTIVITIES.length) * 100}%` }}
            />
          </div>
        </Card>

        {/* Atividade Ativa */}
        {activeActivity && (
          <Card className="p-6 bg-gradient-to-r from-yellow-100 to-orange-100 border-none animate-pulse">
            {(() => {
              const activity = MICRO_ACTIVITIES.find(a => a.id === activeActivity);
              if (!activity) return null;
              const Icon = iconMap[activity.icon];

              return (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-orange-400 flex items-center justify-center">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">{activity.title}</h3>
                      <p className="text-sm text-gray-600">{activity.description}</p>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-orange-600">{timer}s</div>
                    <p className="text-xs text-gray-600">restantes</p>
                  </div>
                </div>
              );
            })()}
          </Card>
        )}

        {/* Grid de Atividades */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {MICRO_ACTIVITIES.map(activity => {
            const Icon = iconMap[activity.icon];
            const isCompleted = completedActivities.includes(activity.id);
            const isActive = activeActivity === activity.id;

            return (
              <Card
                key={activity.id}
                className={`p-4 transition-all duration-300 ${
                  isCompleted ? 'bg-green-50 border-green-300' : 'hover:shadow-xl transform hover:-translate-y-1'
                } ${isActive ? 'ring-4 ring-orange-400' : ''}`}
              >
                <div className="space-y-3">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${categoryColors[activity.category]} flex items-center justify-center`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-gray-800">{activity.title}</h3>
                      {isCompleted && <CheckCircle2 className="h-5 w-5 text-green-600" />}
                    </div>
                    <p className="text-xs text-gray-600 mb-2">{activity.description}</p>
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                      {categoryLabels[activity.category]}
                    </span>
                  </div>

                  <Button
                    onClick={() => startActivity(activity.id)}
                    disabled={isActive || isCompleted}
                    className={`w-full ${
                      isCompleted
                        ? 'bg-green-500 hover:bg-green-600'
                        : `bg-gradient-to-r ${categoryColors[activity.category]}`
                    }`}
                  >
                    {isCompleted ? (
                      <>
                        <CheckCircle2 className="h-4 w-4 mr-2" />
                        Concluída
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4 mr-2" />
                        Iniciar ({activity.duration}s)
                      </>
                    )}
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Mensagem de Incentivo */}
        {completedActivities.length === MICRO_ACTIVITIES.length && (
          <Card className="p-6 bg-gradient-to-r from-green-100 to-teal-100 border-none text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              🎉 Parabéns! Você completou todas as atividades!
            </h3>
            <p className="text-gray-600">
              Você está cuidando muito bem de si mesmo(a). Continue assim! 💚
            </p>
            <Button
              onClick={() => setCompletedActivities([])}
              className="mt-4 bg-gradient-to-r from-green-500 to-teal-500"
            >
              Reiniciar Atividades
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
}
