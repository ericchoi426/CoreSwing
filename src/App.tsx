import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import Dashboard from './pages/Dashboard';
import TheoryLibrary from './pages/TheoryLibrary';
import PracticeLogForm from './pages/PracticeLogForm';
import FieldMode from './pages/FieldMode';
import LogDetail from './pages/LogDetail';
import { useAuth } from './context/AuthContext';
import { initializeDriveFile } from './services/googleDrive';
import { useState } from 'react';

function AppContent() {
  const { accessToken, setAuth } = useAuth();
  const [isInitializing, setIsInitializing] = useState(false);
  const location = useLocation();
  const isFieldMode = location.pathname === '/field';
  const isLogDetail = location.pathname.startsWith('/log/');

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setIsInitializing(true);
      try {
        const fileId = await initializeDriveFile(tokenResponse.access_token);
        setAuth(tokenResponse.access_token, fileId);
      } catch (err) {
        console.error('Failed to initialize drive file', err);
        alert('구글 드라이브 연결에 실패했습니다.');
      } finally {
        setIsInitializing(false);
      }
    },
    scope: 'https://www.googleapis.com/auth/drive.file',
    hint: 'ericchoi426@gmail.com', // To optimize UX as requested
  });

  // Hide header and bottom nav on full-screen modes like Field Mode and Log Detail
  const hideChrome = isFieldMode || isLogDetail;

  return (
    <div className={`min-h-screen max-w-md mx-auto shadow-2xl flex flex-col relative overflow-hidden ${isFieldMode ? 'bg-black' : 'bg-white'}`}>
      {/* Header (Hidden in Field Mode & Log Detail) */}
      {!hideChrome && (
        <header className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-white z-10 relative">
          <h1 className="text-xl font-extrabold tracking-tight text-black">CoreSwing</h1>
          {!accessToken ? (
            <button 
              onClick={() => login()}
              disabled={isInitializing}
              className="text-xs font-bold text-gray-500 uppercase tracking-widest hover:text-black transition-colors disabled:opacity-50"
            >
              {isInitializing ? '연결 중...' : '로그인'}
            </button>
          ) : (
            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
              연결됨
            </span>
          )}
        </header>
      )}

      {/* Main Content Area */}
      <main className={`flex-1 overflow-y-auto ${!hideChrome ? 'pb-24 bg-gray-50' : ''}`}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/theory" element={<TheoryLibrary />} />
          <Route path="/log" element={<PracticeLogForm />} />
          <Route path="/log/:id" element={<LogDetail />} />
          <Route path="/field" element={<FieldMode />} />
        </Routes>
      </main>

      {/* Bottom Navigation (Hidden in Field Mode & Log Detail) */}
      {!hideChrome && (
        <nav className="absolute bottom-0 w-full bg-white border-t border-gray-100 flex justify-around py-4 z-10 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
          <Link to="/" className={`flex flex-col items-center transition-colors ${location.pathname === '/' ? 'text-black' : 'text-gray-400 hover:text-black'}`}>
            <span className="text-[10px] font-bold uppercase tracking-widest">홈</span>
          </Link>
          <Link to="/theory" className={`flex flex-col items-center transition-colors ${location.pathname === '/theory' ? 'text-black' : 'text-gray-400 hover:text-black'}`}>
            <span className="text-[10px] font-bold uppercase tracking-widest">이론</span>
          </Link>
          <Link to="/log" className={`flex flex-col items-center transition-colors ${location.pathname === '/log' ? 'text-black' : 'text-gray-400 hover:text-black'}`}>
            <span className="text-[10px] font-bold uppercase tracking-widest">일지</span>
          </Link>
        </nav>
      )}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
