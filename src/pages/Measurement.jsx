import { useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';

const FIELDS = [
  { key: 'weight',    label: '体重',      unit: 'kg',   icon: '⚖️' },
  { key: 'bmi',       label: 'BMI',       unit: '',     icon: '🫀' },
  { key: 'fatPct',    label: '体脂肪率',  unit: '%',    icon: '🔥' },
  { key: 'musclePct', label: '骨格筋率',  unit: '%',    icon: '💪' },
  { key: 'visceral',  label: '内臓脂肪',  unit: '',     icon: '🧬' },
  { key: 'basalMetab',label: '基礎代謝',  unit: 'kcal', icon: '⚡' },
];

const LAST = {
  weight: '63.8', bmi: '21.6', fatPct: '19.8',
  musclePct: '37.6', visceral: '6', basalMetab: '1571',
};

export default function Measurement() {
  const navigate = useNavigate();
  const fileRef = useRef(null);
  const [step, setStep] = useState('top'); // top | preview | reading | confirm | saved
  const [imgSrc, setImgSrc] = useState(null);
  const [values, setValues] = useState({ weight:'', bmi:'', fatPct:'', musclePct:'', visceral:'', basalMetab:'' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setImgSrc(ev.target.result);
      setStep('preview');
    };
    reader.readAsDataURL(file);
  };

  const readWithAI = async () => {
    setStep('reading');
    setLoading(true);
    setError('');
    try {
      const base64 = imgSrc.split(',')[1];
      const mediaType = imgSrc.split(';')[0].split(':')[1];
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-haiku-4-5-20251001',
          max_tokens: 1000,
          messages: [{
            role: 'user',
            content: [
              {
                type: 'image',
                source: { type: 'base64', media_type: mediaType, data: base64 },
              },
              {
                type: 'text',
                text: `この体重計の表示画面から以下の数値を読み取ってください。
数値が見えない場合は空文字にしてください。
必ずJSON形式のみで返答してください。他の文字は一切含めないでください。

{
  "weight": "体重(kg)の数値のみ",
  "bmi": "BMIの数値のみ",
  "fatPct": "体脂肪率(%)の数値のみ",
  "musclePct": "骨格筋率(%)の数値のみ",
  "visceral": "内臓脂肪レベルの数値のみ",
  "basalMetab": "基礎代謝(kcal)の数値のみ"
}`,
              },
            ],
          }],
        }),
      });
      const data = await res.json();
      const text = data.content?.[0]?.text || '';
      const clean = text.replace(/```json|```/g, '').trim();
      const parsed = JSON.parse(clean);
      setValues(parsed);
      setStep('confirm');
    } catch (e) {
      setError('読み取りに失敗しました。数値を手入力してください。');
      setValues({ weight:'', bmi:'', fatPct:'', musclePct:'', visceral:'', basalMetab:'' });
      setStep('confirm');
    }
    setLoading(false);
  };

  const saveData = () => {
    const record = { date: new Date().toISOString(), ...values };
    try {
      const existing = JSON.parse(localStorage.getItem('bodyRecords') || '[]');
      existing.push(record);
      localStorage.setItem('bodyRecords', JSON.stringify(existing));
    } catch (e) {}
    setStep('saved');
  };

  return (
    <div className="page">
      <div className="topbar">
        <div className="back-btn" onClick={() => navigate(-1)}>
          <i className="ti ti-arrow-left" /> 戻る
        </div>
        <div className="page-title">計測</div>
        <div style={{ width: 40 }} />
      </div>

      <div className="scroll-area" style={{ padding: '0 0 16px' }}>

        {/* ===== TOP ===== */}
        {step === 'top' && (
          <div style={{ padding: '16px 12px' }}>
            <div style={{ textAlign: 'center', marginBottom: 20 }}>
              <div style={{ fontSize: 48, marginBottom: 8 }}>⚖️</div>
              <div style={{ fontSize: 14, fontWeight: 500, color: '#e0e0ff', marginBottom: 4 }}>体組成を記録する</div>
              <div style={{ fontSize: 11, color: '#6666aa', lineHeight: 1.6 }}>体重計の表示画面を撮影すると<br />AIが6項目を自動で読み取ります</div>
            </div>

            {/* 撮影ボタン */}
            <div
              onClick={() => fileRef.current?.click()}
              style={{ background: '#534AB7', borderRadius: 12, padding: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, cursor: 'pointer', marginBottom: 10 }}
            >
              <i className="ti ti-camera" style={{ fontSize: 20, color: '#fff' }} />
              <span style={{ fontSize: 13, fontWeight: 500, color: '#fff' }}>体重計を撮影する</span>
            </div>

            <div
              onClick={() => { setValues(LAST); setStep('confirm'); }}
              style={{ background: 'transparent', border: '0.5px solid #2a2a4a', borderRadius: 12, padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, cursor: 'pointer', marginBottom: 20 }}
            >
              <i className="ti ti-pencil" style={{ fontSize: 18, color: '#6666aa' }} />
              <span style={{ fontSize: 12, color: '#6666aa' }}>手入力で記録する</span>
            </div>

            {/* 前回の記録 */}
            <div style={{ background: 'rgba(16,16,35,0.9)', border: '0.5px solid #1e1e3a', borderRadius: 12, padding: '12px' }}>
              <div style={{ fontSize: 10, color: '#6666aa', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 5 }}>
                <i className="ti ti-history" style={{ fontSize: 13, color: '#7f77dd' }} /> 前回の記録（先週日曜）
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 6 }}>
                {FIELDS.map(f => (
                  <div key={f.key} style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 11, marginBottom: 2 }}>{f.icon}</div>
                    <div style={{ fontSize: 13, fontWeight: 500, color: '#c0c0ee' }}>{LAST[f.key]}<span style={{ fontSize: 9, color: '#6666aa' }}>{f.unit}</span></div>
                    <div style={{ fontSize: 9, color: '#444466', marginTop: 1 }}>{f.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <input ref={fileRef} type="file" accept="image/*" capture="environment" onChange={handleFile} style={{ display: 'none' }} />
          </div>
        )}

        {/* ===== PREVIEW ===== */}
        {step === 'preview' && imgSrc && (
          <div style={{ padding: '16px 12px' }}>
            <div style={{ fontSize: 12, fontWeight: 500, color: '#c0c0ee', marginBottom: 10, textAlign: 'center' }}>撮影した画像</div>
            <img src={imgSrc} alt="体重計" style={{ width: '100%', borderRadius: 12, marginBottom: 12, maxHeight: 300, objectFit: 'contain', background: '#0a0a1a' }} />
            <div
              onClick={readWithAI}
              style={{ background: '#534AB7', borderRadius: 12, padding: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, cursor: 'pointer', marginBottom: 8 }}
            >
              <i className="ti ti-robot" style={{ fontSize: 18, color: '#fff' }} />
              <span style={{ fontSize: 12, fontWeight: 500, color: '#fff' }}>AIで数値を読み取る</span>
            </div>
            <div
              onClick={() => setStep('top')}
              style={{ background: 'transparent', border: '0.5px solid #2a2a4a', borderRadius: 12, padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
            >
              <span style={{ fontSize: 11, color: '#6666aa' }}>撮り直す</span>
            </div>
          </div>
        )}

        {/* ===== READING ===== */}
        {step === 'reading' && (
          <div style={{ padding: '60px 12px', textAlign: 'center' }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>🤖</div>
            <div style={{ fontSize: 13, fontWeight: 500, color: '#c0c0ee', marginBottom: 8 }}>AIが数値を読み取っています...</div>
            <div style={{ fontSize: 11, color: '#6666aa', marginBottom: 24 }}>体重計の表示を解析中</div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 6 }}>
              {[0,1,2].map(i => (
                <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: '#534AB7', animation: 'pulse 1s infinite', animationDelay: `${i*0.2}s` }} />
              ))}
            </div>
          </div>
        )}

        {/* ===== CONFIRM ===== */}
        {step === 'confirm' && (
          <div style={{ padding: '16px 12px' }}>
            <div style={{ fontSize: 12, fontWeight: 500, color: '#c0c0ee', marginBottom: 4, textAlign: 'center' }}>
              {error ? '⚠️ 手入力で確認してください' : '✅ 読み取り完了！確認してください'}
            </div>
            {error && <div style={{ fontSize: 10, color: '#f87171', textAlign: 'center', marginBottom: 10 }}>{error}</div>}

            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 16 }}>
              {FIELDS.map(f => (
                <div key={f.key} style={{ background: 'rgba(16,16,35,0.9)', border: '0.5px solid #1e1e3a', borderRadius: 10, padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 18, flexShrink: 0 }}>{f.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 10, color: '#6666aa', marginBottom: 3 }}>{f.label}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <input
                        value={values[f.key] || ''}
                        onChange={e => setValues(prev => ({ ...prev, [f.key]: e.target.value }))}
                        placeholder="数値を入力"
                        type="number"
                        step="0.1"
                        style={{ background: 'rgba(10,10,25,0.8)', border: '0.5px solid #2a2a4a', borderRadius: 6, padding: '5px 8px', color: '#e0e0ff', fontSize: 14, fontWeight: 500, width: 80, fontFamily: 'Outfit,sans-serif', outline: 'none' }}
                      />
                      <span style={{ fontSize: 11, color: '#6666aa' }}>{f.unit}</span>
                      {LAST[f.key] && (
                        <span style={{ fontSize: 9, color: '#444466', marginLeft: 4 }}>前回: {LAST[f.key]}{f.unit}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div
              onClick={saveData}
              style={{ background: 'linear-gradient(90deg,#534AB7,#4a44a0)', borderRadius: 12, padding: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, cursor: 'pointer', marginBottom: 8 }}
            >
              <i className="ti ti-device-floppy" style={{ fontSize: 18, color: '#fff' }} />
              <span style={{ fontSize: 12, fontWeight: 500, color: '#fff' }}>この数値で保存する</span>
            </div>
            <div
              onClick={() => setStep('top')}
              style={{ background: 'transparent', border: '0.5px solid #2a2a4a', borderRadius: 12, padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
            >
              <span style={{ fontSize: 11, color: '#6666aa' }}>キャンセル</span>
            </div>
          </div>
        )}

        {/* ===== SAVED ===== */}
        {step === 'saved' && (
          <div style={{ padding: '40px 12px', textAlign: 'center' }}>
            <div style={{ fontSize: 56, marginBottom: 16 }}>🎉</div>
            <div style={{ fontSize: 16, fontWeight: 500, color: '#4ade80', marginBottom: 8 }}>保存しました！</div>
            <div style={{ fontSize: 12, color: '#6666aa', marginBottom: 8, lineHeight: 1.6 }}>
              体組成データを記録しました。<br />毎週日曜日に計測を続けましょう！
            </div>

            <div style={{ background: 'rgba(16,16,35,0.9)', border: '0.5px solid #1d9e75', borderRadius: 12, padding: '12px', marginBottom: 20 }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8 }}>
                {FIELDS.map(f => (
                  <div key={f.key} style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 11, marginBottom: 2 }}>{f.icon}</div>
                    <div style={{ fontSize: 14, fontWeight: 500, color: '#4ade80' }}>{values[f.key] || '—'}<span style={{ fontSize: 9, color: '#6666aa' }}>{f.unit}</span></div>
                    <div style={{ fontSize: 9, color: '#444466', marginTop: 1 }}>{f.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div
              onClick={() => navigate('/body-progress')}
              style={{ background: '#534AB7', borderRadius: 12, padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, cursor: 'pointer', marginBottom: 8 }}
            >
              <i className="ti ti-chart-bar" style={{ fontSize: 18, color: '#fff' }} />
              <span style={{ fontSize: 12, fontWeight: 500, color: '#fff' }}>進捗を確認する</span>
            </div>
            <div
              onClick={() => { setStep('top'); setValues({ weight:'', bmi:'', fatPct:'', musclePct:'', visceral:'', basalMetab:'' }); setImgSrc(null); }}
              style={{ background: 'transparent', border: '0.5px solid #2a2a4a', borderRadius: 12, padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
            >
              <span style={{ fontSize: 11, color: '#6666aa' }}>トップに戻る</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
