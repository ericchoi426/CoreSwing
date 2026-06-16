import { useState, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { readLogs, writeLogs } from '../services/googleDrive';
import { PracticeLog } from '../types';

export function useLogs() {
  const { accessToken, fileId } = useAuth();
  const [logs, setLogs] = useState<PracticeLog[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLogs = useCallback(async () => {
    if (!accessToken || !fileId) return;
    setLoading(true);
    try {
      const data = await readLogs(accessToken, fileId);
      setLogs(data);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [accessToken, fileId]);

  const addLog = async (newLog: Omit<PracticeLog, 'id' | 'date'>) => {
    if (!accessToken || !fileId) throw new Error('Not authenticated');
    
    const log: PracticeLog = {
      ...newLog,
      id: crypto.randomUUID(),
      date: new Date().toISOString().split('T')[0],
    };

    const updatedLogs = [log, ...logs]; // Prepend newest
    
    try {
      await writeLogs(accessToken, fileId, updatedLogs);
      setLogs(updatedLogs);
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  return { logs, loading, error, fetchLogs, addLog };
}
