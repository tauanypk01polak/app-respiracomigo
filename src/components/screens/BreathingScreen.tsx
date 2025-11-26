'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Wind, Heart, Moon, Zap } from 'lucide-react';

interface BreathingScreenProps {
  onBack: () => void;
}

export default function BreathingScreen({ onBack }: BreathingScreenProps) {
  const [selectedExercise, setSelectedExercise] = useState<string | null>(null);
  const [isActive, setIsActive] = useState(false);

  const exercises = [
    {
      id: 'square',
      name: 'Respiração Quadrada',
      description: 'Inspire 4s, segure 4s, expire 4s, segure 4s',
      icon: '🟦',
      color: 'from-blue-400 to-cyan-400'
    },
    {
      id: '4-7-8',
      name: 'Respiração 4-7-8',
      description: 'Inspire 4s, segure 7s, expire 8s',
      icon: '🌙',
      color: 'from-purple-400 to-pink-400'
    },
    {
      id: 'cardiac',
      name: 'Coerência Cardíaca',
      description: 'Inspire 5s, expire 5s (ritmo constante)',
      icon: '❤️',
      color: 'from-red-400 to-pink-400'
    },
    {
      id: 'anti-panic',
      name: 'Anti-Pânico',
      description: 'Inspire 4s, segure 2s, expire 6s',
      icon: '⚡',
      color: 'from-orange-400 to-yellow-400'
    },
    {
      id: 'sleep',
      name: 'Para Dormir',
      description: 'Inspire 4s, segure 7s, expire 8s (lento)',
      icon: '😴',
      color: 'from-indigo-400 to-purple-400'
    }
  ];

  if (selectedExercise && isActive) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col items-center justify-center p-6">
        <Button
          onClick={() => {
            setIsActive(false);
            setSelectedExercise(null);
          }}
          variant="ghost"
          className="absolute top-6 left-6 text-white hover:bg-white/10"
        >
          <ArrowLeft className="h-6 w-6 mr-2" />
          Voltar
        </Button>

        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-8">
            {exercises.find((e) => e.id === selectedExercise)?.name}
          </h2>
          <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 animate-pulse flex items-center justify-center shadow-2xl">
            <Wind className="h-24 w-24 text-white" />
          </div>
          <p className="text-white text-xl mt-8">Siga o ritmo da respiração...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        <Button
          onClick={onBack}
          variant="ghost"
          className="mb-6"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Voltar
        </Button>

        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
            Exercícios de Respiração
          </h1>
          <p className="text-gray-600">
            Escolha um exercício para começar a praticar
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {exercises.map((exercise) => (
            <Card
              key={exercise.id}
              className="p-6 hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105"
              onClick={() => {
                setSelectedExercise(exercise.id);
                setIsActive(true);
              }}
            >
              <div className="text-center">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${exercise.color} flex items-center justify-center text-3xl`}>
                  {exercise.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {exercise.name}
                </h3>
                <p className="text-sm text-gray-600">
                  {exercise.description}
                </p>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="font-semibold text-blue-900 mb-2">💡 Dica</h3>
          <p className="text-blue-800 text-sm">
            Pratique em um lugar tranquilo, com as costas apoiadas. 
            Use fones de ouvido para melhor experiência.
          </p>
        </div>
      </div>
    </div>
  );
}
