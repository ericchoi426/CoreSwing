import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import { Home, BookOpen, SquarePen } from 'lucide-react';
import Dashboard from './pages/Dashboard';
import TheoryLibrary from './pages/TheoryLibrary';
import TheoryForm from './pages/TheoryForm';
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
        const fileId = await initializeDriveFile(tokenResponse.access_token, 'coreswing_log.json');
        const theoryFileId = await initializeDriveFile(tokenResponse.access_token, 'coreswing_theory.json');
        setAuth(tokenResponse.access_token, fileId, theoryFileId);
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

  // Hide header and bottom nav on full-screen modes like Field Mode and Log Detail/Edit
  const hideChrome = isFieldMode || isLogDetail || location.pathname.includes('/edit') || location.pathname.includes('/new');

  return (
  return (
    <div className={`min-h-screen max-w-md mx-auto flex flex-col relative overflow-hidden bg-[#0a0a0c]`}>
      
      {/* Ambient Red Glow Effect */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-20%] w-[120%] h-[50%] bg-red-900/40 blur-[120px] rounded-full mix-blend-screen opacity-70"></div>
        <div className="absolute top-[40%] right-[-30%] w-[80%] h-[40%] bg-red-800/20 blur-[100px] rounded-full mix-blend-screen opacity-50"></div>
      </div>

      {/* Header (Hidden in Field Mode & Log Detail) */}
      {!hideChrome && (
        <header className="px-6 py-5 flex justify-between items-center z-10 relative">
          <h1 className="text-xl font-extrabold tracking-tight text-white drop-shadow-md">CoreSwing</h1>
          {!accessToken ? (
            <button 
              onClick={() => login()}
              disabled={isInitializing}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 rounded-full text-xs font-bold text-white uppercase tracking-widest transition-all disabled:opacity-50 shadow-lg"
            >
              {isInitializing ? '연결 중...' : '로그인'}
            </button>
          ) : (
            <span className="px-3 py-1.5 bg-green-500/20 border border-green-500/30 rounded-full text-[10px] font-bold text-green-400 uppercase tracking-widest backdrop-blur-md">
              연결됨
            </span>
          )}
        </header>
      )}

      {/* Main Content Area */}
      <main className={`flex-1 overflow-y-auto z-10 relative ${!hideChrome ? 'pb-24' : ''}`}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/theory" element={<TheoryLibrary />} />
          <Route path="/theory/new" element={<TheoryForm />} />
          <Route path="/theory/:id/edit" element={<TheoryForm />} />
          <Route path="/log" element={<PracticeLogForm />} />
          <Route path="/log/:id" element={<LogDetail />} />
          <Route path="/log/:id/edit" element={<PracticeLogForm />} />
          <Route path="/field" element={<FieldMode />} />
        </Routes>
      </main>

      {/* Bottom Navigation (Hidden in Field Mode & Log Detail) */}
      {!hideChrome && (
        <nav className="absolute bottom-0 w-full bg-black/40 backdrop-blur-xl border-t border-white/10 flex justify-around py-3 z-20">
          <Link to="/" className={`flex flex-col items-center gap-1 transition-all ${location.pathname === '/' ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]' : 'text-gray-500 hover:text-gray-300'}`}>
            <Home className="w-5 h-5" strokeWidth={location.pathname === '/' ? 2.5 : 2} />
            <span className="text-[10px] font-bold uppercase tracking-widest">홈</span>
          </Link>
          <Link to="/theory" className={`flex flex-col items-center gap-1 transition-all ${location.pathname === '/theory' ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]' : 'text-gray-500 hover:text-gray-300'}`}>
            <BookOpen className="w-5 h-5" strokeWidth={location.pathname === '/theory' ? 2.5 : 2} />
            <span className="text-[10px] font-bold uppercase tracking-widest">이론</span>
          </Link>
          <Link to="/log" className={`flex flex-col items-center gap-1 transition-all ${location.pathname === '/log' ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]' : 'text-gray-500 hover:text-gray-300'}`}>
            <SquarePen className="w-5 h-5" strokeWidth={location.pathname === '/log' ? 2.5 : 2} />
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
