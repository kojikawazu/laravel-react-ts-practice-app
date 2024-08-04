import { ReactElement } from 'react';
import { usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import MarkdownLayout from '@/Layouts/MarkdownLayout';
import { MarkdownPost } from '@/types/types';
import MarkdownEditor from '@/Components/Markdown/MarkdownEditor/MarkdownEditor';

import 'react-toastify/dist/ReactToastify.css';

/**
 * マークダウン編集ページ
 * @returns JSX
 */
function MarkdownEditorPage() {
    const { props } = usePage();
    const post = props.post as MarkdownPost;
    const message = props.message as string;
    const error = props.error as string;

    return (
        <>
            <MarkdownEditor post={post} message={message} error={error} />
        </>
    );
}

/**
 * マークダウン編集レイアウト
 * @param page
 * @returns JSX
 */
MarkdownEditorPage.layout = (page: ReactElement) => {
    return (
        <AuthenticatedLayout>
            <MarkdownLayout>{page}</MarkdownLayout>
        </AuthenticatedLayout>
    );
};

export default MarkdownEditorPage;
