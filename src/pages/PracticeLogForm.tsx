import { useState } from 'react';
import { Save } from 'lucide-react';
import { useLogs } from '../hooks/useLogs';
import { useNavigate } from 'react-router-dom';

export default function PracticeLogForm() {
  const navigate = useNavigate();
  const { addLog } = useLogs();
  
  const [selectedClubs, setSelectedClubs] = useState<string[]>([]);
  const [note, setNote] = useState('');
  const [important, setImportant] = useState(false);
  const [checklist, setChecklist] = useState({
    tempo: false,
    balance: false,
    impact: false,
  });
  const [isSaving, setIsSaving] = useState(false);

  const clubs = ['Driver', 'Wood', 'Hybrid', 'Long Iron', 'Mid Iron', 'Short Iron', 'Wedge', 'Putter'];

  const toggleClub = (club: string) => {
    setSelectedClubs(prev => 
      prev.includes(club) ? prev.filter(c => c !== club) : [...prev, club]
    );
  };

  const handleSave = async () => {
    if (!note.trim() && selectedClubs.length === 0) {
      alert('Please select a club or enter a note.');
      return;
    }

    setIsSaving(true);
    try {
      await addLog({
        clubs: selectedClubs,
        note,
        checklist,
        important
      });
      // Clear form and navigate back to dashboard
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('Failed to save log. Are you logged in?');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="p-6 bg-white min-h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-black">New Practice Log</h2>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors disabled:opacity-50"
        >
          <Save className="w-4 h-4" /> {isSaving ? 'Saving...' : 'Save'}
        </button>
      </div>

      <div className="flex-1 flex flex-col gap-8">
        {/* Club Selection */}
        <section>
          <h3 className="text-sm font-bold text-gray-500 uppercase mb-3">Clubs Practiced</h3>
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
            <h3 className="text-sm font-bold text-gray-500 uppercase">Key Takeaways (Max 3 lines)</h3>
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="checkbox" 
                checked={important}
                onChange={(e) => setImportant(e.target.checked)}
                className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black accent-black" 
              />
              <span className="text-xs font-bold text-black flex items-center">
                Important <span className="ml-1">★</span>
              </span>
            </label>
          </div>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="What did you learn today?"
            className="w-full border border-gray-300 rounded-lg p-3 text-sm text-black focus:outline-none focus:border-black focus:ring-1 focus:ring-black resize-none"
            rows={3}
            maxLength={150} // Rough limit for 3 lines
          />
          <p className="text-xs text-gray-400 mt-1 text-right">{note.length} / 150</p>
        </section>

        {/* Checklist */}
        <section>
          <h3 className="text-sm font-bold text-gray-500 uppercase mb-3">Swing Checklist</h3>
          <div className="flex flex-col gap-3 border border-gray-200 rounded-lg p-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input 
                type="checkbox" 
                checked={checklist.tempo}
                onChange={(e) => setChecklist({...checklist, tempo: e.target.checked})}
                className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black accent-black" 
              />
              <span className="text-sm font-medium text-black">Smooth Tempo (1-2, 3)</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input 
                type="checkbox" 
                checked={checklist.balance}
                onChange={(e) => setChecklist({...checklist, balance: e.target.checked})}
                className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black accent-black" 
              />
              <span className="text-sm font-medium text-black">Balanced Finish</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input 
                type="checkbox" 
                checked={checklist.impact}
                onChange={(e) => setChecklist({...checklist, impact: e.target.checked})}
                className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black accent-black" 
              />
              <span className="text-sm font-medium text-black">Solid Impact</span>
            </label>
          </div>
        </section>
      </div>
    </div>
  );
}
