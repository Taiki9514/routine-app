import { useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';

const EXPERTS = [
  { id: 'sc',   name: 'S&Cコーチ',  icon: '🏋️', color: '#4ade80',  role: '筋トレ・体組成の専門家' },
  { id: 'nut',  name: '栄養士',     icon: '🥗',  color: '#fbbf24',  role: '食事・栄養の専門家' },
  { id: 'run',  name: 'ランコーチ', icon: '🏃',  color: '#60a5fa',  role: 'ランニング・有酸素の専門家' },
  { id: 'data', name: 'データ分析', icon: '📊',  color: '#a78bfa',  role: 'Apple Watch・数値分析の専門家' },
  { id: 'psy',  name: '心理士',     icon: '🧠',  color: '#f97316',  role: '習慣・メンタルの専門家' },
];

const MODES = [
  { id: 'solo',  label: '👤 専門家1人', sub: '軽い質問向け' },
  { id: 'team',  label: '👥 チーム会議', sub: '複合的な相談' },
  { id: 'maint', label: '🔧 保守チーム', sub: 'アプリ変更' },
];

const SUGGESTS = [
  '今日の筋トレメニューは？',
  'チートデイのタイミングは？',
  'ランニングの心拍数が高い',
  '睡眠の質を上げたい',
  '体脂肪を減らすには？',
];

const SYSTEM_PROMPT = `あなたは須田大輝さんの専属フィットネス・ライフスタイルチームのAIエージェントです。

【須田大輝さんのプロフィール】
- 172cm、体重63.8kg、体脂肪率19.8%（目標15.0%）
- 骨格筋率37.6%、内臓脂肪レベル6、基礎代謝1,571kcal
- 16週間の体質改善プログラム実施中（現在Week 6）
- 月水金：筋トレ（腕立て・膝コロ・クランチ等）
- 火木土：ランニング（目標心拍111〜130bpm、5km）
- Apple Watchで心拍・睡眠・VO2Maxを計測中
- 副業・AI・仮想通貨・釣り・ウイスキー・ポケポケに興味あり

【回答ルール】
- 日本語で回答する
- 具体的で実践的なアドバイスを提供する
- 須田さんのデータや目標に基づいた個別アドバイスをする
- 返答は200文字以内でコンパクトにまとめる
- 専門用語は避け、わかりやすい言葉で説明する`;

export default function AiChat() {
  const navigate = useNavigate();
  const [mode, setMode] = useState('team');
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      expert: EXPERTS[0],
      content: 'こんにちは！今日は筋トレの日ですね💪 チーム全員でサポートします。何でも相談してください！',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const getExpertForQuestion = (question) => {
    const q = question.toLowerCase();
    if (q.includes('筋トレ') || q.includes('腕立て') || q.includes('腹筋') || q.includes('体脂肪')) return EXPERTS[0];
    if (q.includes('食事') || q.includes('栄養') || q.includes('プロテイン') || q.includes('カロリー') || q.includes('チートデイ')) return EXPERTS[1];
    if (q.includes('ラン') || q.includes('走') || q.includes('心拍') || q.includes('VO2')) return EXPERTS[2];
    if (q.includes('apple') || q.includes('watch') || q.includes('データ') || q.includes('計測')) return EXPERTS[3];
    if (q.includes('睡眠') || q.includes('習慣') || q.includes('モチベ') || q.includes('やる気')) return EXPERTS[4];
    return mode === 'solo' ? EXPERTS[0] : null; // nullはチーム全員
  };

  const sendMessage = async (text) => {
    const userMsg = text.trim();
    if (!userMsg || loading) return;

    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);

    const expert = getExpertForQuestion(userMsg);
    const respondingExperts = mode === 'solo' || expert
      ? [expert || EXPERTS[0]]
      : EXPERTS.slice(0, 3); // チームモードは3人まで

    try {
      for (const exp of respondingExperts) {
        const expertPrompt = `${SYSTEM_PROMPT}\n\nあなたは今、${exp.role}として回答してください。`;
        const res = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model: 'claude-haiku-4-5-20251001',
            max_tokens: 1000,
            system: expertPrompt,
            messages: [
              ...messages
                .filter(m => m.role === 'user' || m.role === 'assistant')
                .map(m => ({ role: m.role, content: m.content })),
              { role: 'user', content: userMsg },
            ],
          }),
        });
        const data = await res.json();
        const reply = data.content?.[0]?.text || '申し訳ありません、回答を取得できませんでした。';
        setMessages(prev => [...prev, { role: 'assistant', expert: exp, content: reply }]);
      }
    } catch (e) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        expert: EXPERTS[0],
        content: '⚠️ 通信エラーが発生しました。インターネット接続を確認してください。',
      }]);
    }
    setLoading(false);
  };

  return (
    <div className="page">
      <div className="topbar">
        <div className="back-btn" onClick={() => navigate(-1)}>
          <i className="ti ti-arrow-left" /> 戻る
        </div>
        <div className="page-title">AI質問欄</div>
        <div style={{ width: 40 }} />
      </div>

      {/* モード選択 */}
      <div style={{ display: 'flex', gap: 6, padding: '8px 12px 0', flexShrink: 0 }}>
        {MODES.map(m => (
          <button
            key={m.id}
            onClick={() => setMode(m.id)}
            style={{
              flex: 1, padding: '5px 4px', borderRadius: 8, fontSize: 10, fontWeight: 500, cursor: 'pointer',
              background: mode === m.id ? '#1a1a3a' : 'transparent',
              border: `0.5px solid ${mode === m.id ? '#534AB7' : '#2a2a4a'}`,
              color: mode === m.id ? '#c0c0ee' : '#6666aa',
              fontFamily: 'Outfit,sans-serif', textAlign: 'center',
            }}
          >
            <div>{m.label}</div>
            <div style={{ fontSize: 8, marginTop: 1, opacity: 0.7 }}>{m.sub}</div>
          </button>
        ))}
      </div>

      {/* 専門家チップ */}
      <div style={{ display: 'flex', gap: 5, padding: '6px 12px', overflowX: 'auto', scrollbarWidth: 'none', flexShrink: 0 }}>
        {EXPERTS.map(exp => (
          <div key={exp.id} style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '3px 8px', borderRadius: 20, border: '0.5px solid #2a2a4a', whiteSpace: 'nowrap', cursor: 'pointer', background: 'rgba(16,16,35,0.9)' }}>
            <span style={{ fontSize: 12 }}>{exp.icon}</span>
            <span style={{ fontSize: 9, color: '#8888aa' }}>{exp.name}</span>
          </div>
        ))}
      </div>

      {/* チャットエリア */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '8px 12px', display: 'flex', flexDirection: 'column', gap: 10, scrollbarWidth: 'none' }}>
        <div style={{ textAlign: 'center', fontSize: 9, color: '#444466', padding: '4px 0', display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ flex: 1, height: 0.5, background: '#1e1e3a' }} />
          {mode === 'team' ? 'チーム会議モード — 専門家チームが参加中' : mode === 'solo' ? '専門家1人モード' : '保守チームモード'}
          <div style={{ flex: 1, height: 0.5, background: '#1e1e3a' }} />
        </div>

        {messages.map((msg, i) => (
          <div key={i} style={{ display: 'flex', gap: 7, alignItems: 'flex-start', flexDirection: msg.role === 'user' ? 'row-reverse' : 'row' }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, flexShrink: 0, background: msg.role === 'user' ? 'rgba(83,74,183,0.2)' : 'rgba(20,20,40,0.8)', border: `0.5px solid ${msg.role === 'user' ? '#534AB7' : '#2a2a4a'}` }}>
              {msg.role === 'user' ? '👤' : msg.expert?.icon}
            </div>
            <div style={{ maxWidth: 220 }}>
              {msg.role === 'assistant' && msg.expert && (
                <div style={{ fontSize: 8, color: '#7f77dd', marginBottom: 3, display: 'flex', alignItems: 'center', gap: 3 }}>
                  <i className="ti ti-shield" style={{ fontSize: 10 }} /> {msg.expert.name}
                </div>
              )}
              <div style={{
                background: msg.role === 'user' ? 'rgba(83,74,183,0.25)' : 'rgba(16,16,40,0.9)',
                border: `0.5px solid ${msg.role === 'user' ? '#534AB7' : '#2a2a4a'}`,
                borderRadius: msg.role === 'user' ? '12px 4px 12px 12px' : '4px 12px 12px 12px',
                padding: '8px 10px', fontSize: 10, color: msg.role === 'user' ? '#e0e0ff' : '#c0c0ee', lineHeight: 1.6,
              }}>
                {msg.content}
              </div>
            </div>
          </div>
        ))}

        {loading && (
          <div style={{ display: 'flex', gap: 7, alignItems: 'flex-start' }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, background: 'rgba(20,20,40,0.8)', border: '0.5px solid #2a2a4a' }}>🤔</div>
            <div style={{ background: 'rgba(16,16,40,0.9)', border: '0.5px solid #2a2a4a', borderRadius: '4px 12px 12px 12px', padding: '10px 14px', display: 'flex', gap: 4 }}>
              {[0, 1, 2].map(j => (
                <div key={j} style={{ width: 5, height: 5, borderRadius: '50%', background: '#534AB7', animation: 'pulse 1s infinite', animationDelay: `${j * 0.2}s` }} />
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* サジェスト */}
      <div style={{ display: 'flex', gap: 5, padding: '0 12px 6px', overflowX: 'auto', scrollbarWidth: 'none', flexShrink: 0 }}>
        {SUGGESTS.map(s => (
          <button
            key={s}
            onClick={() => { setInput(s); inputRef.current?.focus(); }}
            style={{ whiteSpace: 'nowrap', padding: '4px 10px', borderRadius: 20, fontSize: 9, color: '#6666aa', border: '0.5px solid #2a2a4a', background: 'transparent', cursor: 'pointer', fontFamily: 'Outfit,sans-serif' }}
          >{s}</button>
        ))}
      </div>

      {/* 入力エリア */}
      <div style={{ padding: '6px 12px 10px', borderTop: '0.5px solid #0f0f2a', flexShrink: 0, background: '#04040f' }}>
        <div style={{ display: 'flex', gap: 6, alignItems: 'flex-end' }}>
          <div style={{ flex: 1, background: 'rgba(16,16,35,0.9)', border: '0.5px solid #2a2a4a', borderRadius: 12, padding: '8px 10px', minHeight: 36, display: 'flex', alignItems: 'center' }}>
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage(input)}
              placeholder="専門家チームに質問する..."
              style={{ background: 'transparent', border: 'none', outline: 'none', color: '#c0c0ee', fontSize: 11, width: '100%', fontFamily: 'Outfit, Noto Sans JP, sans-serif' }}
            />
          </div>
          <button
            onClick={() => sendMessage(input)}
            disabled={loading || !input.trim()}
            style={{ width: 36, height: 36, borderRadius: '50%', background: input.trim() ? '#534AB7' : '#1e1e3a', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: input.trim() ? 'pointer' : 'default', flexShrink: 0, transition: 'background 0.15s' }}
          >
            <i className="ti ti-send" style={{ fontSize: 16, color: '#fff' }} />
          </button>
        </div>
      </div>
    </div>
  );
}
