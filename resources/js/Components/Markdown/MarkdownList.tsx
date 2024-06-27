import { MarkdownPost } from '@/types/types';
import { Link } from '@inertiajs/react';
import { ToastContainer } from 'react-toastify';
import MarkdownLike from './MarkdownLike';
import MarkdownTitle from './atoms/MarkdownTitle';

import 'react-toastify/dist/ReactToastify.css';
import MarkdownCreateLink from './atoms/MarkdownCreateLink';
import MarkdownCard from './molecules/MarkdownCard';

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
        <div className="container mx-auto p-4">
            <ToastContainer />

            <div className="flex justify-center mb-8">
                <MarkdownTitle title={"Markdown List"} />
            </div>

            <div className="flex justify-end mb-4 mr-2">
                <MarkdownCreateLink
                    href="/markdown/creator"
                    label="作成はこちら"
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {posts.map((post) => (
                    <MarkdownCard 
                        key={post.id}
                        post={post}
                    />
                ))}
            </div>
        </div>
  );
}

export default MarkdownList;