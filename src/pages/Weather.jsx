import { useNavigate } from 'react-router-dom';
export default function Weather() {
  const navigate = useNavigate();
  return (
    <div className="page">
      <div className="topbar">
        <div className="back-btn" onClick={() => navigate(-1)}>
          <i className="ti ti-arrow-left" /> 戻る
        </div>
        <div className="page-title">天気予報</div>
        <div style={{width:40}}/>
      </div>
      <div className="scroll-area" style={{padding:'16px 12px',color:'#c0c0ee',fontSize:13}}>
        🚧 実装中
      </div>
    </div>
  );
}
