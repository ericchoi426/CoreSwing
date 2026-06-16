export interface PracticeLog {
  id: string;
  date: string;
  clubs: string[];
  note: string;
  checklist: {
    tempo: boolean;
    balance: boolean;
    impact: boolean;
  };
  important: boolean;
}

export interface Theory {
  id: string;
  categoryId: string; // 'fundamentals', 'clubs', 'situations', 'video', 'mental'
  title: string;
  content: string;
  url?: string;
}
