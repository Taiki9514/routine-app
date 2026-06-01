import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const SEASONS = [
  { id: 'w', label: '❄️ 冬' },
  { id: 's', label: '🌸 春・秋' },
  { id: 'u', label: '☀️ 夏' },
];

const TIMINGS = [
  { id: 'm', label: '🌅 朝の洗顔' },
  { id: 'n', label: '🌙 夜のケア' },
  { id: 'b', label: '🚿 シャンプー' },
];

const TAG_STYLES = {
  cl: { bg: 'rgba(167,139,250,0.1)', color: '#a78bfa', border: '0.5px solid #3a2a6a' },
  mo: { bg: 'rgba(96,165,250,0.1)', color: '#60a5fa', border: '0.5px solid #1a4a7a' },
  uv: { bg: 'rgba(251,191,36,0.12)', color: '#fbbf24', border: '0.5px solid #854F0B' },
  ni: { bg: 'rgba(74,222,128,0.1)', color: '#4ade80', border: '0.5px solid #1d9e75' },
  wk: { bg: 'rgba(249,115,22,0.1)', color: '#fb923c', border: '0.5px solid #7a3a0a' },
};

const DATA = {
  m: {
    s: [
      { n:'STEP 1', t:'クレンジング', p:'パーフェクトワン フォーカス（約2,970円）', h:'37度のお湯で乳化→流す。春秋・日焼け止め使用日のみ実施', tag:'cl', tl:'春秋のみ' },
      { n:'STEP 2', t:'洗顔', p:'キュレル 泡洗顔料（約1,400円）\n月・木：ファンケル酵素洗顔', h:'37度厳守。泡で包んで優しく。角栓は触らず酵素で溶かす', tag:'cl', tl:'週2酵素' },
      { n:'STEP 3', t:'化粧水', p:'白潤プレミアム（約950円）', h:'脱衣所で30秒以内に塗布。気化熱乾燥を防ぐため即塗りが鉄則', tag:'mo', tl:'30秒以内' },
      { n:'STEP 4', t:'乳液', p:'ケアセラ 乳液（通常量）', h:'化粧水の直後に重ね塗り。セラミドでバリア補強', tag:'mo', tl:'保湿' },
      { n:'STEP 5（外出時）', t:'日焼け止め', p:'SPF50+ PA++++', h:'顔・首・耳の後ろまで。ランニング後は2〜3時間ごとに塗り直し', tag:'uv', tl:'UV必須', wide:true },
    ],
    w: [
      { n:'❄️ 冬：クレンジングなし', t:'洗顔のみ（バリア機能を守る）', p:'キュレル 泡洗顔料（約1,400円）\n月・木：ファンケル酵素洗顔', h:'冬は日焼け止め不使用のためクレンジングは過剰洗浄。37度のお湯で優しく洗うのみ', tag:'cl', tl:'クレンジングなし', wide:true },
      { n:'STEP 2', t:'化粧水', p:'白潤プレミアム（約950円）', h:'脱衣所で30秒以内。冬は乾燥が激しいため30秒ルールを特に厳守', tag:'mo', tl:'30秒以内' },
      { n:'STEP 3', t:'乳液（多め）', p:'ケアセラ 乳液（通常量多め）', h:'冬はしっかり塗る。かゆみが出る前日は念入りに', tag:'mo', tl:'保湿強化' },
    ],
    u: [
      { n:'STEP 1', t:'クレンジング', p:'パーフェクトワン フォーカス（約2,970円）', h:'夏は皮脂多いため朝もクレンジング推奨。37度で乳化→流す', tag:'cl', tl:'夏も必要' },
      { n:'STEP 2', t:'洗顔', p:'キュレル 泡洗顔料（約1,400円）\n月・木：ファンケル酵素洗顔', h:'37度厳守。皮脂を取りすぎると余計に分泌される悪循環に注意', tag:'cl', tl:'週2酵素' },
      { n:'STEP 3', t:'化粧水', p:'白潤プレミアム（約950円）', h:'30秒以内。夏でも保湿は必須。乾燥→皮脂過剰の悪循環を断つ', tag:'mo', tl:'30秒以内' },
      { n:'STEP 4', t:'乳液（半量）', p:'ケアセラ 乳液（半量）', h:'夏は半量。Tゾーンは特に薄く。セラミド重複による皮脂過剰を防ぐ', tag:'mo', tl:'半量注意' },
      { n:'STEP 5（必須）', t:'日焼け止め', p:'SPF50+ PA++++', h:'顔・首・耳の後ろ全て。2〜3時間ごとに塗り直し。ランニング後は即塗り直し', tag:'uv', tl:'SPF50+必須', wide:true },
    ],
  },
  n: {
    s: [
      { n:'STEP 1', t:'クレンジング', p:'パーフェクトワン フォーカス（約2,970円）', h:'日焼け止め使用日は必ず実施。37度のお湯で乳化→流す', tag:'cl', tl:'春秋のみ' },
      { n:'STEP 2', t:'洗顔', p:'キュレル 泡洗顔料（約1,400円）\n月・木：ファンケル酵素洗顔', h:'37度厳守。月・木のみファンケル酵素洗顔に変更。角栓は触らない', tag:'cl', tl:'週2酵素' },
      { n:'STEP 3', t:'化粧水', p:'白潤プレミアム（約950円）', h:'脱衣所30秒以内。開いた毛穴に素早く浸透させる', tag:'mo', tl:'30秒以内' },
      { n:'STEP 4', t:'乳液', p:'ケアセラ 乳液（通常量）', h:'夜は通常量でしっかり保湿。就寝中のバリア回復を最大化', tag:'mo', tl:'保湿' },
    ],
    w: [
      { n:'❄️ 冬：クレンジングなし', t:'キュレル 泡洗顔料のみ', p:'キュレル 泡洗顔料（約1,400円）\n月・木：ファンケル酵素洗顔', h:'冬はクレンジング＝過剰洗浄。泡洗顔のみでOK。37度厳守', tag:'cl', tl:'過剰洗浄を防ぐ', wide:true },
      { n:'STEP 2', t:'化粧水', p:'白潤プレミアム（約950円）', h:'脱衣所30秒以内。冬は乾燥MAX。お風呂の蒸気が逃げる前に素早く', tag:'mo', tl:'30秒以内' },
      { n:'STEP 3', t:'乳液（たっぷり）', p:'ケアセラ 乳液（通常量多め）', h:'冬は多めに。かゆみが出そうな日は特にしっかり。セラミドがバリアを補修', tag:'mo', tl:'保湿強化' },
    ],
    u: [
      { n:'STEP 1', t:'クレンジング', p:'パーフェクトワン フォーカス（約2,970円）', h:'夏は日焼け止め必ず使うため夜も必須。37度で乳化→流す', tag:'cl', tl:'必須' },
      { n:'STEP 2', t:'洗顔', p:'キュレル 泡洗顔料（約1,400円）\n月・木：ファンケル酵素洗顔', h:'夏は皮脂多めのため丁寧に。37度超えると乾燥するので厳守', tag:'cl', tl:'週2酵素' },
      { n:'STEP 3', t:'化粧水', p:'白潤プレミアム（約950円）', h:'30秒以内。夏でも保湿は絶対に省かない。皮脂多い＝乾燥のサイン', tag:'mo', tl:'30秒以内' },
      { n:'STEP 4', t:'乳液（半量）', p:'ケアセラ 乳液（半量）', h:'夏の夜も半量。鼻周りは薄くか省いてもOK', tag:'mo', tl:'半量' },
    ],
  },
  b: {
    s: [
      { n:'通常日 STEP 1', t:'予洗い（1分）', p:'お湯のみ', h:'シャンプー前にお湯で汚れの7割を落とす。すすぎ残し防止にもなる', tag:'wk', tl:'必須' },
      { n:'通常日 STEP 2', t:'シャンプー', p:'春秋冬：アルジェラン（約1,100円）\n夏：ビオリス スカルプ（約1,000円）', h:'手のひらで泡立て15秒→頭皮マッサージ1分→すすぎ2分。直付けは頭皮負担大', tag:'wk', tl:'泡立て必須' },
      { n:'通常日 STEP 3', t:'コンディショナー', p:'アルジェラン 毛先のみ（春秋冬）\n夏：なし', h:'耳より下・毛先のみ。頭皮は絶対NG。ワックスあり日はなし', tag:'wk', tl:'毛先のみ' },
      { n:'ワックスあり日', t:'2度洗い', p:'アルジェラン 2回使用', h:'予洗い2分→1度目30秒で流す（ワックス除去）→2度目マッサージ1分→すすぎ2分。コンディショナーなし', tag:'cl', tl:'ワックスあり日' },
      { n:'ボディ', t:'ボディソープ（ニキビ対策）', p:'春秋：キュレル ボディウォッシュ（約1,400円）\n夏：シーブリーズ ボディソープ（約900円）\n冬：ミノン しっとりタイプ（約1,400円）', h:'シャンプー後に背中を流してから洗う。泡立てネットで背中・胸を優しく。月2回は抗菌タオルで念入りに', tag:'ni', tl:'ニキビ対策', wide:true },
    ],
  },
};
DATA.b.w = DATA.b.s;
DATA.b.u = DATA.b.s;

export default function Skincare() {
  const navigate = useNavigate();
  const [season, setSeason] = useState('s');
  const [timing, setTiming] = useState('m');
  const [checked, setChecked] = useState({});
  const [done, setDone] = useState(false);

  const items = (DATA[timing] || {})[timing === 'b' ? 's' : season] || [];

  const toggleCheck = (idx) => setChecked(prev => ({ ...prev, [idx]: !prev[idx] }));

  return (
    <div className="page">
      <div className="topbar">
        <div className="back-btn" onClick={() => navigate(-1)}>
          <i className="ti ti-arrow-left" /> 戻る
        </div>
        <div className="page-title">スキンケア</div>
        <div style={{ width: 40 }} />
      </div>

      {/* 季節タブ */}
      <div style={{ display: 'flex', gap: 5, padding: '6px 10px 0', flexShrink: 0 }}>
        {SEASONS.map(s => (
          <button key={s.id} onClick={() => setSeason(s.id)}
            style={{ flex: 1, padding: '4px 0', borderRadius: 7, fontSize: 9, fontWeight: 500, cursor: 'pointer', border: `0.5px solid ${season === s.id ? '#534AB7' : '#2a2a4a'}`, background: season === s.id ? '#1a1a3a' : 'transparent', color: season === s.id ? '#c0c0ee' : '#6666aa', fontFamily: 'Outfit,sans-serif' }}
          >{s.label}</button>
        ))}
      </div>

      {/* シャワー順番バー */}
      <div style={{ margin: '5px 10px 0', background: 'rgba(83,74,183,0.1)', border: '0.5px solid #2a2a5a', borderRadius: 7, padding: '5px 8px', flexShrink: 0 }}>
        <div style={{ fontSize: 8, color: '#6666aa' }}>🚿 シャワー順番（背中ニキビ防止）</div>
        <div style={{ fontSize: 9, fontWeight: 500, color: '#c0c0ee', marginTop: 2 }}>顔 → 頭（シャンプー） → 背中を流す → 体を洗う</div>
      </div>

      {/* 朝夜タブ */}
      <div style={{ display: 'flex', gap: 5, padding: '5px 10px 0', flexShrink: 0 }}>
        {TIMINGS.map(t => (
          <button key={t.id} onClick={() => setTiming(t.id)}
            style={{ flex: 1, padding: '4px 0', borderRadius: 7, fontSize: 9, fontWeight: 500, cursor: 'pointer', border: `0.5px solid ${timing === t.id ? '#534AB7' : '#2a2a4a'}`, background: timing === t.id ? '#252540' : 'transparent', color: timing === t.id ? '#c0c0ee' : '#6666aa', fontFamily: 'Outfit,sans-serif' }}
          >{t.label}</button>
        ))}
      </div>

      {/* ステップカード */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '5px 10px 0', scrollbarWidth: 'none' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
          {items.map((item, i) => {
            const ts = TAG_STYLES[item.tag] || TAG_STYLES.mo;
            return (
              <div
                key={i}
                onClick={() => toggleCheck(i)}
                style={{ background: 'rgba(14,14,32,0.95)', border: `0.5px solid ${checked[i] ? '#1d9e75' : '#1e1e3a'}`, borderRadius: 9, padding: '7px 7px 6px', cursor: 'pointer', position: 'relative', gridColumn: item.wide ? '1/-1' : 'auto' }}
              >
                {checked[i] && <div style={{ position: 'absolute', top: 5, right: 7, fontSize: 10, color: '#4ade80' }}>✓</div>}
                <div style={{ fontSize: 7, color: '#444466' }}>{item.n}</div>
                <div style={{ fontSize: 10, fontWeight: 500, color: checked[i] ? '#555580' : '#c0c0ee', lineHeight: 1.3, marginTop: 1, textDecoration: checked[i] ? 'line-through' : 'none' }}>{item.t}</div>
                <div style={{ fontSize: 8, color: '#7f77dd', marginTop: 2, lineHeight: 1.3 }}>{item.p.replace(/\n/g, ' / ')}</div>
                <div style={{ fontSize: 7, color: '#555580', lineHeight: 1.5, marginTop: 2 }}>{item.h}</div>
                <span style={{ display: 'inline-block', fontSize: 7, padding: '1px 4px', borderRadius: 4, marginTop: 3, background: ts.bg, color: ts.color, border: ts.border }}>{item.tl}</span>
              </div>
            );
          })}
        </div>

        {/* ルール */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4, marginTop: 5 }}>
          {[
            { l: '⚠️ 洗顔温度', v: '37度厳守', w: 'バリア機能を守る' },
            { l: '⚠️ 保湿タイミング', v: '脱衣所30秒以内', w: '気化熱乾燥を防ぐ' },
            { l: '💆 コンディショナー', v: '耳より下・毛先のみ', w: '頭皮は絶対NG' },
            { l: '💈 ワックスあり日', v: '2度洗い必須', w: 'コンディショナーなし' },
          ].map(r => (
            <div key={r.l} style={{ background: 'rgba(14,14,32,.9)', border: '0.5px solid #1e1e3a', borderRadius: 7, padding: '5px 6px' }}>
              <div style={{ fontSize: 7, color: '#444466' }}>{r.l}</div>
              <div style={{ fontSize: 9, fontWeight: 500, color: '#c0c0ee', marginTop: 1 }}>{r.v}</div>
              <div style={{ fontSize: 7, color: '#3a3a60', marginTop: 1 }}>{r.w}</div>
            </div>
          ))}
        </div>

        {/* 完了ボタン */}
        <div
          onClick={() => setDone(true)}
          style={{ margin: '5px 0 10px', background: done ? 'rgba(15,60,35,0.9)' : 'rgba(26,26,58,.9)', border: `1px solid ${done ? '#4ade80' : '#534AB7'}`, borderRadius: 9, padding: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5, cursor: 'pointer' }}
        >
          <span>✅</span>
          <span style={{ fontSize: 11, fontWeight: 500, color: done ? '#4ade80' : '#c0c0ee' }}>
            {done ? '完了！今日のスキンケアOK 🌟' : '今日のスキンケアを完了する'}
          </span>
        </div>
      </div>
    </div>
  );
}
