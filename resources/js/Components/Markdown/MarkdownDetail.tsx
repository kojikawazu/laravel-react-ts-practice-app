import { FormEvent } from 'react';
import { MarkdownPost } from '@/types/types';
import { useForm, router } from '@inertiajs/react';
import MDEditor from '@uiw/react-md-editor';
import { Button } from '../ui/button';
import { toast, ToastContainer } from 'react-toastify';
import MarkdownTitle from './atoms/MarkdownTitle';
import MarkdownButton from './atoms/MarkdownButton';
import MarkdownReplyForm from './molecules/MarkdownReplyForm';
import MarkdownReplyItem from './molecules/Reply/MarkdownReplyItem';

import 'react-toastify/dist/ReactToastify.css';

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
        <div className="container mx-auto p-4 bg-slate-800">
            <ToastContainer />

            <div className="flex justify-center mb-4">
                <MarkdownTitle title={"Markdown Detail"} />
            </div>
            

            <div className="flex justify-end space-x-4 mb-4">
                <MarkdownButton
                    label="Back"
                    href="/markdown"
                    additionalClasses="bg-gray-500 text-white hover:bg-gray-600 focus:ring-gray-500"
                />
                <MarkdownButton
                    label="Update"
                    href={`/markdown/editor/${post.id}`}
                    additionalClasses="bg-indigo-500 text-white hover:bg-indigo-600 focus:ring-indigo-500"
                />
                
                <Button
                    onClick={() => handleDelete(post.id)}
                    className="bg-rose-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-rose-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-opacity-50">
                    Delete
                </Button>
            </div>


            <div className="bg-white shadow-md rounded-lg p-4 mb-4">
                <MDEditor.Markdown source={post.content} />
            </div>

            <div className="bg-white shadow-md rounded-lg p-4">
                <MarkdownReplyForm
                    formClasses="mt-4"
                    handleSubmit={handleSubmit}
                    textareaRows={4}
                    textareaClasses="border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    content={data.content}
                    setContent={setData}
                    submitBtnClasses="flex items-center justify-end mt-4"
                    submitBtnInnerClasses="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md shadow-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    submitBtnLabel={"投稿"}
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