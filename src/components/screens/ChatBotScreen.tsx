'use client';

import { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Send, Mic, Volume2, Image, Video, Wind, Loader2 } from 'lucide-react';
import { ChatMessage } from '@/lib/types';
import { useApp } from '@/lib/context';

interface ChatBotScreenProps {
  onBack: () => void;
}

export default function ChatBotScreen({ onBack }: ChatBotScreenProps) {
  const { userData, addChatMessage } = useApp();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'bot',
      content: 'Olá. Seja muito bem-vindo(a). Este é um espaço seguro e acolhedor. Como você está se sentindo agora?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Sistema de IA conversacional com OpenAI
  const generateAIResponse = async (userMessage: string): Promise<ChatMessage> => {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          history: messages.slice(-10), // Últimas 10 mensagens para contexto
          userProfile: userData.quizResponse,
          preferences: userData.preferences
        })
      });

      if (!response.ok) {
        throw new Error('Erro na resposta da IA');
      }

      const data = await response.json();
      
      return {
        id: Date.now().toString(),
        role: 'bot',
        content: data.message,
        timestamp: new Date(),
        suggestedActions: data.suggestedActions
      };
    } catch (error) {
      console.error('Erro ao gerar resposta:', error);
      return generateFallbackResponse(userMessage);
    }
  };

  // Sistema de fallback inteligente (quando API não está disponível)
  const generateFallbackResponse = (userMessage: string): ChatMessage => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Detectar urgência emocional
    const urgencyKeywords = ['mal', 'triste', 'ansioso', 'pânico', 'medo', 'desespero', 'sozinho'];
    const isUrgent = urgencyKeywords.some(keyword => lowerMessage.includes(keyword));

    if (isUrgent) {
      return {
        id: Date.now().toString(),
        role: 'bot',
        content: 'Eu entendo que você está passando por um momento difícil. Respire fundo comigo. Você está seguro(a) aqui. Vamos fazer um exercício de respiração juntos para acalmar?',
        timestamp: new Date(),
        suggestedActions: [
          { type: 'breathing', id: 'anti-panic', label: 'Respiração Anti-Pânico' },
          { type: 'video', id: 'ocean-waves', label: 'Vídeo Calmante' }
        ]
      };
    }

    // Respostas contextuais
    if (lowerMessage.includes('água') || lowerMessage.includes('sede')) {
      return {
        id: Date.now().toString(),
        role: 'bot',
        content: 'Ótima ideia! Beber água é um ato de autocuidado importante. Levante-se devagar, pegue um copo de água e beba em pequenos goles. Seu corpo agradece. 💧',
        timestamp: new Date()
      };
    }

    if (lowerMessage.includes('respirar') || lowerMessage.includes('respiraç')) {
      return {
        id: Date.now().toString(),
        role: 'bot',
        content: 'Vamos respirar juntos. A respiração é uma ferramenta poderosa para acalmar a mente e o corpo. Escolha um exercício que funcione para você:',
        timestamp: new Date(),
        suggestedActions: [
          { type: 'breathing', id: '4-7-8', label: 'Respiração 4-7-8' },
          { type: 'breathing', id: 'square', label: 'Respiração Quadrada' }
        ]
      };
    }

    if (lowerMessage.includes('dormir') || lowerMessage.includes('sono')) {
      return {
        id: Date.now().toString(),
        role: 'bot',
        content: 'Preparar-se para dormir é importante. Que tal criar um ambiente relaxante? Posso sugerir sons calmantes e exercícios de respiração para o sono:',
        timestamp: new Date(),
        suggestedActions: [
          { type: 'music', id: 'rain-constant', label: 'Chuva para Dormir' },
          { type: 'breathing', id: 'sleep', label: 'Respiração para Sono' }
        ]
      };
    }

    if (lowerMessage.includes('obrigad') || lowerMessage.includes('ajud')) {
      return {
        id: Date.now().toString(),
        role: 'bot',
        content: 'Estou aqui sempre que precisar. Cuidar de si mesmo(a) é um ato de coragem. Você está fazendo um ótimo trabalho. 💜',
        timestamp: new Date()
      };
    }

    if (lowerMessage.includes('como') && lowerMessage.includes('você')) {
      return {
        id: Date.now().toString(),
        role: 'bot',
        content: 'Eu estou aqui para você, funcionando perfeitamente! Meu propósito é oferecer apoio, acolhimento e ferramentas práticas. Como posso ajudar você hoje?',
        timestamp: new Date()
      };
    }

    // Resposta padrão empática
    const defaultResponses = [
      'Eu ouço você. Seus sentimentos são válidos. Como posso ajudar agora?',
      'Obrigado por compartilhar isso comigo. Você gostaria de tentar algum exercício de relaxamento?',
      'Entendo. Às vezes, apenas expressar o que sentimos já ajuda. Estou aqui para você.',
      'Você não está sozinho(a). Vamos encontrar juntos uma forma de você se sentir melhor.',
      'Seus sentimentos importam. Que tal darmos um passo de cada vez?',
      'Eu compreendo o que você está sentindo. Vamos trabalhar isso juntos, no seu ritmo.',
      'Está tudo bem sentir o que você está sentindo. Não há julgamentos aqui.'
    ];

    return {
      id: Date.now().toString(),
      role: 'bot',
      content: defaultResponses[Math.floor(Math.random() * defaultResponses.length)],
      timestamp: new Date(),
      suggestedActions: [
        { type: 'image', id: 'nature-1', label: 'Ver Imagem Calmante' },
        { type: 'breathing', id: 'cardiac', label: 'Respiração Guiada' }
      ]
    };
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    // Adicionar mensagem do usuário
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    addChatMessage(userMessage);
    setInputMessage('');
    setIsLoading(true);

    // Gerar resposta da IA
    try {
      const botResponse = await generateAIResponse(inputMessage);
      setMessages(prev => [...prev, botResponse]);
      addChatMessage(botResponse);
    } catch (error) {
      console.error('Erro ao processar mensagem:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto h-[calc(100vh-4rem)] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <Button
            onClick={onBack}
            variant="ghost"
            className="gap-2"
          >
            <ArrowLeft className="h-5 w-5" />
            Voltar
          </Button>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800">Converse Comigo</h1>
            <p className="text-xs text-gray-500">Robô-Terapeuta Empático</p>
          </div>
          <div className="w-20" /> {/* Spacer */}
        </div>

        {/* Área de Mensagens */}
        <Card className="flex-1 overflow-hidden flex flex-col">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map(message => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl p-4 ${
                    message.role === 'user'
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                      : 'bg-white shadow-md text-gray-800'
                  }`}
                >
                  <p className="text-sm sm:text-base leading-relaxed whitespace-pre-wrap">{message.content}</p>
                  
                  {/* Ações Sugeridas */}
                  {message.suggestedActions && message.suggestedActions.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {message.suggestedActions.map((action, idx) => (
                        <Button
                          key={idx}
                          size="sm"
                          variant="outline"
                          className="w-full justify-start gap-2 bg-white/50 hover:bg-white"
                        >
                          {action.type === 'breathing' && <Wind className="h-4 w-4" />}
                          {action.type === 'video' && <Video className="h-4 w-4" />}
                          {action.type === 'image' && <Image className="h-4 w-4" />}
                          {action.type === 'music' && <Volume2 className="h-4 w-4" />}
                          {action.label}
                        </Button>
                      ))}
                    </div>
                  )}
                  
                  <p className="text-xs mt-2 opacity-70">
                    {message.timestamp.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            
            {/* Indicador de digitação */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white shadow-md rounded-2xl p-4">
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin text-purple-500" />
                    <span className="text-sm text-gray-600">Pensando...</span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Área de Input */}
          <div className="border-t p-4 bg-white">
            <div className="flex gap-2">
              <Button
                size="icon"
                variant="outline"
                onClick={() => setIsRecording(!isRecording)}
                className={isRecording ? 'bg-red-100 border-red-300' : ''}
                title="Gravar áudio (em breve)"
              >
                <Mic className={`h-5 w-5 ${isRecording ? 'text-red-500' : ''}`} />
              </Button>
              
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Digite sua mensagem..."
                className="flex-1"
                disabled={isLoading}
              />
              
              <Button
                onClick={handleSendMessage}
                disabled={isLoading || !inputMessage.trim()}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <Send className="h-5 w-5" />
                )}
              </Button>
            </div>
            
            {isRecording && (
              <p className="text-xs text-red-500 mt-2 text-center animate-pulse">
                🔴 Gravando áudio... (funcionalidade em desenvolvimento)
              </p>
            )}
          </div>
        </Card>

        {/* Aviso de Privacidade */}
        <p className="text-xs text-center text-gray-500 mt-4">
          🔒 Suas conversas são privadas e seguras. Este app não substitui tratamento profissional.
        </p>
      </div>
    </div>
  );
}
