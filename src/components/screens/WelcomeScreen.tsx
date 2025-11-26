'use client';

import { Button } from '@/components/ui/button';
import { Heart, Sparkles } from 'lucide-react';

interface WelcomeScreenProps {
  onNext: () => void;
}

export default function WelcomeScreen({ onNext }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full text-center space-y-8 animate-fade-in">
        {/* Logo/Ícone */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-2xl opacity-30 animate-pulse"></div>
            <Heart className="h-24 w-24 text-purple-500 relative z-10" />
          </div>
        </div>

        {/* Título */}
        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            RespiraComigo
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 font-light">
            Seu espaço seguro de acolhimento emocional
          </p>
        </div>

        {/* Mensagem Acolhedora */}
        <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
          <div className="flex items-start gap-3 mb-4">
            <Sparkles className="h-6 w-6 text-purple-500 flex-shrink-0 mt-1" />
            <p className="text-lg text-gray-700 text-left leading-relaxed">
              Você não está sozinho. Este é um espaço acolhedor, seguro e inclusivo 
              para cuidar da sua saúde emocional.
            </p>
          </div>
          <p className="text-base text-gray-600 text-left">
            Aqui você encontrará apoio para ansiedade, tristeza, crises de pânico 
            e momentos difíceis. Vamos caminhar juntos, no seu ritmo.
          </p>
        </div>

        {/* Botão de Início */}
        <Button
          onClick={onNext}
          size="lg"
          className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-12 py-6 text-lg rounded-full shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105"
        >
          Começar Jornada
        </Button>

        {/* Nota de Segurança */}
        <p className="text-sm text-gray-500 max-w-md mx-auto">
          Este aplicativo não substitui acompanhamento profissional. 
          Em caso de emergência, procure ajuda especializada.
        </p>
      </div>
    </div>
  );
}
