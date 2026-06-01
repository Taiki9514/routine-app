import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const MILESTONES = [
  { week: '+4週', pct: 18.5, done: true },
  { week: '+8週', pct: 17.0, done: false, current: true },
  { week: '+12週', pct: 15.0, done: false },
  { week: '+16週', pct: 14.5, done: false },
];

const WEEKLY_DATA = [
  { week: 'W1', pct: 20.2, weight: 64.5 },
  { week: 'W2', pct: 20.0, weight: 64.2 },
  { week: 'W3', pct: 19.8, weight: 64.0 },
  { week: 'W4', pct: 19.5, weight: 63.9 },
  { week: 'W5', pct: 19.2, weight: 63.8 },
  { week: 'W6', pct: 19.8, weight: 63.8, current: true },
];

export default function BodyProgress() {
  const navigate = useNavigate();

  // 体質管理スプレッドシートの最新データ（手動更新）
  const stats = {
    weight: 63.8,
    bmi: 21.6,
    fatPct: 19.8,
    musclePct: 37.6,
    visceralFat: 6,
    basalMetab: 1571,
    bodyAge: 29,
  };

  const START_FAT = 20.2;
  const GOAL_FAT = 15.0;
  const progress = Math.max(0, Math.min(100, ((START_FAT - stats.fatPct) / (START_FAT - GOAL_FAT)) * 100));

  // ゲージの円弧計算
  const radius = 60;
  const circumference = Math.PI * radius; // 半円
  const strokeDashoffset = circumference * (1 - progress / 100);

  const AVG_28 = { fatPct: 20.0, musclePct: 36.0, bmi: 23.0 };

  return (
    <div className="page">
      <div className="topbar">
        <div className="back-btn" onClick={() => navigate(-1)}>
          <i className="ti ti-arrow-left" /> 戻る
        </div>
        <div className="page-title">身体記録・進捗</div>
        <div style={{ width: 40 }} />
      </div>

      <div className="scroll-area" style={{ padding: '0 0 16px' }}>

        {/* 体脂肪率ゲージ */}
        <div style={{ padding: '14px 12px 10px', textAlign: 'center' }}>
          <div style={{ fontSize: 11, color: '#6666aa', marginBottom: 10 }}>体脂肪率 目標達成ゲージ</div>
          <div style={{ position: 'relative', width: 160, margin: '0 auto 8px' }}>
            <svg viewBox="0 0 160 90" width="160" height="90">
              <defs>
                <linearGradient id="ggrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#534AB7" />
                  <stop offset="100%" stopColor="#4ade80" />
                </linearGradient>
              </defs>
              <path d="M10 80 A70 70 0 0 1 150 80" fill="none" stroke="#1e1e3a" strokeWidth="12" strokeLinecap="round" />
              <path
                d="M10 80 A70 70 0 0 1 150 80"
                fill="none"
                stroke="url(#ggrad)"
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={`${circumference}`}
                strokeDashoffset={`${circumference * (1 - progress / 100)}`}
              />
            </svg>
            <div style={{ position: 'absolute', top: '44%', left: '50%', transform: 'translate(-50%,-50%)', textAlign: 'center' }}>
              <div style={{ fontSize: 24, fontWeight: 600, color: '#e0e0ff' }}>{stats.fatPct}%</div>
              <div style={{ fontSize: 9, color: '#6666aa' }}>現在の体脂肪率</div>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 10px' }}>
            <div style={{ fontSize: 9, color: '#444466' }}>開始 <span style={{ color: '#c0c0ee' }}>{START_FAT}%</span></div>
            <div style={{ fontSize: 9, color: '#4ade80' }}>達成率 {Math.round(progress)}%</div>
            <div style={{ fontSize: 9, color: '#444466' }}>目標 <span style={{ color: '#c0c0ee' }}>{GOAL_FAT}%</span></div>
          </div>
        </div>

        {/* 計測値6項目 */}
        <div style={{ fontSize: 9, color: '#444466', letterSpacing: '0.06em', padding: '0 12px', marginBottom: 5 }}>今週の計測値</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 6, padding: '0 12px', marginBottom: 10 }}>
          {[
            { icon: '⚖️', val: `${stats.weight}kg`, label: '体重', diff: '▼ 0.7kg', good: true },
            { icon: '🔥', val: `${stats.fatPct}%`, label: '体脂肪率', diff: '▼ 0.4%', good: true, hi: true },
            { icon: '💪', val: `${stats.musclePct}%`, label: '骨格筋率', diff: '▲ 0.5%', good: true },
            { icon: '🫀', val: `${stats.bmi}`, label: 'BMI', diff: '▼ 0.2', good: true },
            { icon: '🧬', val: `${stats.visceralFat}`, label: '内臓脂肪', diff: '変化なし', good: null },
            { icon: '⚡', val: `${stats.basalMetab}`, label: '基礎代謝', diff: '▲ 34', good: true },
          ].map((s) => (
            <div key={s.label} style={{ background: 'rgba(16,16,35,0.9)', border: `0.5px solid ${s.hi ? '#1d9e75' : '#1e1e3a'}`, borderRadius: 10, padding: '9px 8px 8px', textAlign: 'center' }}>
              <div style={{ fontSize: 15, marginBottom: 3 }}>{s.icon}</div>
              <div style={{ fontSize: 14, fontWeight: 500, color: '#e0e0ff' }}>{s.val}</div>
              <div style={{ fontSize: 9, color: '#444466', marginTop: 1 }}>{s.label}</div>
              <div style={{ fontSize: 9, marginTop: 2, color: s.good === true ? '#4ade80' : s.good === false ? '#f87171' : '#555580' }}>{s.diff}</div>
            </div>
          ))}
        </div>

        {/* 28歳平均比較 */}
        <div style={{ margin: '0 12px 10px', background: 'rgba(16,16,35,0.9)', border: '0.5px solid #1e1e3a', borderRadius: 12, padding: '10px 12px' }}>
          <div style={{ fontSize: 10, color: '#6666aa', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 5 }}>
            <i className="ti ti-users" style={{ fontSize: 14, color: '#a78bfa' }} /> 28歳男性平均との比較
          </div>
          {[
            { label: '体脂肪率', me: stats.fatPct, avg: AVG_28.fatPct, max: 30, unit: '%' },
            { label: '骨格筋率', me: stats.musclePct, avg: AVG_28.musclePct, max: 50, unit: '%' },
            { label: 'BMI', me: stats.bmi, avg: AVG_28.bmi, max: 30, unit: '' },
          ].map((row) => (
            <div key={row.label} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <div style={{ fontSize: 10, color: '#8888aa', width: 52, flexShrink: 0 }}>{row.label}</div>
              <div style={{ flex: 1, position: 'relative', height: 14 }}>
                <div style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', width: '100%', height: 4, background: '#1e1e3a', borderRadius: 2 }} />
                <div style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', width: `${(row.avg / row.max) * 100}%`, height: 4, background: '#3a3a6a', borderRadius: 2, opacity: 0.7 }} />
                <div style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', width: `${(row.me / row.max) * 100}%`, height: 4, background: '#7f77dd', borderRadius: 2 }} />
              </div>
              <div style={{ fontSize: 10, color: '#c0c0ee', width: 40, textAlign: 'right', flexShrink: 0 }}>{row.me}{row.unit}</div>
            </div>
          ))}
          <div style={{ display: 'flex', gap: 12, marginTop: 4 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 9, color: '#6666aa' }}>
              <div style={{ width: 10, height: 3, background: '#7f77dd', borderRadius: 2 }} /> あなた
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 9, color: '#6666aa' }}>
              <div style={{ width: 10, height: 3, background: '#3a3a6a', borderRadius: 2 }} /> 28歳平均
            </div>
          </div>
        </div>

        {/* 16週ロードマップ */}
        <div style={{ margin: '0 12px 10px', background: 'rgba(16,16,35,0.9)', border: '0.5px solid #1e1e3a', borderRadius: 12, padding: '10px 12px' }}>
          <div style={{ fontSize: 10, color: '#6666aa', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 5 }}>
            <i className="ti ti-road" style={{ fontSize: 14, color: '#4ade80' }} /> 16週ロードマップ
          </div>
          <div style={{ position: 'relative', height: 6, background: '#1e1e3a', borderRadius: 3, marginBottom: 6 }}>
            <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: '35%', background: 'linear-gradient(90deg,#534AB7,#4ade80)', borderRadius: 3 }} />
            <div style={{ position: 'absolute', top: '50%', left: '35%', transform: 'translate(-50%,-50%)', width: 12, height: 12, background: '#7f77dd', borderRadius: '50%', border: '2px solid #04040f' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <div style={{ fontSize: 9, color: '#444466' }}>Week 1</div>
            <div style={{ fontSize: 9, color: '#a090ee' }}>← Week 6（現在）</div>
            <div style={{ fontSize: 9, color: '#444466' }}>Week 16</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 5 }}>
            {MILESTONES.map((m) => (
              <div key={m.week} style={{ background: 'rgba(10,10,25,0.8)', border: `0.5px solid ${m.done ? '#1d9e75' : m.current ? '#534AB7' : '#1e1e3a'}`, borderRadius: 7, padding: '6px 5px', textAlign: 'center' }}>
                <div style={{ fontSize: 8, color: m.done ? '#1d9e75' : m.current ? '#a090ee' : '#444466' }}>{m.week}</div>
                <div style={{ fontSize: 11, fontWeight: 500, color: '#c0c0ee', marginTop: 1 }}>{m.pct}%</div>
                <div style={{ fontSize: 11, marginTop: 1 }}>{m.done ? '✅' : m.current ? '🔵' : '⬜'}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 推移グラフ */}
        <div style={{ margin: '0 12px 10px', background: 'rgba(16,16,35,0.9)', border: '0.5px solid #1e1e3a', borderRadius: 12, padding: '10px 12px' }}>
          <div style={{ fontSize: 10, color: '#6666aa', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 5 }}>
            <i className="ti ti-chart-line" style={{ fontSize: 14, color: '#60a5fa' }} /> 体脂肪率 推移グラフ（6週）
          </div>
          <svg viewBox="0 0 290 80" width="100%" style={{ display: 'block' }}>
            <line x1="30" y1="10" x2="285" y2="10" stroke="#1e1e3a" strokeWidth="0.5" />
            <line x1="30" y1="35" x2="285" y2="35" stroke="#1e1e3a" strokeWidth="0.5" />
            <line x1="30" y1="60" x2="285" y2="60" stroke="#1e1e3a" strokeWidth="0.5" />
            <text x="0" y="13" fontSize="8" fill="#444466" fontFamily="sans-serif">21%</text>
            <text x="0" y="38" fontSize="8" fill="#444466" fontFamily="sans-serif">20%</text>
            <text x="0" y="63" fontSize="8" fill="#444466" fontFamily="sans-serif">19%</text>
            <line x1="30" y1="72" x2="285" y2="72" stroke="#4ade80" strokeWidth="0.8" strokeDasharray="3,3" opacity="0.4" />
            <text x="248" y="70" fontSize="7" fill="#4ade80" opacity="0.6" fontFamily="sans-serif">目標15%</text>
            <polyline points="38,52 84,48 130,44 176,38 222,34 268,36" fill="none" stroke="#7f77dd" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            {[38,84,130,176,222,268].map((x, i) => {
              const ys = [52,48,44,38,34,36];
              return <circle key={i} cx={x} cy={ys[i]} r={i === 5 ? 4 : 3} fill={i === 5 ? '#4ade80' : '#534AB7'} />;
            })}
            {WEEKLY_DATA.map((d, i) => (
              <text key={i} x={38 + i * 46} y="78" fontSize="8" fill={d.current ? '#4ade80' : '#444466'} fontFamily="sans-serif" textAnchor="middle">{d.week}</text>
            ))}
          </svg>
        </div>

        {/* 計測写真ボタン */}
        <div
          style={{ margin: '0 12px', background: 'rgba(26,26,58,0.9)', border: '1px solid #534AB7', borderRadius: 12, padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, cursor: 'pointer' }}
          onClick={() => navigate('/measurement')}
        >
          <i className="ti ti-camera" style={{ fontSize: 20, color: '#7f77dd' }} />
          <span style={{ fontSize: 12, fontWeight: 500, color: '#c0c0ee' }}>体重計の写真を入力する</span>
        </div>

      </div>
    </div>
  );
}
