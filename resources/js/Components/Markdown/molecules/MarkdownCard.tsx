import { Link } from '@inertiajs/react';
import MarkdownLike from '../MarkdownLike'
import { MarkdownPost } from '@/types/types';

interface MarkdownCardProps {
    post: MarkdownPost;
}

/**
 * Markdownカードコンポーネント
 * @param post 
 * @returns JSX
 */
const MarkdownCard = ({
    post,
}: MarkdownCardProps) => {
  return (
    <div
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
  )
}

export default MarkdownCard