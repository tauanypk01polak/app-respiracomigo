'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RELAXATION_PLAYLISTS } from '@/lib/constants';
import { ArrowLeft, Play, Pause, Volume2, Repeat, Clock } from 'lucide-react';

interface PlaylistsScreenProps {
  onBack: () => void;
}

export default function PlaylistsScreen({ onBack }: PlaylistsScreenProps) {
  const [selectedPlaylist, setSelectedPlaylist] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [filter, setFilter] = useState<string>('all');
  const [timer, setTimer] = useState<number | null>(null);

  const categories = [
    { id: 'all', label: 'Todas' },
    { id: 'rain', label: 'Chuva' },
    { id: 'ocean', label: 'Mar' },
    { id: 'wind', label: 'Vento' },
    { id: 'forest', label: 'Floresta' },
    { id: 'white-noise', label: 'Ruído Branco' },
    { id: 'pink-noise', label: 'Ruído Rosa' },
    { id: 'fireplace', label: 'Fogueira' },
    { id: 'instrumental', label: 'Instrumental' }
  ];

  const timerOptions = [
    { value: 30, label: '30 min' },
    { value: 60, label: '1 hora' },
    { value: 120, label: '2 horas' },
    { value: 180, label: '3 horas' },
    { value: null, label: 'Sem timer' }
  ];

  const filteredPlaylists = filter === 'all' 
    ? RELAXATION_PLAYLISTS 
    : RELAXATION_PLAYLISTS.filter(pl => pl.category === filter);

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-cyan-50 p-4 sm:p-6 lg:p-8">
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
            Playlists de Relaxamento
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Sons contínuos de 1 a 8 horas para relaxamento profundo, meditação e sono.
          </p>
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map(cat => (
            <Button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              variant={filter === cat.id ? 'default' : 'outline'}
              className={filter === cat.id ? 'bg-gradient-to-r from-teal-500 to-cyan-500' : ''}
            >
              {cat.label}
            </Button>
          ))}
        </div>

        {/* Player Ativo */}
        {selectedPlaylist && (
          <Card className="p-6 bg-gradient-to-r from-teal-100 to-cyan-100 border-none">
            {(() => {
              const playlist = RELAXATION_PLAYLISTS.find(pl => pl.id === selectedPlaylist);
              if (!playlist) return null;

              return (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">{playlist.title}</h3>
                      <p className="text-sm text-gray-600">{playlist.description}</p>
                    </div>
                    <Button
                      size="lg"
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600"
                    >
                      {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                    </Button>
                  </div>

                  {/* Player de Áudio */}
                  <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden">
                    <iframe
                      src={playlist.audioUrl}
                      title={playlist.title}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>

                  {/* Controles */}
                  <div className="flex flex-wrap gap-4 items-center justify-between">
                    <div className="flex items-center gap-2">
                      {playlist.has3DAudio && (
                        <span className="flex items-center gap-1 text-sm bg-teal-500 text-white px-3 py-1 rounded-full">
                          <Volume2 className="h-4 w-4" />
                          Áudio 3D
                        </span>
                      )}
                      {playlist.loopable && (
                        <span className="flex items-center gap-1 text-sm bg-cyan-500 text-white px-3 py-1 rounded-full">
                          <Repeat className="h-4 w-4" />
                          Loop
                        </span>
                      )}
                      <span className="text-sm text-gray-700">
                        Duração: {playlist.duration}h
                      </span>
                    </div>

                    {/* Timer para Sono */}
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-gray-600" />
                      <span className="text-sm text-gray-700">Timer:</span>
                      <div className="flex gap-1">
                        {timerOptions.map(option => (
                          <Button
                            key={option.label}
                            size="sm"
                            variant={timer === option.value ? 'default' : 'outline'}
                            onClick={() => setTimer(option.value)}
                          >
                            {option.label}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </Card>
        )}

        {/* Grid de Playlists */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlaylists.map(playlist => (
            <Card
              key={playlist.id}
              className={`p-6 cursor-pointer hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${
                selectedPlaylist === playlist.id ? 'ring-4 ring-teal-500' : ''
              }`}
              onClick={() => setSelectedPlaylist(playlist.id)}
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      {playlist.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      {playlist.description}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-teal-500 to-cyan-500"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPlaylist(playlist.id);
                      setIsPlaying(true);
                    }}
                  >
                    <Play className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {playlist.has3DAudio && (
                    <span className="flex items-center gap-1 text-xs bg-teal-100 text-teal-700 px-2 py-1 rounded-full">
                      <Volume2 className="h-3 w-3" />
                      3D
                    </span>
                  )}
                  {playlist.loopable && (
                    <span className="flex items-center gap-1 text-xs bg-cyan-100 text-cyan-700 px-2 py-1 rounded-full">
                      <Repeat className="h-3 w-3" />
                      Loop
                    </span>
                  )}
                  <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                    {playlist.duration}h
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Dica de Uso */}
        <Card className="p-6 bg-gradient-to-r from-teal-100 to-cyan-100 border-none">
          <div className="flex items-start gap-4">
            <Volume2 className="h-6 w-6 text-teal-600 flex-shrink-0 mt-1" />
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-800">Modo Fone de Ouvido 3D</h3>
              <p className="text-sm text-gray-700">
                Para experiência máxima, use fones de ouvido de qualidade. 
                Os sons marcados com "3D" possuem áudio estéreo imersivo que simula ambiente real.
                Configure o timer para que a música pare automaticamente enquanto você dorme.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
