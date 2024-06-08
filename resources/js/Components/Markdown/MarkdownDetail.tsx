import React, { FormEvent } from 'react';
import { MarkdownPost } from '@/types/types';
import { useForm } from '@inertiajs/react';
import ReplyItem from './Reply/ReplyItem';

/**
 * Markdown詳細コンポーネントProps
 */
interface MarkdownDetail {
    post: MarkdownPost;
}

/**
 * マークダウン詳細ページ
 * @param post MarkdownPost
 * @returns JSX
 */
const MarkdownDetail = ({
    post,
}: MarkdownDetail) => {
    const {
        data,
        setData,
        post: submit,
        reset
    } = useForm({
        content: '',
        parent_id: '' as string | null,
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        //console.log("MarkdownDetail handleSubmit()");

        submit(route('markdown.reply.store', post.id), {
            onSuccess: () => {
                //console.log("MarkdownDetail handleSubmit() onSuccess");
                reset();
            },
        });
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="taxt-2xl font-bold mb-4">
                Markdown Detail
            </h1>

            <div className="bg-white shadow-md rounded-lg p-4 mb-4">
                <h2 className="text-xl font-semibold mb-2">
                    {post.content.substring(0, 100)}
                </h2>

                <p className="text-gray-700">
                    {post.content}
                </p>
            </div>

            <div className="bg-white shadow-md rounded-lg p-4">
                <form onSubmit={handleSubmit} className="mt-4">
                    <textarea
                        className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        rows={4}
                        value={data.content}
                        onChange={(e) => setData('content', e.target.value)}
                    />

                    <div className="flex items-center justify-between mt-2">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Submit
                        </button>
                    </div>
                </form>

                {post.replies && post.replies.map(reply => (
                    <ReplyItem
                        key={reply.id}
                        reply={reply}
                        postId={post.id}
                    />
                ))}
            </div>
        </div>
    );
}

export default MarkdownDetail;