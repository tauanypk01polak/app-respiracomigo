'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Play, Heart, Sparkles } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  age: number;
  story: string;
  videoUrl?: string;
  duration: string;
  category: 'anxiety' | 'depression' | 'panic' | 'self-esteem';
}

interface MotivationalVideosScreenProps {
  onBack: () => void;
}

export default function MotivationalVideosScreen({ onBack }: MotivationalVideosScreenProps) {
  const [activeTab, setActiveTab] = useState<'motivational' | 'testimonials'>('motivational');
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const motivationalVideos = [
    {
      id: '1',
      title: 'Você É Mais Forte do Que Imagina',
      description: 'Mensagem poderosa sobre resiliência e superação',
      thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
      videoUrl: 'https://www.youtube.com/embed/tYzMYcUty6s',
      duration: '3:45'
    },
    {
      id: '2',
      title: 'Um Dia de Cada Vez',
      description: 'A importância de viver o presente',
      thumbnail: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&h=400&fit=crop',
      videoUrl: 'https://www.youtube.com/embed/inpok4MKVLM',
      duration: '4:20'
    },
    {
      id: '3',
      title: 'Sua Jornada É Única',
      description: 'Não compare seu capítulo 1 com o capítulo 20 de outra pessoa',
      thumbnail: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&h=400&fit=crop',
      videoUrl: 'https://www.youtube.com/embed/ZXsQAXx_ao0',
      duration: '5:10'
    }
  ];

  const testimonials: Testimonial[] = [
    {
      id: '1',
      name: 'Maria',
      age: 28,
      story: 'Convivi com ansiedade generalizada por 5 anos. Hoje, com tratamento e técnicas de respiração, consigo viver com muito mais leveza. Não desista, vale a pena.',
      videoUrl: 'https://www.youtube.com/embed/example1',
      duration: '6:30',
      category: 'anxiety'
    },
    {
      id: '2',
      name: 'João',
      age: 35,
      story: 'Depressão quase me tirou tudo. Mas busquei ajuda, fiz terapia e hoje posso dizer: é possível sair do fundo do poço. Você não está sozinho.',
      videoUrl: 'https://www.youtube.com/embed/example2',
      duration: '8:15',
      category: 'depression'
    },
    {
      id: '3',
      name: 'Ana',
      age: 24,
      story: 'Crises de pânico me impediam de sair de casa. Aprendi técnicas de grounding e respiração. Hoje viajo, trabalho e vivo plenamente.',
      videoUrl: 'https://www.youtube.com/embed/example3',
      duration: '7:00',
      category: 'panic'
    },
    {
      id: '4',
      name: 'Pedro',
      age: 31,
      story: 'Baixa autoestima me acompanhou desde a adolescência. Com terapia e autocompaixão, aprendi a me valorizar. Você também merece amor próprio.',
      videoUrl: 'https://www.youtube.com/embed/example4',
      duration: '5:45',
      category: 'self-esteem'
    }
  ];

  const categoryLabels = {
    anxiety: 'Ansiedade',
    depression: 'Depressão',
    panic: 'Pânico',
    'self-esteem': 'Autoestima'
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button onClick={onBack} variant="ghost" className="gap-2">
            <ArrowLeft className="h-5 w-5" />
            Voltar
          </Button>
          <h1 className="text-2xl font-bold text-gray-800">Vídeos Inspiradores</h1>
          <div className="w-20" />
        </div>

        {/* Tabs */}
        <div className="flex gap-2">
          <Button
            variant={activeTab === 'motivational' ? 'default' : 'outline'}
            onClick={() => setActiveTab('motivational')}
            className={activeTab === 'motivational' ? 'bg-gradient-to-r from-purple-500 to-pink-500' : ''}
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Motivacionais
          </Button>
          <Button
            variant={activeTab === 'testimonials' ? 'default' : 'outline'}
            onClick={() => setActiveTab('testimonials')}
            className={activeTab === 'testimonials' ? 'bg-gradient-to-r from-purple-500 to-pink-500' : ''}
          >
            <Heart className="h-4 w-4 mr-2" />
            Depoimentos
          </Button>
        </div>

        {/* Vídeos Motivacionais */}
        {activeTab === 'motivational' && (
          <div className="space-y-6">
            <Card className="p-6 bg-gradient-to-r from-purple-100 to-pink-100">
              <p className="text-gray-700">
                Mensagens poderosas de superação, força e esperança para inspirar sua jornada.
              </p>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {motivationalVideos.map(video => (
                <Card
                  key={video.id}
                  className="overflow-hidden hover:shadow-2xl transition-all cursor-pointer"
                  onClick={() => setSelectedVideo(video.videoUrl)}
                >
                  <div className="relative">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <Play className="h-16 w-16 text-white" />
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      {video.duration}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-2">{video.title}</h3>
                    <p className="text-sm text-gray-600">{video.description}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Depoimentos */}
        {activeTab === 'testimonials' && (
          <div className="space-y-6">
            <Card className="p-6 bg-gradient-to-r from-green-100 to-teal-100">
              <p className="text-gray-700">
                Histórias reais de pessoas que superaram ansiedade, depressão e crises. Você não está sozinho(a).
              </p>
            </Card>

            <div className="space-y-4">
              {testimonials.map(testimonial => (
                <Card key={testimonial.id} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                      {testimonial.name[0]}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-gray-800">{testimonial.name}, {testimonial.age} anos</h3>
                        <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                          {categoryLabels[testimonial.category]}
                        </span>
                      </div>
                      <p className="text-gray-700 leading-relaxed mb-4">{testimonial.story}</p>
                      <div className="flex items-center gap-4">
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                          onClick={() => setSelectedVideo(testimonial.videoUrl)}
                        >
                          <Play className="h-4 w-4 mr-2" />
                          Assistir Depoimento ({testimonial.duration})
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Modal de Vídeo */}
        {selectedVideo && (
          <div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedVideo(null)}
          >
            <div className="w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
              <div className="bg-white rounded-lg overflow-hidden">
                <div className="aspect-video">
                  <iframe
                    src={selectedVideo}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="p-4 flex justify-end">
                  <Button onClick={() => setSelectedVideo(null)}>Fechar</Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
