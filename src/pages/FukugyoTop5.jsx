import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const TODAY = new Date().toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' });

const IDEAS = [
  {
    rank: 1,
    name: 'AIチャットbot受託制作',
    level: '★☆☆',
    levelLabel: '初心者',
    levelColor: '#4ade80',
    summary: 'ノーコードツールでLINEやSlack向けbotを制作・納品。クライアントへの提案からデプロイまでAIが補助。',
    scores: {収益性: 8.5, 需要: 9.0, 実現性: 8.0 },
    total: 84,
    incomeMin: 50000,
    incomeMax: 150000,
    cost: 0,
    hours: 20,
  },
  {
    rank: 2,
    name: 'AI画像生成×PODグッズ販売',
    level: '★☆☆',
    levelLabel: '初心者',
    levelColor: '#4ade80',
    summary: 'Midjourney等で生成した画像をPrintfulで販売。在庫不要・完全自動化が可能。',
    scores: { 収益性: 7.0, 需要: 8.0, 実現性: 9.0 },
    total: 78,
    incomeMin: 30000,
    incomeMax: 80000,
    cost: 3000,
    hours: 10,
  },
  {
    rank: 3,
    name: 'AIライティング代行',
    level: '★★☆',
    levelLabel: '中級',
    levelColor: '#fbbf24',
    summary: 'Claude/ChatGPTでSEO記事・LP・メルマガを量産。クラウドソーシングで継続案件を獲得。',
    scores: { 収益性: 7.5, 需要: 7.5, 実現性: 8.5 },
    total: 75,
    incomeMin: 50000,
    incomeMax: 120000,
    cost: 0,
    hours: 30,
  },
  {
    rank: 4,
    name: '音声AI×Podcast自動生成',
    level: '★★☆',
    levelLabel: '中級',
    levelColor: '#fbbf24',
    summary: 'NotebookLM等でポッドキャストを自動生成してSpotifyで収益化。広告＋スポンサー収入。',
    scores: { 収益性: 6.5, 需要: 7.0, 実現性: 8.0 },
    total: 71,
    incomeMin: 20000,
    incomeMax: 80000,
    cost: 0,
    hours: 15,
  },
  {
    rank: 5,
    name: 'AIコンサル×個人向け顧問',
    level: '★★★',
    levelLabel: '上級',
    levelColor: '#f87171',
    summary: '中小企業・個人事業主にAI活用を月額顧問で支援。単価が高く継続収益になりやすい。',
    scores: { 収益性: 9.0, 需要: 8.0, 実現性: 6.0 },
    total: 69,
    incomeMin: 100000,
    incomeMax: 300000,
    cost: 0,
    hours: 20,
  },
];

const RANK_COLORS = ['#fbbf24', '#94a3b8', '#cd7c54', '#444466', '#444466'];
const SCORE_COLORS = { 収益性: '#fbbf24', 需要: '#60a5fa', 実現性: '#4ade80' };

function ScoreBar({ label, val }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 3 }}>
      <div style={{ fontSize: 8, color: '#444466', width: 34, flexShrink: 0 }}>{label}</div>
      <div style={{ flex: 1, height: 3, background: '#1e1e3a', borderRadius: 2, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${val * 10}%`, background: SCORE_COLORS[label], borderRadius: 2 }} />
      </div>
      <div style={{ fontSize: 8, color: '#8888aa', width: 22, textAlign: 'right' }}>{val}</div>
    </div>
  );
}

export default function FukugyoTop5() {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(null);

  return (
    <div className="page">
      <div className="topbar">
        <div className="back-btn" onClick={() => navigate(-1)}>
          <i className="ti ti-arrow-left" /> 戻る
        </div>
        <div className="page-title">副業TOP5</div>
        <div style={{ width: 40 }} />
      </div>

      <div className="scroll-area" style={{ padding: '0 0 16px' }}>

        {/* 日付・バッジ */}
        <div style={{ padding: '8px 12px 6px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontSize: 10, color: '#6666aa', display: 'flex', alignItems: 'center', gap: 4 }}>
            <i className="ti ti-calendar" style={{ fontSize: 13 }} /> {TODAY} 配信分
          </div>
          <div style={{ background: 'rgba(224,75,74,0.2)', color: '#f87171', border: '0.5px solid #a32d2d', fontSize: 9, fontWeight: 500, padding: '2px 7px', borderRadius: 10 }}>NEW</div>
        </div>

        {/* サマリー */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 6, padding: '0 12px', marginBottom: 10 }}>
          {[
            { val: '5', label: '本日のアイデア' },
            { val: '★☆☆×3', label: '初心者向け多め' },
            { val: '¥3〜30万', label: '月収レンジ' },
          ].map((s) => (
            <div key={s.label} style={{ background: 'rgba(20,20,40,0.7)', border: '0.5px solid #1e1e3a', borderRadius: 8, padding: '6px 8px', textAlign: 'center' }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: '#c0c0ee' }}>{s.val}</div>
              <div style={{ fontSize: 8, color: '#444466', marginTop: 1 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* アイデアカード */}
        <div style={{ padding: '0 12px', display: 'flex', flexDirection: 'column', gap: 7 }}>
          {IDEAS.map((idea) => {
            const isOpen = expanded === idea.rank;
            return (
              <div
                key={idea.rank}
                style={{
                  background: 'rgba(16,16,35,0.9)',
                  border: `${idea.rank === 1 ? '1px solid #fbbf24' : '0.5px solid #2a2a4a'}`,
                  borderRadius: 12,
                  padding: '11px 12px',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                onClick={() => setExpanded(isOpen ? null : idea.rank)}
              >
                {/* 上部グラデーションライン */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg,transparent,${RANK_COLORS[idea.rank - 1]}44,transparent)` }} />

                {/* ヘッダー */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 8 }}>
                  <div style={{ fontSize: 20, fontWeight: 500, color: RANK_COLORS[idea.rank - 1], minWidth: 24 }}>{idea.rank}</div>
                  <div style={{ flex: 1, fontSize: 12, fontWeight: 500, color: '#e0e0ff', lineHeight: 1.4 }}>{idea.name}</div>
                  <div style={{ fontSize: 9, padding: '2px 6px', borderRadius: 8, background: `${idea.levelColor}20`, color: idea.levelColor, border: `0.5px solid ${idea.levelColor}66`, flexShrink: 0, marginTop: 1 }}>
                    {idea.level} {idea.levelLabel}
                  </div>
                </div>

                {/* 概要 */}
                <div style={{ fontSize: 10, color: '#6666aa', marginBottom: 8, lineHeight: 1.5 }}>{idea.summary}</div>

                {/* スコアバー＋総合点 */}
                <div style={{ display: 'flex', gap: 8 }}>
                  <div style={{ flex: 1 }}>
                    {Object.entries(idea.scores).map(([k, v]) => (
                      <ScoreBar key={k} label={k} val={v} />
                    ))}
                  </div>
                  <div style={{ textAlign: 'center', flexShrink: 0 }}>
                    <div style={{ fontSize: 18, fontWeight: 500, color: '#c0c0ee' }}>{idea.total}</div>
                    <div style={{ fontSize: 8, color: '#444466', marginTop: 1 }}>総合点</div>
                  </div>
                </div>

                {/* 収益情報 */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 8, paddingTop: 8, borderTop: '0.5px solid #1e1e3a' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 8, color: '#444466' }}>月収目安</div>
                    <div style={{ fontSize: 11, fontWeight: 500, color: '#fbbf24', marginTop: 1 }}>
                      ¥{(idea.incomeMin / 10000).toFixed(0)}〜{(idea.incomeMax / 10000).toFixed(0)}万
                    </div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 8, color: '#444466' }}>初期費用</div>
                    <div style={{ fontSize: 11, fontWeight: 500, color: '#fbbf24', marginTop: 1 }}>
                      ¥{idea.cost.toLocaleString()}
                    </div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 8, color: '#444466' }}>作業時間</div>
                    <div style={{ fontSize: 11, fontWeight: 500, color: '#fbbf24', marginTop: 1 }}>{idea.hours}h/月</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 2, fontSize: 9, color: '#7f77dd' }}>
                    {isOpen ? '閉じる' : '詳細'}
                    <i className={`ti ${isOpen ? 'ti-chevron-up' : 'ti-chevron-right'}`} style={{ fontSize: 11 }} />
                  </div>
                </div>

                {/* 展開時：Gemini Deep Research リンク */}
                {isOpen && (
                  <div style={{ marginTop: 8, paddingTop: 8, borderTop: '0.5px solid #1e1e3a' }}>
                    <div style={{ fontSize: 10, color: '#6666aa', marginBottom: 6 }}>🔍 Deep Research で詳細調査</div>
                    <a
                      href={`https://gemini.google.com/app?q=${encodeURIComponent(idea.name + ' 副業 始め方 収益化 詳細')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(83,74,183,0.15)', border: '0.5px solid #534AB7', borderRadius: 8, padding: '8px 10px', textDecoration: 'none' }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <i className="ti ti-external-link" style={{ fontSize: 14, color: '#7f77dd' }} />
                      <span style={{ fontSize: 10, color: '#c0c0ee' }}>Geminiで「{idea.name}」を詳しく調査する</span>
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
