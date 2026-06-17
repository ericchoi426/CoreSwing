import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SquarePen, BookOpen, ChevronRight } from 'lucide-react';
import { useLogs } from '../hooks/useLogs';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { accessToken } = useAuth();
  const { logs, loading, fetchLogs } = useLogs();

  useEffect(() => {
    if (accessToken) {
      fetchLogs();
    }
  }, [accessToken, fetchLogs]);

  // Show top 3 logs
  const recentLogs = logs.slice(0, 3);

  return (
    <div className="p-6 flex flex-col gap-8 h-full bg-transparent">
      {/* Today's Goal */}
      <section>
        <h2 className="text-xs font-bold text-white/60 uppercase tracking-widest mb-3 px-1">오늘의 연습 목표</h2>
        <div className="border border-white/10 rounded-3xl p-5 bg-white/5 backdrop-blur-md text-white font-medium shadow-lg">
          <p className="text-sm leading-relaxed opacity-90">
            다운스윙 시 오른쪽 팔꿈치를 몸에 붙여 오버더탑을 방지하세요. 템포(1-2, 3)에 집중하세요.
          </p>
        </div>
      </section>

      {/* Main Actions */}
      <section className="grid grid-cols-2 gap-4">
        <Link 
          to="/log" 
          className="flex flex-col items-center justify-center gap-3 bg-white hover:bg-gray-200 active:bg-gray-300 transition-all rounded-3xl p-6 shadow-[0_0_15px_rgba(255,255,255,0.2)]"
        >
          <SquarePen className="w-8 h-8 text-black" strokeWidth={2} />
          <span className="font-bold text-sm text-black text-center">새 일지 작성</span>
        </Link>
        <Link 
          to="/field" 
          className="flex flex-col items-center justify-center gap-3 bg-white/5 hover:bg-white/10 active:bg-white/5 border border-white/10 backdrop-blur-md transition-all rounded-3xl p-6"
        >
          <BookOpen className="w-8 h-8 text-white" strokeWidth={1.5} />
          <span className="font-bold text-sm text-white text-center opacity-90">필드 핵심 요약</span>
        </Link>
      </section>

      {/* Recent Logs */}
      <section className="flex-1 overflow-hidden flex flex-col">
        <div className="flex items-center justify-between mb-4 px-1">
          <h2 className="text-xs font-bold text-white/60 uppercase tracking-widest">최근 연습 기록</h2>
          {logs.length > 3 && (
            <button className="text-xs font-semibold text-white/80 hover:text-white underline underline-offset-4 transition-colors">전체 보기</button>
          )}
        </div>
        
        <div className="flex-1 overflow-y-auto pr-1 pb-4">
          {!accessToken ? (
            <div className="flex items-center justify-center h-24 text-sm font-medium text-white/50 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10">
              기록을 보려면 로그인해 주세요
            </div>
          ) : loading ? (
            <div className="flex items-center justify-center h-24 text-sm font-medium text-white/50">
              로딩 중...
            </div>
          ) : recentLogs.length === 0 ? (
            <div className="flex items-center justify-center h-24 text-sm font-medium text-white/50 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10">
              최근 연습 기록이 없습니다.
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {recentLogs.map((log) => (
                <Link to={`/log/${log.id}`} key={log.id} className="flex items-center justify-between p-5 border border-white/10 rounded-3xl hover:border-white/30 hover:bg-white/[0.07] transition-all bg-white/[0.03] backdrop-blur-md shadow-sm">
                  <div className="flex flex-col gap-2 flex-1 pr-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-white/40 font-medium tracking-wide">{log.date}</span>
                      {log.important && <span className="text-yellow-500 text-xs shadow-yellow-500/50 drop-shadow-md">★</span>}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {log.clubs.length > 0 ? (
                        log.clubs.map(club => (
                          <span key={club} className="text-[10px] font-bold bg-white/10 text-white px-2.5 py-1 rounded-full tracking-wide">
                            {club}
                          </span>
                        ))
                      ) : (
                        <span className="text-[10px] font-bold bg-white/5 text-white/40 px-2.5 py-1 rounded-full border border-white/10">
                          클럽 미지정
                        </span>
                      )}
                    </div>
                    <span className="text-sm font-semibold text-white mt-1 leading-snug opacity-90">
                      {log.note.length > 30 ? log.note.substring(0, 30) + '...' : log.note || '제목 없음'}
                    </span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-white/30 flex-shrink-0" />
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
