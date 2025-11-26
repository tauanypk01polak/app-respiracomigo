'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Save, TrendingUp } from 'lucide-react';

interface DiaryScreenProps {
  onBack: () => void;
}

interface DiaryEntry {
  date: string;
  mood: number;
  content: string;
  gratitude?: string;
}

export default function DiaryScreen({ onBack }: DiaryScreenProps) {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [currentMood, setCurrentMood] = useState(3);
  const [content, setContent] = useState('');
  const [gratitude, setGratitude] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('diaryEntries');
    if (saved) {
      setEntries(JSON.parse(saved));
    }
  }, []);

  const handleSave = () => {
    const newEntry: DiaryEntry = {
      date: new Date().toISOString(),
      mood: currentMood,
      content,
      gratitude
    };

    const updated = [newEntry, ...entries];
    setEntries(updated);
    localStorage.setItem('diaryEntries', JSON.stringify(updated));

    // Limpar formulário
    setContent('');
    setGratitude('');
    setCurrentMood(3);

    alert('Entrada salva com sucesso! 💙');
  };

  const moods = [
    { value: 1, emoji: '😢', label: 'Muito mal' },
    { value: 2, emoji: '😔', label: 'Mal' },
    { value: 3, emoji: '😐', label: 'Neutro' },
    { value: 4, emoji: '🙂', label: 'Bem' },
    { value: 5, emoji: '😊', label: 'Muito bem' }
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
            Diário Emocional
          </h1>
          <p className="text-gray-600">
            Registre seus sentimentos e acompanhe seu progresso
          </p>
        </div>

        {/* Formulário de Nova Entrada */}
        <Card className="p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Como você está se sentindo hoje?
          </h2>

          {/* Seletor de Humor */}
          <div className="mb-6">
            <div className="flex justify-between gap-2">
              {moods.map((mood) => (
                <button
                  key={mood.value}
                  onClick={() => setCurrentMood(mood.value)}
                  className={`flex-1 p-4 rounded-xl transition-all duration-200 ${
                    currentMood === mood.value
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white scale-110 shadow-lg'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  <div className="text-3xl mb-1">{mood.emoji}</div>
                  <div className="text-xs">{mood.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Campo de Texto */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              O que aconteceu hoje? Como você se sente?
            </label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Escreva livremente sobre seu dia, seus sentimentos, seus desafios..."
              className="min-h-32"
            />
          </div>

          {/* Campo de Gratidão */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pelo que você é grato hoje? (opcional)
            </label>
            <Textarea
              value={gratitude}
              onChange={(e) => setGratitude(e.target.value)}
              placeholder="Mesmo nos dias difíceis, há pequenas coisas pelas quais podemos ser gratos..."
              className="min-h-24"
            />
          </div>

          <Button
            onClick={handleSave}
            disabled={!content}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
          >
            <Save className="h-5 w-5 mr-2" />
            Salvar Entrada
          </Button>
        </Card>

        {/* Histórico */}
        {entries.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <TrendingUp className="h-6 w-6" />
              Seu Progresso
            </h2>
            <div className="space-y-4">
              {entries.slice(0, 5).map((entry, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">
                        {moods.find((m) => m.value === entry.mood)?.emoji}
                      </span>
                      <span className="text-sm text-gray-500">
                        {new Date(entry.date).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm line-clamp-3">
                    {entry.content}
                  </p>
                  {entry.gratitude && (
                    <p className="text-purple-600 text-sm mt-2 italic">
                      💜 {entry.gratitude}
                    </p>
                  )}
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
