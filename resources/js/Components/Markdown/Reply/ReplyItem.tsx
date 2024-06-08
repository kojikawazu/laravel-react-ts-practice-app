import { useState, FormEvent, useEffect } from 'react';
import { MarkdownReply } from '@/types/types';
import { useForm } from '@inertiajs/react';

/**
 * 返信アイテムProps
 */
interface ReplyItemProps {
    reply: MarkdownReply;
    postId: string;
};

/**
 * 返信アイテム
 * @param reply
 * @param postId
 * @returns JSX
 */
const ReplyItem = ({
    reply,
    postId,
}: ReplyItemProps) => {
    const {
        data,
        setData,
        post: submit,
        reset
    } = useForm({
        content: '',
        parent_id: reply.parent_id ? reply.parent_id : reply.id as string | null,
    });

    const [showReplyForm, setShowReplyForm] = useState(false);
    //console.log("ReplyItem mounted");
    //console.log(`parent.id == null ? ${reply.parent_id == null}`);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        //console.log("ReplyItem handleSubmit()");

        submit(route('markdown.reply.store', postId), {
            onSuccess: () => {
                //console.log('ReplyItem handleSubmit() onSuccess');
                reset();
            },
        });
    };

    return (
        <div className="mt-4 bg-gray-100 p-2 rounded">
            <p className="text-gray-800">
                {reply.content}
            </p>

            <button
                onClick={() => setShowReplyForm(!showReplyForm)}
                className="bg-blue-500 hover:underline mt-2">
                返信
            </button>

            {showReplyForm && (
                <form onSubmit={handleSubmit} className="mt-2">
                    <textarea
                        className="border rounded w-full p-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        rows={2}
                        value={data.content}
                        onChange={(e) => setData('content', e.target.value)}
                        placeholder="返信内容"
                    />

                    <button
                        type="submit"
                        className="text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                        返信
                    </button>
                </form>
            )}

            {reply.children && reply.children.map((child) => (
                <div key={child.id} className="ml-4">
                    <ReplyItem
                        reply={child}
                        postId={postId} />
                </div>
            ))}
        </div>
    );
};

export default ReplyItem;