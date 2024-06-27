import { FormEvent } from 'react';
import { MarkdownPost } from '@/types/types';
import { useForm, router } from '@inertiajs/react';
import MDEditor from '@uiw/react-md-editor';
import { Button } from '../ui/button';
import { toast, ToastContainer } from 'react-toastify';
import MarkdownTitle from './atoms/MarkdownTitle';
import MarkdownLinkButton from './atoms/button/MarkdownLinkButton';
import MarkdownReplyForm from './molecules/MarkdownReplyForm';
import MarkdownReplyItem from './molecules/Reply/MarkdownReplyItem';

import 'react-toastify/dist/ReactToastify.css';
import MarkdownButton from './atoms/button/MarkdownButton';

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
        //console.log("MarkdownDetail handleSubmit()");

        submit(route('markdown.reply.store', post.id), {
            onSuccess: () => {
                //console.log("MarkdownDetail handleSubmit() onSuccess");
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
        <div className="container mx-auto p-4">
            <ToastContainer />

            <div className="flex justify-center mb-12">
                <MarkdownTitle title={"Markdown Detail"} />
            </div>
            
            <div className="flex justify-between space-x-4 mb-2">
                <div className="flex items-end">
                    <p className="pl-2">Preview:</p>
                </div>

                <div className="flex flex-end">
                    <MarkdownLinkButton
                        label="Back"
                        href="/markdown"
                        additionalClasses="mr-2 bg-gray-500 text-white hover:bg-gray-600 focus:ring-gray-500"
                    />
                    <MarkdownLinkButton
                        label="Update"
                        href={`/markdown/editor/${post.id}`}
                        additionalClasses="mr-2 bg-indigo-500 text-white hover:bg-indigo-600 focus:ring-indigo-500"
                    />
                    
                    <Button
                        onClick={() => handleDelete(post.id)}
                        className="bg-rose-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-rose-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-opacity-50">
                        Delete
                    </Button>
                </div>
            </div>

            <div 
                data-color-mode="light"
                className="w-full h-72 bg-white mb-4 p-4 rounded-2xl border-8 border-amber-500">
                <MDEditor.Markdown
                    source={post.content}
                />
            </div>

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
    );
}

export default MarkdownDetail;