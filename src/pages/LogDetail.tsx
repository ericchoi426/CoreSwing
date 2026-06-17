import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Star, Calendar, CheckCircle2, Circle, Pencil, Trash2 } from 'lucide-react';
import { useLogs } from '../hooks/useLogs';
import { PracticeLog } from '../types';
import { useAuth } from '../context/AuthContext';

export default function LogDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { accessToken } = useAuth();
  const { logs, fetchLogs, loading, deleteLog } = useLogs();
  const [log, setLog] = useState<PracticeLog | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

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

  const handleDelete = async () => {
    if (!id || !log) return;
    const confirmDelete = window.confirm('정말로 이 연습 일지를 삭제하시겠습니까?');
    if (!confirmDelete) return;

    setIsDeleting(true);
    try {
      await deleteLog(id);
      navigate('/', { replace: true });
    } catch (err) {
      console.error(err);
      alert('삭제에 실패했습니다.');
      setIsDeleting(false);
    }
  };

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
  return (
    <div className="bg-transparent min-h-screen flex flex-col pb-24">
      {/* Header */}
      <div className="p-6 flex items-center justify-between bg-black/40 backdrop-blur-xl border-b border-white/10 sticky top-0 z-20 shadow-lg">
        <button onClick={() => navigate(-1)} className="text-white/50 hover:text-white transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-lg font-bold text-white drop-shadow-md">일지 상세</h2>
        <div className="w-6">{log.important && <Star className="w-5 h-5 text-yellow-500 fill-current drop-shadow-[0_0_5px_rgba(234,179,8,0.5)]" />}</div>
      </div>

      <div className="flex-1 p-6 flex flex-col gap-8 relative z-10">
        {/* Date */}
        <section className="flex items-center gap-2 text-white/60">
          <Calendar className="w-4 h-4" />
          <span className="text-sm font-semibold tracking-wide">{log.date}</span>
        </section>

        {/* Clubs */}
        <section>
          <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-3 px-1">연습한 클럽</h3>
          <div className="flex flex-wrap gap-2.5">
            {log.clubs.length > 0 ? log.clubs.map(club => (
              <span key={club} className="px-4 py-2 rounded-full text-xs font-bold bg-white/10 text-white backdrop-blur-md shadow-sm border border-white/5">
                {club}
              </span>
            )) : (
              <span className="text-sm text-white/30 px-1">선택한 클럽이 없습니다.</span>
            )}
          </div>
        </section>

        {/* Note */}
        <section>
          <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-3 px-1">깨달음</h3>
          <div className="bg-white/5 p-5 rounded-2xl border border-white/10 backdrop-blur-md shadow-lg">
            <p className="text-sm text-white/90 leading-relaxed whitespace-pre-wrap">
              {log.note || '내용이 없습니다.'}
            </p>
          </div>
        </section>

        {/* Checklist */}
        <section>
          <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-3 px-1">스윙 체크리스트</h3>
          <div className="flex flex-col gap-4 bg-white/5 p-5 rounded-2xl border border-white/10 backdrop-blur-md shadow-lg">
            <div className="flex items-center gap-4">
              {log.checklist.tempo ? <CheckCircle2 className="w-5 h-5 text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]" /> : <Circle className="w-5 h-5 text-white/20" />}
              <span className={`text-sm font-medium transition-colors ${log.checklist.tempo ? 'text-white' : 'text-white/40'}`}>부드러운 템포 (1-2, 3)</span>
            </div>
            <div className="h-px w-full bg-white/5"></div>
            <div className="flex items-center gap-4">
              {log.checklist.balance ? <CheckCircle2 className="w-5 h-5 text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]" /> : <Circle className="w-5 h-5 text-white/20" />}
              <span className={`text-sm font-medium transition-colors ${log.checklist.balance ? 'text-white' : 'text-white/40'}`}>균형 잡힌 피니시</span>
            </div>
            <div className="h-px w-full bg-white/5"></div>
            <div className="flex items-center gap-4">
              {log.checklist.impact ? <CheckCircle2 className="w-5 h-5 text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]" /> : <Circle className="w-5 h-5 text-white/20" />}
              <span className={`text-sm font-medium transition-colors ${log.checklist.impact ? 'text-white' : 'text-white/40'}`}>견고한 임팩트</span>
            </div>
          </div>
        </section>
      </div>

      {/* Action Buttons */}
      <div className="fixed bottom-0 left-0 right-0 p-5 bg-black/60 backdrop-blur-xl border-t border-white/10 max-w-md mx-auto flex gap-3 z-30">
        <button 
          onClick={handleDelete}
          disabled={isDeleting}
          className="flex-[1] flex items-center justify-center gap-2 py-3.5 border border-red-500/30 text-red-400 bg-red-500/10 rounded-2xl font-bold text-sm hover:bg-red-500/20 hover:border-red-500/50 transition-all disabled:opacity-50"
        >
          <Trash2 className="w-4 h-4" />
          {isDeleting ? '삭제 중...' : '삭제'}
        </button>
        <Link 
          to={`/log/${log.id}/edit`}
          className="flex-[2] flex items-center justify-center gap-2 py-3.5 bg-white text-black rounded-2xl font-bold text-sm hover:bg-gray-200 transition-all shadow-[0_0_15px_rgba(255,255,255,0.2)]"
        >
          <Pencil className="w-4 h-4" />
          수정
        </Link>
      </div>
    </div>
  );
}
