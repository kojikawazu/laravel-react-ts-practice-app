import { FormEvent, useState } from 'react';
import { MarkdownPost } from '@/types/types';
import { useForm, router } from '@inertiajs/react';
import { toast, ToastContainer } from 'react-toastify';
import MarkdownTitle from '@/Components/Markdown/atoms/MarkdownTitle';
import MarkdownReplyForm from '@/Components/Markdown/molecules/MarkdownReplyForm';
import MarkdownReplyItem from '@/Components/Markdown/molecules/Reply/MarkdownReplyItem';
import MdDetailButtonArea from '@/Components/Markdown/MarkdownDetail/molecules/MdDetailButtonArea';
import MdDetailPreview from '@/Components/Markdown/MarkdownDetail/molecules/MdDetailPreview';

import 'react-toastify/dist/ReactToastify.css';
import MdDetailImage from './molecules/MdDetailImage';


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
    const [isImageLoading, setIsImageLoading] = useState(true);
    const { delete: destroy } = useForm();

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

        submit(route('markdown.reply.store', post.id), {
            onSuccess: () => {
                reset();
            },
        });
    }

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this post?')) {
            destroy(`/markdown/${id}`, {
                onSuccess: () => {
                    toast.success('Post deleted successfully');
                    router.visit('/markdown');
                },
                onError: () => {
                    toast.error('An error occurred while deleting the post');
                },
            });
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="container mx-auto p-4">
                
                <div className="flex justify-center mb-8">
                    <MarkdownTitle title={post.title ? post.title : 'Untitled Post'} />
                </div>

                <div className="flex justify-center mx-auto w-1/2 h-1/3 mb-12">
                    <MdDetailImage
                        image_path={post.image_path}
                        isImageLoading={isImageLoading}
                        setIsImageLoading={setIsImageLoading}
                    />
                </div>
                
                <div className="flex justify-between space-x-4 mb-2">
                    <div className="flex items-end">
                        <p className="pl-2">Preview:</p>
                    </div>

                    <div className="flex flex-end">
                        <MdDetailButtonArea
                            postId={post.id}
                            handleDelete={handleDelete}
                        />
                    </div>
                </div>

                <MdDetailPreview
                    postContent={post.content}
                />

                <div className="flex flex-start items-end">
                    <p className="pl-2">Comment:</p>
                </div>

                <div className="bg-amber-50 p-4 shadow-md rounded-2xl order-8 border-8 border-yellow-500">
                    <MarkdownReplyForm
                        formClasses="mt-4"
                        handleSubmit={handleSubmit}
                        textareaRows={4}
                        textareaClasses="border rounded-md w-full py-2 px-3 text-amber-700 leading-tight focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        content={data.content}
                        setContent={setData}
                        submitBtnClasses="flex items-center justify-end mt-4"
                        submitBtnInnerClasses="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-4 rounded-md shadow-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50"
                        submitBtnLabel={"Comment"}
                    />

                    {post.replies && post.replies.map(reply => (
                        <MarkdownReplyItem
                            key={reply.id}
                            reply={reply}
                            postId={post.id}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}

export default MarkdownDetail;