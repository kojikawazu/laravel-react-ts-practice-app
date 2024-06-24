import { ReactElement } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import MarkdownLayout from '@/Layouts/MarkdownLayout';
import { PageProps } from '@/types';
import { MarkdownPost } from '@/types/types';
import MarkdownDetail from '@/Components/Markdown/MarkdownDetail';

/**
 * マークダウン詳細ページProps
 */
interface MarkdownDetailPageProps extends PageProps {
    post: MarkdownPost;
};

/**
 * マークダウン詳細ページ
 * @param post
 * @returns JSX
 */
function MarkdownDetailsPage({
    post,
}: MarkdownDetailPageProps) {
  return (
    <>
        <MarkdownDetail post={post} />
    </>
  );
}

/**
 * マークダウン詳細レイアウト
 * @param page 
 * @returns JSX
 */
MarkdownDetailsPage.layout = (
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

export default MarkdownDetailsPage;