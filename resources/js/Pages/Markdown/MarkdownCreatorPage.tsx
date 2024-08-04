import { ReactElement } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import MarkdownLayout from '@/Layouts/MarkdownLayout';
import MarkdownCreator from '@/Components/Markdown/MarkdownCreator/MarkdownCreator';
import { usePage } from '@inertiajs/react';

/**
 * マークダウン生成エディタページ
 * @returns JSX
 */
function MarkdownCreatorPage() {
    const { props } = usePage();
    const message = props.message as string;
    const error = props.error as string;

    return (
        <div>
            <MarkdownCreator message={message} error={error} />
        </div>
    );
}

/**
 * マークダウン生成エディタレイアウト
 * @param page
 * @returns JSX
 */
MarkdownCreatorPage.layout = (page: ReactElement) => {
    return (
        <AuthenticatedLayout>
            <MarkdownLayout>{page}</MarkdownLayout>
        </AuthenticatedLayout>
    );
};

export default MarkdownCreatorPage;
