import { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import { useLogs } from '../hooks/useLogs';
import { useNavigate, useParams } from 'react-router-dom';

export default function PracticeLogForm() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { logs, addLog, updateLog } = useLogs();
  
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
    <div className="p-6 bg-white min-h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-black">
          {isEditMode ? '연습 일지 수정' : '새 연습 일지 작성'}
        </h2>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors disabled:opacity-50"
        >
          <Save className="w-4 h-4" /> {isSaving ? '저장 중...' : (isEditMode ? '수정' : '저장')}
        </button>
      </div>

      <div className="flex-1 flex flex-col gap-8">
        {/* Club Selection */}
        <section>
          <h3 className="text-sm font-bold text-gray-500 uppercase mb-3">연습한 클럽</h3>
          <div className="flex flex-wrap gap-2">
            {clubs.map(club => (
              <button
                key={club}
                onClick={() => toggleClub(club)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors
                  ${selectedClubs.includes(club) 
                    ? 'bg-black text-white border-black' 
                    : 'bg-white text-gray-600 border-gray-300 hover:border-gray-500'}`}
              >
                {club}
              </button>
            ))}
          </div>
        </section>

        {/* Realization / Notes */}
        <section>
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-bold text-gray-500 uppercase">오늘의 깨달음 (최대 3줄)</h3>
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="checkbox" 
                checked={important}
                onChange={(e) => setImportant(e.target.checked)}
                className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black accent-black" 
              />
              <span className="text-xs font-bold text-black flex items-center">
                중요 <span className="ml-1">★</span>
              </span>
            </label>
          </div>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="오늘 연습에서 어떤 점을 깨달았나요?"
            className="w-full border border-gray-300 rounded-lg p-3 text-sm text-black focus:outline-none focus:border-black focus:ring-1 focus:ring-black resize-none"
            rows={3}
            maxLength={150} // Rough limit for 3 lines
          />
          <p className="text-xs text-gray-400 mt-1 text-right">{note.length} / 150</p>
        </section>

        {/* Checklist */}
        <section>
          <h3 className="text-sm font-bold text-gray-500 uppercase mb-3">스윙 체크리스트</h3>
          <div className="flex flex-col gap-3 border border-gray-200 rounded-lg p-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input 
                type="checkbox" 
                checked={checklist.tempo}
                onChange={(e) => setChecklist({...checklist, tempo: e.target.checked})}
                className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black accent-black" 
              />
              <span className="text-sm font-medium text-black">부드러운 템포 (1-2, 3)</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input 
                type="checkbox" 
                checked={checklist.balance}
                onChange={(e) => setChecklist({...checklist, balance: e.target.checked})}
                className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black accent-black" 
              />
              <span className="text-sm font-medium text-black">균형 잡힌 피니시</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input 
                type="checkbox" 
                checked={checklist.impact}
                onChange={(e) => setChecklist({...checklist, impact: e.target.checked})}
                className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black accent-black" 
              />
              <span className="text-sm font-medium text-black">견고한 임팩트</span>
            </label>
          </div>
        </section>
      </div>
    </div>
  );
}
