'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X, Wind } from 'lucide-react';

interface CrisisScreenProps {
  onExit: () => void;
}

export default function CrisisScreen({ onExit }: CrisisScreenProps) {
  const [phase, setPhase] = useState<'breathe-in' | 'hold' | 'breathe-out'>('breathe-in');
  const [count, setCount] = useState(4);
  const [cycles, setCycles] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev > 1) return prev - 1;

        // Mudar fase
        if (phase === 'breathe-in') {
          setPhase('hold');
          return 2;
        } else if (phase === 'hold') {
          setPhase('breathe-out');
          return 6;
        } else {
          setPhase('breathe-in');
          setCycles((c) => c + 1);
          return 4;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [phase]);

  const getPhaseText = () => {
    switch (phase) {
      case 'breathe-in':
        return 'Inspire profundamente';
      case 'hold':
        return 'Segure o ar';
      case 'breathe-out':
        return 'Solte o ar devagar';
    }
  };

  const getPhaseColor = () => {
    switch (phase) {
      case 'breathe-in':
        return 'from-blue-400 to-cyan-400';
      case 'hold':
        return 'from-purple-400 to-pink-400';
      case 'breathe-out':
        return 'from-green-400 to-emerald-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col items-center justify-center p-6 relative">
      {/* Botão Fechar */}
      <Button
        onClick={onExit}
        variant="ghost"
        className="absolute top-6 right-6 text-white hover:bg-white/10"
      >
        <X className="h-6 w-6" />
      </Button>

      {/* Mensagem de Acolhimento */}
      <div className="text-center mb-12 max-w-2xl">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Você está seguro
        </h1>
        <p className="text-lg text-gray-300">
          Vamos respirar juntos. Siga o ritmo da animação.
        </p>
      </div>

      {/* Animação de Respiração */}
      <div className="relative mb-12">
        <div
          className={`w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-gradient-to-br ${getPhaseColor()} transition-all duration-1000 flex items-center justify-center shadow-2xl ${
            phase === 'breathe-in'
              ? 'scale-100'
              : phase === 'hold'
              ? 'scale-100'
              : 'scale-75'
          }`}
        >
          <div className="text-center text-white">
            <Wind className="h-16 w-16 mx-auto mb-4" />
            <p className="text-2xl font-semibold mb-2">{getPhaseText()}</p>
            <p className="text-6xl font-bold">{count}</p>
          </div>
        </div>
      </div>

      {/* Instruções */}
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-md text-center mb-8">
        <p className="text-white text-lg mb-4">
          Ciclos completados: <span className="font-bold">{cycles}</span>
        </p>
        <p className="text-gray-300 text-sm">
          Continue respirando até se sentir mais calmo. Não há pressa.
        </p>
      </div>

      {/* Dicas Rápidas */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl w-full">
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center">
          <p className="text-white text-sm">🎧 Use fones se possível</p>
        </div>
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center">
          <p className="text-white text-sm">💺 Encoste as costas</p>
        </div>
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center">
          <p className="text-white text-sm">💧 Beba água devagar</p>
        </div>
      </div>
    </div>
  );
}
