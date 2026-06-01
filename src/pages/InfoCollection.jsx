import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const CATEGORIES = [
  {
    id: 'fukugyo',
    icon: '💼',
    name: '副業・AI',
    desc: 'TOP5アイデア\n毎朝9:30配信',
    accent: '#fbbf24',
    badge: 'NEW',
    badgeColor: '#e24b4a',
    buttons: [
      { icon: '🏆', name: '今日の副業TOP5', sub: '本日 9:30 配信済み', badge: 'NEW', path: '/fukugyo' },
      { icon: '📅', name: '過去の配信アーカイブ', sub: '過去30日分を保存', path: '/fukugyo' },
      { icon: '⭐', name: 'お気に入り保存済み', sub: '3件 ブックマーク中', path: '/fukugyo' },
    ],
  },
  {
    id: 'news',
    icon: '📰',
    name: 'ニュース',
    desc: 'AI・仮想通貨・投資\nMLB・国際・他',
    accent: '#60a5fa',
    badge: '更新済',
    badgeColor: '#1d9e75',
    buttons: [
      { icon: '🤖', name: 'AI', sub: '3件 未読', badge: '3 NEW', path: '/news' },
      { icon: '💰', name: '仮想通貨', sub: '更新済み', path: '/news' },
      { icon: '📈', name: '投資', sub: '更新済み', path: '/news' },
      { icon: '⚾', name: 'MLB', sub: '更新済み', path: '/news' },
      { icon: '🏠', name: 'インテリア', sub: '2件 昨日の新着', badge: '2 NEW', path: '/news' },
      { icon: '🌍', name: '国際', sub: '更新済み', path: '/news' },
    ],
  },
  {
    id: 'pokepoke',
    icon: '🃏',
    name: 'ポケポケ',
    desc: '最新カード・デッキ攻略\n排出率',
    accent: '#a78bfa',
    badge: '外部',
    badgeColor: '#1a5a6a',
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
    desc: '新作情報・評価\nペアリング',
    accent: '#f97316',
    badge: '外部',
    badgeColor: '#1a5a6a',
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
    desc: '釣果・タックル\nポイント情報',
    accent: '#4ade80',
    badge: '外部',
    badgeColor: '#1a5a6a',
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
    desc: '新弾・価格\nデッキレシピ',
    accent: '#f43f5e',
    badge: '外部',
    badgeColor: '#1a5a6a',
    buttons: [
      { icon: '🆕', name: '新弾・カード情報', sub: '最新エキスパンション詳細', url: 'https://www.harrypottercardgame.com/' },
      { icon: '💴', name: '価格・相場チェック', sub: 'レアリティ別市場価格', url: 'https://www.harrypottercardgame.com/' },
      { icon: '🃏', name: 'デッキレシピ', sub: 'おすすめ構築・勝率データ', url: 'https://www.harrypottercardgame.com/' },
      { icon: '🔗', name: '公式サイトを開く', sub: 'harrypottercardgame.com', url: 'https://www.harrypottercardgame.com/', ext: true },
    ],
  },
];

export default function InfoCollection() {
  const navigate = useNavigate();
  const [openId, setOpenId] = useState(null);

  const handleBtn = (btn) => {
    if (btn.path) {
      navigate(btn.path);
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
        <div className="page-title">情報収集</div>
        <div style={{ width: 40 }} />
      </div>
      <div style={{ fontSize: 10, color: '#444466', textAlign: 'center', padding: '4px 0 8px' }}>カテゴリを選んでください</div>

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
              <div style={{ position: 'absolute', top: 7, right: 7, fontSize: 7, fontWeight: 500, padding: '2px 5px', borderRadius: 6, background: `${cat.badgeColor}22`, color: cat.badgeColor === '#e24b4a' ? '#f87171' : cat.badgeColor === '#1d9e75' ? '#4ade80' : '#67e8f9', border: `0.5px solid ${cat.badgeColor}` }}>
                {cat.badge}
              </div>
              <div style={{ fontSize: 26, marginBottom: 6 }}>{cat.icon}</div>
              <div style={{ fontSize: 11, fontWeight: 500, color: '#e0e0ff', marginBottom: 2 }}>{cat.name}</div>
              <div style={{ fontSize: 8, color: '#555580', lineHeight: 1.5 }}>{cat.desc.replace('\\n', '\n')}</div>
            </div>
          ))}
        </div>

        {/* 詳細パネル */}
        {openId && (() => {
          const cat = CATEGORIES.find(c => c.id === openId);
          if (!cat) return null;
          return (
            <div style={{ background: 'rgba(10,10,26,0.97)', border: `0.5px solid ${cat.accent}44`, borderRadius: 12, padding: '12px 11px', animation: 'fadeInUp 0.2s ease' }}>
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
                    {btn.badge && (
                      <span style={{ fontSize: 8, fontWeight: 500, padding: '2px 6px', borderRadius: 6, background: 'rgba(224,75,74,0.15)', color: '#f87171', border: '0.5px solid #a32d2d', flexShrink: 0 }}>{btn.badge}</span>
                    )}
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
    </div>
  );
}
