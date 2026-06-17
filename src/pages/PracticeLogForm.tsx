import { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import { useLogs } from '../hooks/useLogs';
import { useNavigate, useParams } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';

export default function PracticeLogForm() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { logs, fetchLogs, addLog, updateLog } = useLogs();
  const { accessToken } = useAuth();
  
  const isEditMode = Boolean(id);

  const [selectedClubs, setSelectedClubs] = useState<string[]>([]);
  const [note, setNote] = useState('');
  const [important, setImportant] = useState(false);
  const [checklist, setChecklist] = useState({
    tempo: false,
    balance: false,
    impact: false,
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (accessToken) {
      fetchLogs();
    }
  }, [accessToken, fetchLogs]);

  useEffect(() => {
    if (isEditMode && logs.length > 0) {
      const existingLog = logs.find(l => l.id === id);
      if (existingLog) {
        setSelectedClubs(existingLog.clubs);
        setNote(existingLog.note);
        setImportant(existingLog.important);
        setChecklist(existingLog.checklist);
      }
    }
  }, [isEditMode, id, logs]);

  const clubs = ['드라이버', '우드', '유틸리티', '롱아이언', '미들아이언', '숏아이언', '웨지', '퍼터'];

  const toggleClub = (club: string) => {
    setSelectedClubs(prev => 
      prev.includes(club) ? prev.filter(c => c !== club) : [...prev, club]
    );
  };

  const handleSave = async () => {
    if (!note.trim() && selectedClubs.length === 0) {
      alert('클럽을 선택하거나 내용을 입력해 주세요.');
      return;
    }

    setIsSaving(true);
    try {
      if (isEditMode && id) {
        await updateLog(id, {
          clubs: selectedClubs,
          note,
          checklist,
          important
        });
      } else {
        await addLog({
          clubs: selectedClubs,
          note,
          checklist,
          important
        });
      }
      // Navigate back
      navigate(-1);
    } catch (err) {
      console.error(err);
      alert('저장에 실패했습니다. 로그인 상태를 확인해 주세요.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-transparent pb-20">
      <header className="px-6 py-5 bg-black/40 backdrop-blur-xl border-b border-white/10 flex items-center justify-between sticky top-0 z-20 shadow-lg">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-white/50 hover:text-white transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-lg font-bold text-white drop-shadow-md">
          {isEditMode ? '연습 일지 수정' : '새 연습 일지 작성'}
        </h2>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="px-4 py-1.5 bg-white text-black rounded-full text-sm font-bold hover:bg-gray-200 transition-all disabled:opacity-50 shadow-[0_0_10px_rgba(255,255,255,0.2)] flex items-center gap-1"
        >
          {isSaving ? '저장 중...' : (isEditMode ? '수정' : '저장')}
        </button>
      </header>

      <div className="p-6 flex-1 flex flex-col gap-8 relative z-10">
        {/* Club Selection */}
        <section>
          <h3 className="text-xs font-bold text-white/60 uppercase tracking-widest mb-3 px-1">연습한 클럽</h3>
          <div className="flex flex-wrap gap-2.5">
            {clubs.map(club => (
              <button
                key={club}
                onClick={() => toggleClub(club)}
                className={`px-4 py-2 rounded-full text-xs font-bold border transition-all backdrop-blur-md
                  ${selectedClubs.includes(club) 
                    ? 'bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.2)]' 
                    : 'bg-white/5 text-white/60 border-white/10 hover:border-white/30 hover:text-white'}`}
              >
                {club}
              </button>
            ))}
          </div>
        </section>

        {/* Realization / Notes */}
        <section>
          <div className="flex justify-between items-center mb-3 px-1">
            <h3 className="text-xs font-bold text-white/60 uppercase tracking-widest">오늘의 깨달음 (최대 3줄)</h3>
            <label className="flex items-center gap-2 cursor-pointer bg-white/5 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-md hover:bg-white/10 transition-colors">
              <input 
                type="checkbox" 
                checked={important}
                onChange={(e) => setImportant(e.target.checked)}
                className="w-3.5 h-3.5 text-white bg-transparent border-white/30 rounded focus:ring-white accent-white cursor-pointer" 
              />
              <span className="text-[11px] font-bold text-white flex items-center tracking-wide">
                중요 <span className="ml-1 text-yellow-500 drop-shadow-[0_0_5px_rgba(234,179,8,0.5)]">★</span>
              </span>
            </label>
          </div>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="오늘 연습에서 어떤 점을 깨달았나요?"
            className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm font-medium text-white placeholder-white/30 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all resize-none backdrop-blur-md"
            rows={4}
            maxLength={150} // Rough limit for 3 lines
          />
          <p className="text-[11px] font-medium text-white/40 mt-2 text-right px-1">{note.length} / 150</p>
        </section>

        {/* Checklist */}
        <section>
          <h3 className="text-xs font-bold text-white/60 uppercase tracking-widest mb-3 px-1">스윙 체크리스트</h3>
          <div className="flex flex-col gap-4 border border-white/10 rounded-2xl p-5 bg-white/5 backdrop-blur-md shadow-lg">
            <label className="flex items-center gap-4 cursor-pointer group">
              <input 
                type="checkbox" 
                checked={checklist.tempo}
                onChange={(e) => setChecklist({...checklist, tempo: e.target.checked})}
                className="w-5 h-5 text-white bg-transparent border-white/30 rounded focus:ring-white accent-white cursor-pointer transition-all" 
              />
              <span className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">부드러운 템포 (1-2, 3)</span>
            </label>
            <div className="h-px w-full bg-white/5"></div>
            <label className="flex items-center gap-4 cursor-pointer group">
              <input 
                type="checkbox" 
                checked={checklist.balance}
                onChange={(e) => setChecklist({...checklist, balance: e.target.checked})}
                className="w-5 h-5 text-white bg-transparent border-white/30 rounded focus:ring-white accent-white cursor-pointer transition-all" 
              />
              <span className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">균형 잡힌 피니시</span>
            </label>
            <div className="h-px w-full bg-white/5"></div>
            <label className="flex items-center gap-4 cursor-pointer group">
              <input 
                type="checkbox" 
                checked={checklist.impact}
                onChange={(e) => setChecklist({...checklist, impact: e.target.checked})}
                className="w-5 h-5 text-white bg-transparent border-white/30 rounded focus:ring-white accent-white cursor-pointer transition-all" 
              />
              <span className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">견고한 임팩트</span>
            </label>
          </div>
        </section>
      </div>
    </div>
  );
}
