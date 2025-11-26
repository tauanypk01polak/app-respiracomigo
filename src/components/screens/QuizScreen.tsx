'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, ArrowLeft } from 'lucide-react';

interface QuizScreenProps {
  onComplete: () => void;
}

export default function QuizScreen({ onComplete }: QuizScreenProps) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});

  const questions = [
    {
      id: 'anxiety',
      question: 'Como você avalia seu nível de ansiedade nos últimos dias?',
      options: [
        { value: 'low', label: 'Baixo - Me sinto tranquilo na maior parte do tempo' },
        { value: 'moderate', label: 'Moderado - Sinto ansiedade em algumas situações' },
        { value: 'high', label: 'Alto - Sinto ansiedade frequentemente' },
        { value: 'severe', label: 'Muito Alto - Ansiedade constante e intensa' }
      ]
    },
    {
      id: 'mood',
      question: 'Como tem sido seu humor recentemente?',
      options: [
        { value: 'good', label: 'Bem - Me sinto animado e positivo' },
        { value: 'neutral', label: 'Neutro - Nem bem, nem mal' },
        { value: 'low', label: 'Baixo - Me sinto triste com frequência' },
        { value: 'very-low', label: 'Muito Baixo - Tristeza profunda e constante' }
      ]
    },
    {
      id: 'selfEsteem',
      question: 'Como você se sente em relação a si mesmo?',
      options: [
        { value: 'high', label: 'Bem - Gosto de quem eu sou' },
        { value: 'moderate', label: 'Moderado - Às vezes me aceito, às vezes não' },
        { value: 'low', label: 'Baixo - Tenho dificuldade em me aceitar' },
        { value: 'very-low', label: 'Muito Baixo - Não gosto de mim' }
      ]
    },
    {
      id: 'coping',
      question: 'O que mais te ajuda em momentos difíceis? (Escolha até 3)',
      multiple: true,
      options: [
        { value: 'music', label: '🎵 Música' },
        { value: 'breathing', label: '🫁 Respiração' },
        { value: 'nature', label: '🌿 Natureza' },
        { value: 'talking', label: '💬 Conversar' },
        { value: 'movement', label: '🚶 Movimento' },
        { value: 'silence', label: '🤫 Silêncio' }
      ]
    }
  ];

  const currentQuestion = questions[step];

  const handleAnswer = (value: string) => {
    if (currentQuestion.multiple) {
      const current = answers[currentQuestion.id] || [];
      const newValue = current.includes(value)
        ? current.filter((v: string) => v !== value)
        : [...current, value].slice(0, 3);
      setAnswers({ ...answers, [currentQuestion.id]: newValue });
    } else {
      setAnswers({ ...answers, [currentQuestion.id]: value });
    }
  };

  const handleNext = () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      // Salvar respostas no localStorage
      localStorage.setItem('userProfile', JSON.stringify(answers));
      onComplete();
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const isAnswered = currentQuestion.multiple
    ? (answers[currentQuestion.id]?.length || 0) > 0
    : answers[currentQuestion.id] !== undefined;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4 sm:p-6">
      <Card className="max-w-2xl w-full p-6 sm:p-8 md:p-10 bg-white/80 backdrop-blur-sm shadow-2xl">
        {/* Progresso */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Pergunta {step + 1} de {questions.length}</span>
            <span>{Math.round(((step + 1) / questions.length) * 100)}%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
              style={{ width: `${((step + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Pergunta */}
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-8">
          {currentQuestion.question}
        </h2>

        {/* Opções */}
        <div className="space-y-3 mb-8">
          {currentQuestion.options.map((option) => {
            const isSelected = currentQuestion.multiple
              ? answers[currentQuestion.id]?.includes(option.value)
              : answers[currentQuestion.id] === option.value;

            return (
              <button
                key={option.value}
                onClick={() => handleAnswer(option.value)}
                className={`w-full p-4 rounded-xl text-left transition-all duration-200 ${
                  isSelected
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg scale-105'
                    : 'bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-200 hover:border-purple-300'
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>

        {currentQuestion.multiple && (
          <p className="text-sm text-gray-500 mb-6 text-center">
            Você pode escolher até 3 opções
          </p>
        )}

        {/* Navegação */}
        <div className="flex gap-4">
          {step > 0 && (
            <Button
              onClick={handleBack}
              variant="outline"
              className="flex-1"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
          )}
          <Button
            onClick={handleNext}
            disabled={!isAnswered}
            className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
          >
            {step < questions.length - 1 ? 'Próxima' : 'Finalizar'}
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </Card>
    </div>
  );
}
