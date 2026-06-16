import { useState, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { readLogs, writeLogs } from '../services/googleDrive';
import { Theory } from '../types';

export function useTheories() {
  const { accessToken, theoryFileId } = useAuth();
  const [theories, setTheories] = useState<Theory[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTheories = useCallback(async () => {
    if (!accessToken || !theoryFileId) return;
    setLoading(true);
    try {
      const data = await readLogs(accessToken, theoryFileId);
      setTheories(data);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [accessToken, theoryFileId]);

  const addTheory = async (newTheory: Omit<Theory, 'id'>) => {
    if (!accessToken || !theoryFileId) throw new Error('Not authenticated');
    
    const freshTheories: Theory[] = await readLogs(accessToken, theoryFileId);
    
    const theory: Theory = {
      ...newTheory,
      id: crypto.randomUUID(),
    };

    const updatedTheories = [...freshTheories, theory]; // Append to the end
    
    try {
      await writeLogs(accessToken, theoryFileId, updatedTheories);
      setTheories(updatedTheories);
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const updateTheory = async (id: string, updatedTheory: Omit<Theory, 'id'>) => {
    if (!accessToken || !theoryFileId) throw new Error('Not initialized');

    const freshTheories: Theory[] = await readLogs(accessToken, theoryFileId);
    const index = freshTheories.findIndex(theory => theory.id === id);
    if (index === -1) throw new Error('Theory not found');

    freshTheories[index] = {
      ...freshTheories[index],
      ...updatedTheory
    };

    await writeLogs(accessToken, theoryFileId, freshTheories);
    setTheories(freshTheories);
  };

  const deleteTheory = async (id: string) => {
    if (!accessToken || !theoryFileId) throw new Error('Not initialized');

    const freshTheories: Theory[] = await readLogs(accessToken, theoryFileId);
    const updatedTheories = freshTheories.filter(theory => theory.id !== id);
    
    await writeLogs(accessToken, theoryFileId, updatedTheories);
    setTheories(updatedTheories);
  };

  return { theories, loading, error, fetchTheories, addTheory, updateTheory, deleteTheory };
}
