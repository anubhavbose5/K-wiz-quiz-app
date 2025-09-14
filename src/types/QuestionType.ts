export type MediaType = "text" | "image" | "video" | "audio" | "youtube";

export interface BonusQuestion {
  id: string;
  questionText: string;
  answer: string;
  mediaType?: string;
  questionMediaUrl: string;
  answerMediaUrl: string;
  answerMediaType: string;
}
export interface NormalQuestion {
  id: string;
  type?: "normal"; // optional so legacy items without type still work
  title?: string;
  questionText: string;
  answer: string;
  mediaType?: MediaType;
  questionMediaUrl?: string;
  answerMediaUrl?: string;
  answerMediaType?: MediaType;
  timeLimit?: number;
  points?: number;
  category?: string;
  difficulty?: "EASY" | "MEDIUM" | "HARD";
  bonusQuestion?: BonusQuestion;
}

/** Clue round pieces */
export interface Clue {
  id: string;
  mediaType?: MediaType;
  mediaUrl?: string;
  questionText?: string; // clue text
}

/** Clue question */
export interface ClueQuestion {
  id: string;
  type: "clue";
  title?: string;
  questionText: string;
  answer: string;
  clues: Clue[]; // typically 3
  timeLimit?: number;
  mediaType?: MediaType;
  questionMediaUrl?: string;
  answerMediaUrl?: string;
  answerMediaType?: MediaType;
  points?: number;
  category?: string;
  difficulty?: "EASY" | "MEDIUM" | "HARD";
}

/** K-onnections puzzle schema */
export interface KonnectionsGroup {
  id: string;
  words: string[]; // 4 words
  label?: string; // e.g. "Planets"
  description?: string;
}

export interface KonnectionsPuzzle {
  id: string;
  words: string[]; // length 16
  groups: KonnectionsGroup[]; // length 4
}

/** Konnections question */
export interface KonnectionsQuestion {
  id: string;
  type: "konnections";
  title?: string;
  konnectionsPuzzle: KonnectionsPuzzle; // embedded puzzle data
  timeLimit?: number;
  points?: number;
  category?: string;
  difficulty?: "EASY" | "MEDIUM" | "HARD";
}

/** Union of all questions */
export type Question = NormalQuestion | ClueQuestion | KonnectionsQuestion;
