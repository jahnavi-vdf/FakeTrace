
export type ThemeID = 'h' | 'b' | 'c' | 'g' | 'j' | 'k' | 't' | 'w';

export interface Theme {
  id: ThemeID;
  name: string;
  colors: {
    primary: string;
    secondary: string;
    bg: string;
  };
}

export type DetectionType = 'image' | 'video' | 'audio';

export interface AnalysisResult {
  confidence: number;
  label: 'REAL' | 'FAKE' | 'SUSPICIOUS';
  findings: string[];
  summary: string;
  detectionMethodology: string;
  metadata?: Record<string, string>;
}

export interface HistoryItem {
  id: string;
  timestamp: number;
  type: DetectionType;
  fileName: string;
  previewUrl?: string;
  result: AnalysisResult;
}
