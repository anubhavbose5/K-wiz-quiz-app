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

export const konnectionsPuzzles: Question[] = [
  {
    id: "q-k-1",
    type: "konnections",
    title: "K-onnections Puzzle 1",
    konnectionsPuzzle: {
      id: "k1",
      words: [
        "Mercury",
        "Venus",
        "Earth",
        "Mars",
        "Jupiter",
        "Saturn",
        "Uranus",
        "Neptune",
        "Oak",
        "Pine",
        "Maple",
        "Birch",
        "Red",
        "Green",
        "Blue",
        "Yellow",
      ],
      groups: [
        {
          id: "g1",
          words: ["Mercury", "Venus", "Earth", "Mars"],
          label: "Planets",
        },
        {
          id: "g2",
          words: ["Jupiter", "Saturn", "Uranus", "Neptune"],
          label: "Gas Giants",
        },
        { id: "g3", words: ["Oak", "Pine", "Maple", "Birch"], label: "Trees" },
        {
          id: "g4",
          words: ["Red", "Green", "Blue", "Yellow"],
          label: "Colors",
        },
      ],
    },
  },
  {
    id: "q-k-2",
    type: "konnections",
    title: "K-onnections Puzzle 1",
    konnectionsPuzzle: {
      id: "k1",
      words: [
        "Green",
        "Venus",
        "Saturn",
        "Oak",
        "Mars",
        "Maple",
        "Mercury",
        "Red",
        "Blue",
        "Neptune",
        "Birch",
        "Earth",
        "Jupiter",
        "Yellow",
        "Uranus",
        "Pine",
      ],
      groups: [
        {
          id: "g1",
          words: ["Mercury", "Venus", "Earth", "Mars"],
          label: "Planets",
        },
        {
          id: "g2",
          words: ["Jupiter", "Saturn", "Uranus", "Neptune"],
          label: "Gas Giants",
        },
        { id: "g3", words: ["Oak", "Pine", "Maple", "Birch"], label: "Trees" },
        {
          id: "g4",
          words: ["Red", "Green", "Blue", "Yellow"],
          label: "Colors",
        },
      ],
    },
  },
];
