'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Sparkles } from 'lucide-react';

interface TherapyScreenProps {
  onBack: () => void;
}

export default function TherapyScreen({ onBack }: TherapyScreenProps) {
  const techniques = [
    {
      id: 'grounding',
      title: 'Técnica 5-4-3-2-1',
      description: 'Grounding para ansiedade',
      steps: [
        '5 coisas que você VÊ ao seu redor',
        '4 coisas que você pode TOCAR',
        '3 coisas que você OUVE',
        '2 coisas que você CHEIRA',
        '1 coisa que você SABOREIA'
      ],
      color: 'from-blue-400 to-cyan-400'
    },
    {
      id: 'progressive',
      title: 'Relaxamento Muscular',
      description: 'Relaxe tensões do corpo',
      steps: [
        'Sente-se confortavelmente',
        'Contraia os músculos dos pés por 5s, depois relaxe',
        'Suba para as pernas, depois abdômen',
        'Continue pelos braços, ombros e rosto',
        'Respire profundamente ao relaxar cada parte'
      ],
      color: 'from-purple-400 to-pink-400'
    },
    {
      id: 'affirmations',
      title: 'Afirmações Positivas',
      description: 'Fortaleça sua mente',
      steps: [
        'Eu sou capaz de superar desafios',
        'Meus sentimentos são válidos',
        'Eu mereço cuidado e respeito',
        'Estou fazendo o meu melhor',
        'Cada dia é uma nova oportunidade'
      ],
      color: 'from-green-400 to-emerald-400'
    },
    {
      id: 'selfcare',
      title: 'Lista de Autocuidado',
      description: 'Pequenas ações importantes',
      steps: [
        '💧 Beber água regularmente',
        '🚶 Caminhar 10 minutos ao ar livre',
        '🛁 Tomar um banho relaxante',
        '☀️ Expor-se à luz natural',
        '😴 Dormir 7-8 horas por noite'
      ],
      color: 'from-orange-400 to-yellow-400'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        <Button onClick={onBack} variant="ghost" className="mb-6">
          <ArrowLeft className="h-5 w-5 mr-2" />
          Voltar
        </Button>

        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
            Técnicas Terapêuticas
          </h1>
          <p className="text-gray-600">
            Estratégias práticas para o seu bem-estar
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {techniques.map((technique) => (
            <Card key={technique.id} className="p-6 hover:shadow-xl transition-all duration-300">
              <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${technique.color} flex items-center justify-center mb-4`}>
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {technique.title}
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                {technique.description}
              </p>

              <div className="space-y-2">
                {technique.steps.map((step, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-semibold text-gray-700">
                      {index + 1}
                    </span>
                    <p className="text-sm text-gray-700 flex-1">{step}</p>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-8 bg-purple-50 border border-purple-200 rounded-xl p-6">
          <h3 className="font-semibold text-purple-900 mb-2">💜 Lembre-se</h3>
          <p className="text-purple-800 text-sm">
            Estas técnicas são ferramentas de apoio. Se você está enfrentando dificuldades 
            persistentes, considere buscar ajuda profissional. Você merece todo o suporte necessário.
          </p>
        </div>
      </div>
    </div>
  );
}
