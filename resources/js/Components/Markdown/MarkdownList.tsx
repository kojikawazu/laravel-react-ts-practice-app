import React from 'react';
import { MarkdownPost } from '@/types/types';
import { Link } from '@inertiajs/react';

/**
 * MarkdownリストコンポーネントProps
 */
interface MarkdownListProps {
    posts: MarkdownPost[];
}

/**
 * Markdownリストコンポーネント
 * @param ports Markdownデータリスト 
 * @returns JSX
 */
const MarkdownList = ({
    posts,
}: MarkdownListProps) => {
  return (
    <div className="container mx-auto p-4">
        <div className="flex justify-between">
            <h1 className="text-2xl font-bold mb-4">
                Markdown List
            </h1>

            <Link
                href="/markdown/editor"
                className="text-blue-500 hover:underline"
            >
                作成はこちら
            </Link>
        </div>

        <ul className="space-y-4">
            {posts.map((post) => (
                <li 
                    key={post.id}
                    className="bg-white shadow-md rounded-lg p-4"
                >
                    <Link
                        href={`/markdown/${post.id}`}
                        className="text-blue-500 hover:underline"
                    >
                        {post.content.substring(0, 100)}
                    </Link>
                </li>
            ))}
        </ul>
    </div>
  );
}

export default MarkdownList;