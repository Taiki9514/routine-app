import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Weather from './pages/Weather';
import BodyProgress from './pages/BodyProgress';
import FukugyoTop5 from './pages/FukugyoTop5';
import NewsArticles from './pages/NewsArticles';
import AiChat from './pages/AiChat';
import InfoCollection from './pages/InfoCollection';
import Training from './pages/Training';
import Running from './pages/Running';
import Sleep from './pages/Sleep';
import Skincare from './pages/Skincare';
import OtherInfo from './pages/OtherInfo';
import Measurement from './pages/Measurement';

const NAV_ITEMS = [
  { path: '/',           icon: 'ti-home',    label: 'ホーム' },
  { path: '/training',   icon: 'ti-barbell', label: 'トレーニング' },
  { path: '/measurement',icon: 'ti-scale',   label: '計測' },
  { path: '/sleep',      icon: 'ti-moon',    label: '睡眠' },
  { path: '/info',       icon: 'ti-news',    label: '情報' },
];

function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="bottom-nav">
      {NAV_ITEMS.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <div
            key={item.path}
            className={`nav-item ${isActive ? 'active' : ''}`}
            onClick={() => navigate(item.path)}
          >
            <i className={`ti ${item.icon} nav-icon`} />
            <span className="nav-label">{item.label}</span>
          </div>
        );
      })}
    </div>
  );
}

export default function App() {
  const location = useLocation();
  const hideNav = ['/ai-chat'].includes(location.pathname);

  return (
    <div style={{ height: '100dvh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ flex: 1, overflow: 'hidden' }}>
        <Routes>
          <Route path="/"              element={<Home />} />
          <Route path="/weather"       element={<Weather />} />
          <Route path="/body-progress" element={<BodyProgress />} />
          <Route path="/fukugyo"       element={<FukugyoTop5 />} />
          <Route path="/news"          element={<NewsArticles />} />
          <Route path="/ai-chat"       element={<AiChat />} />
          <Route path="/info-collect"  element={<InfoCollection />} />
          <Route path="/training"      element={<Training />} />
          <Route path="/running"       element={<Running />} />
          <Route path="/sleep"         element={<Sleep />} />
          <Route path="/skincare"      element={<Skincare />} />
          <Route path="/other-info"    element={<OtherInfo />} />
          <Route path="/measurement"   element={<Measurement />} />
          <Route path="/info"          element={<InfoCollection />} />
        </Routes>
      </div>
      {!hideNav && <BottomNav />}
    </div>
  );
}
