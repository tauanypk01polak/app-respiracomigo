'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useApp } from '@/lib/context';
import { MOTIVATIONAL_MESSAGES } from '@/lib/constants';
import { 
  Heart, 
  Wind, 
  BookOpen, 
  Sparkles, 
  Music, 
  Phone,
  Sun,
  Moon,
  Smile,
  Image as ImageIcon,
  Video,
  Headphones,
  MessageCircle,
  Activity,
  AlertCircle,
  Settings,
  Users,
  PlayCircle
} from 'lucide-react';

interface HomeScreenProps {
  onNavigate: (screen: string) => void;
}

export default function HomeScreen({ onNavigate }: HomeScreenProps) {
  const { userData, quizResponse, userProfile } = useApp();
  const [dailyMessage, setDailyMessage] = useState('');
  const [greeting, setGreeting] = useState('');
  const [timeOfDay, setTimeOfDay] = useState<'morning' | 'afternoon' | 'evening'>('morning');

  useEffect(() => {
    // Saudação baseada no horário
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting('Bom dia');
      setTimeOfDay('morning');
    } else if (hour < 18) {
      setGreeting('Boa tarde');
      setTimeOfDay('afternoon');
    } else {
      setGreeting('Boa noite');
      setTimeOfDay('evening');
    }

    // Mensagem motivacional personalizada
    if (quizResponse) {
      const level = quizResponse.depressionLevel || quizResponse.anxietyLevel || 'moderate';
      const messages = MOTIVATIONAL_MESSAGES[level];
      
      if (typeof messages === 'object' && 'morning' in messages) {
        const timeMessages = messages[timeOfDay];
        const randomMessage = timeMessages[Math.floor(Math.random() * timeMessages.length)];
        setDailyMessage(randomMessage);
      } else if (Array.isArray(messages)) {
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        setDailyMessage(randomMessage);
      }
    } else {
      setDailyMessage('Bem-vindo(a) ao RespiraComigo. Este é um espaço seguro para você. 💜');
    }
  }, [quizResponse, timeOfDay]);

  // Personalização baseada em religião
  const getReligiousGreeting = () => {
    if (!userData.preferences.religion || userData.preferences.religion === 'none') return null;

    const religiousGreetings: Record<string, string> = {
      christian: '🙏 "O Senhor é meu pastor, nada me faltará." - Salmos 23:1',
      muslim: '☪️ "Allah está com os pacientes." - Alcorão 2:153',
      jewish: '✡️ "Shalom! Que a paz esteja com você."',
      buddhist: '☸️ "A paz vem de dentro. Não a busque fora."',
      spiritist: '✨ "Fora da caridade não há salvação."',
      umbanda: '🕯️ "Axé! Que a luz dos Orixás ilumine seu caminho."'
    };

    return religiousGreetings[userData.preferences.religion];
  };

  const mainFeatures = [
    {
      id: 'breathing',
      title: 'Respiração Guiada',
      description: 'Exercícios para acalmar e equilibrar',
      icon: Wind,
      color: 'from-blue-400 to-cyan-400',
      screen: 'breathing'
    },
    {
      id: 'therapy',
      title: 'Técnicas Terapêuticas',
      description: 'Ferramentas práticas de bem-estar',
      icon: Sparkles,
      color: 'from-purple-400 to-pink-400',
      screen: 'therapy'
    },
    {
      id: 'diary',
      title: 'Diário Emocional',
      description: 'Registre seus sentimentos e progresso',
      icon: BookOpen,
      color: 'from-green-400 to-emerald-400',
      screen: 'diary'
    },
    {
      id: 'chatbot',
      title: 'Converse Comigo',
      description: 'Chat empático e acolhedor',
      icon: MessageCircle,
      color: 'from-pink-400 to-rose-400',
      screen: 'chatbot'
    }
  ];

  const mediaFeatures = [
    {
      id: 'images',
      title: 'Imagens Calmantes',
      description: 'Natureza em alta qualidade',
      icon: ImageIcon,
      color: 'from-teal-400 to-green-400',
      screen: 'images'
    },
    {
      id: 'videos',
      title: 'Vídeos Imersivos',
      description: 'Experiências visuais relaxantes',
      icon: Video,
      color: 'from-indigo-400 to-purple-400',
      screen: 'videos'
    },
    {
      id: 'playlists',
      title: 'Playlists Longas',
      description: 'Sons de 1 a 8 horas',
      icon: Headphones,
      color: 'from-cyan-400 to-blue-400',
      screen: 'playlists'
    },
    {
      id: 'activities',
      title: 'Micro-Atividades',
      description: 'Pequenas ações, grande impacto',
      icon: Activity,
      color: 'from-green-400 to-teal-400',
      screen: 'activities'
    }
  ];

  const communityFeatures = [
    {
      id: 'community',
      title: 'Comunidade',
      description: 'Compartilhe e conecte-se',
      icon: Users,
      color: 'from-orange-400 to-red-400',
      screen: 'community'
    },
    {
      id: 'motivational',
      title: 'Vídeos Motivacionais',
      description: 'Histórias de superação',
      icon: PlayCircle,
      color: 'from-yellow-400 to-orange-400',
      screen: 'motivational'
    }
  ];

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 bg-gradient-to-b from-purple-50 via-pink-50 to-blue-50">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header com Saudação */}
        <div className="text-center space-y-4 py-8">
          <div className="flex items-center justify-center gap-3">
            {greeting.includes('dia') && <Sun className="h-10 w-10 text-yellow-500 animate-pulse" />}
            {greeting.includes('tarde') && <Sun className="h-10 w-10 text-orange-500 animate-pulse" />}
            {greeting.includes('noite') && <Moon className="h-10 w-10 text-indigo-500 animate-pulse" />}
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {greeting}!
            </h1>
          </div>
          <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-medium">
            {dailyMessage}
          </p>
          
          {/* Mensagem Religiosa (se ativada) */}
          {getReligiousGreeting() && (
            <p className="text-sm text-purple-700 italic max-w-2xl mx-auto">
              {getReligiousGreeting()}
            </p>
          )}
        </div>

        {/* Botão de Configurações */}
        <div className="flex justify-end">
          <Button
            onClick={() => onNavigate('settings')}
            variant="outline"
            className="gap-2"
          >
            <Settings className="h-4 w-4" />
            Personalizar App
          </Button>
        </div>

        {/* Botão de Emergência Destacado */}
        <Card className="p-6 bg-gradient-to-r from-red-100 to-orange-100 border-red-300 border-2">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center animate-pulse">
                <AlertCircle className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">Estou Mal Agora</h3>
                <p className="text-sm text-gray-600">Acesso rápido para momentos de crise</p>
              </div>
            </div>
            <Button
              onClick={() => onNavigate('crisis')}
              size="lg"
              className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-semibold"
            >
              Preciso de Ajuda Agora
            </Button>
          </div>
        </Card>

        {/* Quick Mood Check */}
        <Card className="p-6 bg-gradient-to-r from-purple-100 to-pink-100 border-none">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-gray-800">Como você está agora?</h3>
              <p className="text-sm text-gray-600">Registre seu humor rapidamente</p>
            </div>
            <div className="flex gap-2">
              {[
                { emoji: '😢', label: 'Muito mal', value: 'very-bad' },
                { emoji: '😔', label: 'Mal', value: 'bad' },
                { emoji: '😐', label: 'Neutro', value: 'neutral' },
                { emoji: '🙂', label: 'Bem', value: 'good' },
                { emoji: '😊', label: 'Muito bem', value: 'very-good' }
              ].map(mood => (
                <Button
                  key={mood.value}
                  variant="outline"
                  size="lg"
                  className="text-2xl hover:scale-110 transition-transform"
                  onClick={() => onNavigate('diary')}
                  title={mood.label}
                >
                  {mood.emoji}
                </Button>
              ))}
            </div>
          </div>
        </Card>

        {/* Funcionalidades Principais */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Ferramentas Principais</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {mainFeatures.map(item => {
              const Icon = item.icon;
              return (
                <Card
                  key={item.id}
                  className="p-6 cursor-pointer hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-transparent hover:border-purple-200"
                  onClick={() => onNavigate(item.screen)}
                >
                  <div className="space-y-4">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg`}>
                      <Icon className="h-7 w-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-1">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Recursos de Mídia */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Biblioteca de Relaxamento</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {mediaFeatures.map(item => {
              const Icon = item.icon;
              return (
                <Card
                  key={item.id}
                  className="p-6 cursor-pointer hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-transparent hover:border-blue-200"
                  onClick={() => onNavigate(item.screen)}
                >
                  <div className="space-y-4">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg`}>
                      <Icon className="h-7 w-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-1">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Comunidade e Motivação */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Comunidade e Inspiração</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {communityFeatures.map(item => {
              const Icon = item.icon;
              return (
                <Card
                  key={item.id}
                  className="p-6 cursor-pointer hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-transparent hover:border-orange-200"
                  onClick={() => onNavigate(item.screen)}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg flex-shrink-0`}>
                      <Icon className="h-7 w-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-1">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Contatos de Emergência */}
        <Card className="p-6 bg-red-50 border-red-200">
          <div className="flex items-start gap-4">
            <Phone className="h-6 w-6 text-red-600 flex-shrink-0 mt-1" />
            <div className="space-y-2 flex-1">
              <h3 className="font-semibold text-gray-800">Precisa de ajuda profissional imediata?</h3>
              <div className="space-y-1 text-sm text-gray-700">
                <p><strong>CVV:</strong> 188 (24h, gratuito)</p>
                <p><strong>SAMU:</strong> 192</p>
                <p><strong>CAPS:</strong> 0800-761-0800</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500 py-4 space-y-2">
          <p>💜 Você está fazendo um ótimo trabalho cuidando de si</p>
          <p className="text-xs">Este app não substitui tratamento médico ou psicológico profissional</p>
        </div>
      </div>
    </div>
  );
}
