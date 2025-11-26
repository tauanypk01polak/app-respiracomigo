'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { ArrowLeft, Bell, Volume2, Heart, Palette, Filter } from 'lucide-react';
import { useApp } from '@/lib/context';

interface SettingsScreenProps {
  onBack: () => void;
}

export default function SettingsScreen({ onBack }: SettingsScreenProps) {
  const { userData, updatePreferences } = useApp();
  const [activeTab, setActiveTab] = useState<'filters' | 'notifications' | 'audio' | 'layout'>('filters');

  const hobbiesOptions = [
    'Jogos', 'Esportes', 'Musculação', 'Caminhada', 'Comida',
    'Estudos', 'Cinema', 'Arte', 'Natureza', 'Música', 'Leitura', 'Produtividade'
  ];

  const crisisTypesOptions = [
    'Pânico', 'Tristeza Profunda', 'Irritação', 'Ansiedade Social',
    'Insônia', 'Baixa Autoestima', 'Solidão', 'Estresse'
  ];

  const religionOptions = [
    { value: 'none', label: 'Nenhuma / Prefiro não informar' },
    { value: 'christian', label: 'Cristianismo' },
    { value: 'muslim', label: 'Islamismo' },
    { value: 'jewish', label: 'Judaísmo' },
    { value: 'buddhist', label: 'Budismo' },
    { value: 'spiritist', label: 'Espiritismo' },
    { value: 'umbanda', label: 'Umbanda/Candomblé' },
    { value: 'other', label: 'Outra' }
  ];

  const layoutOptions = [
    { value: 'nature', label: 'Natureza', description: 'Paisagens, flores, céu' },
    { value: 'religious', label: 'Religioso', description: 'Frases espirituais' },
    { value: 'sport', label: 'Esportivo', description: 'Motivação fitness' },
    { value: 'gamer', label: 'Gamer', description: 'Estilo gaming' },
    { value: 'minimal', label: 'Minimalista', description: 'Limpo e simples' },
    { value: 'motivational', label: 'Motivacional', description: 'Frases inspiradoras' },
    { value: 'focus', label: 'Foco e Estudo', description: 'Produtividade' }
  ];

  const toggleHobby = (hobby: string) => {
    const current = userData.preferences.hobbies;
    const updated = current.includes(hobby)
      ? current.filter(h => h !== hobby)
      : [...current, hobby];
    updatePreferences({ hobbies: updated });
  };

  const toggleCrisisType = (type: string) => {
    const current = userData.preferences.crisisTypes;
    const updated = current.includes(type)
      ? current.filter(t => t !== type)
      : [...current, type];
    updatePreferences({ crisisTypes: updated });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button onClick={onBack} variant="ghost" className="gap-2">
            <ArrowLeft className="h-5 w-5" />
            Voltar
          </Button>
          <h1 className="text-2xl font-bold text-gray-800">Personalizar App</h1>
          <div className="w-20" />
        </div>

        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {[
            { id: 'filters', label: 'Filtros', icon: Filter },
            { id: 'layout', label: 'Layout', icon: Palette },
            { id: 'notifications', label: 'Notificações', icon: Bell },
            { id: 'audio', label: 'Áudio', icon: Volume2 }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <Button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                variant={activeTab === tab.id ? 'default' : 'outline'}
                className={activeTab === tab.id ? 'bg-gradient-to-r from-purple-500 to-pink-500' : ''}
              >
                <Icon className="h-4 w-4 mr-2" />
                {tab.label}
              </Button>
            );
          })}
        </div>

        {/* Filtros */}
        {activeTab === 'filters' && (
          <div className="space-y-6">
            {/* Religião */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Religião (Opcional)</h3>
              <p className="text-sm text-gray-600 mb-4">
                Personalize mensagens e conteúdos conforme sua fé. Totalmente opcional.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {religionOptions.map(option => (
                  <Button
                    key={option.value}
                    variant={userData.preferences.religion === option.value ? 'default' : 'outline'}
                    className={userData.preferences.religion === option.value 
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500' 
                      : ''
                    }
                    onClick={() => updatePreferences({ religion: option.value as any })}
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </Card>

            {/* Hobbies */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Seus Interesses</h3>
              <p className="text-sm text-gray-600 mb-4">
                Selecione seus hobbies para personalizar conteúdos
              </p>
              <div className="flex flex-wrap gap-2">
                {hobbiesOptions.map(hobby => (
                  <Button
                    key={hobby}
                    size="sm"
                    variant={userData.preferences.hobbies.includes(hobby) ? 'default' : 'outline'}
                    className={userData.preferences.hobbies.includes(hobby)
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500'
                      : ''
                    }
                    onClick={() => toggleHobby(hobby)}
                  >
                    {hobby}
                  </Button>
                ))}
              </div>
            </Card>

            {/* Tipos de Crise */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Tipos de Crise que Você Enfrenta</h3>
              <p className="text-sm text-gray-600 mb-4">
                Ajuda o app a personalizar técnicas e conteúdos
              </p>
              <div className="flex flex-wrap gap-2">
                {crisisTypesOptions.map(type => (
                  <Button
                    key={type}
                    size="sm"
                    variant={userData.preferences.crisisTypes.includes(type) ? 'default' : 'outline'}
                    className={userData.preferences.crisisTypes.includes(type)
                      ? 'bg-gradient-to-r from-orange-500 to-red-500'
                      : ''
                    }
                    onClick={() => toggleCrisisType(type)}
                  >
                    {type}
                  </Button>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* Layout */}
        {activeTab === 'layout' && (
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Escolha o Layout da Tela Inicial</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {layoutOptions.map(layout => (
                <Card
                  key={layout.value}
                  className={`p-4 cursor-pointer transition-all ${
                    userData.preferences.homeLayout === layout.value
                      ? 'border-2 border-purple-500 bg-purple-50'
                      : 'hover:border-purple-200'
                  }`}
                  onClick={() => updatePreferences({ homeLayout: layout.value as any })}
                >
                  <h4 className="font-semibold text-gray-800">{layout.label}</h4>
                  <p className="text-sm text-gray-600">{layout.description}</p>
                </Card>
              ))}
            </div>
          </Card>
        )}

        {/* Notificações */}
        {activeTab === 'notifications' && (
          <Card className="p-6 space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Notificações Motivacionais</h3>
              <p className="text-sm text-gray-600 mb-4">
                Receba mensagens personalizadas ao longo do dia
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Bom Dia (8h)</Label>
                  <p className="text-sm text-gray-500">Mensagem motivacional matinal</p>
                </div>
                <Switch
                  checked={userData.preferences.notifications.morning}
                  onCheckedChange={(checked) => 
                    updatePreferences({
                      notifications: { ...userData.preferences.notifications, morning: checked }
                    })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Boa Tarde (14h)</Label>
                  <p className="text-sm text-gray-500">Estímulo para continuar o dia</p>
                </div>
                <Switch
                  checked={userData.preferences.notifications.afternoon}
                  onCheckedChange={(checked) => 
                    updatePreferences({
                      notifications: { ...userData.preferences.notifications, afternoon: checked }
                    })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Boa Noite (20h)</Label>
                  <p className="text-sm text-gray-500">Mensagem de acolhimento noturno</p>
                </div>
                <Switch
                  checked={userData.preferences.notifications.evening}
                  onCheckedChange={(checked) => 
                    updatePreferences({
                      notifications: { ...userData.preferences.notifications, evening: checked }
                    })
                  }
                />
              </div>
            </div>
          </Card>
        )}

        {/* Áudio */}
        {activeTab === 'audio' && (
          <Card className="p-6 space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Configurações de Áudio</h3>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Áudio de Fundo</Label>
                  <p className="text-sm text-gray-500">Continua tocando com tela desligada</p>
                </div>
                <Switch
                  checked={userData.preferences.audioSettings.backgroundAudio}
                  onCheckedChange={(checked) => 
                    updatePreferences({
                      audioSettings: { ...userData.preferences.audioSettings, backgroundAudio: checked }
                    })
                  }
                />
              </div>

              <div>
                <Label>Temporizador de Sono (minutos)</Label>
                <p className="text-sm text-gray-500 mb-2">
                  Áudio desliga após {userData.preferences.audioSettings.sleepTimer} minutos de inatividade
                </p>
                <Slider
                  value={[userData.preferences.audioSettings.sleepTimer]}
                  onValueChange={([value]) => 
                    updatePreferences({
                      audioSettings: { ...userData.preferences.audioSettings, sleepTimer: value }
                    })
                  }
                  min={5}
                  max={120}
                  step={5}
                />
              </div>

              <div>
                <Label>Volume Padrão</Label>
                <p className="text-sm text-gray-500 mb-2">
                  {userData.preferences.audioSettings.volume}%
                </p>
                <Slider
                  value={[userData.preferences.audioSettings.volume]}
                  onValueChange={([value]) => 
                    updatePreferences({
                      audioSettings: { ...userData.preferences.audioSettings, volume: value }
                    })
                  }
                  min={0}
                  max={100}
                  step={5}
                />
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
