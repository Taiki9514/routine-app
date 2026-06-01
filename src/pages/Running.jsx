import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const HISTORY = [
  { date: '6/1 日', dist: 5.2, time: '31:00', pace: '5:58', hr: 118, inZone: true },
  { date: '5/30 金', dist: 6.1, time: '35:05', pace: '5:45', hr: 122, inZone: true },
  { date: '5/28 水', dist: 4.8, time: '29:40', pace: '6:10', hr: 115, inZone: true },
  { date: '5/26 月', dist: 5.5, time: '30:15', pace: '5:30', hr: 138, inZone: false },
  { date: '5/24 土', dist: 4.3, time: '27:20', pace: '6:22', hr: 113, inZone: true },
];

const ZONE_DATA = [
  { label: 'Z1', pct: 8, color: '#1d4a6a' },
  { label: 'Z2', pct: 15, color: '#1a6a3a' },
  { label: 'Z3', pct: 42, color: '#6a6a1a', active: true },
  { label: 'Z4', pct: 28, color: '#8a3a0a', active: true },
  { label: 'Z5', pct: 7, color: '#8a1a1a' },
];

const TODAY = new Date().toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'short' });
const latest = HISTORY[0];

export default function Running() {
  const navigate = useNavigate();

  return (
    <div className="page">
      <div className="topbar">
        <div className="back-btn" onClick={() => navigate(-1)}>
          <i className="ti ti-arrow-left" /> 戻る
        </div>
        <div className="page-title">ランニング</div>
        <div style={{ width: 40 }} />
      </div>

      <div className="scroll-area" style={{ padding: '0 0 16px' }}>

        {/* ヒーロー */}
        <div style={{ padding: '10px 12px 8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 9, color: '#4ade80', letterSpacing: '0.05em', marginBottom: 2 }}>🏃 ランニングの日</div>
            <div style={{ fontSize: 14, fontWeight: 500, color: '#e0e0ff' }}>{TODAY}</div>
            <div style={{ fontSize: 10, color: '#444466', marginTop: 1 }}>目標：心拍 111〜130bpm を維持</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'rgba(74,222,128,0.1)', border: '0.5px solid #1d9e75', borderRadius: 8, padding: '4px 8px' }}>
            <i className="ti ti-watch" style={{ fontSize: 12, color: '#4ade80' }} />
            <span style={{ fontSize: 9, color: '#4ade80' }}>Watch連携済</span>
          </div>
        </div>

        {/* 本日の結果カード */}
        <div style={{ fontSize: 9, color: '#444466', letterSpacing: '0.06em', padding: '0 12px', marginBottom: 5 }}>本日のランニング結果</div>
        <div style={{ margin: '0 12px 10px', background: 'linear-gradient(135deg,#0a1a10,#0a0a1a)', border: '1px solid #1d9e75', borderRadius: 14, padding: '14px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg,transparent,rgba(74,222,128,0.4),transparent)' }} />
          <div style={{ fontSize: 9, color: '#4ade80', letterSpacing: '0.06em', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 5 }}>
            <i className="ti ti-check" style={{ fontSize: 12 }} /> 完了 — Apple Watch より自動取得
          </div>

          {/* 3大指標 */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8, marginBottom: 10 }}>
            {[
              { val: latest.dist, unit: 'km', label: '距離' },
              { val: latest.time, unit: '分', label: 'タイム' },
              { val: latest.hr, unit: 'bpm', label: '平均心拍' },
            ].map(item => (
              <div key={item.label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 20, fontWeight: 500, color: '#e0e0ff' }}>
                  {item.val}<span style={{ fontSize: 10, color: '#6666aa', marginLeft: 1 }}>{item.unit}</span>
                </div>
                <div style={{ fontSize: 9, color: '#444466', marginTop: 2 }}>{item.label}</div>
              </div>
            ))}
          </div>

          {/* サブ指標 */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 6, paddingTop: 10, borderTop: '0.5px solid #1a3a1a' }}>
            {[
              { val: latest.pace, label: 'ペース/km' },
              { val: '312', label: '消費kcal' },
              { val: '48', label: 'VO2max' },
              { val: '142', label: '最高心拍' },
            ].map(item => (
              <div key={item.label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 12, fontWeight: 500, color: '#c0c0ee' }}>{item.val}</div>
                <div style={{ fontSize: 8, color: '#444466', marginTop: 1 }}>{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 心拍ゾーン */}
        <div style={{ margin: '0 12px 10px', background: 'rgba(16,16,35,0.9)', border: '0.5px solid #1e1e3a', borderRadius: 12, padding: '11px 12px' }}>
          <div style={{ fontSize: 10, color: '#6666aa', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 5 }}>
            <i className="ti ti-heart-rate-monitor" style={{ fontSize: 14, color: '#f87171' }} /> 心拍ゾーン分布
          </div>
          <div style={{ display: 'flex', height: 14, borderRadius: 6, overflow: 'hidden', gap: 1, marginBottom: 6 }}>
            {ZONE_DATA.map(z => (
              <div key={z.label} style={{ width: `${z.pct}%`, background: z.color }} />
            ))}
          </div>
          <div style={{ display: 'flex', gap: 1 }}>
            {ZONE_DATA.map(z => (
              <div key={z.label} style={{ flex: z.pct, fontSize: 8, color: z.active ? '#e0e0ff' : '#444466', textAlign: 'center', fontWeight: z.active ? 500 : 400 }}>
                {z.label}{z.active ? ` ${z.pct}%` : ''}
              </div>
            ))}
          </div>
          <div style={{ marginTop: 7, fontSize: 10, color: '#555580', display: 'flex', alignItems: 'center', gap: 5 }}>
            <i className="ti ti-target" style={{ fontSize: 13, color: '#4ade80' }} />
            目標ゾーン（111〜130bpm）：<span style={{ color: '#4ade80', fontWeight: 500 }}>57%達成 ✅</span>
          </div>
        </div>

        {/* ペース推移グラフ */}
        <div style={{ margin: '0 12px 10px', background: 'rgba(16,16,35,0.9)', border: '0.5px solid #1e1e3a', borderRadius: 12, padding: '11px 12px' }}>
          <div style={{ fontSize: 10, color: '#6666aa', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 5 }}>
            <i className="ti ti-chart-line" style={{ fontSize: 14, color: '#60a5fa' }} /> ペース＆心拍 推移（km別）
          </div>
          <svg viewBox="0 0 290 80" width="100%" style={{ display: 'block' }}>
            <line x1="30" y1="10" x2="285" y2="10" stroke="#1e1e3a" strokeWidth="0.5" />
            <line x1="30" y1="35" x2="285" y2="35" stroke="#1e1e3a" strokeWidth="0.5" />
            <line x1="30" y1="60" x2="285" y2="60" stroke="#1e1e3a" strokeWidth="0.5" />
            <text x="0" y="13" fontSize="7" fill="#444466" fontFamily="sans-serif">130</text>
            <text x="0" y="38" fontSize="7" fill="#444466" fontFamily="sans-serif">118</text>
            <text x="0" y="63" fontSize="7" fill="#444466" fontFamily="sans-serif">111</text>
            <rect x="30" y="35" width="255" height="25" fill="rgba(74,222,128,0.05)" />
            <line x1="30" y1="35" x2="285" y2="35" stroke="#4ade80" strokeWidth="0.5" strokeDasharray="3,3" opacity="0.4" />
            <line x1="30" y1="60" x2="285" y2="60" stroke="#4ade80" strokeWidth="0.5" strokeDasharray="3,3" opacity="0.4" />
            <polyline points="30,55 78,40 126,38 174,32 222,35 270,42" fill="none" stroke="#f87171" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
            <polyline points="30,48 78,44 126,40 174,36 222,38 270,44" fill="none" stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
            {['1km','2km','3km','4km','5km','5.2'].map((l,i) => (
              <text key={l} x={30 + i*48} y="75" fontSize="7" fill="#444466" fontFamily="sans-serif" textAnchor="middle">{l}</text>
            ))}
            <line x1="30" y1="5" x2="44" y2="5" stroke="#f87171" strokeWidth="1.5" />
            <text x="46" y="8" fontSize="7" fill="#f87171" fontFamily="sans-serif">心拍</text>
            <line x1="80" y1="5" x2="94" y2="5" stroke="#60a5fa" strokeWidth="1.5" />
            <text x="96" y="8" fontSize="7" fill="#60a5fa" fontFamily="sans-serif">ペース</text>
          </svg>
        </div>

        {/* 過去の記録 */}
        <div style={{ fontSize: 9, color: '#444466', letterSpacing: '0.06em', padding: '0 12px', marginBottom: 5 }}>直近のランニング記録</div>
        <div style={{ margin: '0 12px 10px', background: 'rgba(16,16,35,0.9)', border: '0.5px solid #1e1e3a', borderRadius: 12, padding: '10px 12px' }}>
          <div style={{ fontSize: 10, color: '#6666aa', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 5 }}>
            <i className="ti ti-history" style={{ fontSize: 14, color: '#a78bfa' }} /> 過去5回の記録
          </div>
          {HISTORY.map((h, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '5px 0', borderBottom: i < HISTORY.length - 1 ? '0.5px solid #0f0f2a' : 'none' }}>
              <div style={{ fontSize: 10, color: '#6666aa', width: 50, flexShrink: 0 }}>{h.date}</div>
              <div style={{ fontSize: 11, fontWeight: 500, color: '#c0c0ee', width: 36 }}>{h.dist}km</div>
              <div style={{ flex: 1, height: 4, background: '#1e1e3a', borderRadius: 2, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${(h.dist / 7) * 100}%`, background: 'linear-gradient(90deg,#534AB7,#4ade80)' }} />
              </div>
              <div style={{ fontSize: 9, color: '#555580', width: 40, textAlign: 'right' }}>{h.pace}/km</div>
              <div style={{ fontSize: 9, color: '#444466', width: 38, textAlign: 'right' }}>{h.hr}bpm</div>
              <div style={{ fontSize: 8, padding: '1px 5px', borderRadius: 5, flexShrink: 0, background: h.inZone ? 'rgba(74,222,128,0.1)' : 'rgba(248,113,113,0.1)', color: h.inZone ? '#4ade80' : '#f87171', border: `0.5px solid ${h.inZone ? '#1d9e75' : '#a32d2d'}` }}>
                {h.inZone ? '✅ Z内' : '⚠️ 超過'}
              </div>
            </div>
          ))}
        </div>

        {/* コーチメモ */}
        <div style={{ margin: '0 12px', background: 'rgba(16,16,35,0.9)', border: '0.5px solid #1e1e3a', borderRadius: 10, padding: '10px 12px' }}>
          <div style={{ fontSize: 10, color: '#6666aa', marginBottom: 5, display: 'flex', alignItems: 'center', gap: 5 }}>
            <i className="ti ti-message-circle" style={{ fontSize: 13, color: '#4ade80' }} /> ランコーチより
          </div>
          <div style={{ fontSize: 10, color: '#555580', lineHeight: 1.6 }}>
            今日は心拍118bpmで目標ゾーン内を維持できています。5/26のような心拍超過を防ぐため、ペースより心拍数を優先して走ることを継続してください。距離より「止まらないこと」を優先！
          </div>
        </div>

      </div>
    </div>
  );
}
