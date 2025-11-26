// Constantes do RespiraComigo - Versão Expandida

import { BreathingExercise, TherapyTechnique, CalmingImage, ImmersiveVideo, RelaxationPlaylist, MicroActivity, GuidedSession } from './types';

export const BREATHING_EXERCISES: BreathingExercise[] = [
  {
    id: 'square',
    name: 'Respiração Quadrada',
    description: 'Técnica equilibrada que acalma a mente',
    pattern: { inhale: 4, hold: 4, exhale: 4, holdAfter: 4 },
    duration: 5,
    difficulty: 'easy',
    benefits: ['Reduz ansiedade', 'Melhora foco', 'Equilibra energia']
  },
  {
    id: '4-7-8',
    name: 'Respiração 4-7-8',
    description: 'Perfeita para relaxar e dormir melhor',
    pattern: { inhale: 4, hold: 7, exhale: 8 },
    duration: 5,
    difficulty: 'medium',
    benefits: ['Induz sono', 'Reduz estresse', 'Acalma sistema nervoso']
  },
  {
    id: 'cardiac',
    name: 'Coerência Cardíaca',
    description: 'Sincroniza coração e respiração',
    pattern: { inhale: 5, hold: 0, exhale: 5 },
    duration: 5,
    difficulty: 'easy',
    benefits: ['Regula emoções', 'Melhora clareza mental', 'Reduz pressão']
  },
  {
    id: 'anti-panic',
    name: 'Respiração Anti-Pânico',
    description: 'Para momentos de crise intensa',
    pattern: { inhale: 4, hold: 2, exhale: 6 },
    duration: 3,
    difficulty: 'easy',
    benefits: ['Controla pânico', 'Estabiliza rapidamente', 'Reduz taquicardia']
  },
  {
    id: 'sleep',
    name: 'Respiração para Sono',
    description: 'Prepara corpo e mente para descanso',
    pattern: { inhale: 4, hold: 4, exhale: 6, holdAfter: 2 },
    duration: 10,
    difficulty: 'easy',
    benefits: ['Facilita sono', 'Relaxa músculos', 'Acalma pensamentos']
  }
];

export const THERAPY_TECHNIQUES: TherapyTechnique[] = [
  {
    id: '5-4-3-2-1',
    name: 'Técnica 5-4-3-2-1',
    category: 'grounding',
    description: 'Reconecta você com o presente usando os sentidos',
    steps: [
      '5 coisas que você VÊ ao seu redor',
      '4 coisas que você pode TOCAR',
      '3 sons que você ESCUTA',
      '2 cheiros que você SENTE',
      '1 coisa que você pode SABOREAR'
    ],
    duration: 5,
    difficulty: 'easy'
  },
  {
    id: 'progressive-relaxation',
    name: 'Relaxamento Muscular Progressivo',
    category: 'relaxation',
    description: 'Libera tensão física acumulada',
    steps: [
      'Sente-se confortavelmente',
      'Contraia os músculos dos pés por 5 segundos',
      'Relaxe completamente por 10 segundos',
      'Suba para panturrilhas, coxas, abdômen',
      'Continue até chegar ao rosto',
      'Respire profundamente ao final'
    ],
    duration: 15,
    difficulty: 'medium'
  },
  {
    id: 'affirmations',
    name: 'Afirmações Guiadas',
    category: 'affirmation',
    description: 'Fortalece autoestima e pensamento positivo',
    steps: [
      'Encontre um lugar tranquilo',
      'Olhe-se no espelho (opcional)',
      'Repita em voz alta ou mentalmente',
      'Eu sou digno(a) de amor e respeito',
      'Eu estou fazendo o meu melhor',
      'Eu mereço paz e felicidade',
      'Respire e sinta as palavras'
    ],
    duration: 5,
    difficulty: 'easy'
  },
  {
    id: 'selfcare-checklist',
    name: 'Lista de Autocuidado',
    category: 'selfcare',
    description: 'Ações práticas para cuidar de você',
    steps: [
      'Beba um copo de água devagar',
      'Tome um banho quente relaxante',
      'Exponha-se à luz natural por 10 minutos',
      'Faça uma caminhada leve',
      'Coma algo nutritivo',
      'Alongue o corpo suavemente',
      'Ouça uma música que te acalma'
    ],
    duration: 30,
    difficulty: 'easy'
  }
];

export const CRISIS_INSTRUCTIONS = [
  'Coloque seus fones de ouvido, se possível',
  'Encoste suas costas em algo firme',
  'Vá para um lugar mais silencioso',
  'Beba água devagar, em pequenos goles',
  'Olhe ao seu redor e reconheça 5 objetos',
  'Toque algo próximo e sinta sua textura',
  'Respire comigo, vamos juntos'
];

export const MOTIVATIONAL_MESSAGES = {
  low: {
    morning: [
      'Bom dia. Você acordou, e isso já é uma vitória. Um passo de cada vez.',
      'Bom dia. Não há pressa. Seu ritmo é perfeito para você.',
      'Bom dia. Está tudo bem não estar bem. Você não está sozinho(a).',
      'Bom dia. Cada respiração é um novo começo. Você consegue.',
      'Bom dia. Sua presença no mundo importa, mesmo quando não parece.'
    ],
    afternoon: [
      'Boa tarde. Você chegou até aqui. Isso merece reconhecimento.',
      'Boa tarde. Descanse se precisar. Não há vergonha nisso.',
      'Boa tarde. Pequenos passos ainda são progresso.',
      'Boa tarde. Você está fazendo o melhor que pode, e isso é suficiente.',
      'Boa tarde. Lembre-se de beber água e respirar fundo.'
    ],
    evening: [
      'Boa noite. Você sobreviveu a mais um dia. Isso é corajoso.',
      'Boa noite. Descanse. Amanhã é um novo dia, sem pressão.',
      'Boa noite. Você merece paz e descanso.',
      'Boa noite. Solte o peso do dia. Você fez o suficiente.',
      'Boa noite. Respire fundo e permita-se relaxar.'
    ]
  },
  moderate: [
    'Você está mais forte do que imagina. Continue.',
    'Dias difíceis passam. Você já superou tantos.',
    'Lembre-se: você merece gentileza, especialmente a sua.',
    'Pequenos passos ainda são progresso. Celebre isso.',
    'Você está cuidando de si, e isso é corajoso.'
  ],
  high: [
    'Você está no caminho certo. Continue se cuidando.',
    'Sua jornada é única e valiosa. Siga em frente.',
    'Você tem conquistado muito. Reconheça seu esforço.',
    'Cada dia é uma oportunidade de crescer. Você está crescendo.',
    'Sua resiliência é inspiradora. Continue brilhando.'
  ],
  severe: [
    'Respire. Você está seguro(a) agora.',
    'Este momento vai passar. Você não está sozinho(a).',
    'Você é mais forte do que esta crise. Vamos juntos.',
    'Não há vergonha em pedir ajuda. Você merece apoio.',
    'Um segundo de cada vez. Você consegue.'
  ]
};

export const CALMING_IMAGES: CalmingImage[] = [
  {
    id: 'birds-1',
    title: 'Pássaros em Voo Livre',
    description: 'Observe o movimento suave e gracioso dos pássaros voando pelo céu azul',
    category: 'birds',
    imageUrl: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=1200&h=800&fit=crop',
    tags: ['liberdade', 'leveza', 'céu']
  },
  {
    id: 'butterfly-1',
    title: 'Borboleta em Movimento Lento',
    description: 'Uma borboleta colorida pousando delicadamente em uma flor',
    category: 'butterflies',
    imageUrl: 'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=1200&h=800&fit=crop',
    tags: ['transformação', 'delicadeza', 'natureza']
  },
  {
    id: 'forest-1',
    title: 'Floresta Verde e Viva',
    description: 'Árvores altas e verdes criando um ambiente de paz e renovação',
    category: 'forest',
    imageUrl: 'https://images.unsplash.com/photo-1511497584788-876760111969?w=1200&h=800&fit=crop',
    tags: ['paz', 'renovação', 'natureza']
  },
  {
    id: 'flowers-1',
    title: 'Flores ao Vento',
    description: 'Flores coloridas balançando suavemente com a brisa',
    category: 'flowers',
    imageUrl: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=1200&h=800&fit=crop',
    tags: ['beleza', 'suavidade', 'vida']
  },
  {
    id: 'mountains-1',
    title: 'Montanhas Ensolaradas',
    description: 'Vista majestosa de montanhas iluminadas pelo sol',
    category: 'mountains',
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop',
    tags: ['grandeza', 'perspectiva', 'força']
  },
  {
    id: 'sky-1',
    title: 'Céu Azul com Nuvens',
    description: 'Nuvens brancas flutuando em um céu azul infinito',
    category: 'sky',
    imageUrl: 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=1200&h=800&fit=crop',
    tags: ['infinito', 'leveza', 'esperança']
  },
  {
    id: 'waterfall-1',
    title: 'Cachoeira Serena',
    description: 'Água cristalina caindo suavemente entre rochas e vegetação',
    category: 'waterfall',
    imageUrl: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=1200&h=800&fit=crop',
    tags: ['fluidez', 'pureza', 'renovação']
  },
  {
    id: 'nature-1',
    title: 'Natureza em Movimento',
    description: 'Paisagem natural com movimento suave de folhas e água',
    category: 'nature',
    imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=800&fit=crop',
    tags: ['harmonia', 'equilíbrio', 'vida']
  }
];

export const IMMERSIVE_VIDEOS: ImmersiveVideo[] = [
  {
    id: 'ocean-waves',
    title: 'Ondas do Mar - Som Realista',
    description: 'Ondas chegando suavemente na praia com som 3D imersivo',
    category: 'ocean',
    videoUrl: 'https://www.youtube.com/embed/WHPEKLQID4U',
    duration: 180,
    has3DAudio: true,
    tags: ['mar', 'ondas', 'relaxamento']
  },
  {
    id: 'gentle-rain',
    title: 'Chuva Fina com Trovões Suaves',
    description: 'Chuva leve caindo com trovões distantes e relaxantes',
    category: 'rain',
    videoUrl: 'https://www.youtube.com/embed/q76bMs-NwRk',
    duration: 240,
    has3DAudio: true,
    tags: ['chuva', 'trovão', 'sono']
  },
  {
    id: 'wind-trees',
    title: 'Vento Entre as Árvores',
    description: 'Som suave do vento passando pelas folhas das árvores',
    category: 'wind',
    videoUrl: 'https://www.youtube.com/embed/eKFTSSKCzWA',
    duration: 120,
    has3DAudio: true,
    tags: ['vento', 'floresta', 'natureza']
  },
  {
    id: 'flowing-river',
    title: 'Rio Correndo',
    description: 'Água cristalina fluindo suavemente entre pedras',
    category: 'river',
    videoUrl: 'https://www.youtube.com/embed/uIb1JU9j-Bk',
    duration: 180,
    has3DAudio: true,
    tags: ['rio', 'água', 'paz']
  },
  {
    id: 'night-fireplace',
    title: 'Fogueira na Noite Silenciosa',
    description: 'Fogueira crepitando no silêncio da noite',
    category: 'fireplace',
    videoUrl: 'https://www.youtube.com/embed/L_LUpnjgPso',
    duration: 240,
    has3DAudio: true,
    tags: ['fogo', 'noite', 'aconchego']
  },
  {
    id: 'nature-3d',
    title: 'Natureza com Som 3D',
    description: 'Experiência imersiva completa na natureza',
    category: 'nature',
    videoUrl: 'https://www.youtube.com/embed/d0tU18Ybcvk',
    duration: 300,
    has3DAudio: true,
    tags: ['natureza', '3D', 'imersivo']
  }
];

export const RELAXATION_PLAYLISTS: RelaxationPlaylist[] = [
  {
    id: 'rain-constant',
    title: 'Chuva Constante - 6 Horas',
    description: 'Som contínuo de chuva para relaxamento profundo',
    category: 'rain',
    audioUrl: 'https://www.youtube.com/embed/q76bMs-NwRk',
    duration: 6,
    loopable: true,
    has3DAudio: true
  },
  {
    id: 'ocean-deep',
    title: 'Mar e Ondas Profundas - 4 Horas',
    description: 'Ondas do oceano em loop contínuo',
    category: 'ocean',
    audioUrl: 'https://www.youtube.com/embed/WHPEKLQID4U',
    duration: 4,
    loopable: true,
    has3DAudio: true
  },
  {
    id: 'gentle-wind',
    title: 'Vento Suave - 3 Horas',
    description: 'Brisa leve e constante para meditação',
    category: 'wind',
    audioUrl: 'https://www.youtube.com/embed/eKFTSSKCzWA',
    duration: 3,
    loopable: true,
    has3DAudio: true
  },
  {
    id: 'living-forest',
    title: 'Floresta Viva - 5 Horas',
    description: 'Sons da natureza em floresta tropical',
    category: 'forest',
    audioUrl: 'https://www.youtube.com/embed/d0tU18Ybcvk',
    duration: 5,
    loopable: true,
    has3DAudio: true
  },
  {
    id: 'white-noise',
    title: 'Ruído Branco - 8 Horas',
    description: 'Som constante para foco e sono profundo',
    category: 'white-noise',
    audioUrl: 'https://www.youtube.com/embed/nMfPqeZjc2c',
    duration: 8,
    loopable: true,
    has3DAudio: false
  },
  {
    id: 'pink-noise',
    title: 'Ruído Rosa - 8 Horas',
    description: 'Frequência balanceada para relaxamento',
    category: 'pink-noise',
    audioUrl: 'https://www.youtube.com/embed/ZXtimhT-ff4',
    duration: 8,
    loopable: true,
    has3DAudio: false
  },
  {
    id: 'fireplace-crackle',
    title: 'Fogueira e Estalos - 4 Horas',
    description: 'Som aconchegante de lareira',
    category: 'fireplace',
    audioUrl: 'https://www.youtube.com/embed/L_LUpnjgPso',
    duration: 4,
    loopable: true,
    has3DAudio: true
  },
  {
    id: 'instrumental-light',
    title: 'Instrumental Leve - 3 Horas',
    description: 'Música suave para relaxamento',
    category: 'instrumental',
    audioUrl: 'https://www.youtube.com/embed/lTRiuFIWV54',
    duration: 3,
    loopable: true,
    has3DAudio: false
  }
];

export const MICRO_ACTIVITIES: MicroActivity[] = [
  {
    id: 'water',
    title: 'Beba Água',
    description: 'Levante e tome um copo de água devagar',
    duration: 60,
    category: 'hydration',
    icon: 'Droplet'
  },
  {
    id: 'window',
    title: 'Abra a Janela',
    description: 'Abra a janela por 1 minuto e respire o ar fresco',
    duration: 60,
    category: 'sensory',
    icon: 'Wind'
  },
  {
    id: 'nature-sound',
    title: 'Som da Natureza',
    description: 'Escute 1 som da natureza por alguns minutos',
    duration: 120,
    category: 'sensory',
    icon: 'Volume2'
  },
  {
    id: 'shoulders',
    title: 'Mova os Ombros',
    description: 'Mova os ombros devagar por 15 segundos',
    duration: 15,
    category: 'movement',
    icon: 'Move'
  },
  {
    id: 'stretch',
    title: 'Alongue-se',
    description: 'Levante os braços e alongue o corpo suavemente',
    duration: 30,
    category: 'movement',
    icon: 'Maximize2'
  },
  {
    id: 'deep-breath',
    title: 'Respire Fundo',
    description: 'Faça 3 respirações profundas e lentas',
    duration: 30,
    category: 'breathing',
    icon: 'Wind'
  },
  {
    id: 'walk',
    title: 'Caminhe um Pouco',
    description: 'Dê alguns passos pela casa ou ambiente',
    duration: 120,
    category: 'movement',
    icon: 'Footprints'
  },
  {
    id: 'touch',
    title: 'Toque Algo',
    description: 'Toque um objeto próximo e sinta sua textura',
    duration: 30,
    category: 'sensory',
    icon: 'Hand'
  }
];

export const GUIDED_SESSIONS: GuidedSession[] = [
  {
    id: 'welcome-session',
    title: 'Sessão de Acolhimento',
    type: 'welcome',
    audioScript: [
      'Olá. Seja muito bem-vindo(a).',
      'Este é um espaço seguro, criado especialmente para você.',
      'Aqui, não há julgamentos. Apenas acolhimento.',
      'Você pode sentir o que precisa sentir.',
      'Vamos caminhar juntos, no seu ritmo.',
      'Respire fundo. Você está seguro(a).'
    ],
    duration: 3,
    voiceGuidance: true
  },
  {
    id: 'grounding-5-4-3-2-1',
    title: 'Grounding 5-4-3-2-1',
    type: 'grounding',
    audioScript: [
      'Vamos nos reconectar com o presente.',
      'Olhe ao seu redor. Identifique 5 coisas que você pode VER.',
      'Agora, 4 coisas que você pode TOCAR. Sinta as texturas.',
      'Escute com atenção. 3 sons que você pode OUVIR.',
      '2 cheiros que você consegue SENTIR no ambiente.',
      'E 1 coisa que você pode SABOREAR, mesmo que seja só a lembrança.',
      'Respire. Você está aqui. Você está presente.'
    ],
    duration: 5,
    voiceGuidance: true
  },
  {
    id: 'breathing-4-7-8',
    title: 'Respiração 4-7-8 Guiada',
    type: 'breathing',
    audioScript: [
      'Vamos respirar juntos.',
      'Inspire pelo nariz contando até 4.',
      'Segure o ar contando até 7.',
      'Solte pela boca contando até 8.',
      'Vamos repetir. Inspire... 2, 3, 4.',
      'Segure... 2, 3, 4, 5, 6, 7.',
      'Solte... 2, 3, 4, 5, 6, 7, 8.',
      'Continue no seu ritmo. Você está indo muito bem.'
    ],
    duration: 5,
    voiceGuidance: true
  },
  {
    id: 'affirmations-positive',
    title: 'Afirmações Positivas',
    type: 'affirmation',
    audioScript: [
      'Vamos fortalecer pensamentos gentis sobre você.',
      'Repita comigo, em voz alta ou mentalmente.',
      'Eu sou digno(a) de amor e respeito.',
      'Eu estou fazendo o meu melhor.',
      'Eu mereço paz e felicidade.',
      'Eu sou mais forte do que imagino.',
      'Eu permito-me sentir e curar.',
      'Respire fundo. Você acredita nisso.'
    ],
    duration: 5,
    voiceGuidance: true
  },
  {
    id: 'muscle-relaxation',
    title: 'Relaxamento Muscular',
    type: 'relaxation',
    audioScript: [
      'Vamos liberar a tensão do seu corpo.',
      'Sente-se ou deite-se confortavelmente.',
      'Contraia os músculos dos pés por 5 segundos.',
      'Agora relaxe completamente. Sinta a diferença.',
      'Suba para as panturrilhas. Contraia... e relaxe.',
      'Continue subindo: coxas, abdômen, peito, braços.',
      'Chegue até o rosto. Contraia... e solte tudo.',
      'Respire profundamente. Seu corpo está mais leve.'
    ],
    duration: 15,
    voiceGuidance: true
  }
];

export const HOPE_MESSAGES = [
  'Você não está sozinho(a). Muitas pessoas sentem o que você sente.',
  'Este momento difícil não define quem você é.',
  'Cada dia é uma nova chance de recomeçar, sem pressão.',
  'Está tudo bem pedir ajuda. Isso é sinal de coragem.',
  'Você já sobreviveu a 100% dos seus piores dias.',
  'Pequenas vitórias merecem ser celebradas.',
  'Sua jornada é única. Não compare seu capítulo 1 com o capítulo 20 de outra pessoa.',
  'Sentir não é fraqueza. É ser humano.',
  'Você está fazendo o melhor que pode, e isso é suficiente.',
  'Amanhã pode ser diferente. Dê uma chance ao amanhã.'
];

export const AMBIENT_SOUNDS = [
  { id: 'rain', name: 'Chuva Suave', icon: 'CloudRain' },
  { id: 'ocean', name: 'Ondas do Mar', icon: 'Waves' },
  { id: 'piano', name: 'Piano Relaxante', icon: 'Music' },
  { id: 'wind', name: 'Vento Leve', icon: 'Wind' },
  { id: 'forest', name: 'Floresta', icon: 'Trees' },
  { id: 'fireplace', name: 'Lareira', icon: 'Flame' }
];

export const EMERGENCY_CONTACTS = {
  cvv: {
    name: 'CVV - Centro de Valorização da Vida',
    phone: '188',
    description: 'Apoio emocional e prevenção do suicídio. Atende 24h, gratuitamente.'
  },
  samu: {
    name: 'SAMU',
    phone: '192',
    description: 'Serviço de Atendimento Móvel de Urgência'
  },
  caps: {
    name: 'CAPS',
    phone: '0800-761-0800',
    description: 'Centro de Atenção Psicossocial - Saúde Mental'
  }
};

export const COLORS = {
  primary: {
    blue: '#6B9BD1',
    purple: '#B4A7D6',
    green: '#A8D5BA',
    cream: '#F5F1E8'
  },
  mood: {
    'very-bad': '#E57373',
    'bad': '#FFB74D',
    'neutral': '#FFD54F',
    'good': '#AED581',
    'very-good': '#81C784'
  }
};
