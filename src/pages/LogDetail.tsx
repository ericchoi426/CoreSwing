import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Calendar, CheckCircle2, Circle } from 'lucide-react';
import { useLogs } from '../hooks/useLogs';
import { PracticeLog } from '../types';
import { useAuth } from '../context/AuthContext';

export default function LogDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { accessToken } = useAuth();
  const { logs, fetchLogs, loading } = useLogs();
  const [log, setLog] = useState<PracticeLog | null>(null);

  useEffect(() => {
    if (accessToken && logs.length === 0) {
      fetchLogs();
    }
  }, [accessToken, fetchLogs, logs.length]);

  useEffect(() => {
    if (logs.length > 0) {
      const foundLog = logs.find(l => l.id === id);
      if (foundLog) {
        setLog(foundLog);
      }
    }
  }, [id, logs]);

  if (!accessToken) {
    return (
      <div className="p-6 bg-white min-h-full flex items-center justify-center text-sm font-medium text-gray-500">
        로그인이 필요합니다.
      </div>
    );
  }

  if (loading && !log) {
    return (
      <div className="p-6 bg-white min-h-full flex items-center justify-center text-sm font-medium text-gray-500">
        불러오는 중...
      </div>
    );
  }

  if (!log && !loading) {
    return (
      <div className="p-6 bg-white min-h-full flex flex-col items-center justify-center gap-4">
        <p className="text-sm font-medium text-gray-500">일지를 찾을 수 없습니다.</p>
        <button onClick={() => navigate(-1)} className="text-black font-semibold text-sm underline">
          돌아가기
        </button>
      </div>
    );
  }

  if (!log) return null;

  return (
    <div className="bg-white min-h-screen flex flex-col">
      {/* Header */}
      <div className="p-6 flex items-center justify-between border-b border-gray-100">
        <button onClick={() => navigate(-1)} className="text-black">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-lg font-bold text-black">일지 상세</h2>
        <div className="w-6">{log.important && <Star className="w-5 h-5 text-black fill-current" />}</div>
      </div>

      <div className="flex-1 p-6 flex flex-col gap-8">
        {/* Date */}
        <section className="flex items-center gap-2 text-gray-500">
          <Calendar className="w-4 h-4" />
          <span className="text-sm font-semibold">{log.date}</span>
        </section>

        {/* Clubs */}
        <section>
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">연습한 클럽</h3>
          <div className="flex flex-wrap gap-2">
            {log.clubs.length > 0 ? log.clubs.map(club => (
              <span key={club} className="px-3 py-1.5 rounded-full text-xs font-semibold bg-gray-100 text-black">
                {club}
              </span>
            )) : (
              <span className="text-sm text-gray-400">선택한 클럽이 없습니다.</span>
            )}
          </div>
        </section>

        {/* Note */}
        <section>
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">깨달음</h3>
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
            <p className="text-sm text-black leading-relaxed whitespace-pre-wrap">
              {log.note || '내용이 없습니다.'}
            </p>
          </div>
        </section>

        {/* Checklist */}
        <section>
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">스윙 체크리스트</h3>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              {log.checklist.tempo ? <CheckCircle2 className="w-5 h-5 text-black" /> : <Circle className="w-5 h-5 text-gray-300" />}
              <span className={`text-sm font-medium ${log.checklist.tempo ? 'text-black' : 'text-gray-400'}`}>부드러운 템포 (1-2, 3)</span>
            </div>
            <div className="flex items-center gap-3">
              {log.checklist.balance ? <CheckCircle2 className="w-5 h-5 text-black" /> : <Circle className="w-5 h-5 text-gray-300" />}
              <span className={`text-sm font-medium ${log.checklist.balance ? 'text-black' : 'text-gray-400'}`}>균형 잡힌 피니시</span>
            </div>
            <div className="flex items-center gap-3">
              {log.checklist.impact ? <CheckCircle2 className="w-5 h-5 text-black" /> : <Circle className="w-5 h-5 text-gray-300" />}
              <span className={`text-sm font-medium ${log.checklist.impact ? 'text-black' : 'text-gray-400'}`}>견고한 임팩트</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
