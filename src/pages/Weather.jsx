import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const WMO_CODES = {
  0: { label: '快晴', icon: '☀️' },
  1: { label: '晴れ', icon: '🌤️' },
  2: { label: '晴れ時々曇り', icon: '⛅' },
  3: { label: '曇り', icon: '☁️' },
  45: { label: '霧', icon: '🌫️' },
  51: { label: '霧雨', icon: '🌦️' },
  61: { label: '雨（弱）', icon: '🌧️' },
  63: { label: '雨', icon: '🌧️' },
  65: { label: '雨（強）', icon: '🌧️' },
  80: { label: 'にわか雨', icon: '🌦️' },
  95: { label: '雷雨', icon: '⛈️' },
};

const DAYS_JP = ['日', '月', '火', '水', '木', '金', '土'];

function getWeather(code) {
  return WMO_CODES[code] || { label: '不明', icon: '🌡️' };
}

export default function Weather() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(null);
  const [hourly, setHourly] = useState([]);
  const [daily, setDaily] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch(
          'https://api.open-meteo.com/v1/forecast?latitude=35.6762&longitude=139.6503&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code,precipitation_probability&hourly=temperature_2m,weather_code,precipitation_probability&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=Asia%2FTokyo&forecast_days=7'
        );
        const data = await res.json();
        setCurrent({
          temp: Math.round(data.current.temperature_2m),
          feels: Math.round(data.current.apparent_temperature),
          humidity: data.current.relative_humidity_2m,
          wind: Math.round(data.current.wind_speed_10m * 10) / 10,
          rain: data.current.precipitation_probability,
          code: data.current.weather_code,
        });
        const now = new Date();
        const currentHour = now.getHours();
        const todayHourly = [];
        for (let i = 0; i < 6; i++) {
          const h = (currentHour + i) % 24;
          const idx = data.hourly.time.findIndex(t => t.includes(`T${String(h).padStart(2,'0')}:00`));
          if (idx !== -1) {
            todayHourly.push({
              label: i === 0 ? '今' : `${h}時`,
              temp: Math.round(data.hourly.temperature_2m[idx]),
              code: data.hourly.weather_code[idx],
              rain: data.hourly.precipitation_probability[idx],
            });
          }
        }
        setHourly(todayHourly);
        const weekDaily = data.daily.time.map((t, i) => {
          const d = new Date(t);
          return {
            label: i === 0 ? '今日' : i === 1 ? '明日' : `${DAYS_JP[d.getDay()]}曜`,
            hi: Math.round(data.daily.temperature_2m_max[i]),
            lo: Math.round(data.daily.temperature_2m_min[i]),
            code: data.daily.weather_code[i],
            rain: data.daily.precipitation_probability_max[i],
          };
        });
        setDaily(weekDaily);
        setLoading(false);
      } catch (e) {
        setError(true);
        setLoading(false);
      }
    };
    fetchWeather();
  }, []);

  const w = current ? getWeather(current.code) : null;

  return (
    <div className="page">
      <div className="topbar">
        <div className="back-btn" onClick={() => navigate(-1)}>
          <i className="ti ti-arrow-left" /> 戻る
        </div>
        <div className="page-title">天気予報</div>
        <div style={{ width: 40 }} />
      </div>
      <div className="scroll-area" style={{ padding: '0 0 16px' }}>
        {loading && (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#6666aa', fontSize: 13 }}>
            🌤️ 天気データを取得中...
          </div>
        )}
        {error && (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#f87171', fontSize: 13 }}>
            ⚠️ データ取得に失敗しました
          </div>
        )}
        {!loading && !error && current && (
          <>
            <div style={{ textAlign: 'center', padding: '16px 12px 12px' }}>
              <div style={{ fontSize: 11, color: '#6666aa', marginBottom: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                <i className="ti ti-map-pin" style={{ fontSize: 13 }} /> 東京都
              </div>
              <div style={{ fontSize: 56, lineHeight: 1.1, marginBottom: 4 }}>{w.icon}</div>
              <div style={{ fontSize: 52, fontWeight: 600, color: '#e8e8ff', lineHeight: 1, marginBottom: 6 }}>
                {current.temp}<span style={{ fontSize: 24 }}>°</span>
              </div>
              <div style={{ fontSize: 14, color: '#a0a0cc', marginBottom: 4 }}>{w.label}</div>
              <div style={{ fontSize: 12, color: '#6666aa' }}>
                最高 <span style={{ color: '#c0c0ee' }}>{daily[0]?.hi}°</span>　最低 <span style={{ color: '#c0c0ee' }}>{daily[0]?.lo}°</span>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 6, padding: '0 12px', marginBottom: 10 }}>
              {[
                { icon: 'ti-thermometer', val: `${current.feels}°`, label: '体感' },
                { icon: 'ti-droplet', val: `${current.humidity}%`, label: '湿度' },
                { icon: 'ti-wind', val: `${current.wind}m/s`, label: '風速' },
                { icon: 'ti-umbrella', val: `${current.rain}%`, label: '降水確率' },
              ].map((item) => (
                <div key={item.label} style={{ background: 'rgba(20,20,40,0.8)', border: '0.5px solid #1e1e3a', borderRadius: 10, padding: '8px 4px', textAlign: 'center' }}>
                  <i className={`ti ${item.icon}`} style={{ fontSize: 16, color: '#6666aa', display: 'block', marginBottom: 3 }} />
                  <div style={{ fontSize: 12, fontWeight: 500, color: '#c0c0ee' }}>{item.val}</div>
                  <div style={{ fontSize: 9, color: '#444466', marginTop: 1 }}>{item.label}</div>
                </div>
              ))}
            </div>
            <div style={{ fontSize: 9, color: '#444466', letterSpacing: '0.06em', padding: '0 12px', marginBottom: 6 }}>時間ごとの予報</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6,1fr)', gap: 5, padding: '0 12px', marginBottom: 10 }}>
              {hourly.map((h, i) => (
                <div key={i} style={{ background: i === 0 ? 'rgba(40,35,80,0.8)' : 'rgba(20,20,40,0.8)', border: `0.5px solid ${i === 0 ? '#534AB7' : '#1e1e3a'}`, borderRadius: 8, padding: '7px 3px', textAlign: 'center' }}>
                  <div style={{ fontSize: 9, color: i === 0 ? '#9090cc' : '#444466', marginBottom: 4 }}>{h.label}</div>
                  <div style={{ fontSize: 15, marginBottom: 3 }}>{getWeather(h.code).icon}</div>
                  <div style={{ fontSize: 11, fontWeight: 500, color: '#c0c0ee' }}>{h.temp}°</div>
                  <div style={{ fontSize: 8, color: '#60a5fa', marginTop: 2 }}>{h.rain}%</div>
                </div>
              ))}
            </div>
            <div style={{ fontSize: 9, color: '#444466', letterSpacing: '0.06em', padding: '0 12px', marginBottom: 6 }}>1週間の予報</div>
            <div style={{ padding: '0 12px', display: 'flex', flexDirection: 'column', gap: 5 }}>
              {daily.map((d, i) => (
                <div key={i} style={{ background: i === 0 ? 'rgba(40,35,80,0.7)' : 'rgba(20,20,40,0.7)', border: `0.5px solid ${i === 0 ? '#534AB7' : '#1e1e3a'}`, borderRadius: 8, padding: '8px 10px', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ fontSize: 11, color: i === 0 ? '#a090ee' : '#c0c0ee', width: 28 }}>{d.label}</div>
                  <div style={{ fontSize: 17 }}>{getWeather(d.code).icon}</div>
                  <div style={{ fontSize: 10, color: '#6666aa', flex: 1 }}>{getWeather(d.code).label}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div style={{ fontSize: 11, fontWeight: 500, color: '#e0e0ff' }}>{d.hi}°</div>
                    <div style={{ width: 36, height: 4, background: '#1e1e3a', borderRadius: 2, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: '70%', background: 'linear-gradient(90deg,#60a5fa,#fbbf24)', borderRadius: 2 }} />
                    </div>
                    <div style={{ fontSize: 10, color: '#444466' }}>{d.lo}°</div>
                  </div>
                  <div style={{ fontSize: 9, color: '#60a5fa', width: 28, textAlign: 'right' }}>{d.rain}%</div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
