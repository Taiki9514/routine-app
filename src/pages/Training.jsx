import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const MENU = [
  {
    id: 'warmup',
    icon: '🔥',
    title: 'ウォームアップ',
    time: '3分',
    exercises: [
      { id: 'w1', name: '肩回し', detail: '各10回', sets: 1 },
      { id: 'w2', name: '体幹ひねり', detail: '各10回', sets: 1 },
    ],
  },
  {
    id: 'chest',
    icon: '💪',
    title: '胸筋ブロック',
    time: '10分',
    exercises: [
      { id: 'c1', name: 'ノーマル腕立て（プッシュアップバー使用）', detail: '3セット × 10〜15回', sets: 3 },
      { id: 'c2', name: 'ワイド腕立て', detail: '2セット × 10回', sets: 2 },
      { id: 'c3', name: 'ダンベルフライ（5kg・床に仰向け）', detail: '3セット × 12回', sets: 3 },
    ],
  },
  {
    id: 'abs',
    icon: '🔲',
    title: '腹筋ブロック',
    time: '10分',
    warn: '⚠️ 立ちコロは禁止 — 腰椎損傷リスクあり',
    exercises: [
      { id: 'a1', name: '膝コロ（壁から50cm）', detail: '3セット × 8〜10回 — Week 6', sets: 3 },
      { id: 'a2', name: 'クランチ（上部腹筋）', detail: '3セット × 15回', sets: 3 },
      { id: 'a3', name: 'プランク（体幹全体）', detail: '3セット × 30秒', sets: 3 },
    ],
  },
  {
    id: 'arms',
    icon: '💪',
    title: '腕・肩ブロック',
    time: '5分',
    exercises: [
      { id: 'ar1', name: 'ダンベルカール（5kg）', detail: '3セット × 12回', sets: 3 },
      { id: 'ar2', name: '握力グリップ', detail: '2セット × 20回', sets: 2 },
    ],
  },
];

const TODAY = new Date().toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'short' });

export default function Training() {
  const navigate = useNavigate();
  const [openBlocks, setOpenBlocks] = useState({ warmup: true, chest: true, abs: true, arms: false });
  const [checked, setChecked] = useState({});
  const [completedSets, setCompletedSets] = useState({});
  const [done, setDone] = useState(false);

  const toggleBlock = (id) => setOpenBlocks(prev => ({ ...prev, [id]: !prev[id] }));

  const toggleCheck = (exId) => setChecked(prev => ({ ...prev, [exId]: !prev[exId] }));

  const toggleSet = (exId, setIdx) => {
    const key = `${exId}_${setIdx}`;
    setCompletedSets(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const totalExercises = MENU.reduce((sum, b) => sum + b.exercises.length, 0);
  const checkedCount = Object.values(checked).filter(Boolean).length;
  const progress = Math.round((checkedCount / totalExercises) * 100);

  return (
    <div className="page">
      <div className="topbar">
        <div className="back-btn" onClick={() => navigate(-1)}>
          <i className="ti ti-arrow-left" /> 戻る
        </div>
        <div className="page-title">筋トレ</div>
        <div style={{ width: 40 }} />
      </div>

      <div className="scroll-area" style={{ padding: '0 0 16px' }}>

        {/* ヒーロー */}
        <div style={{ padding: '10px 12px 8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 9, color: '#7f77dd', letterSpacing: '0.05em', marginBottom: 2 }}>Phase 1 — Week 6</div>
            <div style={{ fontSize: 15, fontWeight: 500, color: '#e0e0ff' }}>💪 今日は筋トレの日</div>
            <div style={{ fontSize: 10, color: '#444466', marginTop: 1 }}>{TODAY}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 20, fontWeight: 500, color: '#c8c0ff' }}>🔥 12</div>
            <div style={{ fontSize: 9, color: '#444466', marginTop: 1 }}>連続達成</div>
          </div>
        </div>

        {/* 進捗バー */}
        <div style={{ padding: '0 12px 10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
            <span style={{ fontSize: 9, color: '#444466' }}>本日の進捗</span>
            <span style={{ fontSize: 9, color: '#7f77dd' }}>{checkedCount} / {totalExercises} 種目完了</span>
          </div>
          <div style={{ height: 5, background: '#1e1e3a', borderRadius: 3, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${progress}%`, background: 'linear-gradient(90deg,#534AB7,#4ade80)', borderRadius: 3, transition: 'width 0.3s' }} />
          </div>
        </div>

        {/* メニューブロック */}
        <div style={{ padding: '0 12px', display: 'flex', flexDirection: 'column', gap: 7 }}>
          {MENU.map(block => (
            <div key={block.id} style={{ background: 'rgba(16,16,35,0.9)', border: '0.5px solid #1e1e3a', borderRadius: 12, overflow: 'hidden' }}>

              {/* ブロックヘッダー */}
              <div
                onClick={() => toggleBlock(block.id)}
                style={{ padding: '9px 12px', display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', borderBottom: openBlocks[block.id] ? '0.5px solid #1e1e3a' : 'none' }}
              >
                <span style={{ fontSize: 17 }}>{block.icon}</span>
                <span style={{ fontSize: 11, fontWeight: 500, color: '#c0c0ee', flex: 1 }}>{block.title}</span>
                <span style={{ fontSize: 9, color: '#444466' }}>{block.time}</span>
                <i className={`ti ${openBlocks[block.id] ? 'ti-chevron-up' : 'ti-chevron-down'}`} style={{ fontSize: 14, color: '#444466' }} />
              </div>

              {/* 警告 */}
              {block.warn && openBlocks[block.id] && (
                <div style={{ padding: '5px 12px', background: 'rgba(248,113,113,0.08)', borderBottom: '0.5px solid #1e1e3a' }}>
                  <div style={{ fontSize: 9, color: '#f87171', display: 'flex', alignItems: 'center', gap: 4 }}>
                    <i className="ti ti-alert-triangle" style={{ fontSize: 11 }} /> {block.warn}
                  </div>
                </div>
              )}

              {/* 種目リスト */}
              {openBlocks[block.id] && block.exercises.map((ex) => (
                <div key={ex.id} style={{ padding: '8px 12px', display: 'flex', alignItems: 'flex-start', gap: 10, borderBottom: '0.5px solid #0a0a1a' }}>
                  {/* チェックボックス */}
                  <div
                    onClick={() => toggleCheck(ex.id)}
                    style={{ width: 20, height: 20, borderRadius: 6, border: `1.5px solid ${checked[ex.id] ? '#534AB7' : '#2a2a4a'}`, background: checked[ex.id] ? '#534AB7' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, cursor: 'pointer', marginTop: 1 }}
                  >
                    {checked[ex.id] && <i className="ti ti-check" style={{ fontSize: 12, color: '#fff' }} />}
                  </div>

                  {/* 種目情報 */}
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 11, color: checked[ex.id] ? '#555580' : '#c0c0ee', textDecoration: checked[ex.id] ? 'line-through' : 'none', lineHeight: 1.4 }}>{ex.name}</div>
                    <div style={{ fontSize: 9, color: '#555580', marginTop: 1 }}>{ex.detail}</div>
                  </div>

                  {/* セットドット */}
                  <div style={{ display: 'flex', gap: 4, flexShrink: 0, marginTop: 3 }}>
                    {Array.from({ length: ex.sets }).map((_, i) => (
                      <div
                        key={i}
                        onClick={() => toggleSet(ex.id, i)}
                        style={{ width: 9, height: 9, borderRadius: '50%', background: completedSets[`${ex.id}_${i}`] ? '#534AB7' : '#1e1e3a', border: '0.5px solid #2a2a4a', cursor: 'pointer', transition: 'background 0.15s' }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* 完了ボタン */}
        <div style={{ padding: '10px 12px 0' }}>
          <div
            onClick={() => setDone(true)}
            style={{ background: done ? 'linear-gradient(90deg,#1d9e75,#2a5a3a)' : 'linear-gradient(90deg,#1a1a3a,#2a1a4a)', border: `1px solid ${done ? '#4ade80' : '#534AB7'}`, borderRadius: 12, padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, cursor: 'pointer' }}
          >
            <span style={{ fontSize: 18 }}>{done ? '🎉' : '✅'}</span>
            <span style={{ fontSize: 12, fontWeight: 500, color: done ? '#4ade80' : '#c0c0ee' }}>
              {done ? '完了！🔥 13日連続達成' : '今日の筋トレを完了する'}
            </span>
          </div>
        </div>

        {/* コーチメモ */}
        <div style={{ margin: '10px 12px 0', background: 'rgba(16,16,35,0.9)', border: '0.5px solid #1e1e3a', borderRadius: 10, padding: '10px 12px' }}>
          <div style={{ fontSize: 10, color: '#6666aa', marginBottom: 5, display: 'flex', alignItems: 'center', gap: 5 }}>
            <i className="ti ti-message-circle" style={{ fontSize: 13, color: '#7f77dd' }} /> S&Cコーチより
          </div>
          <div style={{ fontSize: 10, color: '#555580', lineHeight: 1.6 }}>
            Week 6はフォームの安定が最優先。膝コロは壁ありで丁寧に。腕立ては肘の角度を45°に保つことを意識して。立ちコロは絶対に禁止！
          </div>
        </div>

      </div>
    </div>
  );
}
