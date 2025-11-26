'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Heart, ThumbsUp, Send, TrendingUp, Clock } from 'lucide-react';

interface Post {
  id: string;
  content: string;
  likes: number;
  timestamp: Date;
  isLiked: boolean;
}

interface CommunityScreenProps {
  onBack: () => void;
}

export default function CommunityScreen({ onBack }: CommunityScreenProps) {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      content: 'Hoje consegui sair da cama e tomar café. Pode parecer pouco, mas para mim foi uma grande vitória. 💜',
      likes: 127,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      isLiked: false
    },
    {
      id: '2',
      content: 'Fiz meu primeiro exercício de respiração completo. Me senti mais calmo depois. Obrigado, app!',
      likes: 89,
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
      isLiked: false
    },
    {
      id: '3',
      content: 'Lembrete: está tudo bem não estar bem todos os dias. Você não está sozinho(a). 🌸',
      likes: 203,
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
      isLiked: false
    }
  ]);
  const [newPost, setNewPost] = useState('');
  const [filter, setFilter] = useState<'recent' | 'popular'>('recent');

  const handleLike = (postId: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, likes: post.isLiked ? post.likes - 1 : post.likes + 1, isLiked: !post.isLiked }
        : post
    ));
  };

  const handlePost = () => {
    if (!newPost.trim()) return;

    const post: Post = {
      id: Date.now().toString(),
      content: newPost,
      likes: 0,
      timestamp: new Date(),
      isLiked: false
    };

    setPosts(prev => [post, ...prev]);
    setNewPost('');
  };

  const filteredPosts = [...posts].sort((a, b) => {
    if (filter === 'popular') {
      return b.likes - a.likes;
    }
    return b.timestamp.getTime() - a.timestamp.getTime();
  });

  const getTimeAgo = (date: Date) => {
    const hours = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60));
    if (hours < 1) return 'Agora há pouco';
    if (hours === 1) return 'Há 1 hora';
    if (hours < 24) return `Há ${hours} horas`;
    const days = Math.floor(hours / 24);
    if (days === 1) return 'Há 1 dia';
    return `Há ${days} dias`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button onClick={onBack} variant="ghost" className="gap-2">
            <ArrowLeft className="h-5 w-5" />
            Voltar
          </Button>
          <h1 className="text-2xl font-bold text-gray-800">Comunidade</h1>
          <div className="w-20" />
        </div>

        {/* Descrição */}
        <Card className="p-6 bg-gradient-to-r from-purple-100 to-pink-100">
          <div className="flex items-start gap-4">
            <Heart className="h-6 w-6 text-purple-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Espaço Seguro de Compartilhamento</h3>
              <p className="text-sm text-gray-700">
                Compartilhe suas conquistas, reflexões e momentos. Apenas conteúdo positivo e acolhedor.
                Você pode curtir, mas não comentar - para manter o espaço seguro.
              </p>
            </div>
          </div>
        </Card>

        {/* Nova Publicação */}
        <Card className="p-6">
          <h3 className="font-semibold text-gray-800 mb-4">Compartilhe Algo</h3>
          <Textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="Compartilhe uma conquista, reflexão ou pensamento positivo..."
            className="mb-4 min-h-[100px]"
            maxLength={280}
          />
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">
              {newPost.length}/280 caracteres
            </span>
            <Button
              onClick={handlePost}
              disabled={!newPost.trim()}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              <Send className="h-4 w-4 mr-2" />
              Publicar
            </Button>
          </div>
        </Card>

        {/* Filtros */}
        <div className="flex gap-2">
          <Button
            variant={filter === 'recent' ? 'default' : 'outline'}
            onClick={() => setFilter('recent')}
            className={filter === 'recent' ? 'bg-gradient-to-r from-purple-500 to-pink-500' : ''}
          >
            <Clock className="h-4 w-4 mr-2" />
            Recentes
          </Button>
          <Button
            variant={filter === 'popular' ? 'default' : 'outline'}
            onClick={() => setFilter('popular')}
            className={filter === 'popular' ? 'bg-gradient-to-r from-purple-500 to-pink-500' : ''}
          >
            <TrendingUp className="h-4 w-4 mr-2" />
            Mais Curtidas
          </Button>
        </div>

        {/* Feed de Posts */}
        <div className="space-y-4">
          {filteredPosts.map(post => (
            <Card key={post.id} className="p-6 hover:shadow-lg transition-shadow">
              <p className="text-gray-800 leading-relaxed mb-4">{post.content}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">{getTimeAgo(post.timestamp)}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleLike(post.id)}
                  className={post.isLiked ? 'text-pink-500' : 'text-gray-500'}
                >
                  <ThumbsUp className={`h-4 w-4 mr-2 ${post.isLiked ? 'fill-current' : ''}`} />
                  {post.likes}
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Aviso */}
        <p className="text-xs text-center text-gray-500">
          🛡️ Conteúdo moderado automaticamente. Gatilhos e termos sensíveis são bloqueados.
        </p>
      </div>
    </div>
  );
}
