import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import HomeLayout from '@/Layouts/HomeLayout';
import MarkdownCreator from '@/Components/Markdown/MarkdownCreator';
import { PageProps } from '@/types';
import { usePage } from '@inertiajs/react';

function MarkdownPage({}: PageProps) {
  const { props } = usePage();
  const message = props.message as string;

  return (
    <div>
      <MarkdownCreator message={message} />
    </div>
  );
}

MarkdownPage.layout = (
  page: React.ReactElement
) => {
    return (
        <AuthenticatedLayout>
            <HomeLayout>
              {page}
            </HomeLayout>
        </AuthenticatedLayout>
    );
}

export default MarkdownPage;