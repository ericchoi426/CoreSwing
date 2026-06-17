import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Book, Activity, Flag, Play, Brain } from 'lucide-react';
import { useTheories } from '../hooks/useTheories';
import { useAuth } from '../context/AuthContext';

const CATEGORIES = [
  { id: 'fundamentals', label: '기본 원리', icon: Book },
  { id: 'clubs', label: '클럽별 스윙', icon: Activity },
  { id: 'situations', label: '상황별 스윙', icon: Flag },
  { id: 'video', label: '참고 영상', icon: Play },
  { id: 'mental', label: '멘탈/전략', icon: Brain },
];

export default function TheoryForm() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditMode = Boolean(id);
  
  const { theories, fetchTheories, addTheory, updateTheory } = useTheories();
  const { accessToken } = useAuth();

  const [categoryId, setCategoryId] = useState('fundamentals');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [url, setUrl] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (accessToken) {
      fetchTheories();
    }
  }, [accessToken, fetchTheories]);

  useEffect(() => {
    if (isEditMode && theories.length > 0) {
      const existing = theories.find(t => t.id === id);
      if (existing) {
        setCategoryId(existing.categoryId);
        setTitle(existing.title);
        setContent(existing.content);
        setUrl(existing.url || '');
      }
    }
  }, [isEditMode, id, theories]);

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      alert('제목과 내용을 모두 입력해 주세요.');
      return;
    }
    
    setIsSaving(true);
    try {
      if (isEditMode && id) {
        await updateTheory(id, { categoryId, title, content, url: url.trim() || undefined });
      } else {
        await addTheory({ categoryId, title, content, url: url.trim() || undefined });
      }
      navigate('/theory');
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
        <h1 className="text-lg font-bold text-white drop-shadow-md">{isEditMode ? '이론 수정' : '새 이론 작성'}</h1>
        <button 
          onClick={handleSave} 
          disabled={isSaving}
          className="px-4 py-1.5 bg-white text-black rounded-full text-sm font-bold hover:bg-gray-200 transition-all disabled:opacity-50 shadow-[0_0_10px_rgba(255,255,255,0.2)]"
        >
          {isSaving ? '저장 중...' : '저장'}
        </button>
      </header>

      <div className="p-6 flex flex-col gap-6 relative z-10">
        <section>
          <h2 className="text-xs font-bold text-white/60 uppercase tracking-widest mb-3 px-1">카테고리 선택</h2>
          <div className="grid grid-cols-2 gap-3">
            {CATEGORIES.map(cat => {
              const Icon = cat.icon;
              const isSelected = categoryId === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setCategoryId(cat.id)}
                  className={`flex items-center gap-2 p-3.5 rounded-2xl border transition-all backdrop-blur-md ${
                    isSelected ? 'border-white bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.2)]' : 'border-white/10 bg-white/5 text-white/60 hover:border-white/30 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-bold">{cat.label}</span>
                </button>
              );
            })}
          </div>
        </section>

        <section>
          <h2 className="text-xs font-bold text-white/60 uppercase tracking-widest mb-3 px-1">제목</h2>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="예: 드라이버 어드레스 기본"
            className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 focus:outline-none focus:bg-white/10 focus:border-white/30 transition-all text-sm font-medium text-white placeholder-white/30 backdrop-blur-md"
          />
        </section>

        <section>
          <h2 className="text-xs font-bold text-white/60 uppercase tracking-widest mb-3 px-1">내용</h2>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="핵심 내용을 기록하세요..."
            className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 focus:outline-none focus:bg-white/10 focus:border-white/30 transition-all text-sm font-medium text-white placeholder-white/30 min-h-[200px] resize-none backdrop-blur-md"
          />
        </section>

        <section>
          <h2 className="text-xs font-bold text-white/60 uppercase tracking-widest mb-3 px-1">참고 링크 (선택사항)</h2>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://youtube.com/..."
            className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 focus:outline-none focus:bg-white/10 focus:border-white/30 transition-all text-sm font-medium text-white placeholder-white/30 backdrop-blur-md"
          />
          <p className="text-[11px] font-medium text-white/40 mt-2 px-1">유튜브, 구글 문서, 블로그 등 관련 자료 링크를 추가하세요.</p>
        </section>
      </div>
    </div>
  );
}
