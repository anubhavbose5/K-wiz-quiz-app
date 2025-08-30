import { Question } from "@/types/QuestionType";

const QTEST = "/testrandom.jpg";

export const prelims1Round1: Question[] = [
  {
    id: "q1",
    questionText: "WTF is this",
    answer: "Next.js",
    mediaType: "text",
    questionMediaUrl: QTEST,
    answerMediaUrl: QTEST,
    answerMediaType: "image",
    clues: [],
  },
  {
    id: "q2",
    questionText: "Identify this logo.",
    answer: "Next.js",
    mediaType: "image",
    questionMediaUrl: QTEST,
    answerMediaUrl: QTEST,
    answerMediaType: "image",
    clues: [
      {
        id: "c1",
        mediaType: "text",
        mediaUrl: "",
        questionText: "It's a React framework.",
      },
      {
        id: "c2",
        mediaType: "image",
        mediaUrl: QTEST,
        questionText: "It's made by Vercel.",
      },
    ],
  },
];

export const prelims1Round3: Question[] = [
  {
    id: "q1",
    questionText: "Identify this logo.",
    answer: "Next.js",
    mediaType: "image",
    questionMediaUrl: QTEST,
    answerMediaUrl: QTEST,
    answerMediaType: "image",
    type: "clue",
    clues: [
      {
        id: "c1",
        mediaType: "text",
        mediaUrl: "",
        questionText: "It's a React framework.",
      },
      {
        id: "c2",
        mediaType: "image",
        mediaUrl: QTEST,
        questionText: "It's made by Vercel.",
      },
      {
        id: "c3",
        mediaType: "image",
        mediaUrl: QTEST,
        questionText: "It's made by Vercel2.",
      },
    ],
  },
  {
    id: "q2",
    questionText: "Identify this logo.",
    answer: "Next.js",
    mediaType: "image",
    questionMediaUrl: QTEST,
    answerMediaUrl: QTEST,
    answerMediaType: "image",
    type: "clue",
    clues: [
      {
        id: "c1",
        mediaType: "text",
        mediaUrl: "",
        questionText: "It's a React framework.",
      },
      {
        id: "c2",
        mediaType: "image",
        mediaUrl: QTEST,
        questionText: "It's made by Vercel.",
      },
      {
        id: "c3",
        mediaType: "image",
        mediaUrl: QTEST,
        questionText: "It's made by Vercel2.",
      },
    ],
  },
  {
    id: "q3",
    questionText: "Identify this logo.",
    answer: "Next.js",
    mediaType: "image",
    questionMediaUrl: QTEST,
    answerMediaUrl: QTEST,
    answerMediaType: "image",
    type: "clue",
    clues: [
      {
        id: "c1",
        mediaType: "text",
        mediaUrl: "",
        questionText: "It's a React framework.",
      },
      {
        id: "c2",
        mediaType: "image",
        mediaUrl: QTEST,
        questionText: "It's made by Vercel.",
      },
      {
        id: "c3",
        mediaType: "image",
        mediaUrl: QTEST,
        questionText: "It's made by Vercel2.",
      },
    ],
  },
];
