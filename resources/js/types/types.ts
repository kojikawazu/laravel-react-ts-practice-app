

/**
 * Markdownの投稿データ[Type]
 */
export interface MarkdownPost {
    id: string;
    content: string;
    user_id: number;
    created_at: string;
    updated_at: string;
    emoji: string;
    likeCounts?: Record<string, number>;
    currentEmoji?: string | null;
}