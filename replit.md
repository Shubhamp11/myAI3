# CompliBot - AI Compliance Assistant

## Overview
CompliBot is a professional AI chatbot assistant built with Next.js, designed to help business owners with compliance, registrations, and regulatory questions. Features web search capabilities, vector database integration (Pinecone), and content moderation.

## Project Structure
```
myAI3/
├── app/                          # Next.js application files
│   ├── api/chat/                 # Chat API endpoint
│   │   ├── route.ts              # Main chat handler
│   │   └── tools/                # AI tools (web search, vector search)
│   ├── page.tsx                  # Main chat interface (UI)
│   ├── parts/                    # UI components
│   │   └── chat-header.tsx       # Header bar component
│   └── terms/                    # Terms of Use page
├── components/                   # React components
│   ├── ai-elements/              # AI-specific UI components
│   ├── messages/                 # Message display components
│   │   ├── assistant-message.tsx # Left-aligned assistant messages
│   │   ├── user-message.tsx      # Right-aligned user messages
│   │   └── message-wall.tsx      # Chat message container
│   └── ui/                       # Reusable UI components (shadcn/ui)
│       ├── complibot-icon.tsx    # Geometric robot icon
│       └── typing-indicator.tsx  # Three-dot typing animation
├── lib/                          # Utility libraries
├── types/                        # TypeScript type definitions
├── config.ts                     # Main configuration
├── prompts.ts                    # AI behavior configuration
└── package.json                  # Dependencies and scripts
```

## Key Configuration Files

### config.ts
- `AI_NAME`: "CompliBot"
- `OWNER_NAME`: Your name/organization
- `WELCOME_MESSAGE`: "Hello! My name is CompliBot."
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

## UI Design
The interface follows a professional, trustworthy design:
- **Header**: Slim bar with geometric icon, centered title, "+ New" button
- **Welcome Screen**: Avatar with greeting and three quick prompt pills
- **Quick Prompts**: "Do I need a factory license?", "What are my labour rights?", "Tell me about waste management."
- **Messages**: Assistant left-aligned with light cards, user right-aligned compact
- **Animations**: Hover scale (1.02x), fade-in with slide, typing indicator

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
- Rebranded from MyAI3 to CompliBot
- Redesigned UI with professional, uncluttered look
- Added geometric CompliBot icon
- Implemented quick prompt pills on welcome screen
- Added typing indicator with staggered dot animation
- Updated message styling (assistant left, user right)
- Added hover/focus animations throughout
- Updated placeholder text for compliance context
