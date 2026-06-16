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
      title: 'Fundamentals',
      content: 'Grip, Posture, and Alignment are the core of every golf swing. Keep the grip light but firm.'
    },
    {
      id: 'clubs',
      title: 'Swing by Club',
      content: 'Driver: Ball forward, sweep up. Irons: Ball middle, hit down and take a divot. Wedges: Open stance, weight forward.'
    },
    {
      id: 'situations',
      title: 'Situational Swings',
      content: 'Bunker: Open club face, hit sand 2 inches behind ball. Rough: Steeper angle of attack, grip firmer.'
    }
  ];

  return (
    <div className="p-6 bg-white min-h-full">
      <h2 className="text-xl font-bold text-black mb-6">Theory Library</h2>
      
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
