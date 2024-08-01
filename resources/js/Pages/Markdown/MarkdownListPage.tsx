import { ReactElement } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { MarkdownPost } from '@/types/types';
import MarkdownLayout from '@/Layouts/MarkdownLayout';
import MarkdownList from '@/Components/Markdown/MarkdownList/MarkdownList';

interface MarkdownListPageProps extends PageProps {
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
 * マークダウンリストページ
 * @param posts Markdownリスト
 * @returns JSX
 */
function MarkdownListPage({ posts }: MarkdownListPageProps) {
    return (
        <>
            <MarkdownList posts={posts} />
        </>
    );
}

/**
 * マークダウンリストレイアウト
 * @param page
 * @returns JSX
 */
MarkdownListPage.layout = (page: ReactElement) => {
    return (
        <AuthenticatedLayout>
            <MarkdownLayout>{page}</MarkdownLayout>
        </AuthenticatedLayout>
    );
};

export default MarkdownListPage;
