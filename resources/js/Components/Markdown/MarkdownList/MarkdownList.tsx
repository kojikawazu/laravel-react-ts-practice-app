import { MarkdownPost } from '@/types/types';
import { ToastContainer } from 'react-toastify';
import MarkdownTitle from '@/Components/Markdown/atoms/MarkdownTitle';
import MarkdownCreateLink from '@/Components/Markdown/atoms/MarkdownCreateLink';
import MarkdownCard from '@/Components/Markdown/molecules/MarkdownCard';
import MdListPagination from '@/Components/Markdown/MarkdownList/molecules/MdListPagination';

import 'react-toastify/dist/ReactToastify.css';

interface MarkdownListProps {
    posts: {
        data: MarkdownPost[];
        links: { url: string | null; label: string; active: boolean }[];
        meta: {
            current_page: number;
            last_page: number;
            from: number;
            to: number;
            total: number;
        };
    };
}

/**
 * Markdownリストコンポーネント
 * @param ports Markdownデータリスト
 * @returns JSX
 */
const MarkdownList = ({ posts }: MarkdownListProps) => {
    return (
        <div className="container mx-auto p-4">
            <ToastContainer />

            <div className="flex justify-center mb-8">
                <MarkdownTitle title={'Markdown List'} />
            </div>

            <div className="flex justify-end mb-4 mr-2">
                <MarkdownCreateLink
                    href="/markdown/creator"
                    label="作成はこちら"
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {posts.data.map((post) => (
                    <MarkdownCard key={post.id} post={post} />
                ))}
            </div>

            <MdListPagination links={posts.links} />
        </div>
    );
};

export default MarkdownList;
