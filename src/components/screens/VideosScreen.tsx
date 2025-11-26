'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { IMMERSIVE_VIDEOS } from '@/lib/constants';
import { ArrowLeft, Play, Volume2, Maximize } from 'lucide-react';

interface VideosScreenProps {
  onBack: () => void;
}

export default function VideosScreen({ onBack }: VideosScreenProps) {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const [isFullscreen, setIsFullscreen] = useState(false);

  const categories = [
    { id: 'all', label: 'Todos' },
    { id: 'ocean', label: 'Mar' },
    { id: 'rain', label: 'Chuva' },
    { id: 'wind', label: 'Vento' },
    { id: 'river', label: 'Rio' },
    { id: 'fireplace', label: 'Fogueira' },
    { id: 'nature', label: 'Natureza' }
  ];

  const filteredVideos = filter === 'all' 
    ? IMMERSIVE_VIDEOS 
    : IMMERSIVE_VIDEOS.filter(vid => vid.category === filter);

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-purple-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button
            onClick={onBack}
            variant="ghost"
            className="gap-2"
          >
            <ArrowLeft className="h-5 w-5" />
            Voltar
          </Button>
        </div>

        <div className="text-center space-y-2">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
            Vídeos Imersivos
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Experiências visuais e sonoras em alta qualidade. Use fones de ouvido para máxima imersão.
          </p>
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map(cat => (
            <Button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              variant={filter === cat.id ? 'default' : 'outline'}
              className={filter === cat.id ? 'bg-gradient-to-r from-indigo-500 to-purple-500' : ''}
            >
              {cat.label}
            </Button>
          ))}
        </div>

        {/* Grid de Vídeos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map(video => (
            <Card
              key={video.id}
              className="overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              onClick={() => setSelectedVideo(video.id)}
            >
              <div className="relative aspect-video bg-gray-900">
                <iframe
                  src={video.videoUrl}
                  title={video.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <div className="flex items-center gap-2 text-white mb-2">
                    {video.has3DAudio && (
                      <span className="flex items-center gap-1 text-xs bg-purple-500 px-2 py-1 rounded-full">
                        <Volume2 className="h-3 w-3" />
                        Áudio 3D
                      </span>
                    )}
                    <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                      {video.duration} min
                    </span>
                  </div>
                  <h3 className="font-semibold text-white">{video.title}</h3>
                  <p className="text-sm text-white/80">{video.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Modal de Vídeo em Tela Cheia */}
        {selectedVideo && isFullscreen && (
          <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
            {(() => {
              const video = IMMERSIVE_VIDEOS.find(vid => vid.id === selectedVideo);
              if (!video) return null;
              
              return (
                <div className="relative w-full h-full">
                  <Button
                    onClick={() => {
                      setIsFullscreen(false);
                      setSelectedVideo(null);
                    }}
                    className="absolute top-4 right-4 z-10 bg-white/20 backdrop-blur-sm hover:bg-white/30"
                  >
                    Fechar
                  </Button>
                  <iframe
                    src={video.videoUrl}
                    title={video.title}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              );
            })()}
          </div>
        )}

        {/* Dica de Uso */}
        <Card className="p-6 bg-gradient-to-r from-purple-100 to-pink-100 border-none">
          <div className="flex items-start gap-4">
            <Volume2 className="h-6 w-6 text-purple-600 flex-shrink-0 mt-1" />
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-800">Dica para Máxima Imersão</h3>
              <p className="text-sm text-gray-700">
                Use fones de ouvido para experimentar o áudio 3D completo. 
                Encontre um lugar confortável, feche os olhos se preferir, e deixe-se envolver pelos sons da natureza.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
