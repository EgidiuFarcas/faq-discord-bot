declare module 'damerau-levenshtein';

export interface DamerauLevenshteinResponse {
    steps: number;
    relative: number;
    similarity: number;
}

export default function(__this: string, that: string, limit?: number): DamerauLevenshteinResponse;