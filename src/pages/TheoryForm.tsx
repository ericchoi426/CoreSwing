import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Book, Activity, Flag, Play, Brain, Save } from 'lucide-react';
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
    <div className="flex flex-col min-h-screen bg-gray-50 pb-20">
      <header className="px-6 py-5 bg-white border-b border-gray-100 flex items-center justify-between sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-gray-400 hover:text-black transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-bold text-black">{isEditMode ? '이론 수정' : '새 이론 작성'}</h1>
        <button 
          onClick={handleSave} 
          disabled={isSaving}
          className="p-2 -mr-2 text-black hover:text-gray-600 transition-colors disabled:opacity-50 flex items-center gap-1"
        >
          <span className="text-sm font-bold">{isSaving ? '저장 중...' : '저장'}</span>
        </button>
      </header>

      <div className="p-6 flex flex-col gap-6">
        <section>
          <h2 className="text-sm font-bold text-gray-900 mb-3">카테고리 선택</h2>
          <div className="grid grid-cols-2 gap-2">
            {CATEGORIES.map(cat => {
              const Icon = cat.icon;
              const isSelected = categoryId === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setCategoryId(cat.id)}
                  className={`flex items-center gap-2 p-3 rounded-lg border transition-all ${
                    isSelected ? 'border-black bg-black text-white' : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
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
          <h2 className="text-sm font-bold text-gray-900 mb-3">제목</h2>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="예: 드라이버 어드레스 기본"
            className="w-full p-4 rounded-xl border border-gray-200 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all text-sm font-medium"
          />
        </section>

        <section>
          <h2 className="text-sm font-bold text-gray-900 mb-3">내용</h2>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="핵심 내용을 기록하세요..."
            className="w-full p-4 rounded-xl border border-gray-200 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all text-sm font-medium min-h-[200px] resize-none"
          />
        </section>

        <section>
          <h2 className="text-sm font-bold text-gray-900 mb-3">참고 링크 (선택사항)</h2>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://youtube.com/..."
            className="w-full p-4 rounded-xl border border-gray-200 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all text-sm font-medium"
          />
          <p className="text-xs text-gray-400 mt-2">유튜브, 구글 문서, 블로그 등 관련 자료 링크를 추가하세요.</p>
        </section>
      </div>
    </div>
  );
}
