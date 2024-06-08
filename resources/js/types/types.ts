

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
    replies?: MarkdownReply[];
}

/**
 * Markdownの返信データ[Type]
 */
export interface MarkdownReply {
    id: string;
    content: string;
    user_id: number;
    post_id: string;
    parent_id?: string | null;
    created_at: string;
    updated_at: string;
    children?: MarkdownReply[];
}