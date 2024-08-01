import { ReactElement } from 'react';
import { PageProps } from '@/types';
import { MarkdownPost } from '@/types/types';
import { InertiaPage } from '@/types/type-pages';
import { usePage } from '@inertiajs/react';
import MarkdownLayout from '@/Layouts/MarkdownLayout';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import MarkdownDetail from '@/Components/Markdown/MarkdownDetail/MarkdownDetail';

/**
 * マークダウン詳細ページProps
 */
interface MarkdownDetailPageProps extends PageProps {
    post: MarkdownPost;
}

/**
 * マークダウン詳細ページ
 * @param post
 * @returns JSX
 */
function MarkdownDetailsPage({ post }: MarkdownDetailPageProps) {
    const { props: page }: InertiaPage<PageProps> = usePage();
    const user = page.auth.user;
    //user.

    return (
        <>
            <MarkdownDetail post={post} loginUserId={user.id} />
        </>
    );
}

/**
 * マークダウン詳細レイアウト
 * @param page
 * @returns JSX
 */
MarkdownDetailsPage.layout = (page: ReactElement) => {
    return (
        <AuthenticatedLayout>
            <MarkdownLayout>{page}</MarkdownLayout>
        </AuthenticatedLayout>
    );
};

export default MarkdownDetailsPage;
