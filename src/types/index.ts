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
