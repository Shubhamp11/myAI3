# CompliBot

A customizable AI chatbot assistant built with Next.js, designed to help Indian MSMEs (Micro, Small, and Medium Enterprises) navigate compliance requirements. The application features web search capabilities, vector database integration, and content moderation.

## Overview

CompliBot is an AI-powered chatbot that helps users with:

- Factory compliance and licensing requirements
- Labour law queries and worker rights
- GST registration and tax compliance
- Waste management regulations
- Environmental compliance
- General MSME regulatory guidance

The application includes:
- **Quick Facts Panel** (left sidebar): Displays key MSME statistics and regulatory facts
- **Success Stories Panel** (right sidebar): Shows real compliance success stories to build credibility
- Web search for up-to-date information
- Vector database (Pinecone) for stored knowledge
- Content moderation for safe interactions
- Citations and sources for responses

## Project Structure

```text
complibot/
├── app/                          # Next.js application files
│   ├── api/chat/                 # Chat API endpoint
│   │   ├── route.ts              # Main chat handler
│   │   └── tools/                # AI tools (web search, vector search)
│   ├── page.tsx                  # Main chat interface with Quick Facts & Success Stories panels
│   ├── parts/                    # UI components (chat-header)
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
├── public/                       # Static assets
│   ├── logo.png                  # CompliBot logo
│   └── factory_bckgnd.jpg        # Background image
├── types/                        # TypeScript type definitions
├── config.ts                     # Main configuration file
├── prompts.ts                    # AI behavior configuration
└── package.json                  # Dependencies and scripts
```

## Key Files to Customize

### `config.ts` - Application Configuration

Primary configuration file containing:

- **AI Identity**: `AI_NAME` (CompliBot) and `OWNER_NAME`
- **Welcome Message**: `WELCOME_MESSAGE` - Initial greeting for users
- **UI Text**: `CLEAR_CHAT_TEXT` - Label for "New Chat" button
- **Moderation Messages**: Custom messages for flagged content
- **Model Configuration**: `MODEL` - The AI model being used
- **Vector Database Settings**: `PINECONE_TOP_K` and `PINECONE_INDEX_NAME`

### `prompts.ts` - AI Behavior and Instructions

Controls AI behavior including:

- **Identity Prompt**: Who the AI is and who created it
- **Tool Calling Prompt**: Instructions for web/database search
- **Tone & Style**: Communication style (friendly, helpful, educational)
- **Guardrails**: Safety rules and topic restrictions
- **Citation Rules**: How to cite sources

### `app/page.tsx` - Main Interface

The main chat interface includes:

- **Quick Facts Panel** (left side): 4 facts about Indian MSME compliance
  - 63M+ MSMEs contributing 30% of GDP
  - 75+ labour laws consolidated into 4 codes
  - Factory license required for 10+ workers
  - GST registration mandatory above Rs 40 lakh turnover

- **Success Stories Panel** (right side): 4 credibility-building success stories
  - Textile factory avoiding ₹2 lakh fine
  - MSME getting ₹50K GST refund
  - Auto parts unit clearing audit
  - Startup securing funding after compliance certification

- **Chat Interface**: Central chat area with quick prompt buttons
- **Header**: Logo, title, and "New Chat" button

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables (see Environment Setup section)

4. Run the development server:
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5000`

### Scripts

- `npm run dev` - Start development server on port 5000
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Environment Setup

Configure the following environment variables:

### Required
- `OPENAI_API_KEY` - Required for AI model and content moderation

### Optional
- `EXA_API_KEY` - For web search functionality
- `PINECONE_API_KEY` - For vector database search

**Where to get API keys:**

- **OpenAI**: https://platform.openai.com/api-keys
- **Exa**: https://dashboard.exa.ai/
- **Pinecone**: https://app.pinecone.io/

## UI Components

### Sidebar Panels

Both panels are:
- Fixed position on left/right sides
- Vertically centered
- Hidden on mobile (shown on md+ screens)
- Styled with consistent card design

### Chat Interface

- Welcome screen with CompliBot logo and quick prompts
- Message wall for conversation history
- Input field with send/stop buttons
- Typing indicator during AI response

### Header

- CompliBot logo
- "Talk with CompliBot" title
- "+ New Chat" button to clear conversation

## Technologies Used

- **Framework**: Next.js 16.0.0 with Turbopack
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI + shadcn/ui
- **AI Integration**: AI SDK (@ai-sdk/react, @ai-sdk/openai)
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **Vector Database**: Pinecone
- **Web Search**: Exa API
- **Animations**: Motion (Framer Motion)

## Customization Guide

### Changing AI Identity

1. Open `config.ts`
2. Modify `AI_NAME` and `OWNER_NAME`
3. Update `WELCOME_MESSAGE` if desired

### Modifying Sidebar Content

1. Open `app/page.tsx`
2. Locate the Quick Facts section (line ~177) or Success Stories section (line ~209)
3. Edit the text and emoji symbols as needed

### Adjusting AI Behavior

1. Open `prompts.ts`
2. Edit relevant prompt sections:
   - `TONE_STYLE_PROMPT` - Communication style
   - `GUARDRAILS_PROMPT` - Safety rules
   - `TOOL_CALLING_PROMPT` - Tool usage instructions

### Adding Quick Prompts

1. Open `app/page.tsx`
2. Find the `quickPrompts` array (line ~150)
3. Add or modify prompt strings

## Troubleshooting

### AI not responding
- Verify `OPENAI_API_KEY` is set correctly
- Check browser console for errors
- Ensure API key has sufficient credits

### Web search not working
- Verify `EXA_API_KEY` is configured
- Check Exa dashboard for usage limits

### Vector search not working
- Verify `PINECONE_API_KEY` is set
- Check `PINECONE_INDEX_NAME` in config.ts matches your index

### Sidebar panels not visible
- Panels are hidden on mobile screens (below md breakpoint)
- Resize browser window to see them

## Deployment

### Replit Deployment

The application is configured to run on Replit with:
- Development server bound to `0.0.0.0:5000`
- Automatic workflow management

### Vercel Deployment

1. Connect repository to Vercel
2. Configure environment variables in project settings
3. Deploy

## Support

For technical questions about tool integration, see `AGENTS.md`.

---

**Quick Start**: Edit `config.ts` for identity and `prompts.ts` for behavior customization.
