import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { message, history, userProfile, preferences } = await request.json();

    // Sistema de prompt terapêutico
    const systemPrompt = `Você é um robô-terapeuta empático e acolhedor do app "RespiraComigo". 

REGRAS FUNDAMENTAIS:
- Use linguagem extremamente empática, gentil e acolhedora
- NUNCA use palavras que possam intensificar tristeza ou ansiedade
- EVITE: "problema", "doença", "sintoma", "diagnóstico", "tratamento"
- USE: "momento difícil", "sentimento", "experiência", "jornada", "cuidado"
- Seja breve e direto (máximo 3-4 frases por resposta)
- Ofereça suporte prático e técnicas concretas
- Reconheça e valide os sentimentos do usuário
- Sugira exercícios de respiração, grounding ou atividades quando apropriado
- Mantenha tom esperançoso mas realista
- Lembre que você NÃO substitui profissionais de saúde mental

PERFIL DO USUÁRIO:
${userProfile ? `
- Nível de ansiedade: ${userProfile.anxietyLevel}
- Nível de depressão: ${userProfile.depressionLevel}
- Autoestima: ${userProfile.selfEsteemLevel}
- Estilo de enfrentamento: ${userProfile.copingStyle?.join(', ')}
` : 'Perfil não disponível'}

PREFERÊNCIAS:
${preferences?.religion ? `- Religião: ${preferences.religion}` : ''}
${preferences?.hobbies?.length > 0 ? `- Interesses: ${preferences.hobbies.join(', ')}` : ''}

HISTÓRICO RECENTE:
${history?.slice(-3).map((msg: any) => `${msg.role === 'user' ? 'Usuário' : 'Você'}: ${msg.content}`).join('\n')}

Responda de forma empática, prática e acolhedora.`;

    // Chamar OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
        temperature: 0.7,
        max_tokens: 300
      })
    });

    if (!response.ok) {
      throw new Error('Erro na API OpenAI');
    }

    const data = await response.json();
    const botMessage = data.choices[0].message.content;

    // Detectar se deve sugerir ações
    const suggestedActions = detectSuggestedActions(message, botMessage);

    return NextResponse.json({
      message: botMessage,
      suggestedActions
    });

  } catch (error) {
    console.error('Erro no chatbot:', error);
    
    // Fallback response
    return NextResponse.json({
      message: 'Eu ouço você. Seus sentimentos são válidos. Estou aqui para apoiar você. Como posso ajudar agora?',
      suggestedActions: [
        { type: 'breathing', id: 'cardiac', label: 'Respiração Guiada' }
      ]
    });
  }
}

function detectSuggestedActions(userMessage: string, botResponse: string) {
  const actions = [];
  const lowerMessage = (userMessage + ' ' + botResponse).toLowerCase();

  // Detectar necessidade de respiração
  if (lowerMessage.includes('respirar') || lowerMessage.includes('ansioso') || lowerMessage.includes('pânico')) {
    actions.push({ type: 'breathing', id: 'anti-panic', label: 'Respiração Anti-Pânico' });
  }

  // Detectar necessidade de relaxamento
  if (lowerMessage.includes('dormir') || lowerMessage.includes('sono') || lowerMessage.includes('cansado')) {
    actions.push({ type: 'music', id: 'rain-constant', label: 'Sons para Dormir' });
  }

  // Detectar necessidade de imagens calmantes
  if (lowerMessage.includes('triste') || lowerMessage.includes('mal')) {
    actions.push({ type: 'image', id: 'nature-1', label: 'Imagens Calmantes' });
  }

  return actions.length > 0 ? actions : undefined;
}
