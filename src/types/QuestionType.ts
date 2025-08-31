// export type Clue = {
//   id: string;
//   mediaType: "text" | "image" | "video" | "audio" | "youtube";
//   mediaUrl?: string;
//   questionText?: string;
// };

// export type Question = {
//   answerMediaType?:
//     | "text"
//     | "image"
//     | "video"
//     | "audio"
//     | "youtube"
//     | undefined;
//   questionText?: string;
//   id: string;
//   answer?: string;
//   mediaType?: "text" | "image" | "video";
//   mediaURL?: string;
//   questionMediaUrl?: string;
//   answerMediaUrl?: string;
//   type?: "normal" | "clue" | "konnections";
//   clues?: Clue[];
// };

// export type KonnectionsPuzzle = {
//   id: string;
//   words: string[]; // length 16
//   groups: {
//     id: string;
//     words: string[]; // each length 4
//     label?: string;
//     description?: string;
//   }[];
// };

// src/types/quiz.ts
export type MediaType = "text" | "image" | "video" | "audio" | "youtube";

/** Normal question */
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
}

/** Union of all questions */
export type Question = NormalQuestion | ClueQuestion | KonnectionsQuestion;
