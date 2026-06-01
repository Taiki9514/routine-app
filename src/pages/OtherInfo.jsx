import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const CATEGORIES = [
  {
    id: 'pokepoke',
    icon: '🃏',
    name: 'ポケポケ',
    desc: '最新カード・デッキ攻略・排出率',
    accent: '#a78bfa',
    badge: '外部',
    buttons: [
      { icon: '🆕', name: '最新カード・新弾情報', sub: 'レア排出率・封入率まとめ', url: 'https://pokemon-trainer.com/' },
      { icon: '🏆', name: 'デッキ Tier表・攻略', sub: '最強デッキランキング最新版', url: 'https://pokemon-trainer.com/' },
      { icon: '💴', name: 'カード価格・相場', sub: 'レアリティ別市場価格', url: 'https://pokemon-trainer.com/' },
      { icon: '🔗', name: '公式サイトを開く', sub: 'pokemon-trainer.com', url: 'https://pokemon-trainer.com/', ext: true },
    ],
  },
  {
    id: 'whiskey',
    icon: '🥃',
    name: 'ウイスキー',
    desc: '新作情報・評価・ペアリング',
    accent: '#f97316',
    badge: '外部',
    buttons: [
      { icon: '⭐', name: '新作・限定ボトル情報', sub: '今月の注目リリース', url: 'https://whiskyadvocate.com/' },
      { icon: '📖', name: 'テイスティングノート', sub: 'レビュー・スコア・評価まとめ', url: 'https://whiskyadvocate.com/' },
      { icon: '🍽️', name: 'ペアリング情報', sub: '食事・つまみとの相性ガイド', url: 'https://whiskyadvocate.com/' },
      { icon: '🔗', name: 'Whisky Advocate を開く', sub: 'whiskyadvocate.com', url: 'https://whiskyadvocate.com/', ext: true },
    ],
  },
  {
    id: 'fishing',
    icon: '🎣',
    name: '釣り',
    desc: '釣果・タックル・ポイント情報',
    accent: '#4ade80',
    badge: '外部',
    buttons: [
      { icon: '🐟', name: '今日の釣果情報', sub: '東京・神奈川エリア最新釣果', url: 'https://tsuribito.co.jp/' },
      { icon: '🎯', name: 'おすすめポイント', sub: '天気・潮位連動で自動更新', url: 'https://tsuribito.co.jp/' },
      { icon: '🎽', name: 'タックル・仕掛け情報', sub: '季節別おすすめルアー・仕掛け', url: 'https://tsuribito.co.jp/' },
      { icon: '🔗', name: '釣り情報サイトを開く', sub: 'tsuribito.co.jp', url: 'https://tsuribito.co.jp/', ext: true },
    ],
  },
  {
    id: 'hp',
    icon: '⚡',
    name: 'ハリポッターTCG',
    desc: '新弾・価格・デッキレシピ',
    accent: '#f43f5e',
    badge: '外部',
    buttons: [
      { icon: '🆕', name: '新弾・カード情報', sub: '最新エキスパンション詳細', url: 'https://www.harrypottercardgame.com/' },
      { icon: '💴', name: '価格・相場チェック', sub: 'レアリティ別市場価格', url: 'https://www.harrypottercardgame.com/' },
      { icon: '🃏', name: 'デッキレシピ', sub: 'おすすめ構築・勝率データ', url: 'https://www.harrypottercardgame.com/' },
      { icon: '🔗', name: '公式サイトを開く', sub: 'harrypottercardgame.com', url: 'https://www.harrypottercardgame.com/', ext: true },
    ],
  },
  {
    id: 'interior',
    icon: '🏠',
    name: 'インテリア',
    desc: 'goodrooms・wardrobe\n昨日の新着',
    accent: '#67e8f9',
    badge: 'NEW',
    badgeNew: true,
    buttons: [
      { icon: '🏠', name: 'goodrooms journal 新着', sub: '昨日公開の新着記事', url: 'https://www.goodrooms.jp/journal/?page_id=12450' },
      { icon: '🚪', name: 'wardrobe sangetsu 新着', sub: '昨日公開の新着記事', url: 'https://wardrobe-sangetsu.jp/blogs/feature' },
      { icon: '📓', name: 'NotebookLMに送る', sub: 'URLコピー→NotebookLMを開く', action: 'notebooklm' },
    ],
  },
  {
    id: 'crypto',
    icon: '₿',
    name: '仮想通貨',
    desc: '価格・チャート・最新ニュース',
    accent: '#fbbf24',
    badge: '外部',
    buttons: [
      { icon: '📈', name: '価格・チャート', sub: 'BTC・ETH・主要アルトコイン', url: 'https://coinmarketcap.com/ja/' },
      { icon: '📰', name: '最新ニュース', sub: '規制・新プロジェクト動向', url: 'https://coinmarketcap.com/ja/' },
      { icon: '🔗', name: 'CoinMarketCap を開く', sub: 'coinmarketcap.com', url: 'https://coinmarketcap.com/ja/', ext: true },
    ],
  },
];

export default function OtherInfo() {
  const navigate = useNavigate();
  const [openId, setOpenId] = useState(null);
  const [toast, setToast] = useState(false);

  const handleBtn = (btn) => {
    if (btn.action === 'notebooklm') {
      navigator.clipboard?.writeText('https://notebooklm.google.com/').catch(() => {});
      setToast(true);
      setTimeout(() => setToast(false), 2500);
      setTimeout(() => window.open('https://notebooklm.google.com/', '_blank'), 300);
    } else if (btn.url) {
      window.open(btn.url, '_blank');
    }
  };

  return (
    <div className="page">
      <div className="topbar">
        <div className="back-btn" onClick={() => navigate(-1)}>
          <i className="ti ti-arrow-left" /> 戻る
        </div>
        <div className="page-title">その他情報</div>
        <div style={{ width: 40 }} />
      </div>

      <div style={{ fontSize: 10, color: '#444466', textAlign: 'center', padding: '4px 0 8px', flexShrink: 0 }}>カテゴリを選んでください</div>

      <div className="scroll-area" style={{ padding: '0 10px 16px' }}>

        {/* カテゴリグリッド */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 7, marginBottom: 8 }}>
          {CATEGORIES.map(cat => (
            <div
              key={cat.id}
              onClick={() => setOpenId(openId === cat.id ? null : cat.id)}
              style={{
                background: openId === cat.id ? 'rgba(20,20,45,0.95)' : 'rgba(14,14,32,0.95)',
                border: `0.5px solid ${openId === cat.id ? cat.accent : '#2a2a4a'}`,
                borderRadius: 12, padding: '12px 10px', cursor: 'pointer', position: 'relative', overflow: 'hidden',
              }}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg,transparent,${cat.accent}44,transparent)` }} />
              <div style={{
                position: 'absolute', top: 7, right: 7, fontSize: 7, fontWeight: 500, padding: '2px 5px', borderRadius: 6,
                background: cat.badgeNew ? 'rgba(224,75,74,0.2)' : 'rgba(103,232,249,0.1)',
                color: cat.badgeNew ? '#f87171' : '#67e8f9',
                border: `0.5px solid ${cat.badgeNew ? '#a32d2d' : '#1a5a6a'}`,
              }}>{cat.badge}</div>
              <div style={{ fontSize: 26, marginBottom: 6 }}>{cat.icon}</div>
              <div style={{ fontSize: 11, fontWeight: 500, color: '#e0e0ff', marginBottom: 2 }}>{cat.name}</div>
              <div style={{ fontSize: 8, color: '#555580', lineHeight: 1.5 }}>{cat.desc}</div>
            </div>
          ))}
        </div>

        {/* 詳細パネル */}
        {openId && (() => {
          const cat = CATEGORIES.find(c => c.id === openId);
          if (!cat) return null;
          return (
            <div style={{ background: 'rgba(10,10,26,0.97)', border: `0.5px solid ${cat.accent}44`, borderRadius: 12, padding: '12px 11px', marginBottom: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                <span style={{ fontSize: 20 }}>{cat.icon}</span>
                <div style={{ fontSize: 13, fontWeight: 500, color: '#e0e0ff' }}>{cat.name}</div>
                <button
                  onClick={() => setOpenId(null)}
                  style={{ marginLeft: 'auto', background: 'transparent', border: 'none', color: '#444466', cursor: 'pointer', fontSize: 16 }}
                >✕</button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {cat.buttons.map((btn, i) => (
                  <div
                    key={i}
                    onClick={() => handleBtn(btn)}
                    style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'rgba(18,18,40,0.9)', border: '0.5px solid #2a2a4a', borderRadius: 9, padding: '9px 10px', cursor: 'pointer' }}
                  >
                    <span style={{ fontSize: 18, flexShrink: 0 }}>{btn.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 11, fontWeight: 500, color: '#c0c0ee' }}>{btn.name}</div>
                      <div style={{ fontSize: 9, color: '#555580', marginTop: 1 }}>{btn.sub}</div>
                    </div>
                    {btn.ext && (
                      <span style={{ fontSize: 8, padding: '2px 6px', borderRadius: 6, background: 'rgba(103,232,249,0.1)', color: '#67e8f9', border: '0.5px solid #1a5a6a', flexShrink: 0 }}>外部</span>
                    )}
                    <i className="ti ti-chevron-right" style={{ fontSize: 14, color: '#444466', flexShrink: 0 }} />
                  </div>
                ))}
              </div>
            </div>
          );
        })()}
      </div>

      {/* トースト */}
      {toast && (
        <div style={{ position: 'absolute', bottom: 70, left: '50%', transform: 'translateX(-50%)', background: '#1a1a3a', border: '0.5px solid #534AB7', borderRadius: 10, padding: '7px 14px', fontSize: 11, color: '#c0c0ee', whiteSpace: 'nowrap', zIndex: 99 }}>
          📓 URLをコピーしました。NotebookLMを開きます
        </div>
      )}
    </div>
  );
}
