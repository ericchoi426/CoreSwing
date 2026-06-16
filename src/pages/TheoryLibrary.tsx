import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function TheoryLibrary() {
  const [openSection, setOpenSection] = useState<string | null>('fundamentals');

  const toggleSection = (id: string) => {
    setOpenSection(openSection === id ? null : id);
  };

  const sections = [
    {
      id: 'fundamentals',
      title: '기본 원리',
      content: '그립, 셋업 자세, 정렬은 모든 골프 스윙의 핵심입니다. 그립은 가볍지만 견고하게 잡으세요.'
    },
    {
      id: 'clubs',
      title: '클럽별 스윙',
      content: '드라이버: 공을 왼발 쪽에 두고 어퍼블로우로 치세요. 아이언: 공을 중앙에 두고 다운블로우로 디봇을 내세요. 웨지: 스탠스를 열고 체중을 왼쪽에 두세요.'
    },
    {
      id: 'situations',
      title: '상황별 스윙',
      content: '벙커: 클럽 페이스를 열고 공 뒤 5cm 모래를 치세요. 러프: 가파른 궤도로 스윙하고 그립을 더 단단히 잡으세요.'
    }
  ];

  return (
    <div className="p-6 bg-white min-h-full">
      <h2 className="text-xl font-bold text-black mb-6">이론 모음</h2>
      
      <div className="flex flex-col gap-3">
        {sections.map((sec) => (
          <div key={sec.id} className="border border-gray-200 rounded-lg overflow-hidden">
            <button 
              onClick={() => toggleSection(sec.id)}
              className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <span className="font-semibold text-sm text-black">{sec.title}</span>
              {openSection === sec.id ? (
                <ChevronUp className="w-4 h-4 text-gray-500" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-500" />
              )}
            </button>
            
            {openSection === sec.id && (
              <div className="p-4 bg-white text-sm text-black border-t border-gray-100 leading-relaxed">
                {sec.content}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
