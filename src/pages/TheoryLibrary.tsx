import { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Book, Activity, Flag, Play, Brain, Plus, ExternalLink, Pencil, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheories } from '../hooks/useTheories';
import { useAuth } from '../context/AuthContext';

const CATEGORY_MAP: Record<string, { label: string; icon: any }> = {
  'fundamentals': { label: '기본 원리', icon: Book },
  'clubs': { label: '클럽별 스윙', icon: Activity },
  'situations': { label: '상황별 스윙', icon: Flag },
  'video': { label: '참고 영상', icon: Play },
  'mental': { label: '멘탈/전략', icon: Brain },
};

export default function TheoryLibrary() {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const { theories, fetchTheories, deleteTheory } = useTheories();
  const { accessToken } = useAuth();

  useEffect(() => {
    if (accessToken) {
      fetchTheories();
    }
  }, [accessToken, fetchTheories]);

  const toggleSection = (id: string) => {
    setOpenSection(openSection === id ? null : id);
  };

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation(); // Prevent accordion from toggling
    if (window.confirm('정말 삭제하시겠습니까?')) {
      try {
        await deleteTheory(id);
      } catch (err) {
        alert('삭제에 실패했습니다.');
      }
    }
  };

  return (
    <div className="p-6 bg-transparent min-h-full pb-32">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white drop-shadow-md">이론 모음</h2>
        <Link 
          to="/theory/new" 
          className="bg-white/10 border border-white/20 text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 hover:bg-white/20 backdrop-blur-md shadow-lg transition-all"
        >
          <Plus className="w-3 h-3" /> 새 이론
        </Link>
      </div>
      
      {theories.length === 0 ? (
        <div className="text-center py-10 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10">
          <Book className="w-8 h-8 text-white/30 mx-auto mb-3" />
          <p className="text-sm font-semibold text-white/50">등록된 이론이 없습니다.<br/>나만의 골프 이론을 작성해 보세요!</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {theories.map((theory) => {
            const catInfo = CATEGORY_MAP[theory.categoryId] || CATEGORY_MAP['fundamentals'];
            const Icon = catInfo.icon;
            const isOpen = openSection === theory.id;

            return (
              <div key={theory.id} className="border border-white/10 rounded-3xl overflow-hidden bg-white/[0.03] backdrop-blur-md shadow-lg transition-all">
                <button 
                  onClick={() => toggleSection(theory.id)}
                  className="w-full flex items-center justify-between p-5 bg-transparent hover:bg-white/[0.05] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-white/10 p-2.5 rounded-xl border border-white/5">
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="text-[10px] font-bold text-white/40 mb-0.5 tracking-wide">{catInfo.label}</span>
                      <span className="font-semibold text-sm text-white text-left leading-tight opacity-90">{theory.title}</span>
                    </div>
                  </div>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-white/30" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-white/30" />
                  )}
                </button>
                
                {isOpen && (
                  <div className="p-5 bg-black/20 border-t border-white/5">
                    <p className="text-sm text-white/80 leading-relaxed whitespace-pre-wrap mb-5">
                      {theory.content}
                    </p>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      {theory.url ? (
                        <a 
                          href={theory.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors bg-blue-400/10 px-3 py-1.5 rounded-full"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          링크 열기
                        </a>
                      ) : (
                        <div></div>
                      )}
                      
                      <div className="flex items-center gap-4">
                        <Link 
                          to={`/theory/${theory.id}/edit`} 
                          className="text-xs font-bold text-white/40 hover:text-white flex items-center gap-1.5 transition-colors"
                        >
                          <Pencil className="w-3.5 h-3.5" /> 수정
                        </Link>
                        <button 
                          onClick={(e) => handleDelete(e, theory.id)}
                          className="text-xs font-bold text-red-400/60 hover:text-red-400 flex items-center gap-1.5 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> 삭제
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
