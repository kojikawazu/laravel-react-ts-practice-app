import { MarkdownPost } from '@/types/types';
import MarkdownLike from '@/Components/Markdown/MarkdownLike'
import MarkdownCardImageTitle from '@/Components/Markdown/atoms/markdowncard/MarkdownCardImageTitle';
import MarkdownCardTitle from '@/Components/Markdown/atoms/markdowncard/MarkdownCardTitle';

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
        className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col transition-shadow duration-300 ease-in-out hover:shadow-lg border-amber-500 border-2"
    >
        <MarkdownCardImageTitle
            href={`/markdown/${post.id}`}
        />

        <div className="p-4 flex-grow">
            <MarkdownCardTitle 
                href={`/markdown/${post.id}`}
            />
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