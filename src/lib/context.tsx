'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserProfile, QuizResponse, MoodEntry, CrisisSession, ChatMessage } from './types';

interface UserPreferences {
  religion?: 'christian' | 'muslim' | 'jewish' | 'buddhist' | 'spiritist' | 'umbanda' | 'none' | 'other';
  hobbies: string[];
  crisisTypes: string[];
  homeLayout: 'religious' | 'nature' | 'sport' | 'gamer' | 'minimal' | 'motivational' | 'focus';
  notifications: {
    morning: boolean;
    afternoon: boolean;
    evening: boolean;
  };
  audioSettings: {
    backgroundAudio: boolean;
    sleepTimer: number; // minutos
    volume: number;
  };
}

interface UserData {
  profile: UserProfile | null;
  preferences: UserPreferences;
  quizResponse: QuizResponse | null;
  moodHistory: MoodEntry[];
  crisisHistory: CrisisSession[];
  chatHistory: ChatMessage[];
  favorites: {
    images: string[];
    videos: string[];
    playlists: string[];
    posts: string[];
  };
}

interface AppContextType {
  userData: UserData;
  updateProfile: (profile: Partial<UserProfile>) => void;
  updatePreferences: (preferences: Partial<UserPreferences>) => void;
  setQuizResponse: (response: QuizResponse) => void;
  addMoodEntry: (entry: MoodEntry) => void;
  addCrisisSession: (session: CrisisSession) => void;
  addChatMessage: (message: ChatMessage) => void;
  toggleFavorite: (type: 'images' | 'videos' | 'playlists' | 'posts', id: string) => void;
  // Compatibilidade com código existente
  userProfile: UserProfile | null;
  quizResponse: QuizResponse | null;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [userData, setUserData] = useState<UserData>({
    profile: null,
    preferences: {
      hobbies: [],
      crisisTypes: [],
      homeLayout: 'nature',
      notifications: {
        morning: true,
        afternoon: true,
        evening: true
      },
      audioSettings: {
        backgroundAudio: false,
        sleepTimer: 30,
        volume: 70
      }
    },
    quizResponse: null,
    moodHistory: [],
    crisisHistory: [],
    chatHistory: [],
    favorites: {
      images: [],
      videos: [],
      playlists: [],
      posts: []
    }
  });

  // Carregar dados do localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('respiraComigo_userData');
    if (savedData) {
      try {
        setUserData(JSON.parse(savedData));
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      }
    }
  }, []);

  // Salvar dados no localStorage
  useEffect(() => {
    localStorage.setItem('respiraComigo_userData', JSON.stringify(userData));
  }, [userData]);

  const updateProfile = (profile: Partial<UserProfile>) => {
    setUserData(prev => ({
      ...prev,
      profile: prev.profile ? { ...prev.profile, ...profile } : profile as UserProfile
    }));
  };

  const updatePreferences = (preferences: Partial<UserPreferences>) => {
    setUserData(prev => ({
      ...prev,
      preferences: { ...prev.preferences, ...preferences }
    }));
  };

  const setQuizResponse = (response: QuizResponse) => {
    setUserData(prev => ({ ...prev, quizResponse: response }));
  };

  const addMoodEntry = (entry: MoodEntry) => {
    setUserData(prev => ({
      ...prev,
      moodHistory: [...prev.moodHistory, entry]
    }));
  };

  const addCrisisSession = (session: CrisisSession) => {
    setUserData(prev => ({
      ...prev,
      crisisHistory: [...prev.crisisHistory, session]
    }));
  };

  const addChatMessage = (message: ChatMessage) => {
    setUserData(prev => ({
      ...prev,
      chatHistory: [...prev.chatHistory, message]
    }));
  };

  const toggleFavorite = (type: 'images' | 'videos' | 'playlists' | 'posts', id: string) => {
    setUserData(prev => {
      const favorites = prev.favorites[type];
      const isFavorite = favorites.includes(id);
      
      return {
        ...prev,
        favorites: {
          ...prev.favorites,
          [type]: isFavorite 
            ? favorites.filter(fav => fav !== id)
            : [...favorites, id]
        }
      };
    });
  };

  return (
    <AppContext.Provider value={{
      userData,
      updateProfile,
      updatePreferences,
      setQuizResponse,
      addMoodEntry,
      addCrisisSession,
      addChatMessage,
      toggleFavorite,
      // Compatibilidade
      userProfile: userData.profile,
      quizResponse: userData.quizResponse
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
