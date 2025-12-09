export type Language = 'en' | 'pt';

export enum AgentRole {
  ARCHITECT = 'Software Architect',
  QA = 'QA & Test Engineer',
  TECH_WRITER = 'Technical Documentation Specialist',
  PRODUCT_MANAGER = 'Product Manager',
  LEGAL = 'Legal Consultant',
  AI_ENGINEER = 'AI & Tech Stack Engineer'
}

export interface AgentEvaluation {
  role: string;
  score: number;
  icon?: string;
  summary: string;
  findings: string[];
  suggestions: string[];
}

export interface GroundingLink {
  title: string;
  uri: string;
}

export interface EvaluationReport {
  id: string;
  timestamp: number;
  repoName: string;
  overallScore: number;
  executiveSummary: string;
  agents: AgentEvaluation[];
  links?: GroundingLink[];
  roadmap: string[];
  quickWins: string[];
  criticalRisks: string[];
}

export enum AnalysisStatus {
  IDLE = 'IDLE',
  ANALYZING = 'ANALYZING',
  COMPLETE = 'COMPLETE',
  ERROR = 'ERROR'
}

export interface InputData {
  repoUrl: string;
  codeSnippet: string;
}