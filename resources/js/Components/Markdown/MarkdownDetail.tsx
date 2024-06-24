import React, { FormEvent } from 'react';
import { MarkdownPost } from '@/types/types';
import { useForm, Link, router } from '@inertiajs/react';
import MDEditor from '@uiw/react-md-editor';
import ReplyItem from './Reply/ReplyItem';
import { Button } from '../ui/button';
import { toast, ToastContainer } from 'react-toastify';

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
                <h1 className="text-2xl font-bold mb-4 text-white border-b-2">
                    Markdown Detail
                </h1>
            </div>
            

            <div className="flex justify-end space-x-4 mb-4">
                <Link 
                    href="/markdown" 
                    className="bg-gray-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-gray-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50">
                    Back
                    </Link>
                <Link 
                    href={`/markdown/editor/${post.id}`} 
                    className="bg-indigo-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-indigo-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">
                    Update
                </Link>
                
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
                <form onSubmit={handleSubmit} className="mt-4">
                    <textarea
                        className="border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        rows={4}
                        value={data.content}
                        onChange={(e) => setData('content', e.target.value)}
                    />

                    <div className="flex items-center justify-end mt-4">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md shadow-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
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