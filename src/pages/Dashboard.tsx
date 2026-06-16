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
    <div className="p-6 flex flex-col gap-8 h-full bg-white">
      {/* Today's Goal */}
      <section>
        <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-3">오늘의 연습 목표</h2>
        <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 text-black font-medium">
          <p className="text-sm leading-relaxed">
            다운스윙 시 오른쪽 팔꿈치를 몸에 붙여 오버더탑을 방지하세요. 템포(1-2, 3)에 집중하세요.
          </p>
        </div>
      </section>

      {/* Main Actions */}
      <section className="grid grid-cols-2 gap-4">
        <Link 
          to="/log" 
          className="flex flex-col items-center justify-center gap-3 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 transition-colors rounded-xl p-6 border border-gray-200"
        >
          <SquarePen className="w-8 h-8 text-black" strokeWidth={1.5} />
          <span className="font-semibold text-sm text-center">새 연습 일지 작성</span>
        </Link>
        <Link 
          to="/field" 
          className="flex flex-col items-center justify-center gap-3 bg-gray-900 hover:bg-black active:bg-gray-800 transition-colors rounded-xl p-6 border border-gray-900"
        >
          <BookOpen className="w-8 h-8 text-white" strokeWidth={1.5} />
          <span className="font-semibold text-sm text-white text-center">필드용 핵심 요약</span>
        </Link>
      </section>

      {/* Recent Logs */}
      <section className="flex-1 overflow-hidden flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wide">최근 연습 기록</h2>
          {logs.length > 3 && (
            <button className="text-xs font-semibold text-black underline">전체 보기</button>
          )}
        </div>
        
        <div className="flex-1 overflow-y-auto pr-1">
          {!accessToken ? (
            <div className="flex items-center justify-center h-24 text-sm font-medium text-gray-400 bg-gray-50 rounded-lg border border-gray-100">
              기록을 보려면 로그인해 주세요
            </div>
          ) : loading ? (
            <div className="flex items-center justify-center h-24 text-sm font-medium text-gray-400">
              로딩 중...
            </div>
          ) : recentLogs.length === 0 ? (
            <div className="flex items-center justify-center h-24 text-sm font-medium text-gray-400 bg-gray-50 rounded-lg border border-gray-100">
              최근 연습 기록이 없습니다.
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {recentLogs.map((log) => (
                <Link to={`/log/${log.id}`} key={log.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:border-gray-300 transition-colors bg-white shadow-sm">
                  <div className="flex flex-col gap-1.5 flex-1 pr-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400 font-medium">{log.date}</span>
                      {log.important && <span className="text-black text-xs">★</span>}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {log.clubs.length > 0 ? (
                        log.clubs.map(club => (
                          <span key={club} className="text-[10px] font-bold bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md">
                            {club}
                          </span>
                        ))
                      ) : (
                        <span className="text-[10px] font-bold bg-gray-50 text-gray-400 px-2 py-0.5 rounded-md border border-gray-100">
                          클럽 미지정
                        </span>
                      )}
                    </div>
                    <span className="text-sm font-semibold text-black mt-1 leading-snug">
                      {log.note.length > 30 ? log.note.substring(0, 30) + '...' : log.note || '제목 없음'}
                    </span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-300 flex-shrink-0" />
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
