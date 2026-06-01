import { useNavigate } from 'react-router-dom';

const SCORE = 70;
const AXES = [
  { icon: '😴', val: 22.8, label: 'SAS', color: '#7f77dd', pct: 76 },
  { icon: '🧬', val: 21.3, label: '睡眠構造', color: '#60a5fa', pct: 71 },
  { icon: '🛌', val: 13.1, label: '姿勢', color: '#fbbf24', pct: 44 },
  { icon: '💚', val: 21.3, label: '回復', color: '#4ade80', pct: 71 },
];

const ADVICES = [
  {
    pri: 1,
    priColor: '#e24b4a',
    icon: '🛌',
    role: 'スリープ・フィジオロジスト',
    title: '深い睡眠が不足しています',
    text: '深い睡眠15%未満（目標15〜20%）。SASによる無呼吸イベントが妨げている可能性があります。',
    steps: ['就寝時刻を固定する', '仰向けを減らしSASイベントを抑制', '就寝6時間前以降のカフェインをカット'],
  },
  {
    pri: 2,
    priColor: '#f97316',
    icon: '📱',
    role: '環境心理・エルゴノミスト',
    title: 'スマホを就寝直前まで使用しています',
    text: 'ブルーライトによりメラトニン分泌が最大63%抑制されます。',
    steps: ['スマホを寝室外に置く', 'Kindleまたは紙の本に切り替える'],
  },
  {
    pri: 3,
    priColor: '#534AB7',
    icon: '💤',
    role: 'バイオスタティスティシャン',
    title: 'キャリブレーション期間中',
    text: 'データ蓄積を継続してください。毎日の記録で最適姿勢が自動特定されます。',
    steps: ['毎朝iOSショートカットを起動', '就寝前姿勢をLINEで報告'],
  },
];

const WEEK_LOG = [
  { date: '5/27', score: 70, dur: '6h00m', hr: 58, color: '#7f77dd' },
  { date: '5/26', score: 74, dur: '6h30m', hr: 56, color: '#4ade80' },
  { date: '5/25', score: 65, dur: '5h45m', hr: 61, color: '#fbbf24' },
  { date: '5/24', score: 58, dur: '5h20m', hr: 64, color: '#f87171' },
  { date: '5/23', score: 78, dur: '7h00m', hr: 54, color: '#4ade80' },
];

export default function Sleep() {
  const navigate = useNavigate();

  const circumference = Math.PI * 60;
  const offset = circumference * (1 - SCORE / 100);

  return (
    <div className="page">
      <div className="topbar">
        <div className="back-btn" onClick={() => navigate(-1)}>
          <i className="ti ti-arrow-left" /> 戻る
        </div>
        <div className="page-title">睡眠</div>
        <div style={{ width: 40 }} />
      </div>

      <div className="scroll-area" style={{ padding: '0 0 16px' }}>

        {/* スコアヒーロー */}
        <div style={{ padding: '10px 12px 8px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ position: 'relative', width: 72, height: 72, flexShrink: 0 }}>
            <svg viewBox="0 0 72 72" width="72" height="72">
              <defs>
                <linearGradient id="sg" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#534AB7" />
                  <stop offset="100%" stopColor="#4ade80" />
                </linearGradient>
              </defs>
              <circle cx="36" cy="36" r="28" fill="none" stroke="#1e1e3a" strokeWidth="7" />
              <circle cx="36" cy="36" r="28" fill="none" stroke="url(#sg)" strokeWidth="7"
                strokeDasharray={`${Math.PI * 2 * 28}`}
                strokeDashoffset={`${Math.PI * 2 * 28 * (1 - SCORE / 100)}`}
                strokeLinecap="round"
                transform="rotate(-90 36 36)"
              />
            </svg>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', textAlign: 'center' }}>
              <div style={{ fontSize: 20, fontWeight: 500, color: '#e0e0ff' }}>{SCORE}</div>
              <div style={{ fontSize: 8, color: '#6666aa' }}>スコア</div>
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 10, color: '#444466', marginBottom: 3 }}>2026年5月27日（水）の睡眠</div>
            <div style={{ fontSize: 13, fontWeight: 500, color: '#c0c0ee' }}>03:00 〜 09:00</div>
            <div style={{ fontSize: 11, color: '#8888aa', marginTop: 1 }}>総睡眠 6時間00分</div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: 'rgba(83,74,183,0.12)', border: '0.5px solid #534AB7', borderRadius: 7, padding: '3px 7px', marginTop: 4 }}>
              <i className="ti ti-watch" style={{ fontSize: 11, color: '#7f77dd' }} />
              <span style={{ fontSize: 9, color: '#7f77dd' }}>Apple Watch 自動取得</span>
            </div>
          </div>
        </div>

        {/* 4軸スコア */}
        <div style={{ fontSize: 9, color: '#444466', letterSpacing: '0.06em', padding: '0 12px', marginBottom: 5 }}>4軸スコア</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 6, padding: '0 12px', marginBottom: 10 }}>
          {AXES.map(ax => (
            <div key={ax.label} style={{ background: 'rgba(16,16,35,0.9)', border: '0.5px solid #1e1e3a', borderRadius: 10, padding: '8px 6px', textAlign: 'center' }}>
              <div style={{ fontSize: 15, marginBottom: 3 }}>{ax.icon}</div>
              <div style={{ fontSize: 13, fontWeight: 500, color: '#e0e0ff' }}>{ax.val}</div>
              <div style={{ fontSize: 8, color: '#444466', marginTop: 1 }}>{ax.label}</div>
              <div style={{ height: 3, background: '#1e1e3a', borderRadius: 2, marginTop: 4, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${ax.pct}%`, background: ax.color, borderRadius: 2 }} />
              </div>
            </div>
          ))}
        </div>

        {/* 睡眠ステージ */}
        <div style={{ margin: '0 12px 10px', background: 'rgba(16,16,35,0.9)', border: '0.5px solid #1e1e3a', borderRadius: 12, padding: '11px 12px' }}>
          <div style={{ fontSize: 10, color: '#6666aa', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 5 }}>
            <i className="ti ti-moon" style={{ fontSize: 14, color: '#a78bfa' }} /> 睡眠ステージ分布
          </div>
          <div style={{ display: 'flex', height: 18, borderRadius: 6, overflow: 'hidden', marginBottom: 6, gap: 1 }}>
            <div style={{ width: '0%', background: '#2a1a6a' }} />
            <div style={{ width: '0%', background: '#1a3a6a' }} />
            <div style={{ width: '100%', background: '#1a4a3a' }} />
            <div style={{ width: '0%', background: '#3a1a1a' }} />
          </div>
          <div style={{ fontSize: 9, color: '#f87171', marginBottom: 6 }}>⚠️ 深い睡眠・REM未検出（Apple Watch 計測限界の可能性）</div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {[
              { color: '#2a1a6a', label: '深い睡眠 0%' },
              { color: '#1a3a6a', label: 'REM 0%' },
              { color: '#1a4a3a', label: 'コア 100%' },
              { color: '#3a1a1a', label: '覚醒 0%' },
            ].map(s => (
              <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 9, color: '#6666aa' }}>
                <div style={{ width: 8, height: 8, borderRadius: 2, background: s.color }} />
                {s.label}
              </div>
            ))}
          </div>
        </div>

        {/* アドバイス */}
        <div style={{ fontSize: 9, color: '#444466', letterSpacing: '0.06em', padding: '0 12px', marginBottom: 5 }}>Neuro-Recovery アドバイス</div>
        <div style={{ padding: '0 12px', display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 10 }}>
          {ADVICES.map(adv => (
            <div key={adv.pri} style={{ background: 'rgba(16,16,35,0.9)', border: `0.5px solid ${adv.priColor}55`, borderRadius: 10, padding: '10px 11px', display: 'flex', gap: 8, alignItems: 'flex-start' }}>
              <div style={{ fontSize: 18, flexShrink: 0, marginTop: 1 }}>{adv.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 8, color: '#555580', marginBottom: 2 }}>{adv.role}</div>
                <div style={{ fontSize: 11, fontWeight: 500, color: '#c0c0ee', marginBottom: 3, lineHeight: 1.4 }}>{adv.title}</div>
                <div style={{ fontSize: 9, color: '#555580', lineHeight: 1.6, marginBottom: 5 }}>{adv.text}</div>
                {adv.steps.map(s => (
                  <div key={s} style={{ fontSize: 9, color: '#6666aa', display: 'flex', gap: 4, marginTop: 2 }}>
                    <span style={{ color: '#444466', flexShrink: 0 }}>→</span>{s}
                  </div>
                ))}
              </div>
              <div style={{ fontSize: 8, fontWeight: 500, padding: '2px 6px', borderRadius: 6, flexShrink: 0, background: `${adv.priColor}20`, color: adv.priColor, border: `0.5px solid ${adv.priColor}66` }}>
                優先{adv.pri}
              </div>
            </div>
          ))}
        </div>

        {/* 心拍・HRV */}
        <div style={{ margin: '0 12px 10px', background: 'rgba(16,16,35,0.9)', border: '0.5px solid #1e1e3a', borderRadius: 12, padding: '11px 12px' }}>
          <div style={{ fontSize: 10, color: '#6666aa', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 5 }}>
            <i className="ti ti-activity" style={{ fontSize: 14, color: '#60a5fa' }} /> 心拍・HRV データ
          </div>
          {[
            { label: '平均心拍', val: '58 bpm', pct: 60, color: '#f87171' },
            { label: '最低心拍', val: '48 bpm', pct: 46, color: '#60a5fa' },
            { label: '最高心拍', val: '75 bpm', pct: 72, color: '#fbbf24' },
            { label: 'HRV', val: '45 ms', pct: 55, color: '#4ade80' },
          ].map(item => (
            <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <div style={{ fontSize: 9, color: '#8888aa', width: 52, flexShrink: 0 }}>{item.label}</div>
              <div style={{ flex: 1, height: 4, background: '#1e1e3a', borderRadius: 2, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${item.pct}%`, background: item.color, borderRadius: 2 }} />
              </div>
              <div style={{ fontSize: 10, color: '#c0c0ee', width: 40, textAlign: 'right', flexShrink: 0 }}>{item.val}</div>
            </div>
          ))}
        </div>

        {/* 週間ログ */}
        <div style={{ fontSize: 9, color: '#444466', letterSpacing: '0.06em', padding: '0 12px', marginBottom: 5 }}>過去7日間の睡眠スコア</div>
        <div style={{ margin: '0 12px', background: 'rgba(16,16,35,0.9)', border: '0.5px solid #1e1e3a', borderRadius: 12, padding: '10px 12px' }}>
          <div style={{ fontSize: 10, color: '#6666aa', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 5 }}>
            <i className="ti ti-calendar" style={{ fontSize: 14, color: '#fbbf24' }} /> 週間トレンド
          </div>
          {WEEK_LOG.map((log, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '5px 0', borderBottom: i < WEEK_LOG.length - 1 ? '0.5px solid #0f0f2a' : 'none' }}>
              <div style={{ fontSize: 10, color: '#6666aa', width: 36 }}>{log.date}</div>
              <div style={{ fontSize: 13, fontWeight: 500, color: log.color, width: 24 }}>{log.score}</div>
              <div style={{ flex: 1, height: 4, background: '#1e1e3a', borderRadius: 2, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${log.score}%`, background: log.color, borderRadius: 2 }} />
              </div>
              <div style={{ fontSize: 9, color: '#555580', width: 36 }}>{log.dur}</div>
              <div style={{ fontSize: 9, color: '#444466', width: 38, textAlign: 'right' }}>{log.hr}bpm</div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
