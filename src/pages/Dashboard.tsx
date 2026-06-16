import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SquarePen, BookOpen, ChevronRight } from 'lucide-react';
import { useLogs } from '../hooks/useLogs';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { accessToken } = useAuth();
  const { logs, loading, fetchLogs } = useLogs();

  useEffect(() => {
    if (accessToken) {
      fetchLogs();
    }
  }, [accessToken, fetchLogs]);

  // Show top 3 logs
  const recentLogs = logs.slice(0, 3);

  return (
    <div className="p-6 flex flex-col gap-8 h-full bg-white">
      {/* Today's Goal */}
      <section>
        <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-3">Today's Goal</h2>
        <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 text-black font-medium">
          <p className="text-sm leading-relaxed">
            Keep the right elbow tucked during downswing to prevent over-the-top. Focus on tempo (1-2, 3).
          </p>
        </div>
      </section>

      {/* Main Actions */}
      <section className="grid grid-cols-2 gap-4">
        <Link 
          to="/log" 
          className="flex flex-col items-center justify-center gap-3 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 transition-colors rounded-xl p-6 border border-gray-200"
        >
          <SquarePen className="w-8 h-8 text-black" strokeWidth={1.5} />
          <span className="font-semibold text-sm text-center">New Log</span>
        </Link>
        <Link 
          to="/field" 
          className="flex flex-col items-center justify-center gap-3 bg-gray-900 hover:bg-black active:bg-gray-800 transition-colors rounded-xl p-6 border border-gray-900"
        >
          <BookOpen className="w-8 h-8 text-white" strokeWidth={1.5} />
          <span className="font-semibold text-sm text-white text-center">Field Mode</span>
        </Link>
      </section>

      {/* Recent Logs */}
      <section className="flex-1 overflow-hidden flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wide">Recent Logs</h2>
          {logs.length > 3 && (
            <button className="text-xs font-semibold text-black underline">View All</button>
          )}
        </div>
        
        <div className="flex-1 overflow-y-auto pr-1">
          {!accessToken ? (
            <div className="flex items-center justify-center h-24 text-sm font-medium text-gray-400 bg-gray-50 rounded-lg border border-gray-100">
              Please login to view logs
            </div>
          ) : loading ? (
            <div className="flex items-center justify-center h-24 text-sm font-medium text-gray-400">
              Loading...
            </div>
          ) : recentLogs.length === 0 ? (
            <div className="flex items-center justify-center h-24 text-sm font-medium text-gray-400 bg-gray-50 rounded-lg border border-gray-100">
              No recent logs found.
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {recentLogs.map((log) => (
                <div key={log.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:border-gray-300 transition-colors bg-white shadow-sm">
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-400 font-medium mb-1">{log.date}</span>
                    <span className="text-sm font-semibold text-black flex items-center gap-2">
                      {log.note.length > 25 ? log.note.substring(0, 25) + '...' : log.note || 'No Title'}
                      {log.important && <span className="text-black text-xs">★</span>}
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-300" />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
