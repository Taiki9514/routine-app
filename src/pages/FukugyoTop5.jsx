import { useNavigate } from 'react-router-dom';
export default function FukugyoTop5() {
  const navigate = useNavigate();
  return (
    <div className="page">
      <div className="topbar">
        <div className="back-btn" onClick={() => navigate(-1)}>
          <i className="ti ti-arrow-left" /> 戻る
        </div>
        <div className="page-title">副業TOP5</div>
        <div style={{width:40}}/>
      </div>
      <div className="scroll-area" style={{padding:'16px 12px',color:'#c0c0ee',fontSize:13}}>
        🚧 実装中
      </div>
    </div>
  );
}
