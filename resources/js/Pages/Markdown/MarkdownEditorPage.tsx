import { ReactElement } from 'react';
import { usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import HomeLayout from '@/Layouts/HomeLayout';
import { PageProps } from '@/types';
import { MarkdownPost } from '@/types/types';
import MarkdownEditor from '@/Components/Markdown/MarkdownEditor';

import 'react-toastify/dist/ReactToastify.css';

/**
 * マークダウン編集ページProps
 */
interface MarkdownDetailPageProps extends PageProps {
};

/**
 * マークダウン編集ページ
 * @returns JSX
 */
function MarkdownEditorPage({

}: MarkdownDetailPageProps) {
  const { props } = usePage();
  const post = props.post as MarkdownPost;
  const message = props.message as string;

  return (
    <>
        <MarkdownEditor 
          post={post}
          message={message} 
        />
    </>
  );
}

/**
 * マークダウン編集レイアウト
 * @param page 
 * @returns JSX
 */
MarkdownEditorPage.layout = (
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

export default MarkdownEditorPage;