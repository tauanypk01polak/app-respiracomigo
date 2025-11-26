'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CALMING_IMAGES } from '@/lib/constants';
import { ArrowLeft, Maximize2, X } from 'lucide-react';

interface ImagesScreenProps {
  onBack: () => void;
}

export default function ImagesScreen({ onBack }: ImagesScreenProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'Todas' },
    { id: 'birds', label: 'Pássaros' },
    { id: 'butterflies', label: 'Borboletas' },
    { id: 'forest', label: 'Florestas' },
    { id: 'flowers', label: 'Flores' },
    { id: 'mountains', label: 'Montanhas' },
    { id: 'sky', label: 'Céu' },
    { id: 'waterfall', label: 'Cachoeiras' },
    { id: 'nature', label: 'Natureza' }
  ];

  const filteredImages = filter === 'all' 
    ? CALMING_IMAGES 
    : CALMING_IMAGES.filter(img => img.category === filter);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50 p-4 sm:p-6 lg:p-8">
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
            Imagens Calmantes
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Contemple a beleza da natureza. Cada imagem foi escolhida para trazer paz e serenidade.
          </p>
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map(cat => (
            <Button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              variant={filter === cat.id ? 'default' : 'outline'}
              className={filter === cat.id ? 'bg-gradient-to-r from-blue-500 to-green-500' : ''}
            >
              {cat.label}
            </Button>
          ))}
        </div>

        {/* Grid de Imagens */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map(image => (
            <Card
              key={image.id}
              className="overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              onClick={() => setSelectedImage(image.id)}
            >
              <div className="relative aspect-video">
                <img
                  src={image.imageUrl}
                  alt={image.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                  <div className="text-white">
                    <h3 className="font-semibold text-lg">{image.title}</h3>
                    <p className="text-sm opacity-90">{image.description}</p>
                  </div>
                </div>
                <Button
                  size="sm"
                  className="absolute top-2 right-2 bg-white/20 backdrop-blur-sm hover:bg-white/30"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImage(image.id);
                  }}
                >
                  <Maximize2 className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Modal de Imagem Expandida */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            {(() => {
              const image = CALMING_IMAGES.find(img => img.id === selectedImage);
              if (!image) return null;
              
              return (
                <div className="relative max-w-6xl w-full" onClick={(e) => e.stopPropagation()}>
                  <Button
                    onClick={() => setSelectedImage(null)}
                    className="absolute -top-12 right-0 bg-white/20 backdrop-blur-sm hover:bg-white/30"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                  <img
                    src={image.imageUrl}
                    alt={image.title}
                    className="w-full h-auto rounded-lg shadow-2xl"
                  />
                  <div className="mt-4 text-center text-white space-y-2">
                    <h2 className="text-2xl font-bold">{image.title}</h2>
                    <p className="text-lg opacity-90">{image.description}</p>
                    <div className="flex flex-wrap gap-2 justify-center mt-4">
                      {image.tags.map(tag => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        )}
      </div>
    </div>
  );
}
