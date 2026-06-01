import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const CATEGORIES = [
  { id: 'ai',       label: '🤖 AI',     color: '#60a5fa' },
  { id: 'crypto',   label: '💰 仮想通貨', color: '#fbbf24' },
  { id: 'invest',   label: '📈 投資',    color: '#4ade80' },
  { id: 'mlb',      label: '⚾ MLB',    color: '#f97316' },
  { id: 'game',     label: '🎮 ゲーム',  color: '#a78bfa' },
  { id: 'world',    label: '🌍 国際',    color: '#94a3b8' },
  { id: 'interior', label: '🏠 インテリア', color: '#67e8f9' },
];

const NEWS = {
  ai: [
    { id: 1, title: 'Anthropic、Claude新バージョンを発表。エージェント機能が大幅強化され自律タスク処理が可能に', source: 'TechCrunch Japan', time: '2時間前', isNew: true, top: true, icon: '🤖', tags: ['Anthropic', 'エージェント'] },
    { id: 2, title: 'OpenAI最新モデル、数学オリンピック問題で人間の金メダリストを超えるスコアを記録', source: 'Wired Japan', time: '3時間前', isNew: true, icon: '🧠', tags: ['OpenAI', '推論'] },
    { id: 3, title: '国内大手3社がAIエージェント導入を加速、業務自動化で年間コスト30%削減の試算', source: '日経XTECH', time: '5時間前', isNew: true, icon: '🏢', tags: ['国内', 'エージェント'] },
    { id: 4, title: 'Google DeepMind、タンパク質構造予測AIを医薬品開発に応用。臨床試験を3年短縮', source: 'MIT Technology Review', time: '8時間前', icon: '💊', tags: ['DeepMind', '医療'] },
    { id: 5, title: 'AI副業で月収50万円超え続出。フリーランス市場でAIスキル保有者の単価が2年で3倍に', source: 'Forbes Japan', time: '12時間前', icon: '💴', tags: ['副業', '収入'] },
  ],
  crypto: [
    { id: 1, title: 'ビットコイン、史上最高値を更新。機関投資家の資金流入が加速', source: 'CoinDesk Japan', time: '1時間前', isNew: true, top: true, icon: '₿', tags: ['BTC', '最高値'] },
    { id: 2, title: 'イーサリアム、新アップグレード完了。トランザクション速度が従来の10倍に', source: 'CryptoNews', time: '4時間前', icon: 'Ξ', tags: ['ETH', 'アップグレード'] },
  ],
  invest: [
    { id: 1, title: '日経平均、年初来高値を更新。半導体株が牽引', source: '日経新聞', time: '30分前', isNew: true, top: true, icon: '📈', tags: ['日経', '半導体'] },
    { id: 2, title: 'FRB、利下げ方針を維持。市場は年内2回の利下げを織り込む', source: 'Bloomberg', time: '3時間前', icon: '🏦', tags: ['FRB', '利下げ'] },
  ],
  mlb: [
    { id: 1, title: '大谷翔平、今季30号本塁打を達成。打率.310をキープ', source: 'ESPN Japan', time: '6時間前', isNew: true, top: true, icon: '⚾', tags: ['大谷', 'ホームラン'] },
    { id: 2, title: 'ドジャース、地区首位をキープ。先発投手陣が好調', source: 'MLB.com', time: '8時間前', icon: '🏆', tags: ['ドジャース', '順位'] },
  ],
  game: [
    { id: 1, title: 'ポケモンカードゲーム新弾発売、初日売上が過去最高を記録', source: 'ファミ通', time: '2時間前', isNew: true, top: true, icon: '🃏', tags: ['ポケカ', '新弾'] },
    { id: 2, title: 'Nintendo Switch 2、世界累計販売台数が1000万台を突破', source: 'Game Watch', time: '5時間前', icon: '🎮', tags: ['Nintendo', 'Switch2'] },
  ],
  world: [
    { id: 1, title: 'G7サミット、AI規制に関する共同声明を発表', source: 'Reuters', time: '3時間前', isNew: true, top: true, icon: '🌍', tags: ['G7', 'AI規制'] },
    { id: 2, title: '欧州中央銀行、追加利下げを決定。ユーロ圏経済の回復を後押し', source: 'Financial Times', time: '6時間前', icon: '🏛️', tags: ['ECB', '利下げ'] },
  ],
  interior: [
    { id: 1, title: '2026年注目の北欧インテリアトレンド。ミニマルとナチュラルの融合スタイルが人気急上昇', source: 'goodrooms journal', time: '昨日 10:00', isNew: true, top: true, icon: '🛋️', tags: ['北欧', 'トレンド'], srcBadge: 'goodrooms' },
    { id: 2, title: '一人暮らしのリビングを広く見せる家具配置の黄金ルール', source: 'goodrooms journal', time: '昨日 14:00', isNew: true, icon: '🏠', tags: ['レイアウト', '収納'], srcBadge: 'goodrooms' },
    { id: 3, title: 'クローゼット収納を劇的に改善する壁紙・内装アイデア5選', source: 'wardrobe sangetsu', time: '昨日 11:00', isNew: true, icon: '🚪', tags: ['収納', '壁紙'], srcBadge: 'sangetsu' },
    { id: 4, title: '2026春の壁紙トレンド。テクスチャー系クロスで部屋に奥行きを出す方法', source: 'wardrobe sangetsu', time: '昨日 15:00', icon: '🎨', tags: ['壁紙', 'トレンド'], srcBadge: 'sangetsu' },
  ],
};

function sendToNotebookLM(title) {
  const url = `https://notebooklm.google.com/`;
  navigator.clipboard?.writeText(title).catch(() => {});
  window.open(url, '_blank');
}

export default function NewsArticles() {
  const navigate = useNavigate();
  const [activeCat, setActiveCat] = useState('ai');
  const [toast, setToast] = useState(false);

  const articles = NEWS[activeCat] || [];
  const topArticle = articles.find(a => a.top);
  const restArticles = articles.filter(a => !a.top);
  const newCount = articles.filter(a => a.isNew).length;
  const cat = CATEGORIES.find(c => c.id === activeCat);

  const handleNotebookLM = (e, title) => {
    e.stopPropagation();
    navigator.clipboard?.writeText(title).catch(() => {});
    setToast(true);
    setTimeout(() => setToast(false), 2500);
    setTimeout(() => window.open('https://notebooklm.google.com/', '_blank'), 300);
  };

  return (
    <div className="page">
      <div className="topbar">
        <div className="back-btn" onClick={() => navigate(-1)}>
          <i className="ti ti-arrow-left" /> 戻る
        </div>
        <div className="page-title">ニュース記事</div>
        <div style={{ width: 40 }} />
      </div>

      {/* カテゴリタブ */}
      <div style={{ overflowX: 'auto', padding: '8px 12px 0', flexShrink: 0, scrollbarWidth: 'none' }}>
        <div style={{ display: 'flex', gap: 6, width: 'max-content' }}>
          {CATEGORIES.map(c => (
            <button
              key={c.id}
              onClick={() => setActiveCat(c.id)}
              style={{
                padding: '5px 12px', borderRadius: 20, fontSize: 10, fontWeight: 500, cursor: 'pointer', whiteSpace: 'nowrap',
                background: activeCat === c.id ? '#534AB7' : 'transparent',
                border: `0.5px solid ${activeCat === c.id ? '#534AB7' : '#2a2a4a'}`,
                color: activeCat === c.id ? '#fff' : '#6666aa',
                fontFamily: 'Outfit, sans-serif',
              }}
            >{c.label}</button>
          ))}
        </div>
      </div>

      {/* カテゴリヘッダー */}
      <div style={{ padding: '8px 12px 6px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <div style={{ fontSize: 12, fontWeight: 500, color: '#c0c0ee', display: 'flex', alignItems: 'center', gap: 5 }}>
          <span style={{ color: cat?.color }}>{cat?.label}</span> ニュース
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ fontSize: 10, color: '#444466' }}>{articles.length}件</div>
          {newCount > 0 && (
            <div style={{ background: 'rgba(224,75,74,0.2)', color: '#f87171', border: '0.5px solid #a32d2d', fontSize: 9, fontWeight: 500, padding: '2px 7px', borderRadius: 10 }}>{newCount} NEW</div>
          )}
        </div>
      </div>

      <div className="scroll-area" style={{ padding: '0 0 16px' }}>

        {/* TOP記事 */}
        {topArticle && (
          <div style={{ margin: '0 12px 8px', background: 'rgba(16,16,40,0.95)', border: `1px solid ${cat?.color}44`, borderRadius: 12, padding: '12px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg,transparent,${cat?.color}66,transparent)` }} />
            <div style={{ fontSize: 9, color: cat?.color, letterSpacing: '0.06em', marginBottom: 5, display: 'flex', alignItems: 'center', gap: 4 }}>
              <i className="ti ti-star" style={{ fontSize: 11 }} /> TODAY'S TOP
            </div>
            <div style={{ fontSize: 12, fontWeight: 500, color: '#e0e0ff', lineHeight: 1.5, marginBottom: 6 }}>{topArticle.title}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
              <span style={{ fontSize: 9, color: '#444466' }}>{topArticle.source}</span>
              <div style={{ width: 3, height: 3, borderRadius: '50%', background: '#2a2a4a' }} />
              <span style={{ fontSize: 9, color: '#444466' }}>{topArticle.time}</span>
              {topArticle.srcBadge && (
                <span style={{ fontSize: 8, background: 'rgba(103,232,249,0.1)', color: '#67e8f9', border: '0.5px solid #1a5a6a', padding: '1px 6px', borderRadius: 5 }}>{topArticle.srcBadge}</span>
              )}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ fontSize: 10, color: '#7f77dd', display: 'flex', alignItems: 'center', gap: 3 }}>
                <i className="ti ti-external-link" style={{ fontSize: 13 }} /> 記事を読む
              </div>
              <button
                onClick={(e) => handleNotebookLM(e, topArticle.title)}
                style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'rgba(251,191,36,0.1)', border: '0.5px solid rgba(251,191,36,0.3)', borderRadius: 8, padding: '4px 8px', cursor: 'pointer', fontFamily: 'Outfit,sans-serif' }}
              >
                <span style={{ fontSize: 12 }}>📓</span>
                <span style={{ fontSize: 9, fontWeight: 500, color: '#fbbf24' }}>NotebookLMに送る</span>
              </button>
            </div>
          </div>
        )}

        {/* 記事リスト */}
        <div style={{ padding: '0 12px', display: 'flex', flexDirection: 'column', gap: 6 }}>
          {restArticles.map((article) => (
            <div
              key={article.id}
              style={{ background: 'rgba(16,16,35,0.9)', border: `${article.isNew ? '2px solid #534AB7' : '0.5px solid #1e1e3a'}`, borderRadius: 10, padding: '10px 11px', cursor: 'pointer' }}
            >
              <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 6 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 3, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 9, color: '#6666aa' }}>{article.source}</span>
                    {article.srcBadge && (
                      <span style={{ fontSize: 8, background: 'rgba(103,232,249,0.1)', color: '#67e8f9', border: '0.5px solid #1a5a6a', padding: '1px 5px', borderRadius: 5 }}>{article.srcBadge}</span>
                    )}
                    <div style={{ width: 3, height: 3, borderRadius: '50%', background: '#2a2a4a' }} />
                    <span style={{ fontSize: 9, color: '#333360' }}>{article.time}</span>
                    {article.isNew && (
                      <span style={{ fontSize: 8, background: 'rgba(224,75,74,0.15)', color: '#f87171', border: '0.5px solid #a32d2d', padding: '1px 5px', borderRadius: 6 }}>NEW</span>
                    )}
                  </div>
                  <div style={{ fontSize: 11, fontWeight: 500, color: '#c0c0ee', lineHeight: 1.5 }}>{article.title}</div>
                </div>
                <div style={{ fontSize: 20, flexShrink: 0, marginTop: 2 }}>{article.icon}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', flex: 1 }}>
                  {article.tags.map(t => (
                    <span key={t} style={{ fontSize: 8, color: '#444466', background: 'rgba(20,20,40,0.8)', border: '0.5px solid #1e1e3a', padding: '1px 5px', borderRadius: 5 }}>{t}</span>
                  ))}
                </div>
                <button
                  onClick={(e) => handleNotebookLM(e, article.title)}
                  style={{ display: 'flex', alignItems: 'center', gap: 3, background: 'rgba(251,191,36,0.08)', border: '0.5px solid rgba(251,191,36,0.2)', borderRadius: 6, padding: '3px 7px', cursor: 'pointer', flexShrink: 0, marginLeft: 6, fontFamily: 'Outfit,sans-serif' }}
                >
                  <span style={{ fontSize: 10 }}>📓</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* トースト通知 */}
      {toast && (
        <div style={{ position: 'absolute', bottom: 70, left: '50%', transform: 'translateX(-50%)', background: '#1a1a3a', border: '0.5px solid #534AB7', borderRadius: 10, padding: '7px 14px', fontSize: 11, color: '#c0c0ee', whiteSpace: 'nowrap', zIndex: 99 }}>
          📓 URLをコピーしました。NotebookLMを開きます
        </div>
      )}
    </div>
  );
}
