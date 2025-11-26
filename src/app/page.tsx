'use client';

import { useState, useEffect } from 'react';
import { AppProvider } from '@/lib/context';
import WelcomeScreen from '@/components/screens/WelcomeScreen';
import QuizScreen from '@/components/screens/QuizScreen';
import HomeScreen from '@/components/screens/HomeScreen';
import CrisisScreen from '@/components/screens/CrisisScreen';
import BreathingScreen from '@/components/screens/BreathingScreen';
import DiaryScreen from '@/components/screens/DiaryScreen';
import TherapyScreen from '@/components/screens/TherapyScreen';
import ImagesScreen from '@/components/screens/ImagesScreen';
import VideosScreen from '@/components/screens/VideosScreen';
import PlaylistsScreen from '@/components/screens/PlaylistsScreen';
import ChatBotScreen from '@/components/screens/ChatBotScreen';
import MicroActivitiesScreen from '@/components/screens/MicroActivitiesScreen';
import SettingsScreen from '@/components/screens/SettingsScreen';
import CommunityScreen from '@/components/screens/CommunityScreen';
import MotivationalVideosScreen from '@/components/screens/MotivationalVideosScreen';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [showCrisisButton, setShowCrisisButton] = useState(true);

  // Sistema de notificações motivacionais
  useEffect(() => {
    const checkNotifications = () => {
      const hour = new Date().getHours();
      const lastNotification = localStorage.getItem('lastNotification');
      const today = new Date().toDateString();

      // Notificação matinal (8h)
      if (hour === 8 && lastNotification !== `morning-${today}`) {
        showNotification('Bom dia! 🌅', 'Você acordou, e isso já é uma vitória. Um passo de cada vez.');
        localStorage.setItem('lastNotification', `morning-${today}`);
      }

      // Notificação da tarde (14h)
      if (hour === 14 && lastNotification !== `afternoon-${today}`) {
        showNotification('Boa tarde! ☀️', 'Você chegou até aqui. Isso merece reconhecimento. Continue!');
        localStorage.setItem('lastNotification', `afternoon-${today}`);
      }

      // Notificação da noite (20h)
      if (hour === 20 && lastNotification !== `evening-${today}`) {
        showNotification('Boa noite! 🌙', 'Você sobreviveu a mais um dia. Descanse. Você merece.');
        localStorage.setItem('lastNotification', `evening-${today}`);
      }
    };

    // Verificar a cada minuto
    const interval = setInterval(checkNotifications, 60000);
    checkNotifications(); // Verificar imediatamente

    return () => clearInterval(interval);
  }, []);

  const showNotification = (title: string, body: string) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, { body, icon: '/icon.svg' });
    }
  };

  // Solicitar permissão para notificações
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'welcome':
        return <WelcomeScreen onNext={() => setCurrentScreen('quiz')} />;
      case 'quiz':
        return <QuizScreen onComplete={() => setCurrentScreen('home')} />;
      case 'home':
        return <HomeScreen onNavigate={setCurrentScreen} />;
      case 'crisis':
        return <CrisisScreen onExit={() => setCurrentScreen('home')} />;
      case 'breathing':
        return <BreathingScreen onBack={() => setCurrentScreen('home')} />;
      case 'diary':
        return <DiaryScreen onBack={() => setCurrentScreen('home')} />;
      case 'therapy':
        return <TherapyScreen onBack={() => setCurrentScreen('home')} />;
      case 'images':
        return <ImagesScreen onBack={() => setCurrentScreen('home')} />;
      case 'videos':
        return <VideosScreen onBack={() => setCurrentScreen('home')} />;
      case 'playlists':
        return <PlaylistsScreen onBack={() => setCurrentScreen('home')} />;
      case 'chatbot':
        return <ChatBotScreen onBack={() => setCurrentScreen('home')} />;
      case 'activities':
        return <MicroActivitiesScreen onBack={() => setCurrentScreen('home')} />;
      case 'settings':
        return <SettingsScreen onBack={() => setCurrentScreen('home')} />;
      case 'community':
        return <CommunityScreen onBack={() => setCurrentScreen('home')} />;
      case 'motivational':
        return <MotivationalVideosScreen onBack={() => setCurrentScreen('home')} />;
      default:
        return <WelcomeScreen onNext={() => setCurrentScreen('quiz')} />;
    }
  };

  return (
    <AppProvider>
      <main className="min-h-screen relative">
        {renderScreen()}
        
        {/* Botão de Crise Flutuante - Sempre Visível */}
        {showCrisisButton && currentScreen !== 'crisis' && currentScreen !== 'welcome' && (
          <Button
            onClick={() => setCurrentScreen('crisis')}
            className="fixed bottom-6 right-6 h-16 w-16 rounded-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 shadow-2xl z-50 flex items-center justify-center animate-pulse"
            aria-label="Modo Anti-Crise"
          >
            <AlertCircle className="h-8 w-8 text-white" />
          </Button>
        )}
      </main>
    </AppProvider>
  );
}
