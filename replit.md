# MyAI3 - AI Chatbot Assistant

## Overview
MyAI3 is a customizable AI chatbot assistant built with Next.js, featuring web search capabilities, vector database integration (Pinecone), and content moderation. The AI prioritizes searching uploaded documents before falling back to web search.

## Project Structure
```
myAI3/
├── app/                          # Next.js application files
│   ├── api/chat/                 # Chat API endpoint
│   │   ├── route.ts              # Main chat handler
│   │   └── tools/                # AI tools (web search, vector search)
│   ├── page.tsx                  # Main chat interface (UI)
│   ├── parts/                    # UI components
│   └── terms/                    # Terms of Use page
├── components/                   # React components
│   ├── ai-elements/              # AI-specific UI components
│   ├── messages/                 # Message display components
│   └── ui/                       # Reusable UI components (shadcn/ui)
├── lib/                          # Utility libraries
│   ├── moderation.ts             # Content moderation logic
│   ├── pinecone.ts               # Vector database integration
│   ├── sources.ts                # Source/citation handling
│   └── utils.ts                  # General utilities
├── types/                        # TypeScript type definitions
├── config.ts                     # Main configuration (AI name, model, etc.)
├── prompts.ts                    # AI behavior configuration
└── package.json                  # Dependencies and scripts
```

## Key Configuration Files

### config.ts
- `AI_NAME`: Name of your AI assistant
- `OWNER_NAME`: Your name/organization
- `WELCOME_MESSAGE`: Initial greeting message
- `MODEL`: AI model to use (currently GPT-4.1)
- `PINECONE_TOP_K`: Number of results from vector search
- `PINECONE_INDEX_NAME`: Your Pinecone index name

### prompts.ts
- Controls AI behavior and response style
- Tool calling priority (Pinecone first, then web)
- Tone and style guidelines
- Safety guardrails
- Citation rules

## Environment Variables (Secrets)
- `OPENAI_API_KEY` (Required): For AI model and content moderation
- `EXA_API_KEY` (Optional): For web search functionality
- `PINECONE_API_KEY` (Optional): For vector database search
- `FIREWORKS_API_KEY` (Optional): Alternative AI provider

## Search Priority
The AI is configured to:
1. Search the vector database (Pinecone) FIRST for uploaded documents
2. Only use web search if:
   - Vector database returns no relevant results
   - Results are insufficient or outdated
   - Query requires real-time information

## Development
- Run: `npm run dev` (starts on port 5000)
- Build: `npm run build`
- Start production: `npm run start`

## Tech Stack
- Next.js 16 with React 19
- Vercel AI SDK
- Tailwind CSS 4
- shadcn/ui components
- OpenAI GPT-4.1
- Pinecone vector database
- Exa web search

## Recent Changes
- Configured for Replit environment (port 5000, host 0.0.0.0)
- Updated prompts to prioritize Pinecone search over web search
- Added tool description updates to reinforce search priority
