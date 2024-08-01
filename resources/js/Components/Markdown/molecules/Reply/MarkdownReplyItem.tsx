import { useState, FormEvent } from 'react';
import { useForm } from '@inertiajs/react';
import { MarkdownReply } from '@/types/types';
import MarkdownReplyForm from '../MarkdownReplyForm';

/**
 * 返信アイテムProps
 */
interface MarkdownReplyItemProps {
    reply: MarkdownReply;
    postId: string;
}

/**
 * 返信アイテム
 * @param reply
 * @param postId
 * @returns JSX
 */
const MarkdownReplyItem = ({ reply, postId }: MarkdownReplyItemProps) => {
    const {
        data,
        setData,
        post: submit,
        reset,
    } = useForm({
        content: '',
        parent_id: reply.parent_id
            ? reply.parent_id
            : (reply.id as string | null),
    });

    const [showReplyForm, setShowReplyForm] = useState(false);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        submit(route('markdown.reply.store', postId), {
            onSuccess: () => {
                reset();
            },
        });
    };

    return (
        <div className="mt-4 bg-amber-50 p-4 rounded-lg shadow-md border-2 border-amber-200">
            <p className="text-gray-800 mb-2">{reply.content}</p>

            <button
                onClick={() => setShowReplyForm(!showReplyForm)}
                className="text-amber-600 hover:text-amber-800 transition-colors duration-300 text-sm font-medium focus:outline-none focus:underline"
            >
                Reply
            </button>

            {showReplyForm && (
                <MarkdownReplyForm
                    formClasses="mt-2"
                    handleSubmit={handleSubmit}
                    textareaRows={2}
                    textareaClasses="w-full px-3 py-2 text-amber-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                    content={data.content}
                    setContent={setData}
                    submitBtnClasses="flex items-center justify-start mt-4"
                    submitBtnInnerClasses="bg-amber-500 text-white px-4 py-2 rounded-md hover:bg-amber-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50"
                    submitBtnLabel={'Send'}
                />
            )}

            {reply.children &&
                reply.children.map((child) => (
                    <div
                        key={child.id}
                        className="ml-6 mt-4 border-l-2 border-amber-200 pl-4"
                    >
                        <MarkdownReplyItem reply={child} postId={postId} />
                    </div>
                ))}
        </div>
    );
};

export default MarkdownReplyItem;
