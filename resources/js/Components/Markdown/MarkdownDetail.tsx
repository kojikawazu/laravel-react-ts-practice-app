import React from 'react';
import { MarkdownPost } from '@/types/types';

interface MarkdownDetail {
    post: MarkdownPost;
}

const MarkdownDetail = ({
    post,
}: MarkdownDetail) => {
  return (
    <div className="container mx-auto p-4">
        <h1 className="taxt-2xl font-bold mb-4">
            Markdown Detail
        </h1>

        <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-2">
                {post.content.substring(0, 100)}
            </h2>

            <p className="text-gray-700">
                {post.content}
            </p>
        </div>
    </div>
  );
}

export default MarkdownDetail;