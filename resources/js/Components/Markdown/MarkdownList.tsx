import { MarkdownPost } from '@/types/types';
import { Link } from '@inertiajs/react';
import { ToastContainer } from 'react-toastify';
import MarkdownLike from './MarkdownLike';
import MarkdownTitle from './atoms/MarkdownTitle';

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

    return (
        <div className="container mx-auto p-4 bg-slate-800">
            <ToastContainer />

            <div className="flex justify-center items-center">
                <MarkdownTitle title={"Markdown List"} />
            </div>

            <div className="flex justify-end">
                <Link
                    href="/markdown/creator"
                    className="text-white mb-2 hover:underline"
                >
                    作成はこちら
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {posts.map((post) => (
                    <div 
                        key={post.id}
                        className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col transition-shadow duration-300 ease-in-out hover:shadow-lg"
                    >
                        <Link href={`/markdown/${post.id}`} className="block h-48 overflow-hidden">
                            <img
                                src={`/images/no_image.png`}
                                alt={`sample`}
                                className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                            />
                        </Link>

                        <div className="p-4 flex-grow">
                            <Link
                                href={`/markdown/${post.id}`}
                                className="text-blue-700 hover:underline block mb-2"
                            >
                                <h2 className="text-xl font-semibold text-blue-700 hover:text-blue-900 transition-colors duration-300">
                                    {'Untitled Post'}
                                </h2>
                            </Link>
                        </div>
                        
                        <div className="p-4 bg-gray-50 flex justify-between items-center">
                            <MarkdownLike
                                postId={post.id}
                                currentEmoji={post.currentEmoji || null}
                                likeCounts={post.likeCounts || {}}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
  );
}

export default MarkdownList;