export type Clue = {
  id: string;
  mediaType: "text" | "image" | "video" | "audio" | "youtube";
  mediaUrl?: string;
  questionText?: string;
};

export type Question = {
  answerMediaType?:
    | "text"
    | "image"
    | "video"
    | "audio"
    | "youtube"
    | undefined;
  questionText?: string;
  id: string;
  answer?: string;
  mediaType?: "text" | "image" | "video";
  mediaURL?: string;
  questionMediaUrl?: string;
  answerMediaUrl?: string;
  type?: "normal" | "clue";
  clues?: Clue[];
};
