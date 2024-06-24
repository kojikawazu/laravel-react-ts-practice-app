import { ReactElement } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { MarkdownPost } from '@/types/types';
import MarkdownLayout from '@/Layouts/MarkdownLayout';
import MarkdownList from '@/Components/Markdown/MarkdownList';

/**
 * マークダウンリストページProps
 */
interface MarkdownListPageProps extends PageProps {
  posts: MarkdownPost[];
}

/**
 * マークダウンリストページ
 * @param posts Markdownリスト
 * @returns JSX
 */
function MarkdownListPage({
  posts
}: MarkdownListPageProps) {

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
MarkdownListPage.layout = (
  page: ReactElement
) => {
    return (
        <AuthenticatedLayout>
            <MarkdownLayout>
              {page}
            </MarkdownLayout>
        </AuthenticatedLayout>
    );
}

export default MarkdownListPage;