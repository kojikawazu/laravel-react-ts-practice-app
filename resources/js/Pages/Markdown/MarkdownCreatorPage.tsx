import { ReactElement } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import HomeLayout from '@/Layouts/HomeLayout';
import MarkdownCreator from '@/Components/Markdown/MarkdownCreator';
import { PageProps } from '@/types';
import { usePage } from '@inertiajs/react';

/**
 * マークダウン生成エディタページ
 * @param {} 
 * @returns JSX
 */
function MarkdownCreatorPage({}: PageProps) {
  const { props } = usePage();
  const message = props.message as string;

  return (
    <div>
      <MarkdownCreator message={message} />
    </div>
  );
}

/**
 * マークダウン生成エディタレイアウト
 * @param page 
 * @returns JSX
 */
MarkdownCreatorPage.layout = (
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

export default MarkdownCreatorPage;