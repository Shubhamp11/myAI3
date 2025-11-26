import { tool } from "ai";
import { z } from "zod";
import { searchPinecone } from "@/lib/pinecone";

export const vectorDatabaseSearch = tool({
    description: 'Search the vector database for information from uploaded documents. This should be the PRIMARY search tool - always use this FIRST before considering web search.',
    inputSchema: z.object({
        query: z.string().describe('The query to search the vector database for. Optimally is a hypothetical answer for similarity search.'),
    }),
    execute: async ({ query }) => {
        return await searchPinecone(query);
    },
});

