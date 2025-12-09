import { EvaluationReport } from '../types';

const HISTORY_KEY = 'hexa_report_history';

export const saveReportToHistory = (report: EvaluationReport) => {
  try {
    const history = getHistory();
    // Prepend new report
    const updatedHistory = [report, ...history].slice(0, 50); // Limit to last 50
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));
  } catch (e) {
    console.error("Failed to save history", e);
  }
};

export const getHistory = (): EvaluationReport[] => {
  try {
    const stored = localStorage.getItem(HISTORY_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    console.error("Failed to load history", e);
    return [];
  }
};

export const clearHistory = () => {
  localStorage.removeItem(HISTORY_KEY);
};

export const deleteReportFromHistory = (id: string) => {
  try {
    const history = getHistory();
    const updatedHistory = history.filter(r => r.id !== id);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));
    return updatedHistory;
  } catch (e) {
    console.error("Failed to delete report", e);
    return [];
  }
};