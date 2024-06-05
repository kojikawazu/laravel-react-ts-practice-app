import { ReactElement } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import HomeLayout from '@/Layouts/HomeLayout';
import { PageProps } from '@/types';
import { MarkdownPost } from '@/types/types';
import { usePage } from '@inertiajs/react';
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
  const { props } = usePage();

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
            <HomeLayout>
              {page}
            </HomeLayout>
        </AuthenticatedLayout>
    );
}

export default MarkdownListPage;