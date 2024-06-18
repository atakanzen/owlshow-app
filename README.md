# OwlShow App

This is a university finishing project for the Modern Typescript lectures.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Example Question JSON Data

```json
[
  {
    "id": "384ad4b3-022a-48f1-a9ee-78814961b7d7",
    "answers": [
      {
        "id": "c3d0a1ab-68e1-45f0-bb7d-ec46af71b988",
        "answer": "Tokyo",
        "correct": true
      },
      {
        "id": "a8a3b2c6-1137-464b-a5ab-97c44ba14835",
        "answer": "Osaka",
        "correct": false
      },
      {
        "id": "6491aa80-e0fd-4915-b4af-ac001fdd880a",
        "answer": "Kyoto",
        "correct": false
      }
    ],
    "question": "What is the capital of Japan?",
    "type": "Single Answer Test"
  },
  {
    "id": "128d71e3-37a4-4f9d-976f-a907c773129e",
    "answers": [
      {
        "id": "3e3f18ca-8ee1-460e-8877-e7b7aaf7d819",
        "answer": "Red",
        "correct": true
      },
      {
        "id": "cff6bda5-dce7-425c-8680-35bf53a55f47",
        "answer": "White",
        "correct": true
      },
      {
        "id": "c8cbe362-8c76-4d14-a8d8-87f3add58666",
        "answer": "Green",
        "correct": false
      }
    ],
    "question": "What colors does the flag of Poland have?",
    "type": "Multi Answer Test"
  },
  {
    "id": "61372e64-8786-450c-a5c1-8557b2712547",
    "answers": [
      {
        "id": "afc97a84-08bb-42e8-903f-45342e7df1c4",
        "answer": "Istanbul",
        "correct": false
      },
      {
        "id": "8c90cb39-d87c-468c-92d5-fdf0370c9c8f",
        "answer": "Izmir",
        "correct": false
      },
      {
        "id": "44de1fcf-c406-4f9e-b5c2-b93f2fadbdea",
        "answer": "Ankara",
        "correct": true
      }
    ],
    "question": "What is the capital of Turkey",
    "type": "Single Answer Test"
  }
]
```
