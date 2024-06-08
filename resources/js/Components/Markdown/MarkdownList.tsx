import { MarkdownPost } from '@/types/types';
import { Link, useForm } from '@inertiajs/react';
import { toast, ToastContainer } from 'react-toastify';
import { Button } from '../ui/button';
import MarkdownLike from './MarkdownLike';

import 'react-toastify/dist/ReactToastify.css';

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
    const { delete: destroy } = useForm();

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this post?')) {
            destroy(`/markdown/${id}`, {
                onSuccess: () => {
                    toast.success('Post deleted successfully');
                    window.location.reload();
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

            <div className="flex justify-between">
                <h1 className="text-2xl font-bold mb-4">
                    Markdown List
                </h1>

                <Link
                    href="/markdown/creator"
                    className="text-blue-500 hover:underline"
                >
                    作成はこちら
                </Link>
            </div>

            <ul className="space-y-4">
                {posts.map((post) => (
                    <li 
                        key={post.id}
                        className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between items-left"
                    >
                        <Link
                            href={`/markdown/${post.id}`}
                            className="bg-gray-200 text-blue-500 rounded-lg p-4 mb-4 hover:underline">
                            {post.content.substring(0, 100)}
                        </Link>
                        <div className="flex justify-between items-start">
                            <MarkdownLike
                                postId={post.id}
                                currentEmoji={post.currentEmoji || null}
                                likeCounts={post.likeCounts || {}}
                            />

                            <div className="flex space-x-2">
                                <Link 
                                    href={`/markdown/editor/${post.id}`} 
                                    className="bg-green-500 text-white p-2 mr-4 rounded">
                                    Update
                                </Link>
                                
                                <Button
                                    onClick={() => handleDelete(post.id)}
                                    className="bg-red-500 text-white rounded">
                                    Delete
                                </Button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
  );
}

export default MarkdownList;