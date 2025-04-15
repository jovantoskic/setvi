import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Report = {
  id: string;
  title: string;
  content: string;
};

type ReportState = {
  reports: Report[];
  addReport: (report: Report) => void;
  updateReport: (id: string, updated: Partial<Report>) => void;
  reorderReports: (newOrder: Report[]) => void;
};

export const useReportStore = create<ReportState>()(
  persist(
    (set) => ({
      reports: [],
      addReport: (report) =>
        set((state) => ({ reports: [...state.reports, report] })),
      updateReport: (id, updated) =>
        set((state) => ({
          reports: state.reports.map((r) =>
            r.id === id ? { ...r, ...updated } : r
          ),
        })),
      reorderReports: (newOrder) => set(() => ({ reports: newOrder })),
    }),
    {
      name: 'report-storage',
    }
  )
);
