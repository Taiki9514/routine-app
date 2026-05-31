import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

// 曜日ごとの今日のメニュー
const DAY_MENU = ['日曜：計測の日📏', '月曜：筋トレの日💪', '火曜：ランニングの日🏃', '水曜：筋トレの日💪', '木曜：ランニングの日🏃', '金曜：筋トレの日💪', '土曜：ランニングの日🏃'];

// 背景SVGイラスト
function BgArt() {
  return (
    <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }} viewBox="0 0 360 700" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      {/* 釣り竿 右上 */}
      <line x1="340" y1="20" x2="290" y2="90" stroke="#1a2a4a" strokeWidth="2" strokeLinecap="round"/>
      <line x1="290" y1="90" x2="288" y2="125" stroke="#1a3a5a" strokeWidth="0.8"/>
      <ellipse cx="288" cy="130" rx="4" ry="6" fill="none" stroke="#1a4a6a" strokeWidth="0.8"/>
      <path d="M300 55 Q310 49 318 55 Q310 61 300 55Z" fill="#1a3a6a" opacity="0.5"/>
      <path d="M318 55 L323 51 L323 59Z" fill="#1a3a6a" opacity="0.5"/>
      {/* ウイスキーボトル 左上 */}
      <rect x="14" y="22" width="11" height="3" rx="1" fill="#2a1a0a" opacity="0.6"/>
      <rect x="15" y="25" width="9" height="4" rx="1" fill="#3a2a10" opacity="0.6"/>
      <rect x="12" y="29" width="14" height="24" rx="3" fill="#2a1a08" opacity="0.55"/>
      <rect x="15" y="31" width="9" height="18" rx="2" fill="#3a2510" opacity="0.4"/>
      <rect x="13" y="53" width="12" height="4" rx="2" fill="#2a1a08" opacity="0.55"/>
      {/* AI回路 左下 */}
      <circle cx="22" cy="600" r="12" fill="none" stroke="#1a1a4a" strokeWidth="0.8" opacity="0.55"/>
      <circle cx="22" cy="600" r="6" fill="none" stroke="#2a2a6a" strokeWidth="0.5" opacity="0.5"/>
      <line x1="10" y1="600" x2="4" y2="600" stroke="#1a1a4a" strokeWidth="0.8" opacity="0.45"/>
      <line x1="34" y1="600" x2="40" y2="600" stroke="#1a1a4a" strokeWidth="0.8" opacity="0.45"/>
      <line x1="22" y1="588" x2="22" y2="582" stroke="#1a1a4a" strokeWidth="0.8" opacity="0.45"/>
      <line x1="22" y1="612" x2="22" y2="618" stroke="#1a1a4a" strokeWidth="0.8" opacity="0.45"/>
      <circle cx="4" cy="600" r="2.5" fill="#2a2a6a" opacity="0.4"/>
      <circle cx="40" cy="600" r="2.5" fill="#2a2a6a" opacity="0.4"/>
      {/* 仮想通貨コイン 右下 */}
      <circle cx="330" cy="590" r="16" fill="none" stroke="#2a2010" strokeWidth="1" opacity="0.55"/>
      <circle cx="330" cy="590" r="11" fill="none" stroke="#3a3015" strokeWidth="0.5" opacity="0.45"/>
      <text x="330" y="595" textAnchor="middle" fontSize="10" fill="#3a3015" opacity="0.55" fontFamily="sans-serif" fontWeight="500">₿</text>
      <circle cx="310" cy="612" r="10" fill="none" stroke="#1a2a20" strokeWidth="0.8" opacity="0.45"/>
      <text x="310" y="616" textAnchor="middle" fontSize="8" fill="#1a3a25" opacity="0.45" fontFamily="sans-serif">Ξ</text>
      {/* ハリポタ稲妻＋眼鏡 右中 */}
      <path d="M345 290 L350 303 L345 316 L350 329" fill="none" stroke="#2a2a50" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5"/>
      <circle cx="332" cy="350" r="8" fill="none" stroke="#2a2a50" strokeWidth="0.8" opacity="0.45"/>
      <circle cx="348" cy="350" r="8" fill="none" stroke="#2a2a50" strokeWidth="0.8" opacity="0.45"/>
      <line x1="340" y1="350" x2="342" y2="350" stroke="#2a2a50" strokeWidth="0.8" opacity="0.45"/>
      {/* 観葉植物 左中 */}
      <rect x="5" y="340" width="18" height="13" rx="3" fill="#1a1008" opacity="0.45"/>
      <path d="M14 340 Q9 326 4 318 Q14 322 14 314" fill="none" stroke="#0a2010" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
      <path d="M14 334 Q19 320 24 316 Q17 323 14 316" fill="none" stroke="#0a2010" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
    </svg>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const [today, setToday] = useState('');
  const [dateStr, setDateStr] = useState('');
  const [streak] = useState(12);

  useEffect(() => {
    const now = new Date();
    const dow = now.getDay();
    setToday(DAY_MENU[dow]);
    const y = now.getFullYear();
    const m = now.getMonth() + 1;
    const d = now.getDate();
    const days = ['日', '月', '火', '水', '木', '金', '土'];
    setDateStr(`${y}年${m}月${d}日（${days[dow]}）`);
  }, []);

  const BIG_BTNS = [
    { icon: 'ti-cloud-sun',  color: '#60a5fa', label: '天気予報',      sub: '晴れ 24℃ / 18℃',  path: '/weather',       alert: false },
    { icon: 'ti-chart-bar',  color: '#4ade80', label: '身体記録・進捗', sub: '体脂肪 19.8%',      path: '/body-progress', alert: false },
    { icon: 'ti-bulb',       color: '#fbbf24', label: '副業TOP5',      sub: '本日の新着あり',     path: '/fukugyo',       alert: true  },
    { icon: 'ti-news',       color: '#94a3b8', label: 'ニュース記事',   sub: '7カテゴリ更新済み',  path: '/news',          alert: true  },
    { icon: 'ti-message-circle', color: '#a78bfa', label: 'AI質問欄', sub: '専門家に相談',       path: '/ai-chat',       alert: false },
    { icon: 'ti-layout-grid',color: '#67e8f9', label: '情報収集',      sub: 'ポケポケ・他',       path: '/info-collect',  alert: false },
  ];

  const SMALL_BTNS = [
    { icon: 'ti-barbell',  label: '筋トレ',    path: '/training',  today: true,  alert: false },
    { icon: 'ti-run',      label: 'ランニング', path: '/running',   today: false, alert: false },
    { icon: 'ti-moon',     label: '睡眠',      path: '/sleep',     today: false, alert: false },
    { icon: 'ti-droplet',  label: 'スキンケア', path: '/skincare',  today: false, alert: true  },
    { icon: 'ti-dots',     label: 'その他情報', path: '/other-info',today: false, alert: false },
  ];

  return (
    <div className="page" style={{ position: 'relative' }}>
      <BgArt />
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>

        {/* ヘッダー */}
        <div style={{ padding: '12px 14px 8px', flexShrink: 0 }}>
          <div style={{ fontSize: 11, color: '#6666aa' }}>おはようございます</div>
          <div style={{ fontSize: 16, fontWeight: 500, color: '#e0e0ff', marginTop: 2 }}>{today}</div>
          <div style={{ fontSize: 10, color: '#444466', marginTop: 1 }}>{dateStr}</div>
        </div>

        {/* ストリーク */}
        <div style={{ margin: '0 12px 8px', background: 'linear-gradient(90deg,#1a1a2e,#16213e)', border: '1px solid #534AB7', borderRadius: 10, padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
          <div style={{ fontSize: 20, fontWeight: 500, color: '#c8c0ff' }}>🔥 {streak}</div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 500, color: '#e0e0ff' }}>連続達成中</div>
            <div style={{ fontSize: 10, color: '#6666aa', marginTop: 1 }}>今日の{today.split('：')[1]?.replace(/[💪🏃📏]/g,'').trim()}を完了で {streak + 1}日へ</div>
          </div>
        </div>

        {/* メインコンテンツラベル */}
        <div className="sec-label" style={{ flexShrink: 0 }}>メインコンテンツ</div>

        {/* 大ボタン 2列3行 */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, padding: '0 12px', marginBottom: 8, flexShrink: 0 }}>
          {BIG_BTNS.map((btn) => (
            <div
              key={btn.path}
              onClick={() => navigate(btn.path)}
              style={{ background: 'rgba(13,13,26,0.88)', border: btn.alert ? '1.5px solid #e24b4a' : '0.5px solid #2a2a4a', borderRadius: 12, padding: '11px 10px 9px', cursor: 'pointer', position: 'relative', overflow: 'hidden', minHeight: 70 }}
            >
              {btn.alert && (
                <div style={{ position: 'absolute', top: 6, right: 7, width: 16, height: 16, background: '#e24b4a', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 500, color: '#fff' }}>!</div>
              )}
              <i className={`ti ${btn.icon}`} style={{ fontSize: 20, color: btn.color, display: 'block', marginBottom: 5 }} />
              <div style={{ fontSize: 11, fontWeight: 500, color: '#d0d0ee', lineHeight: 1.3 }}>{btn.label}</div>
              <div style={{ fontSize: 9, color: '#555580', marginTop: 2 }}>{btn.sub}</div>
            </div>
          ))}
        </div>

        {/* ルーティンラベル */}
        <div className="sec-label" style={{ flexShrink: 0 }}>ルーティン</div>

        {/* 小ボタン 5列 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 5, padding: '0 12px', flexShrink: 0 }}>
          {SMALL_BTNS.map((btn) => (
            <div
              key={btn.path}
              onClick={() => navigate(btn.path)}
              style={{ background: 'rgba(13,13,26,0.88)', border: btn.alert ? '1.5px solid #e24b4a' : btn.today ? '1px solid #1d9e75' : '0.5px solid #1e1e3a', borderRadius: 8, padding: '7px 3px 6px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, cursor: 'pointer', position: 'relative' }}
            >
              {btn.alert && (
                <div style={{ position: 'absolute', top: 3, right: 4, width: 13, height: 13, background: '#e24b4a', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 500, color: '#fff' }}>!</div>
              )}
              <i className={`ti ${btn.icon}`} style={{ fontSize: 18, color: btn.today ? '#4ade80' : btn.alert ? '#f87171' : '#444466' }} />
              <span style={{ fontSize: 8, color: btn.today ? '#4ade80' : btn.alert ? '#f87171' : '#444466', textAlign: 'center' }}>{btn.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
